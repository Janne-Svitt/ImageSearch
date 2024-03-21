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

// ----------------------------------

const schemaRemoveFav = Joi.object({
  userMail: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "se"] },
    })
    .required(),
  favImg: Joi.object({
    kind: Joi.string(),
    title: Joi.string(),
    htmlTitle: Joi.string(),
    link: Joi.string(),
    displayLink: Joi.string(),
  }).required(),
});

const schemaAddFav = Joi.object({
  userMail: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "se"] },
    })
    .required(),
  favImg: Joi.object({
    kind: Joi.string(),
    title: Joi.string(),
    htmlTitle: Joi.string(),
    link: Joi.string(),
    displayLink: Joi.string(),
  }).required(),
});

module.exports = { schema, schemaRemoveFav, schemaAddFav };
