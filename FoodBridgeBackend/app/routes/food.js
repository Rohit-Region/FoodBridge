const express = require('express')
const auth = require('../controller/authController')
const postAvailableFoodController = require('../controller/postAvailableFoodController')
const userController = require('../controller/userController')
const router = express.Router()

router.post('/food/postfood',auth,  async(req,res) => {
    try {
        const {restaurantName, typeOfFood, noOfPersons, phoneNumber, postTime, addressId, availableTime, foodList} = req.body
        if (!restaurantName || !typeOfFood || !noOfPersons || !phoneNumber || !postTime || !addressId || !availableTime) {
            let error = ""
            if(!restaurantName){error = "restaurantName"}
            if(!typeOfFood){error = error == ""?"typeOfFood":`${error} and typeOfFood`}
            if(!noOfPersons){error = error == ""?"noOfPersons":`${error} and noOfPersons`}
            if(!phoneNumber){error = error == ""?"phoneNumber":`${error} and phoneNumber`}
            if(!postTime){error = error == ""?"postTime":`${error} and postTime`}
            if(!addressId){error = error == ""?"addressId":`${error} and addressId`}
            if(!availableTime){error = error == ""?"availableTime":`${error} and availableTime`}
            return res.status(400).send({ error: `${error} required!`})
        }
        if(!foodList[0].foodName || !foodList[0].foodQuantity || !foodList[0].expiresIn){
            let error = ""
            if(!foodList[0].foodName){error = "foodName"}
            if(!foodList[0].foodQuantity){error = error == ""?"foodQuantity" :`${error} and foodQuantity`}
            if(!foodList[0].expiresIn){error = error == ""?"expiresIn" : `${error} and expiresIn`}
            return res.status(400).json({ error : `${error} required`})
        }
        const respond = await postAvailableFoodController.createPost({userID:req.user.userID,restaurantName,typeOfFood,noOfPersons,phoneNumber,postTime,addressId,availableTime})

        if(respond){
            let msg = 'post created successfully'
            if(foodList.length>0){
                foodList.map(data=> data['postId'] = respond.postId)
                const result = await postAvailableFoodController.createFoodItems(foodList)
                if(result){
                    const foodItems = await postAvailableFoodController.getFoodItems(respond.postId)
                    respond['foodList'] = foodItems
                }else{
                    msg = msg + " but food items creation failed "
                }
                res.status(200).json({ status: 200, message: msg, data: respond })
            }else{
                res.status(200).json({ status: 200, message: msg, data: respond })
            }
        }
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: `something went wrong ${JSON.stringify(error)}` })
    }
})

router.get('/food/postfood', auth ,async(req,res) => {
    try {
        const posts = await postAvailableFoodController.getFoodpost(req.user.userID)
        res.status(200).json({ status: 200, data: posts })
    } catch (error) {
        res.status(400).json({ status: 400, message: `something went wrong! ${JSON.stringify(error)}` })
    }
})

router.get('/food/allpost',  async(req,res) => {
    try {
        const posts = await postAvailableFoodController.getFoodpost()
        res.status(200).json({ status: 200, data: posts })
    } catch (error) {
        console.log(error);
        res.status(400).json({ status: 400, message: `something went wrong! ${JSON.stringify(error)}` })
    }
})

module.exports = router