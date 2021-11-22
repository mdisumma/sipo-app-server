const email = document.querySelector("#email");
const password = document.querySelector("#password");
const signUp = document.querySelector("#sign_up");
const signIn = document.querySelector("#sign_in");
const signOut = document.querySelector("#sign_out");
const signMagiclink = document.querySelector("#sign_magiclink");
const signGoogle = document.querySelector("#sign_google");

const { createClient } = supabase;
supabase = createClient(
	"https://avvelquwyslzkodskshw.supabase.co",
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzMzM4MzE1NSwiZXhwIjoxOTQ4OTU5MTU1fQ.NHMBE0yY82XaMvPeBVWz56hIgjQLvYL9IkvsfFQkU8g"
);

//DOM
window.addEventListener("DOMContentLoaded", () => {
	//SignUP
	signUp.addEventListener("click", (e) => {
		e.preventDefault();

		console.log(email.value);
		console.log(password.value);

		const post = {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				email: email.value,
				password: password.value,
			}),
		};

		fetch("http://localhost:3001/signUp/", post)
			.then((response) => response.text())
			.then((result) => {
				console.log(result);
				if (result.length === 0) {
					alert("please check your email");
				}
				if (result.length !== 0) {
					alert("this user already exist");
				}
			})
			.catch((error) => console.log("error", error));
	});

	//LogIN
	signIn.addEventListener("click", async (e) => {
		e.preventDefault();

		console.log(email.value);
		console.log(password.value);

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
					// window.location.href = `http://localhost:3001/admin#${result.session.access_token}`;
					window.location.href = `/admin/`;
					console.log(result.data[0].admin);
				}
				if (result.data[0].admin === false) {
					// window.location.href = `http://localhost:3001/user#${result.session.access_token}`;
					window.location.href = `/user/`;
					console.log(result.data[0].admin);
				}
			})
			.catch((error) => console.log("error", error));
	});

	//SignMAGICLINK
	signIn.addEventListener("click", async (e) => {
		e.preventDefault();

		console.log(email.value);

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
	});

	//signGOOGLE
	async function signInWithGoogle() {
		const { user, session, error } = await supabase.auth.signIn({
			provider: "google",
		});
	}
	signGoogle.addEventListener("click", (e) => {
		e.preventDefault();
		signInWithGoogle();
		console.log(supabase.auth);
	});
});
