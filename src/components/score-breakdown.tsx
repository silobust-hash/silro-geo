import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface CategoryScore {
  name: string;
  icon: string;
  score: number;
  maxScore: number;
  issueCount: number;
}

export function ScoreBreakdown({ categories }: { categories: CategoryScore[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => {
        const pct = Math.round((cat.score / cat.maxScore) * 100);
        const color = pct >= 70 ? 'text-green-600' : pct >= 40 ? 'text-yellow-600' : 'text-red-600';
        return (
          <Card key={cat.name} className="hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{cat.icon}</span>
                  <span className="font-semibold text-sm">{cat.name}</span>
                </div>
                <span className={`font-bold text-lg ${color}`}>
                  {cat.score}/{cat.maxScore}
                </span>
              </div>
              <Progress value={pct} className="h-2 mb-2" />
              {cat.issueCount > 0 && (
                <p className="text-xs text-red-500 mt-1">
                  개선 필요 {cat.issueCount}건
                </p>
              )}
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
