const mysql = require('mysql2');

const dbConfig = {
   host:process.env.DB_HOST,
   user:process.env.DB_USER,
   password:process.env.DB_PASSWORD,
   database:process.env.DB_NAME
}

async function connectDb(){
   return new Promise((resolve,reject)=>{
      const pool = mysql.createPool(dbConfig);
      pool.getConnection((err,conn)=>{
         if(err){
            console.log(`Problem Connecting Database ${err}`);
            reject(err);
            return;
         }else{
            console.log(`Connected To Database`);
            resolve(conn);
         }
      })
   })
}

module.exports = connectDb;