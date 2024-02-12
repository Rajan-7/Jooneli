const validate = (schema) => async (req, res, next) => {
  try {
    const parseBody = await schema.parseAsync(req.body);
    req.body = parseBody;
    next();
  } catch (err) {
    const status = "400";
    const message = "Fill the field properly";
    const moreDetails = err.errors[0].message;
    const error = {
      status,
      message,
      moreDetails,
    };
    // console.log(message);
    // res.status(400).json({ Message: message });
    next(error);
  }
};

module.exports = validate;
