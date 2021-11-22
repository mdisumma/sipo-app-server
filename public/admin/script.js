//SUPABASE
const SUPABASE_URL = "https://avvelquwyslzkodskshw.supabase.co";
const SERVICE_KEY =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoic2VydmljZV9yb2xlIiwiaWF0IjoxNjMzMzgzMTU1LCJleHAiOjE5NDg5NTkxNTV9.tmww3KW2ZpsLvhPlGq2es22MTmXuWK9Mp-wyGMvAtUY";
const { createClient } = supabase;
supabase = createClient(
	"https://avvelquwyslzkodskshw.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzM4MzE1NSwiZXhwIjoxOTQ4OTU5MTU1fQ.NHMBE0yY82XaMvPeBVWz56hIgjQLvYL9IkvsfFQkU8g"
);

//DOM
window.addEventListener("DOMContentLoaded", () => {
	const product = document.querySelector("#product");
	const pack = document.querySelector("#pack");
	const image = document.querySelector("#image");
	const price = document.querySelector("#price");
	const productList = document.querySelector("#product_list");
	const submitBt = document.querySelector("#submit");
	const logOut = document.querySelector("#log_out");

	//LOGOUT
	// const session = supabase.auth.session();
	// console.log(session);
	// const user = supabase.auth.user();
	// console.log(user);

	// logOut.addEventListener("click", async () => {
	// 	const { error } = await supabase.auth.signOut();
	// 	console.log(supabase);
	// window.location.href = logInPage;
	// });

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
					const targetName = e.path[2].children[1].children[0].innerHTML;
					const targetPack = e.path[2].children[1].children[2].innerHTML;
					const targetImage =
						e.path[2].children[0].attributes[0].ownerElement.childNodes[1]
							.currentSrc;
					const targetPrice = e.path[2].children[1].children[4].innerHTML;

					console.log(targetName);
					console.log(targetPack);
					console.log(targetImage);
					console.log(targetPrice);

					fetch("http://localhost:3001", {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: targetName,
							pack: targetPack,
							image: targetImage,
							price: targetPrice,

							replace_name: product.value,
							replace_pack: pack.value,
							replace_image: image.value,
							replace_price: price.value,
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
