import React from 'react';

type PillButtonVariant = 'filled-accent' | 'filled-dark' | 'outlined';

interface PillButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PillButtonVariant;
  trailingArrow?: boolean;
  children: React.ReactNode;
}

/**
 * PillButton
 *
 * Reusable button with 24px border-radius
 *
 * Variants:
 *  - filled-accent  → white text on accent red (#C4463A)   — e.g. Save Recipe
 *  - filled-dark    → off-white text on dark (#2C2824)     — e.g. Generate Recipes
 *  - outlined       → dark text, transparent bg, border    — e.g. Show Me Another
 */
export default function PillButton({
  variant = 'outlined',
  trailingArrow = false,
  children,
  className = '',
  disabled,
  ...rest
}: PillButtonProps) {
  const base =
    "relative inline-flex items-center justify-center gap-2 " +
    "font-body text-[13px] font-[500] tracking-[0.12em] uppercase " +
    "px-6 py-3 transition-all duration-300 ease-in-out " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
    "disabled:opacity-40 disabled:cursor-not-allowed ";

  const radius = "rounded-[24px]";

  const variants: Record<PillButtonVariant, string> = {
    'filled-accent':
      "bg-accent text-card-bg border border-accent " +
      "hover:brightness-90 active:brightness-75",
    'filled-dark':
      "bg-text text-card-bg border border-text " +
      "hover:bg-[#1a1612] active:bg-[#0e0c0a]",
    'outlined':
      "bg-transparent text-text border border-border " +
      "hover:border-accent hover:text-accent active:bg-accent-soft",
  };

  return (
    <button
      className={[base, radius, variants[variant], className].join(' ')}
      disabled={disabled}
      {...rest}
    >
      {children}
      {trailingArrow && (
        <span aria-hidden="true" className="text-[16px] leading-none transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </button>
  );
}