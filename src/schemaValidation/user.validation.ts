import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().min(3).max(20).required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),

  username: Joi.string().alphanum().min(3).max(10).required(),

  password: Joi.string()
    .pattern(new RegExp("^(?=.*\\d)(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$")) // Password must contain at least one capital letter, one special character and one number
    .required(),
});

export default schema;
