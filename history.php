<!DOCTYPE html>
<html>

<?php
  ob_start();
  require_once('function.php');
  set_language("history.php");
  if($_COOKIE['lang']=="en"){
    $text_content = english();
  }
  
  if($_COOKIE['lang']=="pl"){
    $text_content = polski();
  }
?>

	<head>
		<title>
			<?= $text_content[4] ?>
		</title>
		<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
		<link rel="stylesheet" type="text/css" href="style.css">
		<meta name="viewport" content="width=device-width, initial-scale=1" />
		<script src="script.js"></script>
		<script src="script_history.js"></script>
		<script>
			let lang = <?= json_encode($text_content) ?>;

		</script>
		<meta name="theme-color" content="#000" />
	</head>

	<body>
		<div id="courtain">
			<div style="margin: 0 auto; width: auto; text-align: center; line-height: 100vh;">
			</div>
		</div>
		<div id='belka'>
			<span id="zegarek"></span>
			<button class='przyciski_belka przyciski_menu_belka' disabled><?php echo $text_content[1]; ?></button>
			<button class='przyciski_belka przyciski_menu_belka' disabled><?php echo $text_content[2]; ?></button>
		</div>
		<div class="main_top">
			<div style="position: relative; top: 35%;">
				<button id='przycisk_main_top'><span style="top: 10px; position: relative;"><?php echo $text_content[5]; ?></span><br><span class="animacja_przycisk_main_top">T</span></button>
			</div>
		</div>

		<div class="main">
			<h2></h2>
			<div id="flex_history">

			</div>
		</div>

		<div id="cookies_warning">
			<?php echo $text_content[13]; ?> <a id="cookies_accept" class="link_option"><b><?php echo $text_content[14]; ?></b></a>
			<?php echo $text_content[15]; ?>
		</div>

		<div id="footer">
			<div id="copyright">
				<span style="color: rgb(156, 159, 163);">&copy 2018</span> Michał Pochopień <br>
				<a href="?l=pl">PL</a> | <a href="?l=en">ENG</a>
				<?php $location = "history.php"; change_lang($location); ?>
			</div>

			<div id="social_bar">
				<a class="social_icon" href="https://www.facebook.com/profile.php?id=100000771247530"></a>
				<a class="social_icon" href="https://www.instagram.com/m_pochopien/"></a>
				<a class="social_icon" href="https://twitter.com/m_pochopien"></a>
				<a class="social_icon" href="https://github.com/Wyimaginowany"></a>
				<a class="social_icon" href="https://www.linkedin.com/in/mpochopien/"></a>
			</div>
		</div>
	</body>

</html>
