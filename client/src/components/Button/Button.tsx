import { 
  type ButtonHTMLAttributes, 
  type AnchorHTMLAttributes, 
  type ReactNode 
} from "react";
import { Link } from "react-router-dom";
import styles from "./Button.module.scss"; 

type ButtonVariant = "primary" | "secondary" | "ghost" | "solid" | "outline" | "text";
type ButtonSize = "sm" | "md" | "lg";

type ButtonProps = (ButtonHTMLAttributes<HTMLButtonElement> & AnchorHTMLAttributes<HTMLAnchorElement>) & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: ReactNode;
  children?: ReactNode;
  iconPosition?: "left" | "right";
  to?: string; 
};

export const Button = ({
  variant = "primary",
  size = "md",
  icon,
  children,
  iconPosition = "left",
  className = "",
  href,
  to,
  ...props
}: ButtonProps) => {
  
  const content = (
    <>
      {icon && iconPosition === "left" && <span className={styles.icon}>{icon}</span>}
      {children && <span className={styles.text}>{children}</span>}
      {icon && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link
        to={to}
        className={`${styles.button} ${styles[variant] || styles.primary} ${styles[size] || styles.md} ${className}`}
        {...props}
      >
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={`${styles.button} ${styles[variant] || styles.primary} ${styles[size] || styles.md} ${className}`}
        {...props}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      className={`${styles.button} ${styles[variant] || styles.primary} ${styles[size] || styles.md} ${className}`}
      {...props}
    >
      {content}
    </button>
  );
};