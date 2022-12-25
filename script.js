const audioElement = document.getElementById("audio");
const button = document.getElementById("button");

// Disable/Enable Button
function toogleButton() {
	button.disabled = !button.disabled;
}

//Passing Joke in VoiceRSS API
function tellMe(joke) {
	VoiceRSS.speech({
		key: "5c7121af0cc24c359cb3c12cf9c0f1b9",
		src: joke,
		hl: "en-us",
		v: "Linda",
		r: 0,
		c: "mp3",
		f: "44khz_16bit_stereo",
		ssml: false,
	});
}

// Get Jokes from Joke API
async function getJokes() {
	let joke = "";
	const apiUrl =
		"https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit";
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();
		if (data.type === "twopart") {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}
		tellMe(joke);
		toogleButton();
	} catch (error) {
		console.log("Whoops...", error);
	}
}

// Event Listeners
button.addEventListener("click", getJokes);
audioElement.addEventListener("ended", toogleButton);
