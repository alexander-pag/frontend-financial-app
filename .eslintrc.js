module.exports = {
  extends: ["expo", "prettier"],
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": [
      "error",
      {
        singleQuote: false,
        parser: "flow",
        trailingComma: "all",
      },
    ],
  },
};
