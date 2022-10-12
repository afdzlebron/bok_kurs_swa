"use strict";


let nav = document.getElementById("navigator");
let richtigeAntworten = 0;
let falscheAntworten = 0;
let runde = 1;

let spielername = localStorage.getItem("sname");
let spieleralter = 0;
let land = "";
let geschlecht = "";

function speichereEinstellungen() {
  spielername = document.getElementById("spielername").value;

  if (document.getElementById("checkbox_f").checked == true) {
    geschlecht = "Frau";
  } else if (document.getElementById("checkbox_m").checked == true) {
    geschlecht = "Herr";
  } else {
    geschlecht = "Divers";
  }

  land = document.getElementById("land").value;

  if (isNaN(document.getElementById("alter").value)) {
    alert("Sie müssen bei Alter eine Zahl eingegebn!");
    //TODO Abbruch
  } else {
    spieleralter = document.getElementById("alter").value;
  }

  alert(
    "Folgende Daten wurden gespeichert: \nAlter: " +
      spieleralter +
      " \nName: " +
      spielername +
      " \nLand: " +
      land +
      " \nAnrede: " +
      geschlecht
  );

  nav.pushPage("home");
}

function aendereAlter() {
  //console.log("Test");
  document.getElementById("alter").value =
    document.getElementById("slider1").value;
}

function naechsteFrage() {
  if (runde == 1) {
    nav.resetToPage("frageJaNein").then(function () {
      document.getElementById("frageTextJaNein").textContent =
        "Sind Coronavirus, COVID-19 und SARS-COV-2 gleichbedeutend?";
      document.getElementById("JaNeinAntwort1").textContent = "Ja";
      document.getElementById("JaNeinAntwort2").textContent = "Nein";
      document
        .getElementById("bild1")
        .setAttribute("src", "grafik/wordsalat.png");
    });
  } else if (runde == 2) {
    nav.resetToPage("frage").then(function () {
      document.getElementById("frageText").textContent =
        "Unter dem R‑Wert wird die Reproduktionszahl R verstanden. Welche der unten aufgelisteten Beschreibungen bescreibt am besten, was die Reproduktionszahl bedeutet: ";
      document.getElementById("antwortText1").textContent =
        "Häufigkeit im Mittel der von einer infizierten Person angesteckten Menschen";
      document.getElementById("antwortText2").textContent =
        "Wie häufig Menschen durch eine infizierte Person sich anstecken. ";
      document.getElementById("antwortText3").textContent =
        "Geschwindigkeit der Virusvermehrung im Körper einer infizierten Person. ";
      document.getElementById("antwortText4").textContent =
        "Geschwindigkeit der Virusvermehrung innerhalb einer geographischen Zone ";
      document.getElementById("bild1").setAttribute("src", "grafik/r-wert.jpg");
    });
  } else if (runde == 3) {
    nav.resetToPage("frage").then(function () {
      document.getElementById("frageText").textContent =
        "Die 7-Tage-Inzidenz gibt die Anzahl von Personen pro _____ Einwohner an, die sich in den vergangenen 7 Tagen neu mit Corona infiziert haben";
      document.getElementById("antwortText1").textContent =
        "1,00,000 Einwohner";
      document.getElementById("antwortText2").textContent = "100,000 Einwohner";
      document.getElementById("antwortText3").textContent = "10,000 Einwohner";
      document.getElementById("antwortText4").textContent = "1,000 Einwohner";
      document.getElementById("bild1").setAttribute("src", "grafik/7tage.png");
    });
  } else if (runde == 4) {
    nav.resetToPage("frageAusfuellen").then(function () {
      document.getElementById("frageText").textContent =
        "Wie heißt die gesetzliche Grundlage für die Eindämmung der Sars-CoV-2-Pandemie in der Bundesrepublik Deutschland? (Erwartete Antwort: Abkürzung)";
      document
        .getElementById("bild1")
        .setAttribute("src", "grafik/paragraph.jpg");
    });
  } else if (runde == 5) {
    nav.resetToPage("frage").then(function () {
      document.getElementById("frageText").textContent =
        "Wofür steht die Abkürzung STIKO?";
      document.getElementById("antwortText1").textContent =
        "Ständige Impfen-kommission";
      document.getElementById("antwortText2").textContent =
        "Ständige Impfungskommissariat";
      document.getElementById("antwortText3").textContent =
        "Ständige Impfkommission";
      document.getElementById("antwortText4").textContent =
        "Ständige Impfungskommissionierung";
    });
  } else if (runde == 6) {
    nav.resetToPage("frageAusfuellen").then(function () {
      document.getElementById("frageText").textContent =
        "Wie heißt die Person, die derzeit als Deutscher Bundesminister für Gesundheit dient.(Erwartete Antwort: 1. Vor- 2. Vor- Nachname)";
      document.getElementById("bild1").setAttribute("src", "grafik/bmg.png");
    });
  } 
  else if (runde == 7) {
    nav.resetToPage("frageMehrfach").then(function () {
      document.getElementById("frageTextMehrfach").textContent =
        "Die häufigsten Symptome bei Infektionen mit dem Coronavirus sind: ";
        document.getElementById("mehrfachAntwort1").textContent = "Fieber";
        document.getElementById("mehrfachAntwort2").textContent = "Halluzinationen";
        document.getElementById("mehrfachAntwort3").textContent = "Krampfanfall";
        document.getElementById("mehrfachAntwort4").textContent = "Husten";
      
      document.getElementById("bild1").setAttribute("src", "grafik/symptom.jpg");
    });
  }

  else if (runde == 8) {
    nav.resetToPage("frage").then(function () {
      document.getElementById("frageText").textContent =
        "JOKER-Frage:   Wie heißt die neueste Variante des Corona-Virus? \n Bei einer richtigen Antwort werden die Hälfte der falschen Antworten entfernt";
      document.getElementById("antwortText1").textContent =
        "Omega";
      document.getElementById("antwortText2").textContent =
        "Omigron";
      document.getElementById("antwortText3").textContent =
        "Omikron";
      document.getElementById("antwortText4").textContent =
        "Omicron";
      document.getElementById("bild1").setAttribute("src", "grafik/joker.jpg");
    });
  }


  else {
    //TODO irgendwo schöner ausgeben, alert nur als Test
    alert(
      "Finito, Du hast " +
        richtigeAntworten + " richtige und " + falscheAntworten +
        " falsche Antworten" +
        "\n " + spielername + " Vielen Dank fürs Spielen"
    );
    nav.pushPage("home"); //Spiel zu Ende ggf. auch eine extra Seite dafür einrichten
  }
}

function pruefeAntwort(antwortNr) {
  if (
    runde == 1 &&
    document.getElementById("checkbox1").checked == false &&
    document.getElementById("checkbox2").checked == true
  ) {
    //richtig
    richtigeAntworten++;
    runde++;
    nav.resetToPage("auswertung").then(function () {
      document.getElementById("text_aufloesung").textContent =
        "Richtige Antwort!";
    });
  }
  else if (runde == 2 && antwortNr == 1) {
    //richtig
    richtigeAntworten++;
    runde++;
    nav.resetToPage("auswertung").then(function () {
      document.getElementById("text_aufloesung").textContent =
        "Richtige Antwort!";
    });
  } else if (runde == 3 && antwortNr == 2) {
    //richtig
    richtigeAntworten++;
    runde++;
    nav.resetToPage("auswertung").then(function () {
      document.getElementById("text_aufloesung").textContent =
        "Richtige Antwort!";
    });
  } else if (
    runde == 4 &&
    document.getElementById("AusfuellenAntwort").value == "IfSG"
  ) {
    //richtig
    richtigeAntworten++;
    runde++;
    nav.resetToPage("auswertung").then(function () {
      document.getElementById("text_aufloesung").textContent =
        "Richtige Antwort!";
    });
  } else if (
    runde == 5 && antwortNr == 3
  ) {
    //richtig
    richtigeAntworten++;
    runde++;
    nav.resetToPage("auswertung").then(function () {
      document.getElementById("text_aufloesung").textContent =
        "Richtige Antwort!";
    });
  } else if (
    runde == 6 &&
    document.getElementById("AusfuellenAntwort").value ==
      "Karl Wilhelm Lauterbach"
  ) {
    //richtig
    richtigeAntworten++;
    runde++;
    nav.resetToPage("auswertung").then(function () {
      document.getElementById("text_aufloesung").textContent =
        "Richtige Antwort!";
    });
  } else if (
    runde == 7 &&
    document.getElementById("checkbox1").checked == true &&
    document.getElementById("checkbox2").checked == false &&
    document.getElementById("checkbox3").checked == false &&
    document.getElementById("checkbox4").checked == true
  ) {
    //richtig
    richtigeAntworten++;
    runde++;
    nav.resetToPage("auswertung").then(function () {
      document.getElementById("text_aufloesung").textContent =
        "Richtige Antwort!";
    });
  } 
  else if (
    runde == 8 && antwortNr == 3
  ) {
    //richtig
    falscheAntworten = falscheAntworten - (falscheAntworten % 2);
    runde++;
    nav.resetToPage("auswertung").then(function () {
      document.getElementById("text_aufloesung").textContent =
        "Richtige Antwort!";
    });
  } 
  
  else {
    //falsch
    falscheAntworten++;
    runde++;
    nav.resetToPage("auswertung").then(function () {
      document.getElementById("text_aufloesung").textContent =
        "Falsche Antwort!";
    });
  }
}