const express = require('express')
const app = express()

const worker = require('./worker.js')

app.get('/', (req, res) => {
    res.send("This is Index Page")
})

app.get('/about', (req, res) => {
    res.send("This is About Page")
})

app.get('/worker', (req, res) => {
    res.send(worker.Hello())
})

app.get('/index', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

app.get('*', (req, res) => {
    res.send("Error 404 : page not found")
})

app.listen(3000, () => {
    console.log("Start Server at port [3000]")
})
