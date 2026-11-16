export interface Project {
  name: string;
  description: string;
  url: string;
  technologies: string[];
  /** An icon from src/assets/icons/, shown next to the project. */
  icon: string;
}

export interface ContactLink {
  label: string;
  url: string;
}

export interface HeroLink extends ContactLink {
  /** How the link looks: a console command or a camera shutter button. */
  variant: "terminal" | "shutter";
}

export interface Interest {
  label: string;
  /** An icon from src/assets/icons/, shown above the label. */
  icon: string;
}

export interface Achievement {
  text: string;
  badge?: string;
}

export interface Photo {
  src: string;
  alt: string;
  width: number;
  height: number;
}
