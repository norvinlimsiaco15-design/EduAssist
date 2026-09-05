/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          50: '#EFF4FE',
          100: '#DCE7FD',
          400: '#60A5FA',
          500: '#3B7BF0',
          600: '#2563EB',
          700: '#1D4FC4',
          800: '#173E9B',
        },
        accent: {
          DEFAULT: '#F59E0B',
          50: '#FFF8EB',
          400: '#FBBF4A',
          500: '#F59E0B',
          600: '#D98408',
        },
        success: { DEFAULT: '#16A34A', 50: '#EDFBF2', 500: '#16A34A' },
        warning: { DEFAULT: '#D97706', 50: '#FFF8EB', 500: '#D97706' },
        surface: '#F8FAFC',
        ink: {
          900: '#0F172A',
          700: '#334155',
          500: '#64748B',
          300: '#CBD5E1',
        },
      },
      fontFamily: {
        display: ['"Sora"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        xl2: '20px',
        xl3: '24px',
      },
      boxShadow: {
        soft: '0 2px 8px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)',
        lift: '0 12px 32px rgba(37, 99, 235, 0.14)',
        glass: '0 8px 32px rgba(15, 23, 42, 0.10)',
      },
      backdropBlur: { xs: '2px' },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(12px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        floaty: { '0%,100%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-10px)' } },
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-out both',
        slideUp: 'slideUp 0.5s ease-out both',
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
