<?php

function set_language($location) {
    if(!isset($_COOKIE['lang'])){
        setcookie("lang", "en", time()+(31 * 24 * 60 * 60));
        header("Location: $location");
    }
}

function change_lang($location) {
    if(isset($_GET['l'])){
        $lang = $_GET['l'];
        setcookie("lang", $lang, time()+(31 * 24 * 60 * 60));
        header("Location:".$location);
    }
}

function english() {
    return $text_content = array(
        "Main page", //0
        "TOURNAMENT BRACKET", //1
        "HISTORY", //2
        "LET'S START!", //3
        "History", //4
        "SEE HISTORY!", //5
        "Sender", //6
        "Enter topic", //7
        "Enter your message", //8
        "Send", //9
        "Contact", //10
        "Error!", //11
        "E-mail send succesufly!", //12
        "This site is using cookies. Click ", //13
        "accept", //14
        " if you're accepting cookies.", //15
		"Number of teams", //16
		"Number of groups", //17
		"First, enter number of groups and teams", //18
		"Add", //19
		"Points for win", //20
		"Points for draw", //21
		"Points for lose", //22
        "Add team", //23
        "Teams", //24
        "Possible draw", //25
        "Yes", //26
        "No", //27
        "You can't add more teams", //28
		"Number of teams with promotion from group (has to be power of two - can be one if number of groups is even)", //29
		"Start of tournament!", //30
		" teams in each group", //31
		" in one of them", //32
        "Group", //33
		"Confirm", //34
		"Go forward", //35
		"Reset", //36
		"And the winner is...", //37
		"Wins", //38
		"Draws", //39
		"Loses", //40
		"Currently your history of tournaments is empty", //41
		"History of tournaments", //42
		"Winner", //43
		"Random groups", //44
		"Start tournament to generate bracket", //45
		"Reset history" //46
    );
}

function polski() {
    return $text_content = array(
        "Strona główna", //0
        "DRABINKA TURNIEJOWA", //1
        "HISTORIA", //2
        "ZACZYNAJMY!", //3
        "Historia", //4
        "ZOBACZ HISTORIĘ!", //5
        "Nadawca", //6
        "Wpisz temat", //7
        "Wpisz treść", //8
        "Wyślij", //9
        "Kontakt", //10
        "Błąd!", //11
        "E-mail wysłany pomyślnie!", //12
        "Ta strona używa ciasteczek. Kliknij ", //13
        "akceptuj", //14
        " jeżeli je akceptujesz.", //15
		"Liczba drużyn", //16
		"Liczba grup", //17
		"Najpierw podaj ilość drużyn i grup", //18
		"Dodaj", //19
		"Punkty za wygraną", //20
		"Punkty za remis", //21
		"Punkty za przegraną", //22
        "Dodaj drużynę", //23
        "Drużyny", //24
        "Możliwy remis", //25
        "Tak", //26
        "Nie", //27
        "Nie możesz dodać więcej drużyn", //28
		"Liczba drużyn awansujących z grupy (potęga liczby 2 - może być 1, pod warunkiem parzystej liczby grup)", //29
		"Start turnieju!", //30
		" drużyny w każdej grupie, ", //31
		" w jednej z nich", //32
        "Grupa", //33
		"Zatwierdź", //34
		"Idź dalej", //35
		"Reset", //36
		"Zwycięzcą zostaje...", //37
		"Zwycięstwa", //38
		"Remisy", //39
		"Przegrane", //40
		"Obecnie historia turniejów jest pusta", //41
		"Historia turniejów", //42
		"Zwycięzca", //43
		"Losowe grupy", //44
		"Rozpocznij turniej, aby wygenerować drabinkę", //45
		"Resetuj historię" //46
    );
}

function cookie_set($location)
{
    if(isset($_GET['a'])) {
        setcookie("cookie_accept", "1", time()+(31 * 24 * 60 * 60));
        header("Location: $location");
    }
}

function cookie_display()
{
    if(isset($_COOKIE['cookie_accept'])) {
        echo "style='display: none;'"; 
    }
}