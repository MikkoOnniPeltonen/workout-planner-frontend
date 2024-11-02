/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: [
    "./index.html",
    "./src/**/*.{js, jsx}",
  ],
  theme: {
	extend: {},
  },
  plugins: [
  ],
}

module.exports = {
  theme: {
    extend: {
      rotate: {
        'y-180': '180deg',
      },
      TransformStyle: {
        'preserve-3d': 'preserve-3d',
      },
      perspective: {
        '1000': '1000px'
      },
      backfaceVisibility: {
        'hidden': 'hidden',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.rotate-y-180': {
          transform: 'rotateY(180deg)',
        },
        '.transform-style-preserve-3d': {
          transformStyle: 'preserve-3d',
        },
        '.backface-hidden': {
          backfaceVisibility: 'hidden',
        },
        '.perspective-1000': {
          perspective: '1000px',
        },
      })
    },
  ],
}