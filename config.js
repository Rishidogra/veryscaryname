const CONFIG = {
  // ── Recipient Info ────────────────────────────────────────────
  name: "",
  photo: "./img/irene.jpg",
  music: "./assets/music/song.mp3",

  // ── Theme Colors ──────────────────────────────────────────────
  colors: {
    primary: "#f472b6",
    accent: "#60a5fa",
    dark: {
      background: "#0f172a",
      text: "#f1f5f9",
    },
    light: {
      background: "#fafaf9",
      text: "#1e293b",
    },
  },

  // ── Default Color Mode ────────────────────────────────────────
  defaultMode: "dark",

  // ── Sections ──────────────────────────────────────────────────
  sections: [
    // INTRO - Fake College Project Loading (EXISTING - KEEP)
    {
      type: "intro",
    },

    // STORY - Chatbox with the main message (EXISTING - KEEP)
    {
      type: "chatbox",
      message:
        "Hey, Parika ❤️\n\nI know long distance hasn't always been easy. We've already made it through almost 70% of it, and honestly... it's been one crazy roller coaster. But through every up and down, we've always had each other's backs, and I know we'll keep doing that.\n\nI wish I could've handed you a gift in person, but since I couldn't... I decided to build you something instead.\n\nIt's nothing huge, just a little adventure made with a lot of love.\n\nI really hope you like it. ❤️",
      buttonText: "Continue",
    },

    // STORY - Ideas section with dialogue blocks (EXISTING - KEEP)
    {
      type: "ideas",
      lines: [
        "I thought... should I just text you like everyone else will?",
        "Nah... you're a little too special for just another birthday text.",
        "So I spent the last few hours making this little adventure just for you.",
        "I know long distance hasn't always been easy.",
        "But we've made it this far together.",
        "And I know we'll keep making many more memories.",
        "I wish I could hand you a birthday gift in person.",
        "Since I couldn't... I made you this instead.",
        "I hope it makes you smile.",
      ],
    },

    // ENVELOPE - Animated envelope (EXISTING - KEEP)
    {
      type: "envelope",
      previewText: "Before this day ends... there's something I wanted to share with you..",
      promptText: "When you're ready... Open it.",
    },

    // MEMORY PAGE - Single page with 4 memory cards (NEW)
    {
      type: "memoryPage",
      memories: [
        {
          photo: "./assets/photos/PHOTO_PLACEHOLDER_1.jpeg",
          text: "our first date",
        },
        {
          photo: "./assets/photos/PHOTO_PLACEHOLDER_2.jpeg",
          text: "conference nights..",
        },
        {
          photo: "./assets/photos/PHOTO_PLACEHOLDER_3.jpeg",
          text: "chatpati downtown dates",
        },
        {
          photo: "./assets/photos/PHOTO_PLACEHOLDER_4.jpeg",
          text: "Our frist kiss",
        },
      ],
    },

    // VIDEO CAROUSEL - 3 videos with user-controlled progression
    {
      type: "videoCarousel",
      introText: "One more thing...",
      videos: [
        "./assets/video/friends_video_1.mp4",
        "./assets/video/friends_video_2.mp4",
        "./assets/video/friends_video_3.mp4",
      ],
    },

    // MOON ENDING (EXISTING - KEEP)
    {
      type: "moon",
      line1: "I don't know where life will take us.",
      line2: "But...",
      line3: "If I had to choose again...",
      line4: "I'd still choose you.",
      line5: "Again.",
      line6: "Again.",
      line7: "And again.",
    },

    // FINAL P.S. (EXISTING - KEEP)
    {
      type: "closing",
      text: "P.S.\nYou actually did help me\ntest my \"college project.\"\nLooks like...\nit works perfectly. ❤️",
      replayText: "Watch Again ❤️",
    },
  ],
};