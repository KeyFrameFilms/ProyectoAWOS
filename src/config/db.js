// db.js
import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config({ path: "src/.env" });

console.log(`user: ${process.env.BD_USER} \n bd:${process.env.BD_NAME} \n password: ${process.env.BD_PASSWORD}`);

const db = new Sequelize(process.env.BD_NAME, process.env.BD_USER, process.env.BD_PASSWORD, {
    host: process.env.BD_HOST,
    port: process.env.BD_PORT,
    dialect: 'mysql',
    define: {
        timestamps: true,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
        operatorAliases: false
    }
});

export default db;


// import Sequelize from 'sequelize';

// const db_URL='mysql://c67jvngqzgyv6gqded3x:pscale_pw_CUWl9KobQCzNtSFxYFwVIJUlat5AhwjllpER3aqciFx@aws.connect.psdb.cloud/bd_keyframe'

// const db = new Sequelize(db_URL, {
//     dialect: 'mysql',
//     define: {
//         timestamps: true,
//     },
//     pool: {
//         max: 5,
//         min: 0,
//         acquire: 30000,
//         idle: 10000,
//         operatorAliases: false
//     },

//     dialectOptions: {
//         ssl: {
//             rejectUnauthorized: true,
//         },
//     },

// });


// export default db;