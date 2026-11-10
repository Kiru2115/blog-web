import type { Meta, StoryObj } from "@storybook/react-vite";

import castleAboveLake from "@/assets/images/castle-above-lake.jpg";
import greenMclarenDoorsOpen from "@/assets/images/green-mclaren-doors-open.jpg";
import mclarenWheel from "@/assets/images/mclaren-wheel.jpg";
import poppyInGrass from "@/assets/images/poppy-in-grass.jpg";
import PhotoGallery from "./PhotoGallery";

const FEATURED = {
  src: greenMclarenDoorsOpen,
  alt: "A green McLaren with its doors open",
  width: 1200,
  height: 901,
};

const meta = {
  title: "about-me/PhotoGallery",
  component: PhotoGallery,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  args: {
    id: "photos",
    title: "My photography",
    photos: [
      FEATURED,
      {
        src: castleAboveLake,
        alt: "A castle on a wooded hill above a lake",
        width: 918,
        height: 1173,
      },
      {
        src: poppyInGrass,
        alt: "A single red poppy hidden among tall green grass",
        width: 900,
        height: 1200,
      },
      {
        src: mclarenWheel,
        alt: "Close-up of a gold forged wheel on a green McLaren",
        width: 1200,
        height: 900,
      },
    ],
  },
} satisfies Meta<typeof PhotoGallery>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SinglePhoto: Story = {
  args: {
    photos: [FEATURED],
  },
};

export const Empty: Story = {
  args: {
    photos: [],
  },
};
