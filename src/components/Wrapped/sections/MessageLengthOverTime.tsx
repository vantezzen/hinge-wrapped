import React from "react";
import { WrappedSectionProps } from ".";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { analyzeTrend, ordinal, round, Trend } from "@/lib/utils";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Serif from "@/components/Serif";
import InfoText from "../InfoText";

function MessageLengthOverTime(props: WrappedSectionProps) {
  const chartData = props.statistics.messages.messageLengthOverTime
    .filter((point) => ![0, 1].includes(point))
    .map((messageLength, index) => ({
      position: index + 1,
      messageLength: messageLength,
    }));

  const trend = analyzeTrend(props.statistics.messages.messageLengthOverTime);

  return (
    <div className="p-12 m-8 rounded-xl w-[80vw] mx-auto flex justify-center items-center flex-col gap-6 relative">
      <hr className="w-full border-zinc-200 border-2 mb-6 rounded-full" />

      <h2 className="text-2xl text-center font-bold">
        {trend === Trend.Rising && (
          <>The longer you chat, the longer your messages get.</>
        )}
        {trend === Trend.Falling && (
          <>The longer you chat, the shorter your messages get.</>
        )}
        {trend === Trend.Stable && (
          <>Your message length doesn't change much over time.</>
        )}
      </h2>

      <InfoText>
        {trend === Trend.Rising && (
          <>
            You need a second to open up, eh? It looks like once you start
            chatting, you get more comfortable and your messages get longer.
          </>
        )}
        {trend === Trend.Falling && (
          <>
            You start off strong but then taper off with messages getting
            shorter and shorter - maybe you're getting bored easily?
          </>
        )}
        {trend === Trend.Stable && (
          <>
            How lame - your message length doesn't change much over time. Maybe
            you're just a consistent chatterbox?
          </>
        )}
      </InfoText>

      <ChartContainer
        config={{
          messageLength: {
            label: "Message Length",
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
          <Bar dataKey="messageLength" fill="#2563eb" radius={8} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default MessageLengthOverTime;
