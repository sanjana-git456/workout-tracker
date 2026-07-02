const jwt = require('jsonwebtoken')
const protect = (req,res,next) => {
    const token = req.headers.authorization
    if (!token) {
        return res.status(401).json({ error: 'No token - access denied' })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch(err) {
        next(err)
    }
}

module.exports = protect