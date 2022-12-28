const jwt = require("jsonwebtoken")
const rbac = require("../rbac/rbac")

module.exports = (endPoint) => {
    return async (req, res, next) => {
        try {
            if (req.headers.authorization) {
                let bareToken = req.headers.authorization
                let token = bareToken.split(" ")[1]
                var decoded = jwt.verify(token, process.env.SECRET_KEY)
                const isAllowed = await rbac.can(decoded.role, endPoint)
                req.user = decoded
                if (isAllowed) {
                    next()
                }
                else {
                    res.status(401).json({ message: "Unauthorized Data" })
                }
            }
        } catch (error) {
            res.status(500).json({ message: "Something went wrong" })
        }

    }
}