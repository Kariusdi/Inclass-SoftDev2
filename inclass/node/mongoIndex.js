const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const dbConfig = require('./config/mongodb.config')
const Customer = require('./models/customer')

const cors = require('cors')
const app = express()

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

mongoose.Promise = global.Promise
mongoose.connect(dbConfig.url).then(() => {
    console.log('Connect to MongoDB')
    // Customer.deleteMany({}, (err) => {
    //     if(err){
    //         process.exit();
    //     }
    //     console.log('Remove Collection of Customers')
    //     initCustomer()
    // })
}).catch(err=>{
    console.log('Cannot Connect to MongoDB')
    process.exit()
})

app.use(cors())
require('./routes/customer.route')(app)

const server = app.listen(3000, ()=>{
    let port = server.address().port
    console.log('Run at http://localhost:%s', port)
})

function initCustomer(){
    let data = [
        {
            CustomerId: 1001,
            FullName: "Chonakan",
            Address: "Nonthaburi"
        },
        {
            CustomerId: 1002,
            FullName: "Pon",
            Address: "PathumThani"
        },
        {
            CustomerId: 1003,
            FullName: "Game",
            Address: "Bangkok"
        }
    ]
    
    for(let i=0; i<data.length; i++){
        const c = new Customer(data[i])
        c.save()
    }
    console.log("Create Customers data successfully")
}