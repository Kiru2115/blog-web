import { render, screen } from "@testing-library/react";
import SiteFooter from "./SiteFooter";

describe("<SiteFooter />", () => {
  describe("when it is rendered with a name and a year", () => {
    it("shows the copyright line", () => {
      render(<SiteFooter name="Alan Maroń" year={2026} />);

      expect(screen.getByRole("contentinfo")).toHaveTextContent(
        "© 2026 Alan Maroń · Built with React, Vite and Tailwind CSS",
      );
    });
  });
});
