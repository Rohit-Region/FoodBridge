require('dotenv').config()
const DBconnection = require('../db')
const connection = DBconnection

const createUser = async (user) => {
    try {
        const updateCols = Object.keys(user)
        let cols = []
        let values = []
        updateCols.forEach((data,index)=>{
            cols.push(`$${index + 1}`)
            values.push(user[data])
        })
        const wrappedInQuotes = updateCols.map(date => `"${date}"`);
        const withCommasInBetween = wrappedInQuotes.join(',')
        const newUser = await connection.query(`insert into public.user1 (${withCommasInBetween}) values (${cols.join()}) returning *`, values)
        return newUser.rows[0]
    } catch (error) {
        res.status(400).json({ status : 400, message : `error occured : ${error}`})
    }
}

const getUserByPhonenumber = async (phoneNumber) => {
    try {
        const user = await connection.query(`select * from public.user1 where "phoneNumber"=$1`, [phoneNumber])
        delete user.rows[0].password
        console.log(user.rows[0]);
        return user.rows[0]
    } catch (error) {
        res.status(400).json({ status : 400, message : `error occured : ${error}`})
    }
}

const getUserByPhonenumberWithPassword = async(phoneNumber) => {
    try {
        const user = await connection.query(`select * from public.user1 where "phoneNumber" =$1`, [phoneNumber])
        return user.rows[0]
    } catch (error) {
        res.status(400).json({status : 400, message : 'error occured '+error}) 
    }
}

const getUserById = async (userID) => {
    try {
        const user = await connection.query(`select * from public.user1 where "userID" =$1`, [userID])
        delete user.rows[0].password
        return user.rows[0]
    } catch (error) {
        res.status(400).json({status : 400, message : 'error occured '+error})
    }
}

const updateUser = async (values,where) => {
    try {
        const updateCols = Object.keys(values)
        const whereCols = Object.keys(where)
        const allowedUpdates = ['password', 'userName', 'token']
        const isValidOperation = updateCols.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }
        let colValues = []
        let query = "update public.user1 set "
        updateCols.forEach((col,index)=> {
            colValues.push(values[col])
            query = index == 0 ? `${query} "${col}" = $${index + 1}` : `${query}, "${col}" = $${index + 1}`
        })
        whereCols.forEach((col,index)=> {
            colValues.push(where[col])
            query = index == 0 ? `${query} WHERE "${col}" = $${updateCols.length + index + 1}` : `${query} AND "${col}" = $${updateCols.length + index + 1}`
        })

        const response = await connection.query(query,colValues)
        return response.rowCount == 0 ? false : true
    } catch (error) {
        res.status(400).json({ status : 400, message : `error occured : ${error}`})
    }
}

const deleteUser = async (userID) => {
    try {
        const result = await connection.query(`DELETE FROM public.user1 WHERE "userID" = $1`, [userID])
        return result
    } catch (error) {
        res.status(400).json({ status : 400, message : `error occured : ${error}`})
    }
}

const findUser = async(tableName,where) =>{
    try {
        const findCols = Object.keys(where)
        const allowedFind = ['phoneNumber', 'userID', 'token','addressId']
        const isValidOperation = findCols.every((find) => allowedFind.includes(find))
        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid search' })
        }
        let cols = []
        let values = []
        let query = `select * from public.${tableName} where `
        findCols.forEach((data,index) =>{
            query = query + `"${data}" = $${index+1}` 
            //cols.push(`$${index + 1}`)
            values.push(where[data])
        })
        // console.log(findCols);
        // const wrappedInQuotes = findCols.map(data => `"${data}"`)
        // const withCommasInBetween = wrappedInQuotes.join()
        // console.log(query,values);
        const user = await connection.query(query, values)
        if(findCols[0]== "addressId"){
            delete user.rows[0].addressId
            delete user.rows[0].userID
        }
        // console.log(user.rows[0]);
        return user.rows[0]
        
    } catch (error) {
        res.status(400).json({status : 400, error : error})
        
    }
    
}

module.exports = {
    createUser,
    getUserByPhonenumber,
    getUserById,
    updateUser,
    deleteUser,
    getUserByPhonenumberWithPassword,
    findUser
}