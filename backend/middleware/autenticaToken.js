// middleware/autenticaToken.js

const jwt = require('jsonwebtoken');

// Middleware de Autenticação
function verificaAutenticacao(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Token ausente ou inválido' });
        
    }

    const token = authorizationHeader.split(' ')[1];
   

    if (!token) {
        return res.status(401).json({ error: 'Token ausente' });
        
    }

    try {
        const decoded = jwt.verify(token, 'your-secret-key');
        req.usuario = {
            id: decoded.id,
            nome: decoded.email,
            role: decoded.role
        };

        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido' });
    }
}

module.exports = verificaAutenticacao;

