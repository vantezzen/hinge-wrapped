import React from "react";
import { WrappedSectionProps } from ".";
import InfoText from "../InfoText";
import lookup from "@/lib/lookup";
import GaugeChart from "react-gauge-chart";

function RizzScore(props: WrappedSectionProps) {
  return (
    <div className="p-12 m-8 rounded-xl w-full max-w-[80vw] mx-auto flex justify-center items-center flex-col gap-6 relative">
      <h2 className="text-2xl text-center font-bold">
        We'd give your profile a Rizz score of
      </h2>

      <GaugeChart
        id="rizz-score"
        percent={props.statistics.rizz.score / 100}
        arcPadding={0.02}
        cornerRadius={0.02}
        nrOfLevels={1}
        colors={["#FFC5AB"]}
        textColor="#000000"
        needleColor="#2a2a2a"
        hideText={true}
      />

      <h2 className="text-4xl text-center font-bold">
        {props.statistics.rizz.score}%
      </h2>

      <InfoText className="text-center">
        {lookup(props.statistics.rizz.score, {
          0: "Yikes, you need to work on your profile.",
          20: "You're not doing too hot.",
          40: "You're getting there.",
          60: "You're doing pretty good.",
          80: "Did I just meet the Rizzler?",
          100: "You're a Rizz pro!",
        })}
      </InfoText>

      <div className="h-48" />
    </div>
  );
}

export default RizzScore;
