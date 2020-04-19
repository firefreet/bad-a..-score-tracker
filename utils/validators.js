const contactSchema =require('./schemas');

const contactValidator = async (req, res, next) => {
  try {
    await contactSchema.validateAsync(req.body);
  }
  catch (error) {
    console.log(error)
    return res.status(400).json({error: error.details[0].message});
  }
  next();
}

module.exports = contactValidator;