const id = document.querySelector("#id");
const product = document.querySelector("#product");
const pack = document.querySelector("#pack");
const image = document.querySelector("#image");
const price = document.querySelector("#price");
const productList = document.querySelector("#product_list");
const productOrder = document.querySelector("#product_order");

const orderList = [
	{
		name: "Name",
		number: "Item",
		unit: "Unit Gr",
		totUnit: "Tot Gr",
		price: "Price £",
		totPrice: "Tot £",
		trash: "",
	},
];

const DisplayProductOrder = () => {
	productOrder.innerHTML = "";
	orderList.map((item) => {
		productOrder.innerHTML += `
		<ul>
	<li class="product_name">${item.name}</li>
	<li>${item.number}</li>
	<li>${item.unit}</li>
	<li>${item.totUnit}</li>
	<li>${item.price}</li>
	<li>${item.totPrice}</li>
	<li class="trash"><button >${item.trash}</button></li>
	
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
				      <p>Unit Gr:</p>
						<p>${item.pack}</p>
						<p>Price £:</p>
						<p>${item.price}</p>
					</div>
					<div class="product_select">
						<input
							type="number"
							class="input_value"
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
			addButton.addEventListener("click", (e) => {
				if (e.target.className === "add_Button") {
					console.log(e);

					const productNumber = e.path[1].childNodes[1].value;
					console.log(productNumber);

					const productName = e.path[2].children[1].children[0].innerHTML;
					const productPack = e.path[2].children[1].children[2].innerHTML;
					const productPrice = e.path[2].children[1].children[4].innerHTML;

					const order = {
						name: productName,
						number: productNumber,
						unit: productPack,
						price: productPrice,
						totUnit: productPack * productNumber,
						price: productPrice,
						totPrice: productPrice * productNumber,
						trash: "<i class='far fa-trash-alt'></i>",
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
