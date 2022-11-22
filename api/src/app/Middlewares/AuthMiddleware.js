import jwt from 'jsonwebtoken';
import 'dotenv/config';

const Auth = (request, response, next) => {
    try {
        const { authorization } = request.headers;

        if (typeof authorization === 'undefined') {
            return response.status(401).json({
                status: "fail",
                data: {
                    message: "Você não está autorizado a acessar essa página."
                }
            })
        }

        const [, token] = authorization.split(" ");
        const auth = jwt.verify(token, process.env.JWT_SECRET);

        return next();

    } catch {
        return response.status(401).json({
            status: "fail",
            data: {
                message: "Você não está autorizado a acessar essa página."
            }
        });
    }
}

export default Auth;