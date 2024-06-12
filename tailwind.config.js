module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        CF4F3FA: "#F4F3FA",
        CECF0FF: "#ECF0FF",
        C99AAFF: "#99AAFF",
        C748BFF: "#748BFF",
        C8DBDFF: "#8DBDFF",
        CAF9FF3: "#AF9FF3",
        C333333: "#333333",
        CD9D9D9: "#D9D9D9",
      },
      animation: {
        shimmer: "shimmer 1.5s infinite linear",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "200%" },
          "100%": { backgroundPosition: "-200%" },
        },
      },
      backgroundImage: {
        "gradient-custom":
          "linear-gradient(to right, #D9D9D9 0%, #EDEEF1 50%, #D9D9D9 100%)",
      },
      backgroundSize: {
        custom: "300% 100%",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
