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

  age: Joi.number().integer().min(18).max(99).required().strict(),
});

export default schema;
