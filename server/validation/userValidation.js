const Joi = require("joi");

const schema = Joi.object({
  userMail: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "se"] },
    })
    .required(),
  favImg: Joi.array().required(),
});

module.exports = { schema };
