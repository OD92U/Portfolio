const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then(user => {
        if (user === null) {
            res.status(401).json({message: 'Identifiant/mot de passe incorrect'});
        } else {
            bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if (!valid) {
                    res.status(401).json({message: 'Identifiant/mot de passe incorrect'});
                } else {
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            '1yLOasgj7rQlcObSPsJxtdwpHJiIw152EvqGQl40hu03tU4HqVQbP4Tyca65soUh',
                            { expiresIn: '24h' }
                        )
                    })
                }
            })
        }

    })
    .catch(error => res.status(500).json({ error }));

};