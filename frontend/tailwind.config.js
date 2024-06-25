import flowbite from "flowbite-react/tailwind";
import tailwindScrollbar from 'tailwind-scrollbar';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        tiltneon: ["Tilt Neon"],
      },
      keyframes: {
        'text-reveal': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },

        'text-left-to-right': {
          '0%': { opacity: '0', transform: 'translateX(-100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },

        
      },
      animation: {
        'text-reveal': 'text-reveal 1s ease-out forwards',
        'text-left-to-right': 'text-left-to-right 1s ease-out forwards',
      },

      
    },
  },
  plugins: [
    flowbite.plugin(),
    tailwindScrollbar,
  ],
};
