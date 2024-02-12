const Contact = require('../models/contact-model')

const contactForm = async(req,res)=>{
   try {
      const Response = req.body;
      await Contact.create(Response);
      res.status(200).json({message:"Message delivered successfully"});
   } catch (error) {
    res.status(500).json({message:"Message not delivered"});
   }
}

module.exports = contactForm;