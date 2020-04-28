const { loginSchema, contactSchema, registrationSchema } =require('./schemas');

module.exports = {

  contactValidator: async (req, res, next) => {
    try {
      await contactSchema.validateAsync(req.body);
    }
    catch (error) {
      console.log(error)
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  },
  
  registrationValidator: async (req, res, next) => {
    try {
      await registrationSchema.validateAsync(req.body);
    }
    catch (error) {
      console.log(error)
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  },

  loginValidator: async (req, res, next) => {
    try {
      await loginSchema.validateAsync(req.body);
    }
    catch (error) {
      console.log(error)
      return res.status(400).json({error: error.details[0].message});
    }
    next();
  }

}

