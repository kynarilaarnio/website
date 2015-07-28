// Config to be used on local dev environments

module.exports = {
    baseUrl: 'http://localhost',
    port: 9000,
    steamApiKey: process.env.KYNARILAARNIO_STEAM_API_KEY,
    secret: 'your very own secret string, change this!',
    adminCode: 'foobar1234',
    dbUser: 'kynarilaarnio',
    dbPass: 'kynarilaarnio',
    dbName: 'kynarilaarnio'
};
