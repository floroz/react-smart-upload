import { Meta, StoryObj } from "@storybook/react";
import BaseButton from "./base-button.component";

const meta: Meta<typeof BaseButton> = {
  title: "Components/BaseButton",
  component: BaseButton,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof BaseButton>;

export const Primary: Story = {
  args: {
    variant: "primary",
    children: "Click Me",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: "Click Me",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
    children: "Click Me",
  },
};
