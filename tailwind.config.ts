import type { Config } from 'tailwindcss';

import { withUt } from 'uploadthing/tw';

function pxToRem(px: number) {
  return `${px / 16}rem`;
}

function range(start: number, end: number, step = 1) {
  const length = (end - start) / step + 1;
  return Array.from({ length }, (_, i) => start + i * step);
}

function applyRange(start: number, end: number, step = 1) {
  return range(start, end, step).reduce((acc: Record<string, string>, px) => {
    acc[`${px}pxr`] = pxToRem(px);
    return acc;
  }, {});
}

export default withUt({
  future: {
    // https://github.com/tailwindlabs/tailwindcss/pull/8394
    hoverOnlyWhenSupported: true,
  },
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        ...applyRange(0, 400, 2),
      },
      minHeight: {
        ...applyRange(0, 1000, 2),
      },
      maxHeight: {
        ...applyRange(0, 1000, 2),
      },
      minWidth: {
        ...applyRange(0, 1000, 2),
      },
      maxWidth: {
        ...applyRange(0, 1000, 2),
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        basic: 'hsl(var(--basic))',
        ['basic-500']: 'hsl(var(--basic-500))',
        ['background-primary']: 'hsl(var(--background-primary))',
        ['background-secondary']: 'hsl(var(--background-secondary))',
        ['background-modifier-accent']: 'hsl(var(--background-modifier-accent))',
        ['header-primary']: 'hsl(var(--header-primary))',
        ['brand-experiment-360']: 'hsl(var(--brand-experiment-360))',
        ['status-danger']: 'hsl(var(--status-danger))',
        ['button-danger-background']: 'hsl(var(--button-danger-background))',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        ...applyRange(0, 48, 2),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}) satisfies Config;
