import React from "react";
import { WrappedSectionProps } from ".";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ordinal, round } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Serif from "@/components/Serif";

function SuccessRateByPositionInDay(props: WrappedSectionProps) {
  const chartData = props.statistics.likes.successRateByPositionInDay
    .filter((point) => ![0, 1].includes(point))
    .map((point, index) => ({
      position: index + 1,
      successRate: round(point * 100, 2),
    }));

  const highestSuccessRatePosition = chartData.reduce(
    (acc, point) => (point.successRate > acc.successRate ? point : acc),
    { successRate: 0, position: 0 }
  );

  return (
    <div className="p-12 m-8 rounded-xl w-[80vw] mx-auto flex justify-center items-center flex-col gap-6 relative">
      <hr className="w-full border-zinc-200 border-2 mb-6 rounded-full" />

      <h2 className="text-2xl text-center font-bold">
        You matched most with the
        <Serif>
          <div className="text-6xl text-rose-500 my-3">
            {highestSuccessRatePosition.position}
            {ordinal(highestSuccessRatePosition.position)}
          </div>
        </Serif>{" "}
        profile you liked of the day.
      </h2>

      <ChartContainer
        config={{
          successRate: {
            label: "Match Rate",
            color: "#2563eb",
          },
        }}
        className="min-h-[200px] w-full"
      >
        <BarChart
          accessibilityLayer
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="position"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent indicator="line" />}
          />
          <Bar dataKey="successRate" fill="#2563eb" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default SuccessRateByPositionInDay;
