import Statistic from "./Statistic";

export type FunnelStatisticResult = {
  profilesLiked: number;
  matches: number;
  chats: number;
  blocks: number;
  met: number;

  successRate: {
    withComment: number;
    withoutComment: number;
  };
};

export default class FunnelStatistic extends Statistic<FunnelStatisticResult> {
  name = "FunnelStatistic";
  calculateResult(): FunnelStatisticResult {
    const result = this.getDefaultValue();

    const successRate = {
      likesWithComment: 0,
      matchesWithComment: 0,

      likesWithoutComment: 0,
      matchesWithoutComment: 0,
    };

    for (const match of this.wrapped.userData.matches) {
      result.profilesLiked++;
      const hasComment = match.like?.some((m) =>
        m.like?.some((l) => l.comment)
      );

      if ("like" in match) {
        if (hasComment) {
          successRate.likesWithComment++;
        } else {
          successRate.likesWithoutComment++;
        }
      }

      if ("match" in match) {
        result.matches++;

        if (hasComment) {
          successRate.matchesWithComment++;
        } else {
          successRate.matchesWithoutComment++;
        }
      }
      if ("chats" in match) {
        result.chats++;
      }
      if ("block" in match) {
        result.blocks++;
      }
      if ("we_met" in match) {
        result.met++;
      }
    }

    result.successRate.withComment =
      successRate.matchesWithComment / successRate.likesWithComment;
    result.successRate.withoutComment =
      successRate.matchesWithoutComment / successRate.likesWithoutComment;

    return result;
  }

  getDefaultValue(): FunnelStatisticResult {
    return {
      profilesLiked: 0,
      matches: 0,
      chats: 0,
      blocks: 0,
      met: 0,

      successRate: {
        withComment: 0,
        withoutComment: 0,
      },
    };
  }
}
