import jwt from 'jsonwebtoken'
import jwtSecret from '../config/jwt.mjs'
import Users from '../Model/users.mjs'

async function verifyToken(req, res, next) {

    const token = req.headers.authorization?.split(' ')[1]
    if (!token) {
        res.status(401).send({ message: "No access!" })
        return
    }

    try {
        const decoded = jwt.verify(token, jwtSecret)
        const tokenExist = await Users.findOne({ Token: token })

        if (!tokenExist) {
            res.status(401).send({ message: "Invalid Token!" })
            return
        }

        const user = await Users.findById(decoded._id)
        if (!user) {
           res.status(401).json({ message: "User not found" })
           return
        }
        req.user = user
        req.tokenToRemove = token
        next()


    }
    catch (e) {
        res.status(401).send({ message: "Invalid Token!" })
    }
}
export default verifyToken