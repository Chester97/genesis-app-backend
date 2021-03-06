const Joi = require("@hapi/joi");

//REGISTER VALIDATION
const registerValidation = (data) => {
    const registerSchema = Joi.object({
        name: Joi.string().required().min(2),
        surname: Joi.string().required().min(2),
        login: Joi.string().required().min(3),
        password: Joi.string().required().min(4),
        email: Joi.string().min(7).email()
    });

    return registerSchema.validate(data);
}

//LOGIN VALIDATION
const loginValidation = (data) => {
    const loginSchema = Joi.object({
        login: Joi.string().required().min(3),
        password: Joi.string().required().min(4)
    });

    return loginSchema.validate(data);
}

//POSTS VALIDATION
const postsValidation = (data) => {
    const postsSchema = Joi.object({
        title: Joi.string().required().min(10).max(50),
        description: Joi.string().required().min(20).max(1000),
        authorName: Joi.string().required().min(3).max(50),
    });
    return postsSchema.validate(data);
}

//COMMENTS VALIDATION
const commentsValidation = (data) => {
    const commentsSchema = Joi.object({
        text: Joi.string().required().min(1).max(250),
        postId: Joi.string().required(),
    });
    return commentsSchema.validate(data);
}

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.postsValidation = postsValidation;
module.exports.commentsValidation = commentsValidation;