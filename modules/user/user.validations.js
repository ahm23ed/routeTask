import joi from "joi";

export const signUp = {
    body: joi
    .object()
    .required()
    .keys({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi
            .string()
            .pattern(
            new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
            )
            .required(),
        cPassword: joi.string().valid(joi.ref("password")).required(),
        }),
    params: joi.object().required().keys({
    }),
};

    export const signIn = {
    body: joi
        .object()
        .required()
        .keys({
        email: joi
            .string()
            .email({ minDomainSegments: 1, tlds: { allow: ["com", "net", "edu"] } })
            .required()
            .messages({
                "any.required": "Email is Required",
                "string.empty": "not allowed to be empty",
                "string.base": "only string is allowed",
            }),
        password: joi
        .string()
        .pattern(
            new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        )
        .required(),
    }),
};

export const logOut = {
    headers: joi
    .object()
    .required()
    .keys({
        authorization: joi.string().required(),
    })
    
}


export const forgetPassword ={
    body: joi
    .object()
    .required()
    .keys({
        password: joi
        .string()
        .pattern(
        new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)
        )
        .required(),
        cPassword: joi.string().valid(joi.ref("password")).required(),
        code: joi.required()
        }),
    
}
