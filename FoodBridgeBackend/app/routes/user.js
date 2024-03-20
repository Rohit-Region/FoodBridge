const express = require('express')
const auth = require('../controller/authController')
const userController = require('../controller/userController')
const addressController = require('../controller/addressController')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secretKey = process.env.token_secret

const router = express.Router()

router.post('/user/create', async(req, res) => {
    try {
        const { email, password, userName, restaurantName, phoneNumber, addressLine1, addressLine2, city, state, pincode, latitude, longitude } = req.body

        if (!phoneNumber || !password || !userName) {
            let error = ""
            if(!phoneNumber){error = "phone number"}
            if(!userName){error = error == ""?"user name":`${error} and user name`}
            if(!password){error = error == ""?"password":`${error} and password`}
            return res.status(400).send({ error: `${error} required!`})
        }

        if ((restaurantName || addressLine1 || city || state || pincode)&&(!restaurantName || !addressLine1 || !city || !state || !pincode)) {
            let error = ""
            if(!restaurantName){error = "restaurant name"}
            if(!addressLine1){error = error == ""?"address":`${error} and address`}
            if(!city){error = error == ""?"city":`${error} and city`}
            if(!state){error = error == ""?"state":`${error} and state`}
            if(!pincode){error = error == ""?"pincode":`${error} and pincode`}
            return res.status(400).send({ error: `${error} required!`})
        }

        if (password.length >= 4 && phoneNumber.toString().length == 10) {
           // console.log('coming for creation');
           // const user = await userController.getUserByPhonenumber(phoneNumber)
            // const user = await userController.getUserByPhonenumberWithPassword(phoneNumber)
            const user = await userController.findUser("user1", {phoneNumber})
            if (user) {
                res.status(400).json({ status: 400, message: 'user already exist' })
            } else {
                const hashedPassword = await bcrypt.hash(password, 10)
                const newUser = await userController.createUser({email:email,password:hashedPassword,userName:userName,phoneNumber:phoneNumber})
                if(newUser){
                    let message = 'new user created'
                    if(restaurantName){
                        console.log('coming for address creation');
                        const newAddress = await addressController.createAddress({userID:newUser.userID, restaurantName: restaurantName, addressLine1: addressLine1, addressLine2: addressLine2, city: city, state: state, pincode: pincode, latitude :latitude, longitude :longitude})
                        if(!newAddress){
                            message = message + " but address insert failed "
                        }else{
                            res.status(200).json({ status: 200, message: message, userName: newUser.userName })
                        }
                    }else{
                        res.status(200).json({ status: 200, message: message, userName: newUser.userName })
                    }
                }else{
                    res.status(400).json({ status: 400, message: `something went wrong!` })
                }
            }
        }
        else if (password.length < 4) res.status(400).json({ status: 400, message: 'password must be grater than four character' })
        else res.status(400).json({ status: 400, message: 'phone number must be 10 digits' })

    } catch (error) {
        console.log(error)
        res.status(400).json({ status: 400, message: `something went wrong ${JSON.stringify(error)}` })
    }
})

router.post('/user/login', async (req, res) => {
    try {
        const { phoneNumber, password } = req.body
        if (!phoneNumber || !password) {
            let error = ""
            if(!phoneNumber){error = "phone number"}
            if(!password){error = error == ""?"password":`${error} and password`}
            return res.status(400).send({ error: `${error} required!`})
        }
        if (password.length >= 4 && phoneNumber.toString().length == 10) {
            //const user = await userController.getUserByPhonenumberWithPassword(phoneNumber)
            const user = await userController.findUser("user1",{phoneNumber })
            if (!user) {
                res.status(400).json({ status: 400, message: 'user does not exist ' })
            } else {
                const compare = await bcrypt.compare(password, user.password)
                delete user.password
                if (compare) {
                    const token = await jwt.sign({ restaurantName: user.restaurantName }, secretKey)
                    user["token"] = token
                    const result = userController.updateUser({token:token},{userID:user.userID})
                    if(result){
                        res.status(200).json({ status: 200, message: 'logged in successfull', token: token, user: user })
                    }
                }
                else {
                    res.status(400).json({ status: 400, message: 'invalid password' })
                }
            }
        }
        else if (password.length < 4) res.status(400).json({ status: 400, message: 'password must be grater than four character' })
        else res.status(400).json({ status: 400, message: 'phone number must be 10 digits' })
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: `somrthing went wrong ${JSON.stringify(error)}` })
    }
})

router.get('/user',auth, async (req, res) => {
    try {
        res.status(200).json({ status: 200, data: req?.user })
    } catch (error) {
        res.status(404).json({ status : 404, message : `error occured : ${error}`})
    }
})

router.get('/user/address',auth, async (req, res) => {
    try {
        const addressess = await addressController.getAddressByUserId(req.user.userID)
        res.status(200).json({ status: 200, data: addressess })
    } catch (error) {
        res.status(404).json({ status : 404, message : `error occured :  ${error}`})
    }
})

router.post('/user/address',auth, async (req, res) => {
    try {
        const { restaurantName, addressLine1, addressLine2, city, state, pincode, latitude, longitude } = req.body
        if ((restaurantName || addressLine1 || city || state || pincode)&&(!restaurantName || !addressLine1 || !city || !state || !pincode)) {
            let error = ""
            if(!restaurantName){error = "restaurant name"}
            if(!addressLine1){error = error == ""?"address":`${error} and address`}
            if(!city){error = error == ""?"city":`${error} and city`}
            if(!state){error = error == ""?"state":`${error} and state`}
            if(!pincode){error = error == ""?"pincode":`${error} and pincode`}
            return res.status(400).send({ error: `${error} required!`})
        }
        const newAddress = await addressController.createAddress({userID:req.user.userID, restaurantName, addressLine1, addressLine2, city, state, pincode,latitude, longitude})
        if(newAddress){
            res.status(200).json({ status: 200, message: 'new address saved', data: newAddress })
        }else{
            res.status(400).json({ status: 400, message: `something went wrong!` })
        }
    } catch (error) {
        res.status(404).json({ status : 400, message : `error occured : ${error}`})
    }
})

router.delete('/users/address/:id',auth, async (req, res) => {
    const addressId = parseInt(req.params.id)
    const response = await addressController.deleteAddress(addressId,req.user.userID)
    if(response){
        res.status(200).json({ status: 200, message: `deleted sucessfully` })
    }else{
        res.status(400).json({ status: 400, message: `somrthing went wrong!` })
    }
})

router.get('/user/logout', auth, async (req,res)=>{
    try {
        const user = userController.getUserByPhonenumber(req.user.phoneNumber)
        const token = null
        user["token"] = token
        const result = userController.updateUser({token:token},{userID:req.user.userID})
        if(result){
            res.status(200).json({status :200, message : 'logged-out successfully'})
        }else{
            res.status(400).json({status : 400, message : `something went wrong`})
        }   
    } catch (error) {
        res.status(400).json({status : 400, message : `error occured : ${error}`})        
    }
})

module.exports = router