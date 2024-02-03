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
};

const BaseButton = ({
  children,
  variant = "primary",
  ...props
}: BaseButtonProps) => {
  return (
    <button
      type="button"
      {...props}
      className={clsx([styles.base, "with-focus"], {
        [styles.primary]: variant === "primary",
        [styles.secondary]: variant === "secondary",
        [styles.tertiary]: variant === "tertiary",
      })}
    >
      {children}
    </button>
  );
};

export default BaseButton;
