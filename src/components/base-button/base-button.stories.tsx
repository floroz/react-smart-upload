import { Meta, StoryObj } from "@storybook/react";
import BaseButton from "./base-button.component";
import { MdShoppingCart } from "react-icons/md";

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

export const Disabled: Story = {
  args: {
    variant: "primary",
    children: "Click Me",
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    variant: "primary",
    children: "Click Me",
    fullWidth: true,
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        Wrapping Container: 500px
        <Story />
      </div>
    ),
  ],
};

export const WithLeftIcon: Story = {
  args: {
    variant: "primary",
    children: "Click Me",
    leftIcon: <MdShoppingCart />,
  },
};

export const WithRightIcon: Story = {
  args: {
    variant: "primary",
    children: "Click Me",
    rightIcon: <MdShoppingCart />,
  },
};

export const AsAnchor: Story = {
  args: {
    variant: "primary",
    children: "Click Me",
    as: "a",
    href: "#",
  },
};

export const IconButton: Story = {
  args: {
    variant: "primary",
    label: "Shopping Cart",
    children: <MdShoppingCart />,
  },
};
