export interface Project {
  name: string;
  description: string;
  url: string;
  technologies: string[];
}

export interface ContactLink {
  label: string;
  url: string;
}

export interface HeroLink extends ContactLink {
  isPrimary?: boolean;
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
