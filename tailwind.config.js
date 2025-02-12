const colors = ['primary', 'success', 'warning', 'error'];
const badges = colors.map(color => `badge-${color}`);
const shadows = colors.map(color => `shadow-${color}`);

const safelist = [
    ...badges,
    ...shadows,
]


module.exports = {
    plugins: [require("@tailwindcss/typography"), require('daisyui')],
    daisyui: {
        themes: ["dark"],
    },
    safelist,
};
