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
import Photos from "./Photos";
import RoundupHero from "./RoundupHero";
import RizzScore from "./RizzScore";
import MessagesFull from "./MessagesFull";
import Share from "./Share";

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
  MessagesFull,
  MessageInfo,
  FirstMessage,
  MessageLengthOverTime,
  ProfileHero,
  Profile,
  Photos,
  RoundupHero,
  RizzScore,
  Share,
];
export default sections;
