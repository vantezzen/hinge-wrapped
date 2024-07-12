import ChatStatistic, { ChatStatisticResult } from "./Statistics/ChatStatistic";
import FunnelStatistic, {
  FunnelStatisticResult,
} from "./Statistics/FunnelStatistic";
import LikeStatistic, { LikeStatisticResult } from "./Statistics/LikeStatistic";
import MessageStatistic, {
  MessageStatisticResult,
} from "./Statistics/MessageStatistic";
import ProfileStatistic, {
  ProfileStatisticResult,
} from "./Statistics/ProfileStatistic";
import Statistic from "./Statistics/Statistic";
import { HingeData } from "./types";

export type Statistics = {
  funnel: FunnelStatisticResult;
  chat: ChatStatisticResult;
  likes: LikeStatisticResult;
  profile: ProfileStatisticResult;
  messages: MessageStatisticResult;
};

// @ts-ignore
export const SAMPLE_STATISTICS: Statistics = {
  funnel: {
    profilesLiked: 1254,
    matches: 207,
    chats: 65,
    blocks: 38,
    met: 1,
    successRate: {
      withComment: 0.2,
      withoutComment: 0.16621743036837378,
    },
  },
  chat: {
    averageMessages: 3.723076923076923,
    highestMessages: 34,
    averageTimeBetweenMessages: 257932.2033898305,
    averageTimeToFirstMessage: 107913276.92307693,
    totalMessages: 242,
    messagesAskingForInstagram: 1,
    averageChatLengthBasedOnFirstMessageTime: [
      2.5, 0, 0, 1, 0, 0, 3, 0, 2, 6.666666666666667, 3, 1, 2.3333333333333335,
      3.6, 11, 1.6666666666666667, 1.75, 2, 3, 2, 6.75, 7, 1, 0,
    ],
  },
  likes: {
    mostActiveWeekday: {
      weekday: "Saturday",
      averageUsageTime: 15.11025641025641,
    },
    likesWithComment: 80,
    mostLikesOnOneProfile: {
      likes: 1,
      match: true,
    },
    timeSpentLikingProfiles: 33441,
    successRateByPositionInDay: [
      0.2134387351778656, 0.14537444933920704, 0.15544041450777202,
      0.1497005988023952, 0.15503875968992248, 0.1875, 0.13580246913580246,
      0.16666666666666666, 0, 0, 1, 0, 0, 0, 1,
    ],
  },
  profile: {
    images: 16,
    prompts: 5,
    daysSinceSignup: 479,
  },
  messages: {
    avgMessageLength: 83.82231404958678,
    mostUsedEmoji: {
      emoji: "😭",
      count: 11,
    },
    messageLengthOverTime: [
      74.12307692307692, 86.08823529411765, 75.41666666666667,
      84.54545454545455, 77.14285714285714, 84, 70.66666666666667, 65,
      60.285714285714285, 96.14285714285714, 103.28571428571429, 107.75, 111,
      94.33333333333333, 80.33333333333333, 127.5, 153, 91.5, 107, 17, 143, 139,
      79, 48, 28, 125, 102, 166, 104, 140, 119, 120, 138, 346,
    ],
    mostUsedFirstMessage: {
      text: "Hey, how are you?",
      count: 5,
    },
    uniqueWords: 112,
  },
};

export const SAMPLE_USER = {
  matches: [],
  media: [],
  prompts: [],
  user: {
    preferences: {
      distance_miles_max: 18,
      age_min: 19,
      age_max: 24,
      age_dealbreaker: true,
      height_min: 92,
      height_max: 214,
      height_dealbreaker: false,
      gender_preference: "Women",
      ethnicity_preference: '["Open to All"]',
      ethnicity_dealbreaker: false,
      religion_preference: '["Open to All"]',
      religion_dealbreaker: false,
      smoking_preference: '["Open to All"]',
      smoking_dealbreaker: false,
      drinking_preference: '["Open to All"]',
      drinking_dealbreaker: false,
      marijuana_preference: '["Open to All"]',
      marijuana_dealbreaker: false,
      drugs_preference: '["Open to All"]',
      drugs_dealbreaker: false,
      children_preference: '["Open to All"]',
      children_dealbreaker: false,
      family_plans_preference: '["Open to All"]',
      family_plans_dealbreaker: false,
      education_attained_preference: '["Open to All"]',
      education_attained_dealbreaker: false,
      politics_preference: '["Open to All"]',
      politics_dealbreaker: false,
    },
    identity: {
      email: "test@example.com",
      instagram_authorized: false,
      phone_number: "+1123123123",
      phone_country_code: "US",
      phone_country_calling_code: "1",
      phone_carrier: "",
      phone_line_type: "Mobile",
      phone_is_prepaid: false,
    },
    installs: [],
    account: {
      signup_time: "2024-03-20 00:00:00.000",
      last_seen: "2024-03-20 00:00:00.000",
      device_platform: "ios",
      device_os: "18.0.0",
      device_model: "unknown",
      app_version: "9.48.0",
      push_notifications_enabled: false,
    },
    profile: {
      first_name: "John Doe",
      age: 21,
      height_centimeters: 190,
      gender: "male",
      gender_identity: "Man",
      gender_identity_displayed: true,
      ethnicities: "[]",
      ethnicities_displayed: false,
      religions: "[]",
      religions_displayed: true,
      workplaces_displayed: false,
      job_title: "Boss",
      job_title_displayed: false,
      schools: '["MIT"]',
      schools_displayed: true,
      hometowns: '["New York"]',
      hometowns_displayed: true,
      smoking: "Sometimes",
      smoking_displayed: false,
      drinking: "Sometimes",
      drinking_displayed: false,
      marijuana: "Sometimes",
      marijuana_displayed: false,
      drugs: "No",
      drugs_displayed: false,
      children: "Sometimes",
      children_displayed: false,
      family_plans: "Sometimes",
      family_plans_displayed: false,
      education_attained: "Sometimes",
      politics: "Prefer Not to Say",
      politics_displayed: false,
      instagram_displayed: false,
      vaccination_status: "Sometimes",
      vaccination_status_displayed: false,
      languages_spoken_displayed: true,
      languages_spoken: "English",
      relationship_type_displayed: false,
      relationship_types: "Monogamy",
      selfie_verified: true,
    },
    devices: [],
    location: {
      latitude: 0,
      longitude: 0,
      country: "United States",
      country_short: "US",
      admin_area_1: "New York",
      admin_area_1_short: "NY",
      locality: "New York",
      sublocality: "",
      neighborhood: "",
      postal_code: "",
      location_source: "google",
    },
  },
};

export default class Wrapped {
  public demoMode = false;

  constructor(public userData: HingeData) {}

  public getStatistics(): Statistics {
    console.log("Getting statistics", this.userData);

    if (this.demoMode) {
      return SAMPLE_STATISTICS;
    }

    return {
      funnel: this.calculateStatistic(FunnelStatistic),
      chat: this.calculateStatistic(ChatStatistic),
      likes: this.calculateStatistic(LikeStatistic),
      profile: this.calculateStatistic(ProfileStatistic),
      messages: this.calculateStatistic(MessageStatistic),
    };
  }

  private calculateStatistic<T>(
    statistic: new (wrapped: Wrapped) => Statistic<T>
  ): T {
    const statisticInstance = new statistic(this);

    try {
      return statisticInstance.calculateResult();
    } catch (e) {
      console.log(`Failed to calculate statistic ${statistic.name}`, e);
      return statisticInstance.getDefaultValue();
    }
  }
}
