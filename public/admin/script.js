//DOM
window.addEventListener("DOMContentLoaded", () => {
	const product = document.querySelector("#product");
	const pack = document.querySelector("#pack");
	const image = document.querySelector("#image");
	const price = document.querySelector("#price");
	const productList = document.querySelector("#product_list");
	const submitBt = document.querySelector("#submit");

	//SUBMIT
	submitBt.addEventListener("click", (event) => {
		fetch("http://localhost:3001", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
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

	//DATA
	fetch("http://localhost:3001/api")
		.then((response) => response.json())
		.then((data) => {
			data.map((item) => {
				productList.innerHTML += `
				<div id="${item.name}" class="product">
							<div class="product_image">
								<img src="${item.image}" alt="${item.name}" />
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

			//DELETE
			const deleteBt = document.querySelector("#product_list");

			deleteBt.addEventListener("click", (e) => {
				if (e.target.value === "delete") {
					console.log(e.path[2].children[1].children[0].innerText);
					console.log(e.path[2].children[1].children[2].innerText);
					console.log(e.path[2].children[1].children[4].innerText);
					console.log(
						e.path[2].children[0].attributes[0].ownerElement.childNodes[1]
							.currentSrc
					);

					fetch("http://localhost:3001", {
						method: "DELETE",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: e.path[2].children[1].children[0].innerText,
							pack: e.path[2].children[1].children[2].innerText,
							image:
								e.path[2].children[0].attributes[0].ownerElement.childNodes[1]
									.currentSrc,
							price: e.path[2].children[1].children[4].innerText,
						}),
					})
						.then((response) => response.text())
						.then((result) => console.log(result))
						.catch((error) => console.log("error", error));
				}
			});

			//PUT
			const updateBt = document.querySelector("#product_list");

			updateBt.addEventListener("click", (e) => {
				if (e.target.id === "update") {
					console.log(e);
					const targetName = e.path[2].children[1].children[0].innerText;
					console.log(e.path[2].children[1].children[0].innerText);
					const targetPack = e.path[2].children[1].children[2].innerText;
					console.log(e.path[2].children[1].children[2].innerText);
					const targetImage =
						e.path[2].children[0].attributes[0].ownerElement.childNodes[1]
							.currentSrc;
					console.log(
						e.path[2].children[0].attributes[0].ownerElement.childNodes[1]
							.currentSrc
					);
					const targetPrice = e.path[2].children[1].children[4].innerText;
					console.log(e.path[2].children[1].children[4].innerText);

					fetch("http://localhost:3001", {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							replacenName: product.value,
							replacePack: pack.value,
							replaceImage: image.value,
							replacePrice: price.value,
							name: targetName,
							pack: targetPack,
							image: targetImage,
							price: targetPrice,
						}),
					})
						.then((response) => response.text())
						.then((result) => console.log(result))
						.catch((error) => console.log("error", error));
				}
			});
		})
		.catch((error) => console.log("error", error));
});
