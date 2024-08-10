export const extendTheme = {
  colors: {
    border: 'hsl(var(--border))',
    input: 'hsl(var(--input))',
    ring: 'hsl(var(--ring))',
    background: 'hsl(var(--background))',
    foreground: 'hsl(var(--foreground))',
    primary: {
      DEFAULT: 'hsl(var(--primary))',
      foreground: 'hsl(var(--primary-foreground))',
      text: 'hsl(var(--primary-text))',
      light: 'rgba(241, 244, 251, 1)',
    },
    secondary: {
      DEFAULT: 'hsl(var(--secondary))',
      foreground: 'hsl(var(--secondary-foreground))',
      text: 'rgba(107, 119, 127, 1)',
      light: 'rgba(241, 244, 251, 1)',
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
    gray: {
      DEFAULT: 'rgba(151, 151, 151, 1)',
    },
    neutral: {
      1: 'rgba(249, 249, 249, 1)',
    },
    blueLight: 'hsla(205, 100%, 57%, 1)',
    yellowDark: 'hsla(38, 92%, 50%, 1)',
    yellowLight: 'hsla(48, 96%, 89%, 1)',
    dark: {
      2: 'hsla(232, 71%, 11%, 1)',
      3: 'hsla(232, 68%, 14%, 1)',
      background: 'hsla(232, 78%, 10%, 1)',
    },
    text: {
      primary: 'hsla(208, 35%, 70%, 1)',
      secondary: 'hsla(207, 31%, 58%, 1)',
      dark: 'hsla(231, 100%, 96%, 1)',
      placeholder: 'hsla(215, 22%, 53%, 1)',
      primaryTextColor: 'hsla(208, 35%, 70%, 1)',
    },
    stroke: 'hsla(232, 57%, 22%, 1)',
    disabledBg: 'hsla(232, 58%, 22%, 1)',
    'dialog-overlay': 'hsla(0, 0%, 7%, 0.5)',
    error: 'hsla(0, 97%, 63%, 1)',
    success: 'hsla(165, 74%, 48%, 1)',
    another: {
      1: 'hsla(47, 100%, 48%, 0.1)',
      2: 'hsla(227, 71%, 13%, 1)',
      3: 'hsla(208, 13%, 45%, 1)',
      4: 'hsla(43, 89%, 57%, 0.1)',
      5: 'hsla(220, 9%, 46%, 1)',
      6: 'hsla(234, 89%, 57%, 0.1)',
      7: 'hsla(229, 75%, 35%, 0.2)',
      8: 'hsla(230, 74%, 48%, 1)',
      9: 'hsla(218, 11%, 65%, 1)',
      10: 'hsla(216, 100%, 51%, 1)',
    },
  },

  borderRadius: {
    lg: 'var(--radius)',
    md: 'calc(var(--radius) - 2px)',
    sm: 'calc(var(--radius) - 4px)',
  },

  zIndex: {
    dropdown: '1000',
    sticky: '1020',
    fixed: '1030',
    'modal-backdrop': '1040',
    modal: '1050',
    popover: '1060',
    tooltip: '1070',
  },

  keyframes: {
    'progress-bar': {
      '0%': { width: 0 },
      'var(--progress-value)': {
        width: 'var(--progress-value)',
      },
    },
  },

  animation: {
    'progress-bar': 'progress-bar 2s ease-out',
  },

  fontSize: {
    h3: ['2rem', { lineHeight: '2.5rem', fontWeight: 600 }],
    h6: ['1.25rem', { lineHeight: '1.5625rem', fontWeight: 600 }],
    body: ['1rem', { lineHeight: '1.625rem', fontWeight: 400 }],
    'h1/regular': ['2.5rem', { lineHeight: '2.5rem', fontWeight: 400 }],
    'h2/regular': ['2.25rem', { lineHeight: '2.5rem', fontWeight: 400 }],
    'h3/regular': ['2rem', { lineHeight: '2rem', fontWeight: 400 }],
    'h4/regular': ['30px', { lineHeight: '2.375rem', fontWeight: 500 }],
    'h6/regular': ['1.25rem', { lineHeight: '1.5rem', fontWeight: 500 }],
    'h3/medium': ['2rem', { lineHeight: '2.5rem', fontWeight: 600 }],
    'h6/lg': ['1.125rem', { lineHeight: '1.4063rem', fontWeight: 600 }],

    'heading-4': ['1.875rem', { lineHeight: '38px', fontWeight: 600 }],
    'heading-5': ['1.75rem', { lineHeight: '2.5rem', fontWeight: 500 }],
    'heading-6': ['1.5rem', { lineHeight: '1.875rem', fontWeight: 600 }],
    'body/small': ['0.875rem', { lineHeight: '1.375rem', fontWeight: 400 }],

    'body/regular': ['0.875rem', { lineHeight: '1.375rem', fontWeight: 400 }],
    'body-large/regular': ['1.125rem', { lineHeight: '1.625rem', fontWeight: 400 }],
    xxs: ['0.5rem', { lineHeight: '0.55rem', fontWeight: 400 }],
    xs: ['0.75rem', { lineHeight: '1.25rem', fontWeight: 400 }],

    // another
    'h5/regular': ['1rem', { lineHeight: '1.5rem', fontWeight: 400 }],
    'footnote/description': ['0.75rem', { lineHeight: '1.25rem', fontWeight: 400 }],
    'body/medium': ['0.875rem', { lineHeight: '1.375rem', fontWeight: 500 }],

    // extra small
    'body/extra/small/light': ['0.75rem', { lineHeight: '1.25rem', fontWeight: 300 }],
    'body/extra/small/regular': ['0.75rem', { lineHeight: '1.25rem', fontWeight: 400 }],
    'body/extra/small/medium': ['0.75rem', { lineHeight: '1.25rem', fontWeight: 500 }],
    // small
    'body/small/light': ['0.875rem', { lineHeight: '1.375rem', fontWeight: 300 }],
    'body/small/regular': ['0.875rem', { lineHeight: '1.375rem', fontWeight: 400 }],
    // medium
    'body/medium/light': ['1rem', { lineHeight: '1.5rem', fontWeight: 300 }],
    'body/medium/regular': ['1rem', { lineHeight: '1.5rem', fontWeight: 400 }],
    'body/medium/medium': ['1rem', { lineHeight: '1.5rem', fontWeight: 500 }],
    'body/medium/semibold': ['1rem', { lineHeight: '1.5rem', fontWeight: 600 }],
    'body/medium/bold': ['1rem', { lineHeight: '1.5rem', fontWeight: 700 }],
    // large
    'body/large/light': ['1.125rem', { lineHeight: '1.625rem', fontWeight: 300 }],
    'body/large/regular': ['1.125rem', { lineHeight: '1.625rem', fontWeight: 400 }],
    'body/large/medium': ['1.125rem', { lineHeight: '1.625rem', fontWeight: 500 }],
    'body/large/semibold': ['1.125rem', { lineHeight: '1.625rem', fontWeight: 600 }],
    'body/large/bold': ['1.125rem', { lineHeight: '1.625rem', fontWeight: 700 }],
    // heading
    'h1/bold': ['3.75rem', { lineHeight: '4.5rem', fontWeight: 700 }],
    'h2/bold': ['3rem', { lineHeight: '3.625rem', fontWeight: 700 }],
    'h3/bold': ['2.5rem', { lineHeight: '3rem', fontWeight: 700 }],
    'h4/bold': ['1.875rem', { lineHeight: '2.375rem', fontWeight: 700 }],
    'h5/semibold': ['1.75rem', { lineHeight: '2.5rem', fontWeight: 600 }],
    'h5/medium': ['1rem', { lineHeight: '1.5rem', fontWeight: 500 }],
    'h6/semibold': ['1.5rem', { lineHeight: '1.875rem', fontWeight: 600 }],
  },

  fontFamily: {
    'open-sans': 'var(--font-open-sans)',
    'anek-telugu': 'var(--font-anek-telugu)',
    'be-vietnam-pro': 'var(--font-be-vietnam-pro)',
  },

  container: {
    center: true,
    padding: {
      DEFAULT: '1rem',
      design: '2.4375rem',
    },
    screens: {
      // sm: '572px',
      // md: '768px',
      // lg: '992px',
      // xl: '1024px',
      design: '1440px',
    },
  },

  screens: {
    _design: '1439.98px',
    design: '1440px',
    design_: '1440.02px',
  },

  boxShadow: {
    'background-popover': '0px 4px 4px 0px rgba(0, 0, 0, 0.3)',
    'side-bar': '0px 10px 20px 0px hsla(220, 27%, 49%, 0.07)',
    tooltip: '0px 20px 20px 0px hsla(220, 71%, 7%, 0.4)',
  },

  backgroundImage: {
    'button-type-p2p': 'linear-gradient(169.51deg, #9E00FF 6.85%, #0059FF 94.12%)',
  },
}
