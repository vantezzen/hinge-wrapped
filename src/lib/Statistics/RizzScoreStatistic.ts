import Statistic from "./Statistic";

export type RizzScoreStatisticResult = {
  score: number;
};

export default class RizzScoreStatistic extends Statistic<RizzScoreStatisticResult> {
  name = "RizzScoreStatistic";
  calculateResult(): RizzScoreStatisticResult {
    let score = 0;
    const maxScore = 100;

    // Profile Completeness (0-20 points)
    const profileFields = [
      "first_name",
      "age",
      "job_title",
      "schools",
      "height_centimeters",
    ] as const;
    const completedFields = profileFields.filter(
      (field) => this.wrapped.userData.user.profile[field]
    ).length;
    score += (completedFields / profileFields.length) * 20;

    // Photo Variety (0-15 points)
    const photoTypes = new Set(this.wrapped.userData.media.map((m) => m.type));
    score += (photoTypes.size / 3) * 15; // Assuming 3 is a good variety

    // Conversation Skills (0-25 points)
    if (
      this.wrapped.userData.matches &&
      this.wrapped.userData.matches.length > 0
    ) {
      const totalChats = this.wrapped.userData.matches.reduce(
        (sum, match) => sum + (match.chats ? match.chats.length : 0),
        0
      );
      const avgChatsPerMatch =
        totalChats / this.wrapped.userData.matches.length;
      score += Math.min(avgChatsPerMatch, 10) * 2.5; // Cap at 25 points
    }

    // Match Success Rate (0-20 points)
    const totalLikes = this.wrapped.userData.matches.reduce(
      (sum, match) => sum + (match.like ? match.like.length : 0),
      0
    );
    const matchRate = this.wrapped.userData.matches.length / totalLikes;
    score += matchRate * 20;

    // Meeting Success (0-20 points)
    const meetingsCount = this.wrapped.userData.matches.filter(
      (match) =>
        match.we_met && match.we_met.some((m) => m.did_meet_subject === "Yes")
    ).length;
    const meetingRate = meetingsCount / this.wrapped.userData.matches.length;
    score += meetingRate * 20;

    return {
      score: Math.round(Math.min(score, maxScore)),
    };
  }

  getDefaultValue(): RizzScoreStatisticResult {
    return {
      score: 0,
    };
  }
}
