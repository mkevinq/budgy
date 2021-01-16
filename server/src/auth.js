const admin = require('firebase-admin');

// On Cloud Run, this should automatically be associated with the proper service acc
const app = admin.initializeApp();

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split("Bearer ")[1];
        req.user = await admin.auth().verifyIdToken(token);
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Could not authenticate"
        })
    }
    next();
}
