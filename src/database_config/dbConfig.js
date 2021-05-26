/* //SSL permite cifrar el tráfico de datos entre dos servidores web protegiendo así la conexión
const fs = require("fs");

dbConfig = function () {
    const config = {
        user: 'admindb@database-app',
        host: 'database-app.postgres.database.azure.com',
        password: 'admin-db-2021',
        database: 'app-database-ap',
        ssl: {
            cert: fs.readFileSync("../BaltimoreCyberTrustRoot.crt.pem"), // Forzando la conección SSL
            rejectUnauthorized: true
        }
    };
    return config;
};

module.exports = dbConfig; */