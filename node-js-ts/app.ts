import express from "express";
import apiRouter from "./routes/index.js";

const PORT = process.env.PORT;

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", apiRouter);

export const startApp = () =>
	app.listen(PORT, () => {
		console.log(`⚙️ Server listening on PORT :${PORT}!!`);
	});
