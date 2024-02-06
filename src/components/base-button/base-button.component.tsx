import clsx from "clsx";
import styles from "./base-button.module.css";

type BaseButtonVariant = "primary" | "secondary" | "tertiary";

type BaseButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  children: React.ReactNode;
  /**
   * The variant of the button
   */
  variant: BaseButtonVariant;
  disabled?: boolean;
};

const BaseButton = ({
  children,
  variant = "primary",
  disabled,
  ...props
}: BaseButtonProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      {...props}
      className={clsx([styles.base, "with-focus"], {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.tertiary]: variant === "tertiary",
        [styles.disabled]: disabled,
      })}
    >
      {children}
    </button>
  );
};

export default BaseButton;
