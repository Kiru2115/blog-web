import type { Preview } from "@storybook/react-vite";
import { createElement } from "react";

import "../src/index.css";

const preview: Preview = {
  // The site is dark, so every story shows its component on the page background.
  decorators: [
    (Story) =>
      createElement(
        "div",
        { className: "bg-gi-dark-primary p-6 text-gi-ash" },
        createElement(Story),
      ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
