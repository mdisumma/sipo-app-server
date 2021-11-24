const { createClient } = supabase;
supabase = createClient(
	"https://avvelquwyslzkodskshw.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzM4MzE1NSwiZXhwIjoxOTQ4OTU5MTU1fQ.NHMBE0yY82XaMvPeBVWz56hIgjQLvYL9IkvsfFQkU8g"
);
console.log(supabase);
const user = supabase.auth.user();
console.log(user);

//DOM
window.addEventListener("DOMContentLoaded", () => {
	const email = document.querySelector("#email");
	const password = document.querySelector("#password");
	const signUp = document.querySelector("#sign_up");
	const signIn = document.querySelector("#sign_in");
	const signMagiclink = document.querySelector("#sign_magiclink");
	const signGoogle = document.querySelector("#sign_google");

	//SignUP
	signUp.addEventListener("click", (e) => {
		e.preventDefault();
		if (email.value && password.value) {
			const post = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.value,
					password: password.value,
				}),
			};

			fetch("http://localhost:3001/signUp/", post)
				.then((response) => response.json())
				.then((result) => {
					console.log(result);
					if (result.length === 0) {
						alert("please check your email");
					} else {
						alert(`${result[0].email} already exist`);
					}
				})
				.catch((error) => console.log("error", error));
		} else {
			alert("please provide your email and password");
		}
	});

	//LogIN

	signIn.addEventListener("click", async (e) => {
		e.preventDefault();

		if (email.value && password.value) {
			var post = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.value,
					password: password.value,
				}),
			};

			fetch("http://localhost:3001/logIn/", post)
				.then((response) => response.json())
				.then((result) => {
					console.log(result);

					if (result.data[0].admin === true) {
						// window.location.href = `/admin/#`;
						// window.location.href = `http://localhost:3001/admin/#`;
						window.location.href = `/admin/#${result.session.access_token}`;
						// window.location.href = `http://localhost:3001/admin/#${result.session.access_token}`;
						console.log(result.data[0].admin);
					}
					if (result.data[0].admin === false) {
						// window.location.href = `/user/#`;
						// window.location.href = `http://localhost:3001/user/#`;
						window.location.href = `/user/#${result.session.access_token}`;
						// window.location.href = `http://localhost:3001/user/#${result.session.access_token}`;

						console.log(result.data[0].admin);
					}
				})

				.catch((error) => console.log("error", error));
		} else {
			alert("please provide your email and password");
		}
	});

	//SignMAGICLINK
	signMagiclink.addEventListener("click", async (e) => {
		e.preventDefault();

		console.log(email.value);
		if (!email.value) {
			alert("please provide your email");
		} else {
			var post = {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.value,
				}),
			};

			fetch(`http://localhost:3001/authMagicLink/`, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: email.value,
				}),
			})
				.then((response) => response.json())
				.then((result) => console.log(result))
				.catch((error) => console.log("error", error));
		}
	});

	//signGOOGLE
	signGoogle.addEventListener("click", async (e) => {
		e.preventDefault();

		const { user, session, error } = await supabase.auth.signIn(
			{
				provider: "google",
			},
			{
				redirectTo: "http://localhost:3001/user/",
			}
		);
	});
});
