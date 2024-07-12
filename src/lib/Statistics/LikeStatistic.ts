// - Day with most Likes
// - Amount of likes with comment
// - Most amount of likes on one profile
// - How much time spent liking profiles

import Statistic from "./Statistic";

export type LikeStatisticResult = {
  mostActiveWeekday: {
    weekday: string;
    averageUsageTime: number;
  };
  likesWithComment: number;
  mostLikesOnOneProfile: {
    likes: number;
    match: boolean;
  };
  timeSpentLikingProfiles: number;

  // Hinge gives you the most relevant profiles first of the day.
  // This array contains the success rate for profiles grouped by their position in the day
  successRateByPositionInDay: number[];
};

export default class LikeStatistic extends Statistic<LikeStatisticResult> {
  // Like History only contains info about when a like occured.
  // This is the maximum time between likes in seconds that is assumed to be the time
  // the user viewed the next profiles. Otherwise is is assumed that the app has been closed
  // and the session has ended.
  static readonly MAX_TIME_BETWEEN_LIKES = 60 * 5;

  name = "LikeStatistic";
  calculateResult(): LikeStatisticResult {
    let totalWatchTimeSec = 0;
    let totalSessions = 1;

    let currentSessionStartTime = null;
    let sessionLengths = [];

    const likes = this.wrapped.userData.matches.sort((a, b) => {
      return (
        new Date(a.like?.[0].timestamp || 0).getTime() -
        new Date(b.like?.[0].timestamp || 0).getTime()
      );
    });
    if (!likes) {
      return this.getDefaultValue();
    }

    const weekdayUsage = [0, 0, 0, 0, 0, 0, 0];
    const weekdaysWithSessions = [
      new Set(),
      new Set(),
      new Set(),
      new Set(),
      new Set(),
      new Set(),
      new Set(),
    ];

    let likesInCurrentDay = 0;
    const successRateBuckets: { likes: number; matches: number }[] = [];

    let userWithMostLikes = {
      likes: 0,
      match: false,
    };

    for (let i = 1; i < likes.length; i++) {
      const user = likes[i];
      const previousUser = likes[i - 1];

      if (!user.like) {
        continue;
      }

      const likeAmount = user.like?.length || 0;
      if (likeAmount > userWithMostLikes?.likes) {
        userWithMostLikes = {
          likes: likeAmount,
          match: user.match ? true : false,
        };
      }

      const likeTime = new Date(user.like?.[0].timestamp);
      if (!currentSessionStartTime) {
        currentSessionStartTime = likeTime;
      }

      const previousLikeTime = new Date(previousUser.like?.[0].timestamp || 0);

      const timeBetweenLikes = Math.abs(
        (likeTime.getTime() - previousLikeTime.getTime()) / 1000
      ); // in seconds

      const weekday = likeTime.getDay();
      if (weekdaysWithSessions[weekday]) {
        weekdaysWithSessions[weekday].add(likeTime.toDateString());
      } else {
        console.error(
          `Weekday ${weekday} ("${
            user.like![0].timestamp
          }") is not in range 0-6. This should not happen.`
        );
      }
      if (timeBetweenLikes < LikeStatistic.MAX_TIME_BETWEEN_LIKES) {
        totalWatchTimeSec += timeBetweenLikes;
        weekdayUsage[weekday] += timeBetweenLikes;
      } else {
        // End of a session
        totalSessions++;

        const sessionLength = Math.abs(
          (previousLikeTime.getTime() - currentSessionStartTime.getTime()) /
            1000
        );
        sessionLengths.push(sessionLength);

        currentSessionStartTime = likeTime;
      }

      const isNewDay = likeTime.getDay() !== previousLikeTime.getDay();
      if (isNewDay) {
        likesInCurrentDay = 0;
      }
      if (!successRateBuckets[likesInCurrentDay]) {
        successRateBuckets[likesInCurrentDay] = { likes: 0, matches: 0 };
      }

      successRateBuckets[likesInCurrentDay].likes++;
      if (user.match) {
        successRateBuckets[likesInCurrentDay].matches++;
      }

      likesInCurrentDay++;
    }

    const mostActiveWeekdayIndex = weekdayUsage.indexOf(
      Math.max(...weekdayUsage)
    );

    return {
      mostActiveWeekday: {
        weekday: new Date(0, 0, mostActiveWeekdayIndex).toLocaleString(
          "en-US",
          { weekday: "long" }
        ),
        averageUsageTime: weekdayUsage[mostActiveWeekdayIndex] / totalSessions,
      },
      likesWithComment: likes.filter(
        (like) => like.like?.[0].like?.[0]?.comment
      ).length,
      mostLikesOnOneProfile: userWithMostLikes,
      timeSpentLikingProfiles: totalWatchTimeSec,
      successRateByPositionInDay: successRateBuckets.map(
        (bucket) => bucket.matches / bucket.likes
      ),
    };
  }

  getDefaultValue(): LikeStatisticResult {
    return {
      mostActiveWeekday: {
        weekday: "Monday",
        averageUsageTime: 0,
      },
      likesWithComment: 0,
      mostLikesOnOneProfile: {
        likes: 0,
        match: false,
      },
      timeSpentLikingProfiles: 0,
      successRateByPositionInDay: [],
    };
  }
}
