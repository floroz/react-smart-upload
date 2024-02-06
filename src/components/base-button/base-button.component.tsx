import clsx from "clsx";
import styles from "./base-button.module.css";

type BaseButtonVariant = "primary" | "secondary" | "tertiary";

type BaseButtonProps = {
  /**
   * The label of the button, to be added for accessibility when used as Icon Button.
   */
  label?: string;
  children: React.ReactNode;
  /**
   * The variant of the button
   */
  variant: BaseButtonVariant;
  disabled?: boolean;
  /**
   * Polymorphic prop to allow the button to be rendered as an anchor or a button
   */
  as?: React.ElementType;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  /**
   * If true, the button will take the full width of its parent
   * @default false
   */
  fullWidth?: boolean;
} & {
  [domAttribute: string]: unknown;
};

/**
 * This should use a `forwardRef` but due to the Storybook bug I want to keep a working example of the documentation Controls.
 */
const BaseButton = ({
  children,
  variant = "primary",
  disabled,
  fullWidth,
  leftIcon,
  rightIcon,
  label,
  as: Component = "button",
  ...domAttributes
}: BaseButtonProps) => {
  return (
    <Component
      {...(Component === "button" ? { type: "button" } : {})}
      disabled={disabled}
      {...domAttributes}
      className={clsx([styles.base, "with-focus"], {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.tertiary]: variant === "tertiary",
        [styles.fullWidth]: fullWidth,
        [styles.disabled]: disabled,
      })}
      aria-label={label}
    >
      {leftIcon && <span className={styles.leftIcon}>{leftIcon}</span>}
      {children}
      {rightIcon && <span className={styles.rightIcon}>{rightIcon}</span>}
    </Component>
  );
};

export default BaseButton;
