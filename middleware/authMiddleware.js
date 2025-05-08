const jwt = require("jsonwebtoken");

// Middlaware -> Autenticação
export function authenticate(req, res, next)  {
    // Capturando token da requisição
    const authHeader = req.headers.autorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            msg: "Token não fornecido"
        })
    }

    const [Bearer,token ] = authHeader.split(" ");
 
    try {
        req.user = jwt.verify(token, "palavra secreta");
        //Caso o token seja valido
        return next();  //prosseguir | siga com a req
    } catch (error) {
        // Token invalido ou mal formado
        return res.status(401).json({
            msg:"Tokwn inválido ou expirado."
        })
    }
}