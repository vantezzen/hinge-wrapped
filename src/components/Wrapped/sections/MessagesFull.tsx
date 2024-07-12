import React from "react";
import { WrappedSectionProps } from ".";
import Serif from "@/components/Serif";
import CountUp from "../CountUp";
import InfoText from "../InfoText";
import { round } from "@/lib/utils";
import lookup from "@/lib/lookup";
import Image from "next/image";

function MessagesFull(props: WrappedSectionProps) {
  return (
    <div className="m-8 rounded-xl w-full max-w-[80vw] mx-auto flex justify-center items-center flex-col gap-6 relative">
      <h2 className="text-2xl text-center font-bold">
        You've sent
        <Serif>
          <div className="text-6xl text-orange-500 my-3">
            <CountUp end={props.statistics.chat.totalMessages} />
          </div>
        </Serif>
        messages
      </h2>
      <InfoText className="text-center">
        with around {round(props.statistics.chat.averageMessages)} messages per
        chat.
      </InfoText>
      <InfoText className="text-center text-sm text-zinc-500">
        {lookup(props.statistics.chat.totalMessages, {
          0: "Psst - you know you have to talk to people to get a date, right?",
          10: "I mean, you could be a bit more chatty.",
          40: "You're getting there, but you could be more active.",
          80: "You're doing well, but there's always room for improvement.",
          100: "You're a chatterbox, aren't you?",
          200: "You know there are people outside of that app, right?",
        })}
        .
      </InfoText>

      {props.statistics.chat.messagesAskingForInstagram && (
        <>
          <div className="h-48"></div>
          <div className="flex gap-3 items-center">
            <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full flex justify-center items-center">
              <Image
                src={
                  props.wrapped.userData.media.find((m) => m.type === "photo")
                    ?.url || "/profile.png"
                }
                className="aspect-square h-full w-full"
                width="200"
                height="200"
                alt="Your profile picture"
              />
            </span>
            <span className=" bg-accent p-3 rounded-md max-w-xs">
              Ayo, what's your insta?
            </span>
          </div>

          <InfoText>
            Well you asked for their Instagram{" "}
            <b>{props.statistics.chat.messagesAskingForInstagram} times</b>.
          </InfoText>
        </>
      )}

      <div className="h-48"></div>

      <h2 className="text-2xl text-center font-bold">
        You've used a vocabolary of
        <Serif>
          <div className="text-6xl text-violet-500 my-3">
            <CountUp end={props.statistics.messages.uniqueWords} />
          </div>
        </Serif>
        unique words
      </h2>
      <InfoText className="text-center">
        {lookup(props.statistics.messages.uniqueWords, {
          0: "Not a talker I see.",
          10: "You know some sentences are loonger than that",
          40: "Probably the word base of a 5 year old",
          80: "Sticking to the basics, I see.",
          100: "Given you're on a dating app, that's probably average.",
          150: "On a dating app, that's probably Shapespeare level.",
        })}
      </InfoText>

      <div className="h-48"></div>
      <div className="flex gap-3 items-center">
        <span className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full flex justify-center items-center">
          <Image
            src={
              props.wrapped.userData.media.find((m) => m.type === "photo")
                ?.url || "/profile.png"
            }
            className="aspect-square h-full w-full"
            width="200"
            height="200"
            alt="Your profile picture"
          />
        </span>
        <span className=" bg-accent p-3 rounded-md max-w-xs">
          {props.statistics.messages.mostUsedEmoji.emoji.repeat(3)}
        </span>
      </div>

      <InfoText className="text-center">
        This you? Because you sent that emoji{" "}
        <b>{props.statistics.messages.mostUsedEmoji.count} times</b>.<br />
        {
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
            "💀": "I think the only thing dead here is your social life, eh?",
            "🥺": "What you so sad about? Your social life?",
            "🤣": "What's so funny there?",
            "🤷": "What you so skeptic about?",
          }[props.statistics.messages.mostUsedEmoji.emoji]
        }
      </InfoText>

      <div className="h-48"></div>

      <div>
        <iframe
          src="https://giphy.com/embed/Y4t7cWSms8DM0U1ZYi"
          frameBorder="0"
          allowFullScreen
        ></iframe>
        <a
          href="https://giphy.com/gifs/teamcoco-conan-obrien-sophie-turner-tequila-slaps-Y4t7cWSms8DM0U1ZYi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-zinc-400 float-right"
        >
          via GIPHY
        </a>
      </div>
      <Serif>
        <h2 className="text-3xl text-center font-bold text-blue-500">
          You apologized{" "}
          <CountUp end={props.statistics.chat.messagesWithApologies} /> times
        </h2>
      </Serif>
      <InfoText className="text-center">
        {lookup(props.statistics.chat.messagesWithApologies, {
          0: "Ok there Mr. Perfect",
          1: "You did something wrong and apologized, I respect that.",
          3: "You're a bit of a troublemaker, aren't you?",
          10: "Are you canadian or just really bad at this?",
        })}
      </InfoText>

      <div className="h-48"></div>
    </div>
  );
}

export default MessagesFull;
