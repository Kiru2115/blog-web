import appWindowIcon from "@/assets/icons/app-window.svg";
import bikeIcon from "@/assets/icons/bike.svg";
import cameraIcon from "@/assets/icons/camera.svg";
import gamepadIcon from "@/assets/icons/gamepad.svg";
import heartPulseIcon from "@/assets/icons/heart-pulse.svg";
import monitorIcon from "@/assets/icons/monitor.svg";
import planeIcon from "@/assets/icons/plane.svg";
import serverIcon from "@/assets/icons/server.svg";
import shieldCheckIcon from "@/assets/icons/shield-check.svg";
import castleAboveLake from "@/assets/images/castle-above-lake.jpg";
import fireBreather from "@/assets/images/fire-breather.jpg";
import greenMclarenDoorsOpen from "@/assets/images/green-mclaren-doors-open.jpg";
import lamborghiniInterior from "@/assets/images/lamborghini-interior.jpg";
import mclarenWheel from "@/assets/images/mclaren-wheel.jpg";
import mistyForest from "@/assets/images/misty-forest.jpg";
import poppyInGrass from "@/assets/images/poppy-in-grass.jpg";
/** import portrait from "@/assets/images/portrait.jpg"; */
import sunsetOverPlain from "@/assets/images/sunset-over-plain.jpg";
import type {
  Achievement,
  ContactLink,
  HeroLink,
  Interest,
  Photo,
  Project,
} from "@/types/about-me";

export const AUTHOR_NAME = "Alan Maroń";

export const AUTHOR_TAGLINE = "An IT enthusiast through and through.";

export const AUTHOR_PORTRAIT: Photo = {
  src: mistyForest,
  alt: "Portrait of Alan Maroń",
  width: 480,
  height: 480,
};

export const AUTHOR_BIO =
  "I'm Alan. I've been fascinated by technology since I was a kid: computers, phones and every other device I could get my hands on. I learn fast, I'm reliable, and I take part in every IT competition I can.";

export const GITHUB_URL = "https://github.com/Kiru2115";

export const PHOTOS_SECTION_ID = "photos";

export const HERO_LINKS: HeroLink[] = [
  { label: "GitHub", url: GITHUB_URL, variant: "terminal" },
  { label: "See my photos", url: `#${PHOTOS_SECTION_ID}`, variant: "shutter" },
];

export const INTERESTS: Interest[] = [
  { label: "Computer science", icon: monitorIcon },
  { label: "Cybersecurity", icon: shieldCheckIcon },
  { label: "Photography", icon: cameraIcon },
  { label: "All kinds of sport", icon: bikeIcon },
  { label: "Gaming", icon: gamepadIcon },
  { label: "Healthy lifestyle", icon: heartPulseIcon },
  { label: "Travel", icon: planeIcon },
];

export const ACHIEVEMENTS: Achievement[] = [
  {
    text: "CyberSkiller, a nationwide competition held at Kozminski University",
    badge: "Finalist",
  },
  { text: "Participant in the TeleInfoCup olympiad" },
  { text: "Took part in a hackathon in Opole (2025)" },
  { text: "Attended extracurricular cybersecurity classes" },
];

export const CURRENTLY_LEARNING: string[] = [
  "TypeScript",
  "React",
  "Nest.js",
  "Docker",
  "Git",
  "Linux",
];

export const PROJECTS: Project[] = [
  {
    name: "blog-api",
    description:
      "The back end of my blog: a REST API with Swagger documentation, running in Docker.",
    url: "https://github.com/Kiru2115/blog-api",
    technologies: ["Nest.js", "Prisma", "PostgreSQL", "Docker"],
    icon: serverIcon,
  },
  {
    name: "blog-web",
    description:
      "The front end of my blog, including the page you are reading.",
    url: "https://github.com/Kiru2115/blog-web",
    technologies: ["React", "Vite", "Tailwind CSS", "Playwright"],
    icon: appWindowIcon,
  },
];

export const CONTACT_LINKS: ContactLink[] = [
  { label: "GitHub", url: GITHUB_URL },
];

export const PHOTOS: Photo[] = [
  {
    src: greenMclarenDoorsOpen,
    alt: "A green McLaren with gold wheels and its doors open, parked on a town square",
    width: 1200,
    height: 901,
  },
  {
    src: fireBreather,
    alt: "A street performer breathing a huge ball of fire in an old town square, watched by a crowd",
    width: 677,
    height: 1200,
  },
  {
    src: poppyInGrass,
    alt: "A single red poppy hidden among tall green grass",
    width: 900,
    height: 1200,
  },
  {
    src: lamborghiniInterior,
    alt: "The steering wheel and dashboard of a Lamborghini, seen through the open door",
    width: 900,
    height: 1200,
  },
  {
    src: castleAboveLake,
    alt: "A castle on a wooded hill above a lake, with mountains and dramatic clouds behind it",
    width: 918,
    height: 1173,
  },
  {
    src: mclarenWheel,
    alt: "Close-up of a gold forged wheel and a green brake caliper on a green McLaren",
    width: 1200,
    height: 900,
  },
  {
    src: mistyForest,
    alt: "A misty, sunlit forest on a mountain slope, framed by bright green leaves",
    width: 876,
    height: 1110,
  },
  {
    src: sunsetOverPlain,
    alt: "A sunset over a wide plain, seen from a forested hill, with mountains on the horizon",
    width: 900,
    height: 1200,
  },
];
