const id = document.querySelector("#id");
const product = document.querySelector("#product");
const pack = document.querySelector("#pack");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const productList = document.querySelector("#product_list");
console.log(productList);
//DOM
window.addEventListener("DOMContentLoaded", () => {
	//DATA
	fetch("http://localhost:3001/api")
		.then((response) => response.json())
		.then((data) => {
			data.map((item) => {
				productList.innerHTML += `
				<div key=${item.image} class="product">
							<div class="product_image">
								<img src=${item.image} alt=${item.name} />
							</div>
							<div class="product_list">
						    <h3>${item.name}</h3>
				         <p>Unit Gr:</p>
						   <p>${item.pack}</p>
						   <p>Price £:</p>
						   <p>${item.price}</p>
					      </div>
							<div class="product_select">
							<button id="delete" type="delete" value="delete">delete</button>

							<button id="update" type="update" value="update">update</button>
							</div>
				`;
			});
		})
		.catch((error) => console.log("error", error));

	//SUBMIT
	const submitBt = document.querySelector("#submit");
	submitBt.addEventListener("click", (event) => {
		event.preventDefault();

		fetch("http://localhost:3001", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: id.value,
				name: product.value,
				pack: pack.value,
				image: image.value,
				price: price.value,
			}),
		})
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	});

	//DELETE
	const deleteBt = document.querySelector("#delete");
	deleteBt.addEventListener("click", (event) => {
		event.preventDefault();

		fetch("http://localhost:3001", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: id.value,
				name: product.value,
				pack: pack.value,
				image: image.value,
				price: price.value,
			}),
		})
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	});

	//PUT

	const updateBt = document.querySelector("#update");
	updateBt.addEventListener("click", (event) => {
		event.preventDefault();

		fetch("http://localhost:3001", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				id: id.value,
				name: product.value,
				pack: pack.value,
				image: image.value,
				price: price.value,
			}),
		})
			.then((response) => response.text())
			.then((result) => console.log(result))
			.catch((error) => console.log("error", error));
	});
});
