const id = document.querySelector("#id");
const product = document.querySelector("#product");
const pack = document.querySelector("#pack");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const productList = document.querySelector("#product_list");
const productOrder = document.querySelector("#product_order");

const orderList = [{ name: "Name", pack: "Pack", price: "Price" }];

const DisplayProductOrder = () => {
	productOrder.innerHTML = "";
	orderList.map((item) => {
		productOrder.innerHTML += `
		<ul>
	<li>${item.name}</li>
	<li>${item.pack}</li>
	<li>${item.price}</li>
		</ul>
		`;
	});
};

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
							class="select_quantity"
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
				if (e.target.className !== "select_quantity") {
					console.log(e);
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
					DisplayProductOrder();
				}
			});
		})
		.catch((error) => console.log("error", error));
});
