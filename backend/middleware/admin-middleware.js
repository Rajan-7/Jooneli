const adminMiddleware = async(req,res,next)=>{
    try {
        const adminRole = req.user.isAdmin;
        if(adminRole === 'false'){
            res.status(403).json({message:"Access denied.User is not admin"});
        }else{
            next();
        }
        
    } catch (error) {
        console.log("From admin middleware:",error);
    }
}

module.exports = adminMiddleware