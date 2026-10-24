export const results = [
  {
    year: "2026",
    title: "1st place — IEIIC International Embodied Intelligence Challenge",
    place: "Suzhou / Shanghai, China",
    text: "World win with Team RoboDog, alongside Leo Pichelbauer: a quadruped robot with LiDAR-based mapping & localization, planned-route navigation, and ML-based image recognition — developed from concept paper to competition under real-world conditions.",
    team: "RoboDog",
  },
  {
    year: "2026",
    title: "1st place — AEIC RoboDog Challenge",
    place: "Mödling, Austria",
    text: "National qualifier for the IEIIC finals, won ahead of HTL Mödling and HTL Karlstein.",
    team: "RoboDog",
  },
  {
    year: "2026",
    title: "Innovation Award 2025/26 — ecoplus Technopol Wiener Neustadt",
    place: "Wiener Neustadt, Austria",
    text: "Category “Innovation and Cooperation”, awarded for our HTL diploma thesis: a high-accuracy positioning system for dynamic construction environments.",
    team: "with Itmam Alam",
  },
  {
    year: "2026",
    title: "1st place, Silver Group multi-drone race — A2RL Season 2",
    place: "Abu Dhabi, UAE",
    text: "With flyby racing (TU Wien + robo4you) at UMEX. Every team flies identical quadcopters — no hardware modifications allowed — so the race is decided purely by software. Our late pivot to a reinforcement-learning controller took the drone from 2 m/s to roughly 20 m/s and won the Silver group.",
    team: "flyby racing",
  },
  {
    year: "2025",
    title: "3rd place overall — VEX AI World Championship",
    place: "Houston, USA",
    text: "World championship podium with Team Trinity on the VEX AI platform.",
    team: "Trinity",
  },
  {
    year: "2024",
    title: "3rd place overall — GCER World Championship Botball",
    place: "Charlotte, USA",
    text: "World championship in the Botball discipline; the team also took overall judges’ choice and outstanding programming awards. Recognized with a ministerial award for the result.",
    team: "Trinity",
  },
  {
    year: "2024",
    title: "1st place overall — ECER European Championship Botball",
    place: "Vienna, Austria",
    text: "European championship, including Best Paper and Outstanding Documentation awards.",
    team: "Trinity",
  },
  {
    year: "2023",
    title: "3rd place overall — ECER Open category",
    place: "Vienna, Austria",
    text: "First international podium, with Team Airolos.",
    team: "Airolos",
  },
];

export const projects = [
  {
    name: "nix",
    href: "https://github.com/AkosPapp/nix",
    tag: "Nix",
    text: "My multi-host NixOS monorepo. A modular service catalog turns enabling a service on any host into a one-line config change that wires up everything it needs — layered modules, users, profiles and hosts, sops-managed secrets, deployed with Hermes.",
  },
  {
    name: "Diploma thesis",
    href: null,
    tag: "ROS 2 · Rust",
    text: "High-accuracy positioning system for dynamic construction environments (UWB/IMU), written with Itmam Alam, graded sehr gut and awarded the Innovation Award 2025/26. Fully reproducible Nix devcontainers, paper written in Typst.",
  },
  {
    name: "flyby racing",
    href: "https://robo4you.at/teams/",
    tag: "Robotics team",
    text: "Autonomous drone racing — a team of TU Wien and robo4you students. I work on perception, state estimation, and RL-based control for identically-equipped racing quadcopters.",
  },
  {
    name: "nix_autobuild",
    href: "https://github.com/AkosPapp/nix_autobuild",
    tag: "Rust",
    text: "Watches the Nix store and automatically rebuilds and switches configurations when inputs change.",
  },
];

export const press = [
  {
    label: "IEIIC world win, Shanghai 2026",
    links: [
      { name: "NÖN", href: "https://www.noen.at/wr-neustadt/erfolgreich-htl-wiener-neustadt-holt-robodog-titel-in-china-a4256323" },
      { name: "Kurier", href: "https://kurier.at/chronik/niederoesterreich/roboter-robotik-htl-wiener-neustadt-chin-shanghai/403175744" },
      { name: "wn24", href: "https://www.wn24.at/wissen/htl-schueler-gewannen-robodog-wettbewerb-in-china-66427.html" },
      { name: "HTL Wr. Neustadt", href: "https://www.htlwrn.ac.at/robodog-titel-in-china/" },
      { name: "robo4you", href: "https://robo4you.at/posts/Robodog2026/" },
    ],
  },
  {
    label: "A2RL Abu Dhabi 2026",
    links: [
      { name: "TU Wien", href: "https://www.tuwien.at/tu-wien/aktuelles/news/news/flyby-gewinnt-internationales-multi-drohnen-rennen-in-abu-dhabi" },
      { name: "TU Wien Informatics", href: "https://informatics.tuwien.ac.at/news/3102" },
      { name: "Cybersecurity Center TU Wien", href: "https://cysec.wien/news/2026-01-21_a2rl_2026/" },
    ],
  },
  {
    label: "VEX AI Worlds 2025",
    links: [
      { name: "NÖN — WM-Podestplatz", href: "https://www.noen.at/wr-neustadt/erfolgreiche-schueler-robotikteam-der-htl-wiener-neustadt-holt-wm-podestplatz-477135714" },
    ],
  },
  {
    label: "Innovation Award 2025/26",
    links: [
      { name: "meinbezirk — Hightech-Visionäre", href: "https://www.meinbezirk.at/wiener-neustadt/c-wirtschaft/wiener-neustadt-feiert-ihre-hightech-visionaere-2026_a8583364" },
    ],
  },
  {
    label: "Profile feature (HU)",
    links: [
      { name: "neuroom.hu", href: "https://www.neuroom.hu/hu/becsujhelyi-sztorik/becsujhelyi-magyar-diak-a-vilag-robotikaelitjeben-hungarian-student-in-wiener-neustadt-among-the-worlds-robotics-elite.html" },
      { name: "video", href: "https://www.youtube.com/shorts/COWVl4aEacY" },
    ],
  },
];

export const skills = [
  { group: "Robotics & AI", text: "ROS · autonomous systems · reinforcement learning · perception & computer vision · LiDAR & UWB/IMU positioning · state estimation & control" },
  { group: "DevOps & Infra", text: "Linux · Docker · Git · CI/CD · Nix / NixOS (multi-host deployments)" },
  { group: "Languages", text: "C++ · Python · Rust · C# · Java · TypeScript" },
];

export const experience = [
  {
    period: "2023",
    role: "Intern — Mechatronics & Robotics",
    org: "TU Wien, Institute of Computer Engineering",
    text: "Development and automation of mechatronic systems; programming autonomous mobile robots with ROS, Python and C++ on Linux; simulation and commissioning.",
  },
];

export const nav = [
  { label: "Home", href: "/" },
  { label: "Competitions", href: "/competitions/" },
  { label: "Projects", href: "/projects/" },
  { label: "About", href: "/about/" },
];
