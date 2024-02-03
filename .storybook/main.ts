import type { StorybookConfig } from "@storybook/react-vite";

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  core: {
    builder: '@storybook/builder-vite',
  },
  docs: {
    autodocs: "tag",
  },
  typescript: {
    /**
     * Number of issue in v7 to v8 migration affecting autodocs and codegen:
     * - https://github.com/storybookjs/storybook/issues/25832
     * - https://github.com/storybookjs/storybook/issues/23084
     */
    reactDocgen: "react-docgen",
  }
};
export default config;
