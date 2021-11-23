import express from "express";
import { createClient } from "@supabase/supabase-js";
import { SERVICE_KEY, SUPABASE_URL } from "../key/key.js";
import Api from "./api.js";
import Auth from "./auth.js";
import Product from "./product.js";

const supabase = createClient(SUPABASE_URL, SERVICE_KEY);

const server = express();

const products_table = "sipo_products";
const users_table = "sipo_users";
const orderBy = "name";

const Routes = () => {
	Api(server, supabase, products_table, orderBy);

	Auth(server, supabase, users_table);

	Product(server, supabase, products_table);
};

export default Routes;
