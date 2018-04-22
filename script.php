<?php
  require_once('function.php');
  if($_COOKIE['lang']=="en"){
    $text_content = english();
  }
  
  if($_COOKIE['lang']=="pl"){
    $text_content = polski();
  }
?>

document.addEventListener("DOMContentLoaded", () => {
	let span = document.createElement("span");
	span.style.fontSize = "8vw";
	span.style.fontFamily = "roboto_regular";
	span.style.color = "rgba(255, 255, 255, 0.5)";
	document.querySelector("#courtain div").appendChild(span);

	setTimeout(() => {
		document.getElementById("courtain").style.marginLeft = "-100%";
		setTimeout(() => {
		document.getElementById("courtain").style.marginLeft = "-100%";
			document.getElementsByClassName("przyciski_menu_belka")[0].disabled = false;
			document.getElementsByClassName("przyciski_menu_belka")[1].disabled = false;
		}, 2000);
	}, 1000);

	setTimeout(() => {
		span.innerHTML = "";
	}, 2500);

	document.getElementsByClassName("przyciski_menu_belka")[1].addEventListener("click", () => {
		span.appendChild(document.createTextNode("<?= $text_content[4] ?>"));
		document.getElementById("courtain").style.marginLeft = "0%";

		if (document.getElementById("courtain").style.marginLeft == "0%") {
			setTimeout(() => {
				window.location.href = "history.php";
			}, 2000);
		}
	});

	document.getElementsByClassName("przyciski_menu_belka")[0].addEventListener("click", () => {
		span.appendChild(document.createTextNode("<?= $text_content[0] ?>"));
		document.getElementById("courtain").style.marginLeft = "0%";

		if (document.getElementById("courtain").style.marginLeft == "0%") {
			setTimeout(() => {
				window.location.href = "index.php";
			}, 2000);
		}
	});

	document.addEventListener("scroll", () => {
		if (window.pageYOffset > 100) {
			document.getElementById("belka").style.backgroundColor = "rgb(0,0,0)";
			document.querySelectorAll("#belka button")[0].classList.remove("przyciski_belka");
			document.querySelectorAll("#belka button")[1].classList.remove("przyciski_belka");
			document.querySelectorAll("#belka button")[0].classList.add("przyciski_belka_light");
			document.querySelectorAll("#belka button")[1].classList.add("przyciski_belka_light");
			document.querySelectorAll("#belka span")[0].style.color = "#fff";
		} else {
			document.getElementById("belka").style.backgroundColor = "rgba(0,0,0,0)";
			document.querySelectorAll("#belka button")[0].classList.remove("przyciski_belka_light");
			document.querySelectorAll("#belka button")[1].classList.remove("przyciski_belka_light");
			document.querySelectorAll("#belka button")[0].classList.add("przyciski_belka");
			document.querySelectorAll("#belka button")[1].classList.add("przyciski_belka");
			document.querySelectorAll("#belka span")[0].style.color = "#000";
		}
	});


	document.addEventListener("scroll", () => {
		if (window.pageYOffset > document.getElementsByClassName("main_top")[0].offsetHeight) {
			document.body.style.backgroundImage = "url(background1.jpg)";
		} else {
			document.body.style.backgroundImage = "url(background.jpg)";
		}
	});



	document.getElementById("przycisk_main_top").addEventListener("click", () => {
		let wys = document.getElementsByClassName("main_top")[0].offsetHeight;
		smoothScroll(wys);
	});

	function smoothScroll(wys) {
		window.scrollBy(0, 10);
		if (window.pageYOffset < wys) {
			if (window.pageYOffset + window.innerHeight >= document.body.scrollHeight) {
				return 0;
			}
			setTimeout(() => {
				smoothScroll(wys);
			}, 1);
		} else if (window.pageYOffset >= wys) {}
	}

	document.getElementById('przycisk_main_top').addEventListener('mouseover', () => {
		document.getElementsByClassName('animacja_przycisk_main_top')[0].style.top = '10px';
		document.getElementsByClassName('animacja_przycisk_main_top')[0].style.opacity = '1';
	});

	document.getElementById('przycisk_main_top').addEventListener('mouseout', () => {
		document.getElementsByClassName('animacja_przycisk_main_top')[0].style.top = '-10px';
		document.getElementsByClassName('animacja_przycisk_main_top')[0].style.opacity = '0';
	});

	function sprawdz(i) {
		if (i < 10) {
			i = "0" + i
		};
		return i;
	}

	setInterval(() => {
		let czas = new Date();
		let h = czas.getHours();
		let m = czas.getMinutes();
		let s = czas.getSeconds();
		m = sprawdz(m);
		s = sprawdz(s);
		document.getElementById("zegarek").innerHTML =
			h + ":" + m + ":" + s;
	}, 1000);
});
