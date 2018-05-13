document.addEventListener("DOMContentLoaded", () => {
	let span = document.querySelector("#courtain div span");
	span.appendChild(document.createTextNode(lang[0]));

	if (localStorage.getItem("history") === null) {
		localStorage.setItem("history", JSON.stringify([]));
	}

	if (localStorage.getItem("teams") === null && localStorage.getItem("groups") === null && localStorage.getItem("winner_p") === null && localStorage.getItem("draw_p") === null && localStorage.getItem("lose_p") === null && localStorage.getItem("draw") === null && localStorage.getItem("teams_names") === null && localStorage.getItem("macthes") === null && localStorage.getItem("matches_next") === null && localStorage.getItem("started") === null && localStorage.getItem("started_next") === null && localStorage.getItem("finished") === null) {
		localStorage.setItem("teams", 2);
		localStorage.setItem("groups", 2);
		localStorage.setItem("winner_p", 1);
		localStorage.setItem("draw_p", 0);
		localStorage.setItem("lose_p", 0);
		localStorage.setItem("draw", 0);
		localStorage.setItem("promotion_teams", 1);
		localStorage.setItem("started", false);
		localStorage.setItem("started_next", false);
		localStorage.setItem("finished", false);
		localStorage.setItem("next_counter", 0);
		localStorage.setItem("teams_names", JSON.stringify([]));
		localStorage.setItem("matches", JSON.stringify([]));
		localStorage.setItem("matches_next", JSON.stringify([[]]));
	}

	function refresh() {
		let teams_names = JSON.parse(localStorage.getItem("teams_names"));

		for (let i = 0; i < teams_names.length; i++) {
			druzyna = teams_names[i]["name"];
			let span = document.createElement("span");
			span.classList.add("team_name");
			let br = document.createElement("br");
			let tresc = document.createTextNode(teams_names[i]["name"] + "    ");
			let input = document.createElement("input");
			input.setAttribute("class", "przycisk_form_tiny");
			input.setAttribute("type", "number");
			input.setAttribute("placeholder", "G");
			input.setAttribute("min", "1");
			input.setAttribute("max", localStorage.getItem("groups"));
			span.appendChild(tresc);
			document.querySelectorAll(".form_main_columns")[1].appendChild(span);
			document.querySelectorAll(".form_main_columns")[1].appendChild(input);
			document.querySelectorAll(".form_main_columns")[1].appendChild(br);
			usuwanie(span, br, druzyna, input);
		}

		for (let i = 0; i < teams_names.length; i++) {
			document.querySelectorAll(".przycisk_form_tiny")[i].addEventListener("input", () => {
				let teams_names = JSON.parse(localStorage.getItem("teams_names"));
				let temp = document.querySelectorAll(".przycisk_form_tiny")[i].value;
				teams_names[i].group = temp;
				localStorage.setItem("teams_names", JSON.stringify(teams_names));
			});
		}

		document.getElementById("number_of_teams_total").innerHTML = localStorage.getItem("teams");
		document.getElementById("number_of_teams_current").innerHTML = teams_names.length;
		document.getElementsByClassName("przycisk_form")[0].value = localStorage.getItem("teams");
		document.getElementsByClassName("przycisk_form")[1].value = localStorage.getItem("groups");
		document.getElementsByClassName("przycisk_form")[2].value = localStorage.getItem("winner_p");
		document.getElementsByClassName("przycisk_form")[4].value = localStorage.getItem("lose_p");
		document.getElementsByClassName("przycisk_form")[5].value = localStorage.getItem("promotion_teams");
		for (let i = 0; i < teams_names.length; i++) {
			document.querySelectorAll(".przycisk_form_tiny")[i].value = teams_names[i].group;
		}

		if (localStorage.getItem("draw") == 1) {
			document.getElementById("draw_yes").checked = "true";
			document.getElementsByClassName("przycisk_form")[3].value = localStorage.getItem("draw_p");
		} else {
			document.getElementById("draw_no").checked = "true";
			document.getElementsByClassName("przycisk_form")[3].disabled = true;
		}

		if (document.getElementsByClassName("przycisk_form")[0].value == "" ||
			document.getElementsByClassName("przycisk_form")[0].value == "0") {
			document.getElementsByClassName("przycisk_form")[1].disabled = true;
		} else {
			document.getElementsByClassName("przycisk_form")[1].disabled = false;
		}

		if (teams_names.length != 0) {
			document.getElementsByClassName("przycisk_form")[1].disabled = true;
			document.getElementsByClassName("przycisk_form")[0].disabled = true;
		} else {
			document.getElementsByClassName("przycisk_form")[0].disabled = false;
			document.getElementsByClassName("przycisk_form")[1].disabled = false;
		}

		if (document.getElementsByClassName("przycisk_form")[0].value == "" || document.getElementsByClassName("przycisk_form")[1].value == "" || document.getElementsByClassName("przycisk_form")[0].value == "0" || document.getElementsByClassName("przycisk_form")[1].value == "0") {
			document.getElementsByClassName("przycisk_form")[6].placeholder = lang[18];
			document.getElementsByClassName("przycisk_form")[6].disabled = true;
			document.getElementsByClassName("przycisk_form")[5].disabled = true;
		} else {
			document.getElementsByClassName("przycisk_form")[6].placeholder = lang[23];
			document.getElementsByClassName("przycisk_form")[6].disabled = false;
			document.getElementsByClassName("przycisk_form")[5].disabled = false;
		}

		if (document.getElementsByClassName("przycisk_form")[1].value == "") {
			document.getElementById("number_of_groups_each").innerHTML = "0";
			document.getElementById("number_of_groups_one").style.textDecoration = "line-through";
			document.getElementById("number_of_groups_one_text").style.textDecoration = "line-through";
		} else {
			document.getElementById("number_of_groups_each").innerHTML = Math.floor(document.getElementsByClassName("przycisk_form")[0].value / document.getElementsByClassName("przycisk_form")[1].value);
			if (document.getElementsByClassName("przycisk_form")[0].value % document.getElementsByClassName("przycisk_form")[1].value == 0) {
				document.getElementById("number_of_groups_one").style.textDecoration = "line-through";
				document.getElementById("number_of_groups_one_text").style.textDecoration = "line-through";
			} else {
				document.getElementById("number_of_groups_one").style.textDecoration = "unset";
				document.getElementById("number_of_groups_one").innerHTML = Math.floor(document.getElementsByClassName("przycisk_form")[0].value / document.getElementsByClassName("przycisk_form")[1].value) + 1;
				document.getElementById("number_of_groups_one_text").style.textDecoration = "unset";
			}
		}

		document.getElementsByClassName("przycisk_form")[1].setAttribute("max", Math.floor(document.getElementsByClassName("przycisk_form")[0].value / 2));
		document.getElementsByClassName("przycisk_form")[5].setAttribute("max", Math.floor(document.getElementsByClassName("przycisk_form")[0].value / document.getElementsByClassName("przycisk_form")[1].value));

		if (teams_names.length >= localStorage.getItem("teams")) {
			document.getElementsByClassName("przycisk_form")[6].placeholder = lang[28];
			document.getElementsByClassName("przycisk_form")[6].disabled = true;
		}

		if (localStorage.getItem("started") == "true") {
			document.getElementsByClassName("przycisk_form")[0].disabled = true;
			document.getElementsByClassName("przycisk_form")[1].disabled = true;
			document.getElementsByClassName("przycisk_form")[2].disabled = true;
			document.getElementsByClassName("przycisk_form")[3].disabled = true;
			document.getElementsByClassName("przycisk_form")[4].disabled = true;
			document.getElementsByClassName("przycisk_form")[5].disabled = true;
			document.getElementsByClassName("przycisk_form")[6].disabled = true;
			document.getElementById("draw_yes").disabled = true;
			document.getElementById("draw_no").disabled = true;
			document.getElementById("przycisk_form_random").disabled = true;
			for (let i = 0; i < teams_names.length; i++) {
				document.querySelectorAll(".przycisk_form_tiny")[i].disabled = true;
			}

			document.getElementById("before_start").style.display = "none";

			tournament_start();
			if (localStorage.getItem("started_next") == "true") {
				document.getElementById("przycisk_form_next").disabled = true;
				let next_counter = localStorage.getItem("next_counter");
				tournament_next(next_counter);
			}
			if (localStorage.getItem("finished") == "true") {
				finish(0);
			}
		}
	}

	refresh();

	document.getElementsByClassName("przycisk_form")[0].addEventListener("input", () => {
		if (document.getElementsByClassName("przycisk_form")[0].value == "" || document.getElementsByClassName("przycisk_form")[1].value == "" || document.getElementsByClassName("przycisk_form")[0].value == "0" || document.getElementsByClassName("przycisk_form")[1].value == "0") {
			document.getElementsByClassName("przycisk_form")[6].placeholder = lang[18];
			document.getElementsByClassName("przycisk_form")[6].disabled = true;
		} else {
			document.getElementsByClassName("przycisk_form")[6].placeholder = lang[23];
			document.getElementsByClassName("przycisk_form")[6].disabled = false;
		}

		if (document.getElementsByClassName("przycisk_form")[0].value == "" ||
			document.getElementsByClassName("przycisk_form")[0].value == "0") {
			document.getElementsByClassName("przycisk_form")[1].disabled = true;
		} else {
			document.getElementsByClassName("przycisk_form")[1].disabled = false;
		}
	});

	document.getElementsByClassName("przycisk_form")[1].addEventListener("input", () => {
		if (document.getElementsByClassName("przycisk_form")[0].value == "" || document.getElementsByClassName("przycisk_form")[1].value == "" || document.getElementsByClassName("przycisk_form")[0].value == "0" || document.getElementsByClassName("przycisk_form")[1].value == "0") {
			document.getElementsByClassName("przycisk_form")[6].placeholder = lang[18];
			document.getElementsByClassName("przycisk_form")[6].disabled = true;
			document.getElementsByClassName("przycisk_form")[5].disabled = true;
			document.getElementsByClassName("przycisk_form")[5].value = "";
		} else {
			document.getElementsByClassName("przycisk_form")[6].placeholder = lang[23];
			document.getElementsByClassName("przycisk_form")[6].disabled = false;
			document.getElementsByClassName("przycisk_form")[5].disabled = false;
		}
	});

	document.getElementsByClassName("przycisk_form")[0].addEventListener("input", () => {
		if (document.getElementsByClassName("przycisk_form")[0].value != "") {
			localStorage.setItem("teams", document.getElementsByClassName("przycisk_form")[0].value);
			document.getElementById("number_of_teams_total").innerHTML = localStorage.getItem("teams");
			document.getElementsByClassName("przycisk_form")[1].value = "";
			document.getElementsByClassName("przycisk_form")[6].placeholder = lang[18];
			document.getElementsByClassName("przycisk_form")[6].disabled = true;
			document.getElementsByClassName("przycisk_form")[1].setAttribute("max", Math.floor(document.getElementsByClassName("przycisk_form")[0].value / 2));
		} else {
			localStorage.setItem("teams", 0);
			document.getElementById("number_of_teams_total").innerHTML = "0";
		}
	});

	document.getElementsByClassName("przycisk_form")[1].addEventListener("input", () => {
		if (document.getElementsByClassName("przycisk_form")[1].value == "") {
			localStorage.setItem("groups", 0);
			document.getElementById("number_of_groups_each").innerHTML = "0";
			document.getElementById("number_of_groups_one").style.textDecoration = "line-through";
			document.getElementById("number_of_groups_one_text").style.textDecoration = "line-through";
		} else {
			localStorage.setItem("groups", document.getElementsByClassName("przycisk_form")[1].value);
			document.getElementsByClassName("przycisk_form")[5].setAttribute("max", Math.floor(document.getElementsByClassName("przycisk_form")[0].value / document.getElementsByClassName("przycisk_form")[1].value));
			document.getElementsByClassName("przycisk_form")[5].value = "1";
			document.getElementById("number_of_groups_each").innerHTML = Math.floor(document.getElementsByClassName("przycisk_form")[0].value / document.getElementsByClassName("przycisk_form")[1].value);
			if (document.getElementsByClassName("przycisk_form")[0].value % document.getElementsByClassName("przycisk_form")[1].value == 0) {
				document.getElementById("number_of_groups_one").innerHTML = "0";
				document.getElementById("number_of_groups_one").style.textDecoration = "line-through";
				document.getElementById("number_of_groups_one_text").style.textDecoration = "line-through";
			} else {
				document.getElementById("number_of_groups_one").style.textDecoration = "unset";
				document.getElementById("number_of_groups_one").innerHTML = Math.floor(document.getElementsByClassName("przycisk_form")[0].value / document.getElementsByClassName("przycisk_form")[1].value) + 1;
				document.getElementById("number_of_groups_one_text").style.textDecoration = "unset";
			}
		}
	});

	document.getElementsByClassName("przycisk_form")[2].addEventListener("input", () => {
		if (document.getElementsByClassName("przycisk_form")[2].value == "") {
			localStorage.setItem("winner_p", 0);
		} else {
			localStorage.setItem("winner_p", document.getElementsByClassName("przycisk_form")[2].value);
		}
	});

	document.getElementsByClassName("przycisk_form")[3].addEventListener("input", () => {
		if (document.getElementsByClassName("przycisk_form")[3].value == "") {
			localStorage.setItem("draw_p", 0);
		} else {
			localStorage.setItem("draw_p", document.getElementsByClassName("przycisk_form")[3].value);
		}
	});

	document.getElementsByClassName("przycisk_form")[4].addEventListener("input", () => {
		if (document.getElementsByClassName("przycisk_form")[4].value == "") {
			localStorage.setItem("lose_p", 0);
		} else {
			localStorage.setItem("lose_p", document.getElementsByClassName("przycisk_form")[4].value);
		}
	});

	document.getElementsByClassName("przycisk_form")[5].addEventListener("input", () => {
		if (document.getElementsByClassName("przycisk_form")[5].value == "") {
			localStorage.setItem("promotion_teams", 0);
		} else {
			localStorage.setItem("promotion_teams", document.getElementsByClassName("przycisk_form")[5].value);
		}
	});

	document.getElementById("draw_yes").addEventListener("click", () => {
		localStorage.setItem("draw", 1);
		document.getElementsByClassName("przycisk_form")[3].disabled = false;
	});

	document.getElementById("draw_no").addEventListener("click", () => {
		localStorage.setItem("draw", 0);
		document.getElementsByClassName("przycisk_form")[3].disabled = true;
		document.getElementsByClassName("przycisk_form")[3].value = "";
		localStorage.setItem("draw_p", document.getElementsByClassName("przycisk_form")[3].value);
	});

	document.querySelectorAll("#form_main .przycisk_form_small")[0].addEventListener("click", () => {
		if (document.querySelectorAll(".przycisk_form")[6].value == "") {
			document.querySelectorAll(".przycisk_form")[6].style.borderBottom = "solid";
			document.querySelectorAll(".przycisk_form")[6].style.borderBottomWidth = "1px";
			document.querySelectorAll(".przycisk_form")[6].style.borderBottomColor = "red";
			setTimeout(() => {
				document.querySelectorAll(".przycisk_form")[6].style.borderBottom = null;
				document.querySelectorAll(".przycisk_form")[6].style.borderBottomWidth = null;
				document.querySelectorAll(".przycisk_form")[6].style.borderBottomColor = null;
			}, 1000);
		} else {
			let druzyna = document.querySelectorAll(".przycisk_form")[6].value;
			let teams_names = JSON.parse(localStorage.getItem("teams_names"));
			let check = false;
			let unique_record = true;
			for (let i = 0; i < teams_names.length; i++) {
				if (druzyna == teams_names[i].name) {
					unique_record = false;
					document.querySelectorAll(".przycisk_form")[6].style.borderBottom = "solid";
					document.querySelectorAll(".przycisk_form")[6].style.borderBottomWidth = "1px";
					document.querySelectorAll(".przycisk_form")[6].style.borderBottomColor = "red";
					setTimeout(() => {
						document.querySelectorAll(".przycisk_form")[6].style.borderBottom = null;
						document.querySelectorAll(".przycisk_form")[6].style.borderBottomWidth = null;
						document.querySelectorAll(".przycisk_form")[6].style.borderBottomColor = null;
					}, 1000);
				}
			}

			if (unique_record == true) {
				teams_names[teams_names.length] = {
					"name": druzyna,
					"points": 0,
					"win": 0,
					"draw": 0,
					"lose": 0,
					"group": 0
				};
				localStorage.setItem("teams_names", JSON.stringify(teams_names));

				if (teams_names.length != 0) {
					document.getElementById("number_of_teams_current").innerHTML = teams_names.length;
					document.getElementsByClassName("przycisk_form")[0].disabled = true;
					document.getElementsByClassName("przycisk_form")[1].disabled = true;
				} else {
					document.getElementById("number_of_teams_current").innerHTML = "0";
					document.getElementsByClassName("przycisk_form")[0].disabled = false;
					document.getElementsByClassName("przycisk_form")[1].disabled = false;
				}

				if (teams_names.length >= localStorage.getItem("teams")) {
					document.getElementsByClassName("przycisk_form")[6].placeholder = lang[28];
					document.getElementsByClassName("przycisk_form")[6].disabled = true;
				}
				document.querySelectorAll(".przycisk_form")[6].value = "";
				let span = document.createElement("span");
				span.classList.add("team_name");
				let br = document.createElement("br");
				let tresc = document.createTextNode(druzyna + "    ");
				let input = document.createElement("input");
				input.setAttribute("type", "number");
				input.setAttribute("class", "przycisk_form_tiny");
				input.setAttribute("placeholder", "G");
				input.setAttribute("min", "1");
				input.setAttribute("max", localStorage.getItem("groups"));
				span.appendChild(tresc);
				document.querySelectorAll(".form_main_columns")[1].appendChild(span);
				document.querySelectorAll(".form_main_columns")[1].appendChild(input);
				document.querySelectorAll(".form_main_columns")[1].appendChild(br);

				input.addEventListener("input", () => {
					let teams_names = JSON.parse(localStorage.getItem("teams_names"));
					teams_names[teams_names.length - 1].group = input.value;
					localStorage.setItem("teams_names", JSON.stringify(teams_names));
				});

				for (let i = 0; i < teams_names.length; i++) {
					document.querySelectorAll(".przycisk_form_tiny")[i].addEventListener("input", () => {
						let teams_names = JSON.parse(localStorage.getItem("teams_names"));
						let temp = document.querySelectorAll(".przycisk_form_tiny")[i].value;
						teams_names[i].group = temp;
						localStorage.setItem("teams_names", JSON.stringify(teams_names));
					});
				}

				usuwanie(span, br, druzyna, input);
			}
		}
	});

	function usuwanie(span, br, druzyna, input) {
		span.addEventListener("dblclick", () => {
			if (localStorage.getItem("started") != "true") {
				span.remove();
				input.remove();
				br.remove();
				document.getElementsByClassName("przycisk_form")[6].placeholder = lang[23];
				document.getElementsByClassName("przycisk_form")[6].disabled = false;
				let teams_names = JSON.parse(localStorage.getItem("teams_names"));
				for (let i = 0; i < teams_names.length; i++) {
					if (teams_names[i].name == druzyna) {
						teams_names.splice(i, 1);
					}
				}
				localStorage.setItem("teams_names", JSON.stringify(teams_names));
				if (teams_names.length != 0) {
					document.getElementById("number_of_teams_current").innerHTML = teams_names.length;
					document.getElementsByClassName("przycisk_form")[0].disabled = true;
					document.getElementsByClassName("przycisk_form")[1].disabled = true;
				} else {
					document.getElementById("number_of_teams_current").innerHTML = "0";
					document.getElementsByClassName("przycisk_form")[0].disabled = false;
					document.getElementsByClassName("przycisk_form")[1].disabled = false;
				}
			}
		});
	}

	document.getElementById("przycisk_form_random").addEventListener("click", () => {
		let wys = document.getElementsByClassName("main")[0].offsetTop;
		let teams_names = JSON.parse(localStorage.getItem("teams_names"));
		if (teams_names.length < localStorage.getItem("teams")) {
			document.getElementById("przycisk_form_start").style.borderBottom = "solid";
			document.getElementById("przycisk_form_start").style.borderBottomWidth = "1px";
			document.getElementById("przycisk_form_start").style.borderBottomColor = "red";
			document.getElementById("number_of_teams_current").style.color = "red";
			smoothScrollUp(wys);
			setTimeout(() => {
				document.getElementById("przycisk_form_start").style.borderBottom = null;
				document.getElementById("przycisk_form_start").style.borderBottomWidth = null;
				document.getElementById("przycisk_form_start").style.borderBottomColor = null;
				document.getElementById("number_of_teams_current").style.color = null;
			}, 3000);
		} else {
			let rand_group = 0;
			let temp_counter = 0;
			let number_of_groups_one = 0;
			let number_of_groups_each = Math.floor(document.getElementsByClassName("przycisk_form")[0].value / document.getElementsByClassName("przycisk_form")[1].value);
			let one_extra = false;
			if (document.getElementsByClassName("przycisk_form")[0].value % document.getElementsByClassName("przycisk_form")[1].value != 0) {
				one_extra = true;
				number_of_groups_one = number_of_groups_each + 1;
			}
			let one_extra_flag = false;

			for (let i = 0; i < teams_names.length; i++) {
				teams_names[i].group = 0;
			}

			for (let j = 0; j < teams_names.length; j++) {
				rand_group = Math.floor(Math.random() * localStorage.getItem("groups")) + 1;
				for (let i = 0; i < teams_names.length; i++) {
					if (teams_names[i].group == rand_group) {
						temp_counter++;
					}
				}
				if (temp_counter == number_of_groups_each && temp_counter < number_of_groups_one && one_extra_flag == false && one_extra == true) {
					teams_names[j].group = rand_group;
					one_extra_flag == true;
				} else if (temp_counter == number_of_groups_one && one_extra_flag == true) {
					j--;
				} else if (temp_counter >= number_of_groups_each) {
					j--;
				} else {
					teams_names[j].group = rand_group;
				}
				temp_counter = 0;
			}
			localStorage.setItem("teams_names", JSON.stringify(teams_names));
			for (let i = 0; i < teams_names.length; i++) {
				document.querySelectorAll(".przycisk_form_tiny")[i].value = teams_names[i].group;
			}
		}
	});

	document.getElementById("przycisk_form_start").addEventListener("click", () => {
		let wys = document.getElementsByClassName("main")[0].offsetTop;
		let fail = false;
		let teams_names = JSON.parse(localStorage.getItem("teams_names"));
		if (teams_names.length < localStorage.getItem("teams")) {
			document.getElementById("przycisk_form_start").style.borderBottom = "solid";
			document.getElementById("przycisk_form_start").style.borderBottomWidth = "1px";
			document.getElementById("przycisk_form_start").style.borderBottomColor = "red";
			document.getElementById("number_of_teams_current").style.color = "red";
			smoothScrollUp(wys);
			setTimeout(() => {
				document.getElementById("przycisk_form_start").style.borderBottom = null;
				document.getElementById("przycisk_form_start").style.borderBottomWidth = null;
				document.getElementById("przycisk_form_start").style.borderBottomColor = null;
				document.getElementById("number_of_teams_current").style.color = null;
			}, 3000);
			fail = true;
		}

		let temp_counter = 0;
		let temp_array = [];
		let one_extra = false;
		let in_each_group = Math.floor(document.getElementsByClassName("przycisk_form")[0].value / document.getElementsByClassName("przycisk_form")[1].value);
		if (document.getElementsByClassName("przycisk_form")[0].value % document.getElementsByClassName("przycisk_form")[1].value != 0) {
			one_extra = true;
		}
		let one_extra_flag = false;

		for (let i = 0; i < teams_names.length; i++) {
			temp_array.push(teams_names[i].group);
		}

		for (let i = 1; i <= localStorage.getItem("groups"); i++) {
			for (let j = 0; j < temp_array.length; j++) {
				if (temp_array[j] == i) {
					temp_counter++;
				}
			}

			if (temp_counter == in_each_group) {

			} else if (temp_counter == in_each_group + 1 && one_extra_flag == false && one_extra == true) {
				one_extra_flag = true;
			} else {
				document.getElementById("przycisk_form_start").style.borderBottom = "solid";
				document.getElementById("przycisk_form_start").style.borderBottomWidth = "1px";
				document.getElementById("przycisk_form_start").style.borderBottomColor = "red";
				document.getElementById("number_of_groups_each").style.color = "red";
				document.getElementById("number_of_groups_one").style.color = "red";
				smoothScrollUp(wys);
				setTimeout(() => {
					document.getElementById("przycisk_form_start").style.borderBottom = null;
					document.getElementById("przycisk_form_start").style.borderBottomWidth = null;
					document.getElementById("przycisk_form_start").style.borderBottomColor = null;
					document.getElementById("number_of_groups_each").style.color = null;
					document.getElementById("number_of_groups_one").style.color = null;
				}, 3000);
				fail = true;
				break;
			}
			temp_counter = 0;
		}

		let promotion_teams_temp = document.getElementsByClassName("przycisk_form")[5].value;

		if (promotion_teams_temp == 1 && localStorage.getItem("groups") % 2 != 0) {
			document.getElementsByClassName("przycisk_form")[5].style.borderBottom = "solid";
			document.getElementsByClassName("przycisk_form")[5].style.borderBottomWidth = "1px";
			document.getElementsByClassName("przycisk_form")[5].style.borderBottomColor = "red";

			document.getElementsByClassName("przycisk_form")[1].style.borderBottom = "solid";
			document.getElementsByClassName("przycisk_form")[1].style.borderBottomWidth = "1px";
			document.getElementsByClassName("przycisk_form")[1].style.borderBottomColor = "red";
			setTimeout(() => {
				document.getElementsByClassName("przycisk_form")[5].style.borderBottom = null;
				document.getElementsByClassName("przycisk_form")[5].style.borderBottomWidth = null;
				document.getElementsByClassName("przycisk_form")[5].style.borderBottomColor = null;

				document.getElementsByClassName("przycisk_form")[1].style.borderBottom = null;
				document.getElementsByClassName("przycisk_form")[1].style.borderBottomWidth = null;
				document.getElementsByClassName("przycisk_form")[1].style.borderBottomColor = null;
			}, 3000);
			fail = true;
		}

		if (is_power_of_two(promotion_teams_temp) == false) {
			document.getElementsByClassName("przycisk_form")[5].style.borderBottom = "solid";
			document.getElementsByClassName("przycisk_form")[5].style.borderBottomWidth = "1px";
			document.getElementsByClassName("przycisk_form")[5].style.borderBottomColor = "red";
			setTimeout(() => {
				document.getElementsByClassName("przycisk_form")[5].style.borderBottom = null;
				document.getElementsByClassName("przycisk_form")[5].style.borderBottomWidth = null;
				document.getElementsByClassName("przycisk_form")[5].style.borderBottomColor = null;
			}, 3000);
			fail = true;
		}

		if (localStorage.getItem("teams") < 2) {
			document.getElementsByClassName("przycisk_form")[0].style.borderBottom = "solid";
			document.getElementsByClassName("przycisk_form")[0].style.borderBottomWidth = "1px";
			document.getElementsByClassName("przycisk_form")[0].style.borderBottomColor = "red";
			setTimeout(() => {
				document.getElementsByClassName("przycisk_form")[0].style.borderBottom = null;
				document.getElementsByClassName("przycisk_form")[0].style.borderBottomWidth = null;
				document.getElementsByClassName("przycisk_form")[0].style.borderBottomColor = null;
			}, 3000);
			fail = true;
		}

		if (localStorage.getItem("winner_p") < 1) {
			document.getElementsByClassName("przycisk_form")[2].style.borderBottom = "solid";
			document.getElementsByClassName("przycisk_form")[2].style.borderBottomWidth = "1px";
			document.getElementsByClassName("przycisk_form")[2].style.borderBottomColor = "red";
			setTimeout(() => {
				document.getElementsByClassName("przycisk_form")[2].style.borderBottom = null;
				document.getElementsByClassName("przycisk_form")[2].style.borderBottomWidth = null;
				document.getElementsByClassName("przycisk_form")[2].style.borderBottomColor = null;
			}, 3000);
			fail = true;
		}

		if (localStorage.getItem("draw_p") != "" && localStorage.getItem("draw_p") < 0) {
			document.getElementsByClassName("przycisk_form")[3].style.borderBottom = "solid";
			document.getElementsByClassName("przycisk_form")[3].style.borderBottomWidth = "1px";
			document.getElementsByClassName("przycisk_form")[3].style.borderBottomColor = "red";
			setTimeout(() => {
				document.getElementsByClassName("przycisk_form")[3].style.borderBottom = null;
				document.getElementsByClassName("przycisk_form")[3].style.borderBottomWidth = null;
				document.getElementsByClassName("przycisk_form")[3].style.borderBottomColor = null;
			}, 3000);
			fail = true;
		}

		if (localStorage.getItem("teams") == localStorage.getItem("groups")) {
			document.getElementsByClassName("przycisk_form")[0].style.borderBottom = "solid";
			document.getElementsByClassName("przycisk_form")[0].style.borderBottomWidth = "1px";
			document.getElementsByClassName("przycisk_form")[0].style.borderBottomColor = "red";

			document.getElementsByClassName("przycisk_form")[1].style.borderBottom = "solid";
			document.getElementsByClassName("przycisk_form")[1].style.borderBottomWidth = "1px";
			document.getElementsByClassName("przycisk_form")[1].style.borderBottomColor = "red";
			setTimeout(() => {
				document.getElementsByClassName("przycisk_form")[0].style.borderBottom = null;
				document.getElementsByClassName("przycisk_form")[0].style.borderBottomWidth = null;
				document.getElementsByClassName("przycisk_form")[0].style.borderBottomColor = null;

				document.getElementsByClassName("przycisk_form")[1].style.borderBottom = null;
				document.getElementsByClassName("przycisk_form")[1].style.borderBottomWidth = null;
				document.getElementsByClassName("przycisk_form")[1].style.borderBottomColor = null;
			}, 3000);
			fail = true;
		}

		if (document.getElementsByClassName("przycisk_form")[5].value <= 0) {
			document.getElementsByClassName("przycisk_form")[5].style.borderBottom = "solid";
			document.getElementsByClassName("przycisk_form")[5].style.borderBottomWidth = "1px";
			document.getElementsByClassName("przycisk_form")[5].style.borderBottomColor = "red";
			setTimeout(() => {
				document.getElementsByClassName("przycisk_form")[5].style.borderBottom = null;
				document.getElementsByClassName("przycisk_form")[5].style.borderBottomWidth = null;
				document.getElementsByClassName("przycisk_form")[5].style.borderBottomColor = null;
			}, 3000);
			fail = true;
		}

		if (fail == false) {
			wys = document.getElementsByClassName("main")[1].offsetTop;
			smoothScrollDown(wys);
			document.getElementsByClassName("przycisk_form")[0].disabled = true;
			document.getElementsByClassName("przycisk_form")[1].disabled = true;
			document.getElementsByClassName("przycisk_form")[2].disabled = true;
			document.getElementsByClassName("przycisk_form")[3].disabled = true;
			document.getElementsByClassName("przycisk_form")[4].disabled = true;
			document.getElementsByClassName("przycisk_form")[5].disabled = true;
			document.getElementsByClassName("przycisk_form")[6].disabled = true;
			document.getElementById("draw_yes").disabled = true;
			document.getElementById("draw_no").disabled = true;
			document.getElementById("przycisk_form_random").disabled = true;
			localStorage.setItem("started", true);
			for (let i = 0; i < teams_names.length; i++) {
				document.querySelectorAll(".przycisk_form_tiny")[i].disabled = true;
			}

			document.getElementById("before_start").style.display = "none";

			tournament_start();
		}
	});

	function smoothScrollUp(wys) {
		if (window.pageYOffset > wys) {
			window.scrollBy(0, -10);
			setTimeout(() => {
				smoothScrollUp(wys);
			}, 1);
		} else if (window.pageYOffset <= wys) {}
	}

	function smoothScrollDown(wys) {
		if (window.pageYOffset < wys) {
			if (window.pageYOffset + window.innerHeight >= document.body.scrollHeight) {
				return 0;
			}
			window.scrollBy(0, 10);
			setTimeout(() => {
				smoothScrollDown(wys);
			}, 1);
		} else if (window.pageYOffset >= wys) {}
	}

	function tournament_start() {
		document.getElementById("przycisk_form_start").disabled = true;
		let teams_names = JSON.parse(localStorage.getItem("teams_names"));
		let temp_array = [];
		let temp_array_ready = [];
		let temp_n_games = 0;
		let bracket = document.getElementById("tournament");
		let ul = document.createElement("ul");
		ul.classList.add("round");

		for (let i = 1; i <= localStorage.getItem("groups"); i++) {
			let matches = JSON.parse(localStorage.getItem("matches"));
			for (let j = 0; j < teams_names.length; j++) {
				if (teams_names[j]["group"] == i) {
					temp_array.push(teams_names[j]["name"]);
				}
			}

			temp_n_games = (temp_array.length * (temp_array.length - 1)) / 2;

			temp_array_ready = combinations(temp_array, 2);
			if (matches.length != localStorage.getItem("groups")) {
				matches.push(temp_array_ready);
				for (let n = 0; n < matches[i - 1].length; n++) {
					let check = false;
					let match_index = 0;
					do {
						match_index = Math.floor(Math.random() * 100000) + 1;
						for (let p = 0; p < matches[i - 1].length; p++) {
							if (matches[i - 1][p][4] == match_index) {
								check = true;
								break;
							} else {
								check = false;
							}
						}
					} while (check == true);
					matches[i - 1][n].push("");
					matches[i - 1][n].push("");
					matches[i - 1][n].push(match_index);
				}
				localStorage.setItem("matches", JSON.stringify(matches));
			}

			for (let k = 0; k < temp_n_games; k++) {
				let li_top = document.createElement("li");
				li_top.classList.add("game-top");
				let li_spacer = document.createElement("li");
				let spacer_text = document.createTextNode("\xa0");
				li_spacer.classList.add("game-spacer");
				li_spacer.appendChild(spacer_text);
				let li_bottom = document.createElement("li");
				li_bottom.classList.add("game-bottom");

				let input_top = document.createElement("input");
				let input_bottom = document.createElement("input");
				let input_button = document.createElement("input");
				input_top.classList.add("przycisk_form_tiny_tournament");
				input_top.id = matches[i - 1][k][4] + "_top";
				input_top.setAttribute("placeholder", "P");
				input_top.setAttribute("type", "number");
				input_top.setAttribute("min", "0");
				input_bottom.classList.add("przycisk_form_tiny_tournament");
				input_bottom.id = matches[i - 1][k][4] + "_bottom";
				input_bottom.setAttribute("placeholder", "P");
				input_bottom.setAttribute("type", "number");
				input_bottom.setAttribute("min", "0");

				input_button.classList.add("przycisk_form_tournament_button");
				input_button.id = matches[i - 1][k][4];
				input_button.setAttribute("type", "button");
				input_button.setAttribute("value", lang[34]);

				if (matches[i - 1][k][2] != "" && matches[i - 1][k][3] != "") {
					input_top.disabled = true;
					input_bottom.disabled = true;
					input_button.disabled = true;
					input_top.setAttribute("value", matches[i - 1][k][2]);
					input_bottom.setAttribute("value", matches[i - 1][k][3]);
				} else {
					input_button.addEventListener("click", () => {
						if (localStorage.getItem("draw") == 0) {
							if (input_top.value == input_bottom.value) {
								input_top.style.borderBottom = "solid";
								input_top.style.borderBottomWidth = "1px";
								input_top.style.borderBottomColor = "red";
								input_bottom.style.borderBottom = "solid";
								input_bottom.style.borderBottomWidth = "1px";
								input_bottom.style.borderBottomColor = "red";
								setTimeout(() => {
									input_top.style.borderBottom = null;
									input_top.style.borderBottomWidth = null;
									input_top.style.borderBottomColor = null;
									input_bottom.style.borderBottom = null;
									input_bottom.style.borderBottomWidth = null;
									input_bottom.style.borderBottomColor = null;
								}, 1000);
							} else if (input_top.value == "") {
								input_top.style.borderBottom = "solid";
								input_top.style.borderBottomWidth = "1px";
								input_top.style.borderBottomColor = "red";
								setTimeout(() => {
									input_top.style.borderBottom = null;
									input_top.style.borderBottomWidth = null;
									input_top.style.borderBottomColor = null;
								}, 1000);
							} else if (input_bottom.value == "") {
								input_bottom.style.borderBottom = "solid";
								input_bottom.style.borderBottomWidth = "1px";
								input_bottom.style.borderBottomColor = "red";
								setTimeout(() => {
									input_bottom.style.borderBottom = null;
									input_bottom.style.borderBottomWidth = null;
									input_bottom.style.borderBottomColor = null;
								}, 1000);
							} else {
								input_top.disabled = true;
								input_bottom.disabled = true;
								input_button.disabled = true;
								match_result_update(input_top, input_bottom);
							}
						} else {
							if (input_top.value == "") {
								input_top.style.borderBottom = "solid";
								input_top.style.borderBottomWidth = "1px";
								input_top.style.borderBottomColor = "red";
								setTimeout(() => {
									input_top.style.borderBottom = null;
									input_top.style.borderBottomWidth = null;
									input_top.style.borderBottomColor = null;
								}, 1000);
							} else if (input_bottom.value == "") {
								input_bottom.style.borderBottom = "solid";
								input_bottom.style.borderBottomWidth = "1px";
								input_bottom.style.borderBottomColor = "red";
								setTimeout(() => {
									input_bottom.style.borderBottom = null;
									input_bottom.style.borderBottomWidth = null;
									input_bottom.style.borderBottomColor = null;
								}, 1000);
							} else {
								input_top.disabled = true;
								input_bottom.disabled = true;
								input_button.disabled = true;
								match_result_update(input_top, input_bottom);
							}
						}

					});
				}

				let span_bold_top = document.createElement("b");
				span_bold_top.appendChild(document.createTextNode("G" + i + " | "));

				let span_bold_bottom = document.createElement("b");
				span_bold_bottom.appendChild(document.createTextNode("G" + i + " | "));

				let temp_team_top = document.createTextNode(matches[i - 1][k][0]);
				let temp_team_bottom = document.createTextNode(matches[i - 1][k][1]);
				li_top.appendChild(span_bold_top);
				li_top.appendChild(temp_team_top);
				li_top.appendChild(input_top);
				li_bottom.appendChild(span_bold_bottom);
				li_bottom.appendChild(temp_team_bottom);
				li_bottom.appendChild(input_bottom);
				li_spacer.appendChild(input_button);

				ul.appendChild(li_top);
				ul.appendChild(li_spacer);
				ul.appendChild(li_bottom);

			}
			bracket.appendChild(ul);
			temp_array = [];
			temp_array_ready = [];
		}
		let next = document.createElement("input");
		next.id = "przycisk_form_next";
		next.setAttribute("type", "button");
		next.setAttribute("value", lang[35]);
		document.getElementsByClassName("main")[1].appendChild(next);

		let reset = document.createElement("input");
		reset.id = "przycisk_form_reset";
		reset.setAttribute("type", "button");
		reset.setAttribute("value", lang[36]);
		document.getElementsByClassName("main")[1].appendChild(reset);

		document.getElementById("przycisk_form_next").addEventListener("click", () => {
			let total_teams = localStorage.getItem("promotion_teams") * localStorage.getItem("groups");
			let next_counter = Math.log2(total_teams);
			localStorage.setItem("next_counter", next_counter);
			let teams_names = JSON.parse(localStorage.getItem("teams_names"));
			let temp_array = [];
			let temp_array_as = [];
			let matches_next = JSON.parse(localStorage.getItem("matches_next"));

			for (let i = 1; i <= localStorage.getItem("groups"); i++) {
				for (let j = 0; j < teams_names.length; j++) {
					if (teams_names[j]["group"] == i) {
						temp_array.push(teams_names[j]);
						temp_array_as.push(teams_names[j]);
					}
				}
				temp_array.sort(function (a, b) {
					return a.points - b.points;
				});

				temp_array_as.sort(function (a, b) {
					return a.points - b.points;
				});

				for (let x = 0; x < document.getElementsByClassName("przycisk_form_tiny_tournament").length; x++) {
					if (document.getElementsByClassName("przycisk_form_tiny_tournament")[x].value == "") {
						for (let y = 0; y < document.getElementsByClassName("przycisk_form_tiny_tournament").length; y++) {
							document.getElementsByClassName("przycisk_form_tiny_tournament")[y].style.borderBottom = "solid";
							document.getElementsByClassName("przycisk_form_tiny_tournament")[y].style.borderBottomWidth = "1px";
							document.getElementsByClassName("przycisk_form_tiny_tournament")[y].style.borderBottomColor = "red";

						}

						setTimeout(() => {
							for (let y = 0; y < document.getElementsByClassName("przycisk_form_tiny_tournament").length; y++) {
								document.getElementsByClassName("przycisk_form_tiny_tournament")[y].style.borderBottom = null;
								document.getElementsByClassName("przycisk_form_tiny_tournament")[y].style.borderBottomWidth = null;
								document.getElementsByClassName("przycisk_form_tiny_tournament")[y].style.borderBottomColor = null;
							}
						}, 3000);

						return 0;
					}
				}

				console.log(temp_array);

				temp_array_as.splice(temp_array_as.length - localStorage.getItem("promotion_teams"), localStorage.getItem("promotion_teams"));

				temp_array.splice(0, temp_array.length - localStorage.getItem("promotion_teams"));

				for (let j = 0; j < temp_array_as.length; j++) {
					for (let k = 0; k < temp_array.length; k++) {
						if (temp_array_as[j].points == temp_array[k].points) {
							if (temp_array_as[j].win == temp_array[k].win) {
								if (temp_array_as[j].draw == temp_array[k].draw) {
									if (temp_array_as[j].lose == temp_array[k].lose) {
										let rand_temp = Math.random() < 0.5 ? j : k;
										if (rand_temp == j)
											temp_array[k] = [temp_array_as[j], temp_array_as[j] = temp_array[k]][0];
										else
											temp_array[k] = temp_array[k];
									} else if (temp_array_as[j].lose < temp_array[k].lose) {
										temp_array[k] = [temp_array_as[j], temp_array_as[j] = temp_array[k]][0];
									} else {
										continue;
									}
								} else if (temp_array_as[j].draw > temp_array[k].draw) {
									temp_array[k] = [temp_array_as[j], temp_array_as[j] = temp_array[k]][0];
								} else {
									continue;
								}
							} else if (temp_array_as[j].win > temp_array[k].win) {
								temp_array[k] = [temp_array_as[j], temp_array_as[j] = temp_array[k]][0];
							} else {
								continue;
							}
						} else {
							continue;
						}
					}
				}


				if (temp_array.length == 1) {
					if (i % 2 != 0) {
						matches_next[0].push([]);
						matches_next[0][0].push(temp_array[0]["name"]);
						temp_array = [];
						temp_array_as = [];
					}
					if (i % 2 == 0) {
						matches_next[0][matches_next[0].length - 1].push(temp_array[0]["name"]);
						let check = false;
						let match_index = 0;
						do {
							match_index = Math.floor(Math.random() * 100000) + 1;
							for (let p = 0; p < matches_next.length; p++) {
								if (matches_next[p][4] == match_index) {
									check = true;
									break;
								} else {
									check = false;
								}
							}
						} while (check == true);
						matches_next[0][matches_next[0].length - 1].push("");
						matches_next[0][matches_next[0].length - 1].push("");
						matches_next[0][matches_next[0].length - 1].push(match_index);
						localStorage.setItem("matches_next", JSON.stringify(matches_next));
					}
				} else {
					for (let k = 0; k < temp_array.length; k += 2) {
						matches_next[0].push([temp_array[k]["name"], temp_array[k + 1]["name"]]);
						let check = false;
						let match_index = 0;
						do {
							match_index = Math.floor(Math.random() * 100000) + 1;
							for (let p = 0; p < matches_next.length; p++) {
								if (matches_next[p][4] == match_index) {
									check = true;
									break;
								} else {
									check = false;
								}
							}
						} while (check == true);
						matches_next[0][matches_next[0].length - 1].push("");
						matches_next[0][matches_next[0].length - 1].push("");
						matches_next[0][matches_next[0].length - 1].push(match_index);
					}
					temp_array = [];
					temp_array_as = [];
					localStorage.setItem("matches_next", JSON.stringify(matches_next));
				}
			}

			for (let i = 1; i <= next_counter - 1; i++) {
				let temp = total_teams;
				for (let j = 0; j < i; j++) {
					temp /= 2;
					temp /= 2;
				}
				matches_next.push([]);
				for (let j = 0; j < temp; j++) {
					matches_next[i].push([]);
					matches_next[i][j].push("", "");
					let check = false;
					let match_index = 0;
					do {
						match_index = Math.floor(Math.random() * 100000) + 1;
						for (let p = 0; p < matches_next.length; p++) {
							if (matches_next[p][4] == match_index) {
								check = true;
								break;
							} else {
								check = false;
							}
						}
					} while (check == true);
					matches_next[i][matches_next[i].length - 1].push("", "");
					matches_next[i][matches_next[i].length - 1].push(match_index);
				}
				localStorage.setItem("matches_next", JSON.stringify(matches_next));
			}

			document.getElementById("przycisk_form_next").disabled = true;
			localStorage.setItem("started_next", true);

			tournament_next(next_counter);
		});

		document.getElementById("przycisk_form_reset").addEventListener("click", () => {
			let history = localStorage.getItem("history");
			let cookies = localStorage.getItem("cookies");
			localStorage.clear();
			localStorage.setItem("history", history);
			localStorage.setItem("cookies", cookies);
			location.reload();
		});
	}

	function tournament_next(next_counter) {
		let matches_next = JSON.parse(localStorage.getItem("matches_next"));

		for (let i = 0; i < next_counter; i++) {
			let bracket = document.getElementById("tournament");
			let ul = document.createElement("ul");
			ul.classList.add("round");

			for (let j = 0; j < matches_next[i].length; j++) {
				let li_top = document.createElement("li");
				li_top.classList.add("game-top");
				let li_spacer = document.createElement("li");
				let spacer_text = document.createTextNode("\xa0");
				li_spacer.classList.add("game-spacer");
				li_spacer.appendChild(spacer_text);
				let li_bottom = document.createElement("li");
				li_bottom.classList.add("game-bottom");

				let input_top = document.createElement("input");
				let input_bottom = document.createElement("input");
				let input_button = document.createElement("input");
				input_top.classList.add("przycisk_form_tiny_tournament");
				input_top.id = matches_next[i][j][4] + "_top";
				input_top.setAttribute("placeholder", "P");
				input_top.setAttribute("type", "number");
				input_top.setAttribute("min", "0");
				input_bottom.classList.add("przycisk_form_tiny_tournament");
				input_bottom.id = matches_next[i][j][4] + "_bottom";
				input_bottom.setAttribute("placeholder", "P");
				input_bottom.setAttribute("type", "number");
				input_bottom.setAttribute("min", "0");

				input_button.classList.add("przycisk_form_tournament_button");
				input_button.id = matches_next[i][j][4];
				input_button.setAttribute("type", "button");
				input_button.setAttribute("value", lang[34]);

				let temp_team_top = document.createTextNode(matches_next[i][j][0]);
				let temp_team_bottom = document.createTextNode(matches_next[i][j][1]);
				li_top.appendChild(temp_team_top);
				li_top.appendChild(input_top);
				li_bottom.appendChild(temp_team_bottom);
				li_bottom.appendChild(input_bottom);
				li_spacer.appendChild(input_button);

				if (matches_next[i][j][0] == "" || matches_next[i][j][1] == "") {
					input_button.disabled = true;
				}

				if (matches_next[i][j][2] != "" && matches_next[i][j][3] != "") {
					input_top.disabled = true;
					input_bottom.disabled = true;
					input_button.disabled = true;
					input_top.setAttribute("value", matches_next[i][j][2]);
					input_bottom.setAttribute("value", matches_next[i][j][3]);
				} else {
					input_button.addEventListener("click", () => {
						if (input_top.value == input_bottom.value) {
							input_top.style.borderBottom = "solid";
							input_top.style.borderBottomWidth = "1px";
							input_top.style.borderBottomColor = "red";
							input_bottom.style.borderBottom = "solid";
							input_bottom.style.borderBottomWidth = "1px";
							input_bottom.style.borderBottomColor = "red";
							setTimeout(() => {
								input_top.style.borderBottom = null;
								input_top.style.borderBottomWidth = null;
								input_top.style.borderBottomColor = null;
								input_bottom.style.borderBottom = null;
								input_bottom.style.borderBottomWidth = null;
								input_bottom.style.borderBottomColor = null;
							}, 1000);
						} else if (input_top.value == "") {
							input_top.style.borderBottom = "solid";
							input_top.style.borderBottomWidth = "1px";
							input_top.style.borderBottomColor = "red";
							setTimeout(() => {
								input_top.style.borderBottom = null;
								input_top.style.borderBottomWidth = null;
								input_top.style.borderBottomColor = null;
							}, 1000);
						} else if (input_bottom.value == "") {
							input_bottom.style.borderBottom = "solid";
							input_bottom.style.borderBottomWidth = "1px";
							input_bottom.style.borderBottomColor = "red";
							setTimeout(() => {
								input_bottom.style.borderBottom = null;
								input_bottom.style.borderBottomWidth = null;
								input_bottom.style.borderBottomColor = null;
							}, 1000);
						} else {
							input_top.disabled = true;
							input_bottom.disabled = true;
							input_button.disabled = true;
							match_result_update_next(input_top, input_bottom);
						}
					});
				}

				ul.appendChild(li_top);
				ul.appendChild(li_spacer);
				ul.appendChild(li_bottom);
			}
			bracket.appendChild(ul);
		}
	}

	function match_result_update_next(input_top, input_bottom) {
		let result = input_top.value;
		let index = input_top.id;
		let matches = JSON.parse(localStorage.getItem("matches_next"));
		let teams_names = JSON.parse(localStorage.getItem("teams_names"));
		let finisher = false;

		for (let i = 0; i < matches.length; i++) {
			for (let j = 0; j < matches[i].length; j++) {
				if (matches[i][j][4] + "_top" == index) {
					matches[i][j][2] = result;
					for (let k = 0; k < teams_names.length; k++) {
						if (teams_names[k].name == matches[i][j][0]) {
							if (matches[i][j][2] > matches[i][j][3]) {
								if (j % 2 == 0 && matches.length - 1 >= i + 1) {
									matches[i + 1][Math.floor(j / 2)][0] = teams_names[k].name;
									if (matches[i + 1][Math.floor(j / 2)][1] != "") {
										document.getElementById(matches[i + 1][Math.floor(j / 2)][4]).disabled = false;
									}
								}
								if (j % 2 != 0 && matches.length - 1 >= i + 1) {
									matches[i + 1][Math.floor(j / 2)][1] = teams_names[k].name;
									if (matches[i + 1][Math.floor(j / 2)][0] != "") {
										document.getElementById(matches[i + 1][Math.floor(j / 2)][4]).disabled = false;
									}
								}
								if (matches.length - 1 == i) {
									finisher = true;
								}
								teams_names[k].win++;
							} else if (matches[i][j][2] < matches[i][j][3]) {
								teams_names[k].lose++;
							} else {
								teams_names[k].draw++;
							}
						}
					}
				}
			}

		}
		localStorage.setItem("matches_next", JSON.stringify(matches));
		localStorage.setItem("teams_names", JSON.stringify(teams_names));

		result = input_bottom.value;
		index = input_bottom.id;
		matches = JSON.parse(localStorage.getItem("matches_next"));
		teams_names = JSON.parse(localStorage.getItem("teams_names"));
		for (let i = 0; i < matches.length; i++) {
			for (let j = 0; j < matches[i].length; j++) {
				if (matches[i][j][4] + "_bottom" == index) {
					matches[i][j][3] = result;
					for (let k = 0; k < teams_names.length; k++) {
						if (teams_names[k].name == matches[i][j][1]) {
							if (matches[i][j][2] < matches[i][j][3]) {
								if (j % 2 == 0 && matches.length - 1 >= i + 1) {
									matches[i + 1][Math.floor(j / 2)][0] = teams_names[k].name;
									if (matches[i + 1][Math.floor(j / 2)][1] != "") {
										document.getElementById(matches[i + 1][Math.floor(j / 2)][4]).disabled = false;
									}
								}
								if (j % 2 != 0 && matches.length - 1 >= i + 1) {
									matches[i + 1][Math.floor(j / 2)][1] = teams_names[k].name;
									if (matches[i + 1][Math.floor(j / 2)][0] != "") {
										document.getElementById(matches[i + 1][Math.floor(j / 2)][4]).disabled = false;
									}
								}
								if (matches.length - 1 == i) {
									finisher = true;
								}
								teams_names[k].win++;
							} else if (matches[i][j][2] > matches[i][j][3]) {
								teams_names[k].lose++;
							} else {
								teams_names[k].draw++;
							}
						}
					}
				}
			}
		}
		localStorage.setItem("matches_next", JSON.stringify(matches));
		localStorage.setItem("teams_names", JSON.stringify(teams_names));
		for (let i = document.getElementsByClassName("round").length - 1; i >= 1; i--) {
			document.getElementsByClassName("round")[i].remove();
		}
		let next_counter = localStorage.getItem("next_counter");
		if (finisher == true) {
			finish(1);
			localStorage.setItem("finished", true);
			let wys = document.getElementsByClassName("main_top")[1].offsetTop;
			smoothScrollUp(wys);
		}
		tournament_next(next_counter);
		matches = [];
	}

	function finish(just_finished) {
		let matches_next = JSON.parse(localStorage.getItem("matches_next"));
		let teams_names = JSON.parse(localStorage.getItem("teams_names"));
		let winner_box = document.createElement("div");
		winner_box.id = "winner_box";
		let h2 = document.createElement("h2");
		let header = document.createTextNode(lang[37]);

		let winner, winner_statistics;

		if (matches_next[matches_next.length - 1][0][2] > matches_next[matches_next.length - 1][0][3]) {
			winner = matches_next[matches_next.length - 1][0][0];
			for (let i = 0; i < teams_names.length; i++) {
				if (teams_names[i].name == winner) {
					winner_statistics = teams_names[i];
				}
			}
		}
		if (matches_next[matches_next.length - 1][0][2] < matches_next[matches_next.length - 1][0][3]) {
			winner = matches_next[matches_next.length - 1][0][2];
			for (let i = 0; i < teams_names.length; i++) {
				if (teams_names[i].name == winner) {
					winner_statistics = teams_names[i];
				}
			}
		}

		let winner_name = document.createTextNode(winner);
		h2.appendChild(header);
		winner_box.appendChild(h2);
		winner_box.appendChild(winner_name);
		winner_box.appendChild(document.createElement("br"));
		winner_box.appendChild(document.createElement("br"));
		winner_box.appendChild(document.createTextNode(lang[38]+": "));
		winner_box.appendChild(document.createTextNode(winner_statistics["win"]));
		winner_box.appendChild(document.createElement("br"));
		winner_box.appendChild(document.createTextNode(lang[39]+": "));
		winner_box.appendChild(document.createTextNode(winner_statistics["draw"]));
		winner_box.appendChild(document.createElement("br"));
		winner_box.appendChild(document.createTextNode(lang[40]+": "));
		winner_box.appendChild(document.createTextNode(winner_statistics["lose"]));
		winner_box.appendChild(document.createElement("br"));
		document.querySelectorAll(".main_top div")[1].appendChild(winner_box);
		if (just_finished == 1) {
			function sprawdz(i) {
				if (i < 10) {
					i = "0" + i
				};
				return i;
			}

			let date = new Date();
			let Y = date.getFullYear();
			let m = date.getMonth() + 1;
			let d = date.getDate();

			let H = date.getHours();
			let i = date.getMinutes();
			let s = date.getSeconds();
			m = sprawdz(m);
			d = sprawdz(d);
			i = sprawdz(i);
			s = sprawdz(s);
			let date_to_base = Y + "." + m + "." + d + " " + H + ":" + i + ":" + s;
			let history = JSON.parse(localStorage.getItem("history"));
			history.push([winner_statistics, date_to_base]);
			localStorage.setItem("history", JSON.stringify(history));
		}
	}
});

function combinations(set, k) {
	let matches = JSON.parse(localStorage.getItem("matches"));
	var i, j, combs, head, tailcombs;

	if (k > set.length || k <= 0) {
		return [];
	}

	if (k == set.length) {
		return [set];
	}

	if (k == 1) {
		combs = [];
		for (i = 0; i < set.length; i++) {
			combs.push([set[i]]);
		}
		return combs;
	}

	combs = [];
	for (i = 0; i < set.length - k + 1; i++) {
		head = set.slice(i, i + 1);
		tailcombs = combinations(set.slice(i + 1), k - 1);
		for (j = 0; j < tailcombs.length; j++) {
			combs.push(head.concat(tailcombs[j]));
		}
	}
	return combs;
}

function match_result_update(input_top, input_bottom) {
	let result = input_top.value;
	let index = input_top.id;
	let matches = JSON.parse(localStorage.getItem("matches"));
	let teams_names = JSON.parse(localStorage.getItem("teams_names"));
	let winner_p = localStorage.getItem("winner_p");
	let lose_p = localStorage.getItem("lose_p");
	let draw_p = localStorage.getItem("draw_p");

	for (let i = 0; i < matches.length; i++) {
		for (let j = 0; j < matches[i].length; j++) {
			if (matches[i][j][4] + "_top" == index) {
				matches[i][j][2] = result;
				for (let k = 0; k < teams_names.length; k++) {
					if (teams_names[k].name == matches[i][j][0]) {
						if (matches[i][j][2] > matches[i][j][3]) {
							teams_names[k].win++;
							for (let l = 0; l < winner_p; l++) {
								teams_names[k].points++;
							}
						} else if (matches[i][j][2] < matches[i][j][3]) {
							teams_names[k].lose++;
							for (let l = 0; l < lose_p; l++) {
								teams_names[k].points++;
							}
						} else {
							teams_names[k].draw++;
							for (let l = 0; l < draw_p; l++) {
								teams_names[k].points++;
							}
						}
					}
				}
			}
		}

	}
	localStorage.setItem("matches", JSON.stringify(matches));
	localStorage.setItem("teams_names", JSON.stringify(teams_names));

	result = input_bottom.value;
	index = input_bottom.id;
	matches = JSON.parse(localStorage.getItem("matches"));
	teams_names = JSON.parse(localStorage.getItem("teams_names"));
	for (let i = 0; i < matches.length; i++) {
		for (let j = 0; j < matches[i].length; j++) {
			if (matches[i][j][4] + "_bottom" == index) {
				matches[i][j][3] = result;
				for (let k = 0; k < teams_names.length; k++) {
					if (teams_names[k].name == matches[i][j][1]) {
						if (matches[i][j][2] < matches[i][j][3]) {
							teams_names[k].win++;
							for (let l = 0; l < winner_p; l++) {
								teams_names[k].points++;
							}
						} else if (matches[i][j][2] > matches[i][j][3]) {
							teams_names[k].lose++;
							for (let l = 0; l < lose_p; l++) {
								teams_names[k].points++;
							}
						} else {
							teams_names[k].draw++;
							for (let l = 0; l < draw_p; l++) {
								teams_names[k].points++;
							}
						}
					}
				}
			}
		}

	}
	localStorage.setItem("matches", JSON.stringify(matches));
	localStorage.setItem("teams_names", JSON.stringify(teams_names));
	matches = [];
}

function is_power_of_two(x) {
	let flag = 0;
	let check = false;
	while (Math.pow(2, flag) <= x) {
		if (Math.pow(2, flag) == x) {
			check = true;
			break;
		}
		flag++;
	}
	return check;
}
