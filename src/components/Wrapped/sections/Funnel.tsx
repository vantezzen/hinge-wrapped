import React from "react";
import { WrappedSectionProps } from ".";
import { motion } from "framer-motion";
import Serif from "@/components/Serif";
import Trapezoid from "../Trapezoid";
import InfoText from "../InfoText";
import { formatTimeLengthString } from "@/lib/formatTimeLength";
import { round } from "@/lib/utils";
import lookup from "@/lib/lookup";
import CountUp from "../CountUp";

function Funnel(props: WrappedSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const likeRef = React.useRef<HTMLDivElement>(null);
  const matchesRef = React.useRef<HTMLDivElement>(null);
  const messageRef = React.useRef<HTMLDivElement>(null);
  const metRef = React.useRef<HTMLDivElement>(null);

  return (
    <div
      className="p-12 m-8 rounded-xl w-full max-w-[80vw] mx-auto flex justify-center items-center flex-col gap-6 relative"
      ref={containerRef}
    >
      <div className="h-48"></div>

      {/* Likes */}
      <h2 className="text-2xl text-center font-bold">
        You've liked
        <Serif>
          <div className="text-6xl text-orange-500 my-3">
            <CountUp end={props.statistics.funnel.profilesLiked} />
          </div>
        </Serif>
        profiles
      </h2>
      <InfoText className="text-center">
        which took you around{" "}
        {formatTimeLengthString(props.statistics.likes.timeSpentLikingProfiles)}{" "}
        in total.
      </InfoText>
      <InfoText className="text-center">
        {lookup(props.statistics.funnel.profilesLiked, {
          0: "You know you have to like people to get a match, right?",
          10: "You new here?",
          50: "Probably more than a class of students.",
          100: "Pretty healthy amount of likes, acutally.",
          200: "You're a like machine!",
          500: "You know there are people outside of that app, right?",
          1000: "Come on, that's like a school of fish! Just go outside already.",
          2000: "Ok Romeo, calm down. You can also go outside to meet people.",
        })}
      </InfoText>
      <InfoText className="text-center">
        You're most active here on{" "}
        {props.statistics.likes.mostActiveWeekday.weekday}, spending{" "}
        {formatTimeLengthString(
          props.statistics.likes.mostActiveWeekday.averageUsageTime * 60
        )}{" "}
        on average.
      </InfoText>
      <motion.div
        className="h-16 rounded-lg bg-orange-500 mx-auto mt-12"
        style={{ width: "100%" }}
        ref={likeRef}
      />
      <Trapezoid
        topRef={likeRef}
        bottomRef={matchesRef}
        containerRef={containerRef}
        color="#f6ad55"
      />
      <div style={{ height: "200px" }}></div>

      {/* Matches */}
      <h2 className="text-2xl text-center font-bold">
        You've matched with
        <Serif>
          <div className="text-6xl text-emerald-500 my-3">
            <CountUp end={props.statistics.funnel.matches} />
          </div>
        </Serif>
        of them
      </h2>

      <InfoText className="">
        That's a match rate of{" "}
        <b>
          {round(
            (props.statistics.funnel.matches /
              props.statistics.funnel.profilesLiked) *
              100
          )}
          %
        </b>
        , leaving a comment on <b>{props.statistics.likes.likesWithComment}</b>{" "}
        profiles.
      </InfoText>
      {props.statistics.likes.likesWithComment > 0 && (
        <InfoText className="">
          When liking without a comment, you matched with{" "}
          <b>
            {round(props.statistics.funnel.successRate.withoutComment * 100, 2)}
            %
          </b>
          , and with a comment, you matched with{" "}
          <b>
            {round(props.statistics.funnel.successRate.withComment * 100, 2)}%
          </b>
          .<br />
          {props.statistics.funnel.successRate.withComment >
          props.statistics.funnel.successRate.withoutComment ? (
            <>So continue leaving comments! You're funny and charming.</>
          ) : (
            <>So you know... maybe let your pictures do the talking.</>
          )}
        </InfoText>
      )}

      <motion.div
        className="h-16 rounded-lg bg-emerald-500 mx-auto mt-12"
        style={{
          width: `${
            (props.statistics.funnel.matches /
              props.statistics.funnel.profilesLiked) *
            100
          }%`,
        }}
        ref={matchesRef}
      />
      <Trapezoid
        topRef={matchesRef}
        bottomRef={messageRef}
        containerRef={containerRef}
        color="#68d391"
      />
      <div style={{ height: "200px" }}></div>

      {/* Messages */}
      <h2 className="text-2xl text-center font-bold">
        You've messaged
        <Serif>
          <div className="text-6xl text-blue-500 my-3">
            <CountUp end={props.statistics.funnel.chats} />
          </div>
        </Serif>
        of them
      </h2>
      <InfoText className="">
        We'll take a deeper look at your rizz in those later...
      </InfoText>
      <motion.div
        className="h-16 rounded-lg bg-blue-500 mx-auto mt-12"
        style={{
          width: `${
            (props.statistics.funnel.chats /
              props.statistics.funnel.profilesLiked) *
            100
          }%`,
        }}
        ref={messageRef}
      />

      {props.statistics.funnel.met && (
        <>
          <Trapezoid
            topRef={messageRef}
            bottomRef={metRef}
            containerRef={containerRef}
            color="#4299e1"
          />
          <div style={{ height: "200px" }}></div>

          {/* Met */}
          <h2 className="text-2xl text-center font-bold">
            confirmed you met
            <Serif>
              <div className="text-6xl text-violet-500 my-3">
                <CountUp end={props.statistics.funnel.met} />
              </div>
            </Serif>
            of them
          </h2>
          <motion.div
            className="h-16 rounded-lg bg-violet-500 mx-auto mt-12"
            style={{
              width: `${
                (props.statistics.funnel.met /
                  props.statistics.funnel.profilesLiked) *
                100
              }%`,
            }}
            ref={metRef}
          />
        </>
      )}

      <div style={{ height: "200px" }}></div>

      {/* Block */}
      <h2 className="text-2xl text-center font-bold">
        and got on to unmatch
        <Serif>
          <div className="text-6xl text-rose-500 my-3">
            <CountUp end={props.statistics.funnel.blocks} />
          </div>
        </Serif>
        of them
      </h2>

      <InfoText className="text-center">
        {lookup(props.statistics.funnel.blocks, {
          0: "You just loved everyone, huh?",
          1: "Oh yes, there's always that one person.",
          2: "You're not here to play games.",
          10: "Don't like it, unmatch it - I respect that.",
          30: "You're not here to play games, I see.",
        })}
      </InfoText>

      <motion.div
        className="h-16 rounded-lg bg-rose-500 mx-auto mt-12"
        style={{
          width: `${
            (props.statistics.funnel.blocks /
              props.statistics.funnel.profilesLiked) *
            100
          }%`,
        }}
      />

      {props.statistics.likes.mostLikesOnOneProfile.likes > 1 && (
        <>
          <div style={{ height: "200px" }}></div>
          <h2 className="text-2xl text-center font-bold">
            There was a profile which you liked
            <Serif>
              <div className="text-6xl text-rose-500 my-3">
                <CountUp
                  end={props.statistics.likes.mostLikesOnOneProfile.likes}
                />
              </div>
            </Serif>
            times.{" "}
            {props.statistics.likes.mostLikesOnOneProfile.match ? (
              <>But in the end you matched with them!</>
            ) : (
              <>And you didn't even matched with them in the end!</>
            )}{" "}
          </h2>
        </>
      )}
    </div>
  );
}

export default Funnel;
