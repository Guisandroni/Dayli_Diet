/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "nunito-regular": ["NunitoSans_400Regular", "sans-serif"],
        "nunito-bold": ["NunitoSans_700Bold", "sans-serif"],
      },
      colors: {
        gray: {
          1: "#1b1d1e",
          2: "#333638",
          3: "#5c6265",
          4: "#b9bbbc",
          5: "#dddedf",
          6: "#eff0f0",
          7: "#fafafa",
        },
        red: {
          dark: "#bf3b44",

          mid: "#f3babd",

          light: "#f4e6e7",
        },
        green: {
          dark: "#639339",
          mid: "#cbe4b4",
          light: "#e5f0db",
        },
      },
    },
  },
  plugins: [],
};
