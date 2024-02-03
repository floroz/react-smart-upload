import type { Meta, StoryObj } from "@storybook/react";
import FilePicker from "./file-picker.component";

const meta: Meta<typeof FilePicker> = {
  title: "Components/FilePicker",
  component: FilePicker,
  // impacted by bug in Storybook V7 and their migration to react-codegen
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FilePicker>;

export const Default: Story = {
  args: {},
};

export const WithFiles: Story = {
  args: {
    files: [new File([""], "example.txt")],
  },
};

export const CustomPlaceholder: Story = {
  args: {
    placeholder: "Select a file...",
  },
};

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
  },
};

export const MultipleFiles: Story = {
  args: {
    multiple: true,
    files: [new File([""], "example.txt"), new File([""], "example2.txt")],
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const VeryLongFileName: Story = {
  args: {
    files: [
      new File([""], "example-very-long-file-name-that-is-very-long.txt"),
    ],
  },
  decorators: [
    (Story) => (
      <div style={{ width: "200px" }}>
        <Story />
      </div>
    ),
  ],
};
