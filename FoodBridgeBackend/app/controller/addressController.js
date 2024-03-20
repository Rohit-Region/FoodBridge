require('dotenv').config()
const DBconnection = require('../db')
const connection = DBconnection

const createAddress = async (address) => {
    try {
        const updateCols = Object.keys(address)
        let cols = []
        let values = []
        updateCols.forEach((data,index)=>{
            cols.push(`$${index+1}`)
            values.push(address[data])
        })
        const wrappedInQuotes = updateCols.map(date => `"${date}"`);
        const withCommasInBetween = wrappedInQuotes.join(',')
        const result = await connection.query(`insert into public.address (${withCommasInBetween}) values (${cols.join()}) returning *`, values)
        // console.log(result.rows[0]);
        // return result.rowCount == 0 ? false : true
        return result.rows[0]
    } catch (error) {
        res.status(400).json({status : 400, message : `error occured ${error}`})        
    }
}

const getAddressByUserId = async (userID) => {
    try {
        const user = await connection.query(`select * from public.address where "userID" =$1`, [userID])
        return user.rows
    } catch (error) {
        res.status(400).json({status : 400, message : `error occured ${error}`})
    }
}

const deleteAddress = async (addressId,userID) => {
    try {
        const result = await connection.query(`DELETE FROM public.address WHERE "addressId" = $1 AND "userID" =$2`, [addressId,userID])
        return result.rowCount == 0 ? false : true
    } catch (error) {
        res.status(400).json({status : 400, message : `error occured ${error}`})
    }
}


module.exports = {
    createAddress,
    getAddressByUserId,
    deleteAddress
}