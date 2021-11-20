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
									value="addButton"
									id="addButton"
								>
									add
								</button>
							</div>
				`;
			});
		})
		.catch((error) => console.log("error", error));
});
