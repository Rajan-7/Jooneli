const imageUploader = (req,res)=>{
    if(req.file.filename){
        res.status(201).json({
            Message:"Image Uploaded Successfully",
            url:req.file.filename
        })
    }else{
        res.status(500).json({
            Message:"Image wasn't uploaded",
        })
    }
}

module.exports = imageUploader