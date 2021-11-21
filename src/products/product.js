//PRODUCT
const Product = (app, url, database, table) => {
	app
		.route(url)

		//POST
		.post(async (request, response) => {
			let { data, error } = await database.from(table).insert([request.body]);
			console.log(request.body);
		})

		//DELETE
		.delete(async (request, response) => {
			let { data, error } = await database
				.from(table)
				.delete()
				.match(request.body);
			console.log(request.body);
		})

		//PUT
		.put(async (request, response) => {
			console.log(request.body);
			let { data, error } = await database
				.from(table)
				.update({
					name: request.body.new_name,
					pack: request.body.new_pack,
					image: request.body.new_image,
					price: request.body.new_price,
				})
				.match({
					name: request.body.name,
					pack: request.body.pack,
					image: request.body.image,
					price: request.body.price,
				});
			console.log(data);
			console.log(error);
		});
};

export default Product;
