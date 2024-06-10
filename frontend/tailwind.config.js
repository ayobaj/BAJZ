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
    },
  },
  plugins: [
    flowbite.plugin(),
    tailwindScrollbar,
  ],
};
