require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const helmet = require("helmet")
const routes = require('./routes')

//middleware
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(helmet())

//routes
app.use('/v1', routes)

const port = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Server app listening at http://localhost:${port}`)
})