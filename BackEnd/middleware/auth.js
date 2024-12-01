const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, '1yLOasgj7rQlcObSPsJxtdwpHJiIw152EvqGQl40hu03tU4HqVQbP4Tyca65soUh');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    next();

    } catch(error) {
        res.status(401).json({ error });
    }
}