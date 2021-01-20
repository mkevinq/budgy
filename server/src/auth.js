const admin = require('firebase-admin');

// On Cloud Run, this should automatically be associated with the proper service acc
const app = admin.initializeApp();

module.exports = (req, res, next) => {
    const token = req.headers.authorization.split("Bearer ")[1];

    admin.auth().verifyIdToken(token)
    .then((decoded) => {
        if (decoded.email_verified === true) {
            req.user = decoded
            next();
        } else {
            res.status(401).json({
                message:"E-mail is not verified"
            })
        }
    })
    .catch((err) => {
        res.status(401).json({
            message: "Could not authenticate"
        })
    })
}
