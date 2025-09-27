'use client';

import {
  ChartContainer,
} from '@/components/ui/chart';
import { Label, PolarGrid, RadialBar, RadialBarChart } from 'recharts';


export default function MistakeSimilarityChart({ score }: { score: number }) {
  const chartData = [{ name: 'score', value: score, fill: 'hsl(var(--primary))' }];
  
  return (
    <div className="w-full h-48">
      <ChartContainer
        config={{
          score: {
            label: 'Similarity',
            color: 'hsl(var(--primary))',
          },
        }}
        className="mx-auto aspect-square h-full"
      >
        <RadialBarChart
          data={chartData}
          startAngle={90}
          endAngle={-270}
          innerRadius="70%"
          outerRadius="100%"
          barSize={20}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-background"
          />
          <RadialBar dataKey="value" background cornerRadius={10} />
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan
                      x={viewBox.cx}
                      y={viewBox.cy}
                      className="fill-foreground text-4xl font-bold"
                    >
                      {score.toFixed(0)}%
                    </tspan>
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) + 20}
                      className="fill-muted-foreground"
                    >
                      Similarity
                    </tspan>
                  </text>
                );
              }
              return null;
            }}
          />
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}
