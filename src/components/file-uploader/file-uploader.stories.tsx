import type { Meta, StoryObj } from "@storybook/react";
import { FileUploader } from ".";

const meta: Meta<typeof FileUploader> = {
  title: "Components/FileUploader",
  component: FileUploader,
  // impacted by bug in Storybook V7 and their migration to react-codegen
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof FileUploader>;

export const Default: Story = {
  args: {
    files: [],
  },
};

export const With1File: Story = {
  args: {
    files: [new File([""], "example.txt")],
  },
};

export const WithManyFiles: Story = {
  args: {
    files: [new File([""], "example.txt"), new File([""], "example2.txt")],
  },
};

export const WithErrorMessage: Story = {
  args: {
    files: [],
    errorMessage: "An error occurred",
  },
};

export const Loading: Story = {
  args: {
    files: [],
    loading: true,
  },
};
