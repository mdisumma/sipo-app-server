import express from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";
import { SERVICE_KEY, SUPABASE_URL } from "./src/api/apiKey.js";
import Product from "./src/products/product.js";
import Auth from "./src/auth/auth.js";

const server = express();
const port = 3001;

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(cors());
server.use(express.static("public"));
const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const database = supabase;
const products_table = "sipo_products";
const users_table = "sipo_users";
const orderBy = "id";

// GET products
// let { data, error } = await supabase
// 	.from(products_table)
// 	.select("*")
// 	.order(orderBy, { ascending: true });

//GET
server.get("/api", async (request, response) => {
	let { data, error } = await supabase
		.from(products_table)
		.select("*")
		.order(orderBy, { ascending: true });
	response.send(data);
});

//AUTH
Auth(server, database, users_table);

//PRODUCT
Product(server, "/", database, products_table);

server.listen(port, () => {
	console.log(`The server is listening on port ${port}.`);
});
