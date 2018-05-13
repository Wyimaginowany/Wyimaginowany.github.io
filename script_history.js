document.addEventListener("DOMContentLoaded", () => {
	let span = document.querySelector("#courtain div span");
	span.appendChild(document.createTextNode(lang[4]));

	let history = JSON.parse(localStorage.getItem("history"));
	if (history.length == 0) {
		let h2 = document.createElement("h2");
		h2.appendChild(document.createTextNode(lang[41]));
		document.getElementsByClassName("main")[0].appendChild(h2);
	} else {
		let h2 = document.querySelectorAll(".main h2")[0];
		h2.appendChild(document.createTextNode(lang[42]));
		for (let i = 0; i < history.length; i++) {
			let winner_box = document.createElement("div");
			let winner_name = document.createTextNode(history[i][0].name);
			winner_box.appendChild(document.createTextNode(lang[43] + ": "));
			winner_box.appendChild(winner_name);
			winner_box.appendChild(document.createElement("br"));
			winner_box.appendChild(document.createElement("br"));
			winner_box.appendChild(document.createTextNode(lang[38] + ": "));
			winner_box.appendChild(document.createTextNode(history[i][0].win));
			winner_box.appendChild(document.createElement("br"));
			winner_box.appendChild(document.createTextNode(lang[39] + ": "));
			winner_box.appendChild(document.createTextNode(history[i][0].draw));
			winner_box.appendChild(document.createElement("br"));
			winner_box.appendChild(document.createTextNode(lang[39] + ": "));
			winner_box.appendChild(document.createTextNode(history[i][0].lose));
			winner_box.appendChild(document.createElement("br"));
			winner_box.appendChild(document.createTextNode(history[i][1]));
			document.querySelectorAll(".main #flex_history")[0].appendChild(winner_box);
		}
		let reset_button = document.createElement("input");
		reset_button.setAttribute("type", "button");
		reset_button.setAttribute("value", lang[46]);
		reset_button.id = "reset_history";
		document.querySelectorAll(".main")[0].appendChild(reset_button);
		document.getElementById("reset_history").addEventListener("click", () => {
			localStorage.setItem("history", JSON.stringify([]));
			location.reload();
		});
	}
});
