
const errorMiddleware = (err,req,res,next)=>{
    const status = err.status || "422";
    const message = err.message || "Backend error";
    const moreDetails = err.moreDetails || "Error from backend";

    return res.status(status).json({message,moreDetails});
}

module.exports = errorMiddleware;