import { render, screen } from "@testing-library/react";
import type { Photo } from "@/types/about-me";
import PhotoGallery from "./PhotoGallery";

const PHOTOS: Photo[] = [
  { src: "/car.jpg", alt: "A green car", width: 1200, height: 900 },
  {
    src: "/castle.jpg",
    alt: "A castle above a lake",
    width: 900,
    height: 1200,
  },
  { src: "/forest.jpg", alt: "A misty forest", width: 900, height: 1200 },
];

describe("<PhotoGallery />", () => {
  describe("when it is rendered with a title and photos", () => {
    it("shows the title as a section heading", () => {
      render(<PhotoGallery title="My photography" photos={PHOTOS} />);

      expect(
        screen.getByRole("heading", { level: 2, name: "My photography" }),
      ).toBeInTheDocument();
    });

    it("shows every photo, in order, with its text alternative", () => {
      render(<PhotoGallery title="My photography" photos={PHOTOS} />);

      const images = screen.getAllByRole("img");

      expect(images.map((image) => image.getAttribute("alt"))).toEqual([
        "A green car",
        "A castle above a lake",
        "A misty forest",
      ]);
    });

    it("shows the first photo across the whole width", () => {
      render(<PhotoGallery title="My photography" photos={PHOTOS} />);

      const items = screen.getAllByRole("listitem");

      expect(items[0]).toHaveClass("[column-span:all]");
      expect(items[1]).toHaveClass("break-inside-avoid");
    });

    it("loads the photos lazily", () => {
      render(<PhotoGallery title="My photography" photos={PHOTOS} />);

      for (const image of screen.getAllByRole("img")) {
        expect(image).toHaveAttribute("loading", "lazy");
      }
    });
  });

  describe("when it is given an id", () => {
    it("can be linked to", () => {
      render(
        <PhotoGallery id="photos" title="My photography" photos={PHOTOS} />,
      );

      expect(screen.getByRole("region")).toHaveAttribute("id", "photos");
    });
  });

  describe("when there is only one photo", () => {
    it("shows it as the featured photo", () => {
      render(<PhotoGallery title="My photography" photos={[PHOTOS[0]]} />);

      expect(screen.getAllByRole("img")).toHaveLength(1);
      expect(screen.getByRole("listitem")).toHaveClass("[column-span:all]");
    });
  });

  describe("when there are no photos", () => {
    it("shows no images", () => {
      render(<PhotoGallery title="My photography" photos={[]} />);

      expect(screen.queryAllByRole("img")).toHaveLength(0);
    });
  });
});
