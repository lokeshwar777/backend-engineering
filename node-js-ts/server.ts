import { config } from "@dotenvx/dotenvx";
("@dotenvx/dotenvx/config");
import http from "node:http";

config({
	ignore: ["MISSING_ENV_FILE"],
});

const PORT = process.env.PORT;

const server = http.createServer();

server.listen(PORT, () => {
	console.log(`⚙️ Server listening on PORT :${PORT}!!`);
});
