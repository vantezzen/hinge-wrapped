import Wrapped, { Statistics } from "@/lib/Wrapped";
import Hero from "./Hero";
import Funnel from "./Funnel";
import SuccessRateByPositionInDay from "./SuccessRateByPositionInDay";
import MessageHero from "./MessageHero";
import MessageInfo from "./MessageInfo";
import FirstMessage from "./FirstMessage";
import MessageLengthOverTime from "./MessageLengthOverTime";
import ProfileHero from "./ProfileHero";
import Profile from "./Profile";

export type WrappedSectionProps = {
  statistics: Statistics;
  wrapped: Wrapped;
  isDemo: boolean;
};

const sections = [
  Hero,
  Funnel,
  SuccessRateByPositionInDay,
  MessageHero,
  MessageInfo,
  FirstMessage,
  MessageLengthOverTime,
  ProfileHero,
  Profile,
];
export default sections;
