const id = document.querySelector("#id");
const product = document.querySelector("#product");
const pack = document.querySelector("#pack");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const productList = document.querySelector("#product_list");

const orderList = [];

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
						<p>Pack gr: ${item.pack}</p>
						<p>Price £: ${item.price}</p>
					</div>
					<div class="product_select">
						<input
							type="number"
							id="select_quantity"
							name="select_quantity"
							placeholder="0"
							
						/>

						<button
							type="button"
							value="add_Product"
							class="add_Button">
							add
						</button>
					</div>
				</div>
				`;
			});
			const addButton = document.querySelector("#product_list");
			console.log(addButton);
			const selectQuantity = document.querySelector("#select_quantity");
			addButton.addEventListener("click", (e) => {
				e.stopPropagation();
				e.preventDefault();
				console.log(selectQuantity);
				const productName = e.path[2].children[1].children[0].innerHTML;
				const productPack = e.path[2].children[1].children[1].innerHTML;
				const productPrice = e.path[2].children[1].children[2].innerHTML;

				const order = {
					name: productName,
					pack: productPack,
					price: productPrice,
				};
				console.log(order);
				orderList.push(order);
				console.log(orderList);
			});
		})
		.catch((error) => console.log("error", error));
});
