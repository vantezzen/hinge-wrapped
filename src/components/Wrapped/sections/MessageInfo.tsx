import React from "react";
import { WrappedSectionProps } from ".";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import { MessageSquareHeart, Timer } from "lucide-react";
import {
  formatTimeLengthAnimated,
  formatTimeLengthString,
} from "@/lib/formatTimeLength";
import lookup from "@/lib/lookup";
import Serif from "@/components/Serif";
import InfoText from "../InfoText";

function MessageInfo(props: WrappedSectionProps) {
  return (
    <div className="m-8 rounded-xl w-full max-w-[80vw] mx-auto flex justify-center items-center flex-col gap-6 relative">
      <BentoGrid className="grid-cols-2">
        <BentoCard
          name={formatTimeLengthString(
            props.statistics.chat.averageTimeToFirstMessage / 1000
          )}
          description="average time from match to first message"
          Icon={() => <Timer />}
        />
        <BentoCard
          name={props.statistics.chat.highestMessages}
          description="most messages in a chat"
          Icon={() => <MessageSquareHeart />}
        />
      </BentoGrid>

      <div style={{ height: "200px" }}></div>
      <Serif>
        <h2 className="text-5xl text-center font-bold text-emerald-500">
          {formatTimeLengthAnimated(
            props.statistics.chat.longestTimeBetweenMessages / 1000
          )}
        </h2>
      </Serif>
      <InfoText className="text-center">
        That's the longest time between two messages.{" "}
        {lookup(props.statistics.chat.longestTimeBetweenMessages / 1000, {
          0: "Damn, you're quick to reply.",
          [60 * 60 * 3]: "Leaving people longing for a reply, huh?",
          [60 * 60 * 24]: "Damn, thought you ghosted them there",
          [60 * 60 * 24 * 7]: "Did you take a vacation or something?",
        })}
      </InfoText>
      <div style={{ height: "200px" }}></div>
    </div>
  );
}

export default MessageInfo;
