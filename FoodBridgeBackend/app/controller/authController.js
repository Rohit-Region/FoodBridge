const { Jwt } = require('jwt-token')
const DBconnection = require('../db')
const userController = require('../controller/userController')
const connection = DBconnection

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        //const response = await connection.query(`select * from public.user1 where "token" =$1`, [token])
        const response = await userController.findUser("user1",{token})
        //const user = response.rows[0]
        const user = response
        if(user){
            delete user.password
            req['user'] = user
            next()
        }else{
            res.status(401).json({ error: 'Please authenticate.' })
        }
    } catch (error) {
        res.status(401).json({ status : 401, message : `error occured : ${error}`})
    }
}

module.exports = auth