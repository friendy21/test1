// src/components/common/Button/Button.tsx
import React from 'react';
import styles from './Button.module.css';

export type ButtonProps = {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  ariaLabel?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  disabled = false,
  type = 'button',
  onClick,
  className,
  ariaLabel,
  icon,
  iconPosition = 'left',
}) => {
  const buttonClasses = [
    styles.button,
    styles[`button-${variant}`],
    styles[`button-${size}`],
    fullWidth ? styles.fullWidth : '',
    disabled ? styles.disabled : '',
    icon ? styles.hasIcon : '',
    icon && iconPosition === 'right' ? styles.iconRight : '',
    className || '',
  ].filter(Boolean).join(' ');

  return (
    <button
      className={buttonClasses}
      type={type}
      disabled={disabled}
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {icon && iconPosition === 'left' && <span className={styles.icon}>{icon}</span>}
      <span className={styles.content}>{children}</span>
      {icon && iconPosition === 'right' && <span className={styles.icon}>{icon}</span>}
    </button>
  );
};

export default Button;