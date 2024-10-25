require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const expenseRoutes = require('./routes/expenses')
const userRoutes = require('./routes/user')

//Express App
const app = express()

//Middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//Routes
app.use('/expenses',expenseRoutes)
app.use('/user',userRoutes)

//Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(()=> {
        //Listening to requests.
        app.listen(process.env.PORT, () => {
            console.log('BudgetBuddy is connected to the database and listening on port', process.env.PORT)
        })
    }).catch((error) => {
        console.log('ERROR LOCATION: server.js DATABASE CONNECTION SECTION\n', error)
    })