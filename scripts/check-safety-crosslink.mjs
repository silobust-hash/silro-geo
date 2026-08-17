import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import ts from 'typescript';

const root = resolve(import.meta.dirname, '..');
const safetyUrl = 'https://safety.silronomu.com/';
const safetyLabel = '산업안전 지도 ↗';
const llmsEntry = `- 산업안전·중대재해 안내: ${safetyUrl}`;

function attributeValue(attributes, name) {
  const attribute = attributes.properties.find((property) => (
    ts.isJsxAttribute(property) && property.name.text === name
  ));
  if (!attribute || !attribute.initializer || !ts.isStringLiteral(attribute.initializer)) return null;
  return attribute.initializer.text;
}

function jsxText(element) {
  return element.children
    .filter(ts.isJsxText)
    .map((child) => child.getText().trim())
    .join('');
}

function collectSafetyAnchors(sourceFile) {
  const anchors = [];
  const visit = (node) => {
    if (ts.isJsxElement(node) && node.openingElement.tagName.getText() === 'a') {
      const { attributes } = node.openingElement;
      if (attributeValue(attributes, 'href') === safetyUrl) {
        anchors.push({
          label: jsxText(node),
          target: attributeValue(attributes, 'target'),
          rel: attributeValue(attributes, 'rel'),
        });
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return anchors;
}

function personRelationshipsContainSafety(sourceFile) {
  let containsSafety = false;
  const visit = (node) => {
    if (!ts.isObjectLiteralExpression(node)) return ts.forEachChild(node, visit);

    const type = node.properties.find((property) => (
      ts.isPropertyAssignment(property)
      && property.name.getText().replaceAll('"', '') === '@type'
      && ts.isStringLiteral(property.initializer)
      && property.initializer.text === 'Person'
    ));
    if (type) {
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const name = property.name.getText();
        if (name !== 'sameAs' && name !== 'subjectOf') continue;
        if (property.initializer.getText().includes(safetyUrl)) containsSafety = true;
      }
    }
    ts.forEachChild(node, visit);
  };
  visit(sourceFile);
  return containsSafety;
}

const [navSource, layoutSource, llms] = await Promise.all([
  readFile(resolve(root, 'src/components/nav.tsx'), 'utf8'),
  readFile(resolve(root, 'src/app/layout.tsx'), 'utf8'),
  readFile(resolve(root, 'public/llms.txt'), 'utf8'),
]);

const navAst = ts.createSourceFile('nav.tsx', navSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const layoutAst = ts.createSourceFile('layout.tsx', layoutSource, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const safetyAnchors = collectSafetyAnchors(navAst);

if (safetyAnchors.length !== 2) {
  throw new Error(`Expected exactly two shared Safety navigation anchors; found ${safetyAnchors.length}`);
}
if (safetyAnchors.some(({ label, target, rel }) => (
  label !== safetyLabel || target !== '_blank' || rel !== 'noreferrer'
))) {
  throw new Error('Safety navigation anchors must retain the exact destination label and external-link attributes');
}
if (!llms.split(/\r?\n/).includes(llmsEntry)) {
  throw new Error('public/llms.txt: required Safety channel entry is missing or changed');
}
if (layoutSource.includes(safetyUrl) || personRelationshipsContainSafety(layoutAst)) {
  throw new Error('Safety must not appear in the rendered Person subjectOf or sameAs relationships');
}

console.log('Safety crosslink contract passed: shared nav anchors, llms entry, and Person identity boundary.');
