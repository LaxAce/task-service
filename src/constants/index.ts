const constants = {
    port: process.env.PORT || 2024,
    mailServer: {
        pass: process.env.PASS,
        user: process.env.USER_ID,
        service: process.env.SERVICE,
    },
    colorsList: [
        '#49C4E5', // Todo
        '#8471F2', // Doing
        '#67E2AE', // Done
        '#00FFFF', // Aqua
        '#FFFF00', // Yellow
        '#C0C0C0', // Silver
        '#808080', // Gray
        '#800000', // Maroon
        '#FF00FF', // Fuchsia
        '#000080', // Navy
        '#808000', // Olive
        '#00FF00', // Lime
        '#008080'  // Teal
    ],
    clientUrl: process.env.CLIENT_BASE_URL
}

export const SALT_ROUNDS = 10;

export default constants;
