const CONFIG = {
  // ── Recipient Info ────────────────────────────────────────────
  name: "",
  photo: "./img/irene.jpg",       // Place your photo in the img/ folder
  music: "./music/hbd.mpeg",      // Place your music in the music/ folder

  // ── Theme Colors ──────────────────────────────────────────────
  // A toggle button lets the viewer switch between dark & light mode.
  colors: {
    primary: "#f472b6",           // Main accent color (rose pink)
    accent: "#60a5fa",            // Secondary accent color (sky blue)
    dark: {
      background: "#0f172a",      // Slate 900
      text: "#f1f5f9",            // Slate 100
    },
    light: {
      background: "#fafaf9",      // Stone 50
      text: "#1e293b",            // Slate 800
    },
  },

  // ── Default Color Mode ────────────────────────────────────────
  // Options: "dark" or "light"
  defaultMode: "dark",

  // ── Sections ──────────────────────────────────────────────────
  // Add, remove, duplicate, or reorder as you wish!
  sections: [
    {
      type: "intro",
    },
    {
      type: "greeting",
      title: "Hello Reviewer 👋",
      subtitle: "Thank you for helping me test my college project.",
    },
    {
      type: "countdown",
      from: 3,                    // Countdown from this number
      goText: "🎉",              // Text shown after countdown ends
    },
    {
      type: "announcement",
      text: "Loading College Project...",
    },
    {
      type: "chatbox",
      message:
        "Hey, Parika ❤️\n\nI know long distance hasn't always been easy. We've already made it through almost 70% of it, and honestly... it's been one crazy roller coaster. But through every up and down, we've always had each other's backs, and I know we'll keep doing that.\n\nI wish I could've handed you a gift in person, but since I couldn't... I decided to build you something instead.\n\nIt's nothing huge, just a little adventure made with a lot of love.\n\nI really hope you like it. ❤️",
      buttonText: "Send",
    },
    {
      type: "ideas",
      lines: [
        "I thought... should I just text you like everyone else will?",
        "Nah... you're a little too special for just another birthday text.",
        "So I spent the last few hours making this little adventure instead.",
      ],
      bigLetters: "READY?",
    },
    {
      type: "stars",
      count: 40,
    },
    {
      type: "balloons",
      count: 25,
    },
    {
      type: "profile",
      wishTitle: "Happy Birthday ❤️",
      wishText:
        "Before you continue...\nI've hidden something.\nMy birthday letter.\nTo unlock it...\nCollect three pieces of my heart.",
    },
    {
      type: "fireworks",
      count: 24,
    },
    {
      type: "confetti",
      count: 9,
    },
    {
      type: "closing",
      text: "P.S.\nYou actually did help me\ntest my college project.\nLooks like...\nit works perfectly ❤️",
      replayText: "Watch Again ❤️",
    },
  ],
};