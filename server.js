import express from "express";
import cors from "cors";
import Routes from "./src/routes/routes.js";

const server = express();
const port = 3001;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.static("public"));

Routes();

server.listen(port, () => {
	console.log(`The server is listening on port ${port}.`);
});
