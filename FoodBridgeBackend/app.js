const express= require('express')
require('./app/db')

const userRouter = require('./app/routes/user')
const foodRouter = require('./app/routes/food')

const app= express()
app.use(express.json())

app.get('/', (request, response) => {response.json('welcome')})
app.use(userRouter)
app.use(foodRouter)


//replace 192.168.1.3 with your ip address
app.listen(3000,'192.168.8.107',()=> console.log('listening to port 3000') )