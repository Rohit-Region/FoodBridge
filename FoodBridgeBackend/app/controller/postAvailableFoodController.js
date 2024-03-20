require('dotenv').config()
const DBconnection = require('../db')
const connection = DBconnection
const userController = require('../controller/userController')

const createPost = async (post) => {
    try {
        const updateCols = Object.keys(post)
        let cols = []
        let values = []
        updateCols.forEach((data,index)=>{
            cols.push(`$${index + 1}`)
            values.push(post[data])
        })
        const wrappedInQuotes = updateCols.map(date => `"${date}"`);
        const withCommasInBetween = wrappedInQuotes.join(',')
        const newPost = await connection.query(`insert into public.posttable (${withCommasInBetween}) values (${cols.join()}) returning *`, values)
        return newPost.rows[0]
    } catch (error) {
        res.status(400).json({status : 400, message : `error occured ${error}`})
    }
}

const createFoodItems = async (foodItems) => {
    try {
        const updateCols = Object.keys(foodItems[0])
        let index = 0
        let temp = []
        foodItems.forEach(item=>{
            let val = []
            updateCols.forEach(data=>{
                if(typeof item[data] != "number"){
                    val.push(`'${(item[data])}'`)
                }
                else{
                    val.push(item[data])
                }
                index++;
            })
            temp.push(`(${val.join()})`)
        })
        const wrappedInQuotes = updateCols.map(date => `"${date}"`);
        const withCommasInBetween = wrappedInQuotes.join(',')
        const respond = await connection.query(`insert into public.foodtable (${withCommasInBetween}) values ${temp.join()} returning *`, [])
        return respond.rowCount == 0 ? false : true
    } catch (error) {
        console.log(error);
        res.status(400).json({status : 400, message : `error occured ${error}`})
    }
}

const getFoodItems = async (postId) => {
    try {
        const respond = await connection.query(`select * from public.foodtable where "postId"=$1`, [postId])
        return respond.rows
    } catch (error) {
        console.log(error);
        res.status(400).json({status : 400, message : `error occured ${error}`})
    }
}

const getFoodpost = async (userID) => {
    try {
        let query = `SELECT a."userID", a."postId",a."restaurantName",a."typeOfFood",a."noOfPersons",a."phoneNumber",a."postTime",a."availableTime",d.*,
        (select b."userName" from public.user1 b where b."userID" = a."userID") as userName,
        (select array_agg((c."restaurantName", c."addressLine1",c."addressLine2",c."city",c."state",c."pincode")) as address from public.address c 
         where c."addressId" = a."addressId")
        FROM public.posttable a
        inner join public.foodtable d on d."postId" = a."postId"`
        if(userID){
            query = `${query} where a."userID" = ${userID}` 
        }
        const respond = await connection.query(query, [])
        let array = []
        if(respond.rowCount > 0){
            respond.rows.forEach(x=>{
                let food = {
                    "foodId": x.foodId,
                    "foodName": x.foodName,
                    "foodQuantity": x.foodQuantity,
                    "expiresIn":x.expiresIn
                }
                let i = array.findIndex(p=>p.postId == x.postId)
                if(i == -1){
                    delete x.foodId
                    delete x.foodName
                    delete x.foodQuantity
                    delete x.expiresIn
                    x.address = x.address.replace(/["{}()\\/]/g, "");
                    let obj = {
                        ...x,
                        foodList:[food]
                    }
                    array.push(obj)
                }else{
                    array[i].foodList.push(food)
                }
            })
        }
        return array
    } catch (error) {
        res.status(400).json({status : 400, message : `error occured ${error}`})
    }
}

module.exports = {
    createPost,
    createFoodItems,
    getFoodItems,
    getFoodpost
}