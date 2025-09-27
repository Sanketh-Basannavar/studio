'use client';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { mockClassPerformance } from '@/lib/mock-data';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

const chartConfig = {
  score: {
    label: 'Average Score',
    color: 'hsl(var(--primary))',
  },
};

export default function ClassPerformanceChart() {
  return (
    <ChartContainer config={chartConfig} className="h-64 w-full">
      <BarChart accessibilityLayer data={mockClassPerformance}>
        <XAxis
          dataKey="subject"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          fontSize={12}
          tickFormatter={(value) => `${value}%`}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Bar dataKey="averageScore" fill="var(--color-score)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
