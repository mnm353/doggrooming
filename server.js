const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const massive = require("massive")
const session = require("express-session")
const controller = require("./server/controller")
require("dotenv").config()

const app = express()

massive(process.env.CONNECTION_STRING)
	.then(dbInstance => {
		app.set("db", dbInstance)
		console.log("db is connected")
	})
	.catch(err => {
		console.log("db not connected")
	})

app.use(cors())
app.use(bodyParser.json())

app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: true,
		saveUninitialized: true,
		cookie: { maxAge: 60000 }
	})
)

app.post("/api/register", authenticate.register)
app.post("/api/login", authenticate.login)

app.use((req, res, next) => {
	if (req.session.user) {
		next()
	} else {
		res.send({ success: false, isLoggedIn: false, err: "Please login in" })
	}
})

//routes
// app.post("/api/register", controller.register)
// app.post("/api/login", controller.login)

app.get("/api/products", product.getAll)
app.get("/api/products/:id", product.getProductById)

const port = process.env.PORT || 8065
app.listen(port, () => {
	console.log("Listening on port ${port}")
})
