import { config } from "@dotenvx/dotenvx";
("@dotenvx/dotenvx/config");
import http from "node:http";

config({
	ignore: ["MISSING_ENV_FILE"],
});

const PORT = process.env.PORT;

const server = http.createServer();

// server.on("request", (req, res) => {
// 	console.log("request recieved", req);
// 	res.write("request written \n");
// 	res.end("end of response");
// });

// server.on("error", (err) => {
// 	console.log("error", err);
// });

server.listen(PORT, () => {
	console.log(`⚙️ Server listening on PORT :${PORT}!!`);
});
