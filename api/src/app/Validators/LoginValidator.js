import yup from "../../config/yup.js";

export const logarValidacao = async(request, response, next) => {
    try {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            senha: yup.string().required()
        })

        await schema.validate(request.body, { abortEarly: false })
        return next()
    } catch (err) {
        return response.status(400).json({
            status: 'error',
            message: err.inner
        })
    }
}