import Statistic from "./Statistic";

export type MessageStatisticResult = {
  avgMessageLength: number;
  mostUsedEmoji: {
    emoji: string;
    count: number;
  };

  // Average message length over the time of a chat
  messageLengthOverTime: number[];

  mostUsedFirstMessage: {
    text: string;
    count: number;
  } | null;

  uniqueWords: number;
};

export default class MessageStatistic extends Statistic<MessageStatisticResult> {
  name = "MessageStatistic";
  calculateResult(): MessageStatisticResult {
    let totalMessages = 0;
    let totalMessagesLength = 0;
    let emojiMap: Map<string, number> = new Map<string, number>();
    let uniqueWords: Set<string> = new Set<string>();

    const messageLengths: { totalLength: number; messages: number }[] = [];
    const firstMessages = new Map<string, number>();
    for (const match of this.wrapped.userData.matches) {
      if (!match.chats) {
        continue;
      }

      for (const chatIndex in match.chats) {
        const chat = match.chats[chatIndex];
        if (!chat.body) {
          continue;
        }

        if (chatIndex === "0") {
          if (firstMessages.has(chat.body)) {
            firstMessages.set(chat.body, firstMessages.get(chat.body)! + 1);
          } else {
            firstMessages.set(chat.body, 1);
          }
        }

        if (!messageLengths[chatIndex]) {
          messageLengths[chatIndex] = {
            totalLength: 0,
            messages: 0,
          };
        }

        messageLengths[chatIndex].totalLength += chat.body.length;
        messageLengths[chatIndex].messages++;
      }
    }

    const messages = this.wrapped.userData.matches.flatMap(
      (match) => match.chats
    );
    if (!messages) {
      return this.getDefaultValue();
    }

    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];

      if (!message?.body) {
        continue;
      }

      totalMessages++;
      totalMessagesLength += message.body.length ?? 0;

      const emojis = this.extractEmojis(message.body);
      emojis.forEach((emoji) => {
        if (emojiMap.has(emoji)) {
          emojiMap.set(emoji, emojiMap.get(emoji)! + 1);
        } else {
          emojiMap.set(emoji, 1);
        }
      });

      const words = /(\w+)/g.exec(message.body);
      if (words) {
        words.forEach((word) => {
          uniqueWords.add(word);
        });
      }
    }

    const avgMessageLength = totalMessagesLength / totalMessages;
    const mostUsedEmoji = this.getMostUsedEmoji(emojiMap);

    return {
      avgMessageLength,
      mostUsedEmoji,
      messageLengthOverTime: messageLengths.map(
        (m) => m.totalLength / m.messages
      ),
      mostUsedFirstMessage: this.getMostUsedFirstMessage(firstMessages),
      uniqueWords: uniqueWords.size,
    };
  }

  getDefaultValue(): MessageStatisticResult {
    return {
      avgMessageLength: 0,
      mostUsedEmoji: {
        emoji: "",
        count: 0,
      },
      messageLengthOverTime: [],
      mostUsedFirstMessage: null,
      uniqueWords: 0,
    };
  }

  private extractEmojis(text: string): string[] {
    const emojiRegex = /[\uD83C-\uDBFF\uDC00-\uDFFF]+/g;
    return text.match(emojiRegex) ?? [];
  }

  private getMostUsedEmoji(emojiMap: Map<string, number>) {
    let maxEmoji = "";
    let maxEmojiCount = 0;
    emojiMap.forEach((count, emoji) => {
      if (count > maxEmojiCount) {
        maxEmoji = emoji;
        maxEmojiCount = count;
      }
    });
    return {
      emoji: maxEmoji,
      count: maxEmojiCount,
    };
  }

  private getMostUsedFirstMessage(firstMessages: Map<string, number>) {
    let maxMessage = "";
    let maxMessageCount = 0;
    firstMessages.forEach((count, message) => {
      if (count > maxMessageCount && count > 1) {
        maxMessage = message;
        maxMessageCount = count;
      }
    });

    if (maxMessageCount === 0) {
      return null;
    }

    return {
      text: maxMessage,
      count: maxMessageCount,
    };
  }
}
