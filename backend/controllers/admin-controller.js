const connectDb = require('../utils/db');

const getAllUser = async(req,res)=>{
    try {
      const conn = await connectDb();
      conn.query("SELECT * FROM users",(err,rows)=>{
        if(err){
         return res.status(500).json({message:"Internal server error"});
        }else{
         return res.status(200).json(rows);
        }
      })
    } catch (error) {
      console.log(error);
    }
}


module.exports = getAllUser