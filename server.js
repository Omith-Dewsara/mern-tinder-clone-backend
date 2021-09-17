import express from "express";
import mongoose from "mongoose";
import Cards from "./dbCards.js";
import Cors from "cors";

const app = express();
const port = process.env.PORT || 8000;
const connection_url = 'mongodb+srv://admin:test123@cluster0.lkdw7.mongodb.net/tinderdb?retryWrites=true&w=majority'

//middlewares
app.use(express.json());
app.use(Cors());

//db config 
mongoose.connect(connection_url)

app.get("/", (req, res) => {
	res.status(200).send("Hello world")
})

app.post("/tinder/cards", (req, res) => {
	const dbCard = req.body;

	Cards.create(dbCard, (err, data) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(201).send(data)
		}
	})
})

app.get("/tinder/cards", (req, res) => {
	Cards.find((err, data) => {
		if (err) {
			res.status(500).send(err)
		} else {
			res.status(200).send(data)
		}
	})
})

app.listen(port, () => console.log(`Server is up and running on PORT ${port}`));