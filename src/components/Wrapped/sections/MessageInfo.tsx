import React from "react";
import FatHeading from "../FatHeading";
import SlideContainer from "../SlideContainer";
import { WrappedSectionProps } from ".";
import { BorderBeam } from "@/components/ui/border-beam";
import InfoText from "../InfoText";
import { BentoCard, BentoGrid } from "@/components/magicui/bento-grid";
import {
  Clock,
  MessageCircle,
  MessageCircleHeart,
  MessagesSquare,
  Timer,
} from "lucide-react";
import { round } from "@/lib/utils";
import { InstagramLogoIcon } from "@radix-ui/react-icons";
import { formatTimeLengthString } from "@/lib/formatTimeLength";
import lookup from "@/lib/lookup";

function MessageInfo(props: WrappedSectionProps) {
  return (
    <div className="m-8 rounded-xl w-[80vw] mx-auto flex justify-center items-center flex-col gap-6 relative">
      <BentoGrid className="grid-cols-2">
        <BentoCard
          name={String(props.statistics.chat.totalMessages)}
          description="messages sent"
          Icon={() => <MessageCircle />}
          comment={lookup(props.statistics.chat.totalMessages, {
            0: "Psst - you know you have to talk to people to get a date, right?",
            10: "I mean, you could be a bit more chatty.",
            40: "You're getting there, but you could be more active.",
            80: "You're doing well, but there's always room for improvement.",
            100: "You're a chatterbox, aren't you?",
            200: "You know there are people outside of that app, right?",
          })}
        />
        <BentoCard
          name={String(round(props.statistics.chat.averageMessages))}
          description="average messages per conversation"
          Icon={() => <MessagesSquare />}
          comment={lookup(props.statistics.chat.averageMessages, {
            0: "You're not much of a talker, are you?",
            1: "Just saying hi and then ghosting, huh?",
            3: "I sometimes use more than that to order a pizza.",
            5: "Quality over quantity, right?",
            10: "You're a regular chatterbox, aren't you?",
          })}
        />
        <BentoCard
          name={String(round(props.statistics.chat.highestMessages))}
          description="most messages in a conversation"
          Icon={() => <MessageCircleHeart />}
        />
        <BentoCard
          name={String(round(props.statistics.chat.messagesAskingForInstagram))}
          description="messages asking for Instagram"
          Icon={() => <InstagramLogoIcon />}
          comment={lookup(props.statistics.chat.messagesAskingForInstagram, {
            0: "You're not much of a social media person, are you?",
            1: "Just one? You're not trying hard enough.",
            3: "You're getting there, but you could be more active.",
            5: "You're doing well, but there's always room for improvement.",
            10: "You're a regular Instagram hunter, aren't you?",
          })}
        />
        <BentoCard
          name={formatTimeLengthString(
            props.statistics.chat.averageTimeToFirstMessage / 1000
          )}
          description="average time to first message"
          Icon={() => <Timer />}
        />

        <BentoCard
          name={formatTimeLengthString(
            props.statistics.chat.averageTimeBetweenMessages / 1000
          )}
          description="average time between messages"
          Icon={() => <Clock />}
        />

        <BentoCard
          name={props.statistics.messages.mostUsedEmoji.emoji}
          description={`most used emoji (x${props.statistics.messages.mostUsedEmoji.count})`}
          Icon={() => null}
          comment={
            {
              "😭": "What you crying over? Your social life?",
              "😂": "What's so funny there?",
              "😍": "You're a romantic, aren't you?",
              "🤔": "Deep thoughts?",
              "👀": "You're a bit of a creep, aren't you?",
              "🙈": "What are you hiding? Your missing rizz?",
              "🙄": "What you so skeptic about?",
              "😏": "You're a bit of a flirt, aren't you?",
              "😊": "You're a bit of a flirt, aren't you?",
              "❤️": "Straight to the point, huh?",
              "🍆": "Oh uhhh ok....",
            }[props.statistics.messages.mostUsedEmoji.emoji]
          }
        />

        <BentoCard
          name={props.statistics.messages.uniqueWords}
          description="unique words used"
          Icon={() => null}
          comment={lookup(props.statistics.messages.uniqueWords, {
            0: "Not a talker I see.",
            10: "You know some sentences are loonger than that",
            40: "Probably the word base of a 5 year old",
            80: "Sticking to the basics, I see.",
            100: "Given you're on a dating app, that's probably average.",
            150: "On a dating app, that's probably Shapespeare level.",
          })}
        />
      </BentoGrid>
    </div>
  );
}

export default MessageInfo;
