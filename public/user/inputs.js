window.addEventListener("DOMContentLoaded", () => {
	const selectQuantity = document.querySelector("#select_quantity");
	console.log(selectQuantity);
	const addProduct = document.querySelector("#add_Product");
	console.log(addProduct);

	addProduct.addEventListener("click", (e) => {
		console.log(e);
	});
});
