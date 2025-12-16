"use strict";


let nav = document.getElementById("navigator");
let richtigeAntworten = 0;
let falscheAntworten = 0;
let runde = 1;
let currentSelection = 0;
let hasAnswered = false;

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

function spielNeuStarten() {
  runde = 1;
  richtigeAntworten = 0;
  falscheAntworten = 0;
  currentSelection = 0;
  hasAnswered = false;
  nav.resetToPage("home");
}

function aendereAlter() {
  document.getElementById("alter").value =
    document.getElementById("slider1").value;
}

function naechsteFrage() {
  currentSelection = 0;
  hasAnswered = false;
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
        "Die Häufigkeit im Mittel der von einer infizierten Person angesteckten Menschen wird als _____ bezeichnet";
      document.getElementById("antwortText1").textContent =
        "R-Wert";
      document.getElementById("antwortText2").textContent =
        "O-Wert";
      document.getElementById("antwortText3").textContent =
        "V-Wert";
      document.getElementById("antwortText4").textContent =
        "G-Wert";
      document.getElementById("bild1").setAttribute("src", "grafik/graphic.png");
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
        "Stange-Impfkommission";
      document.getElementById("bild1").setAttribute("src", "grafik/stiko.png");
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
    nav.resetToPage("end").then(function () {
      let isGood = richtigeAntworten >= falscheAntworten;
      let message = "";
      if (isGood) {
        message = "Super gemacht!";
      } else {
        message = "Nicht aufgeben!";
      }
      document.getElementById("end-message").textContent = message;

      let iconContainer = document.getElementById("end-icon");
      if (isGood) {
        iconContainer.style.display = "block";
        iconContainer.style.color = "#ffd700";
        iconContainer.innerHTML = '<i class="ion-ios-trophy"></i>';
      } else {
        iconContainer.style.display = "none";
      }

      document.getElementById("richtigeAntworten").textContent = richtigeAntworten;
      document.getElementById("falscheAntworten").textContent = falscheAntworten;
    });
  }
}

function selectAnswer(n) {
  if (hasAnswered) return;
  currentSelection = n;

  // Visual Feedback
  for (let i = 1; i <= 4; i++) {
    let btn = document.getElementById("antwortText" + i);
    if (btn) {
      if (i === n) {
        btn.classList.remove("button--outline");
      } else {
        btn.classList.add("button--outline");
      }
    }
  }
}

function handleResult(isCorrect) {
  let title = "";
  let message = "";
  if (isCorrect) {
    title = "Richtig";
    message = "Deine Antwort ist richtig!";
  } else {
    title = "Falsche Antwort";
    message = "Deine Antwort ist leider falsch.";
  }

  ons.notification.confirm({
    title: title,
    message: message,
    buttonLabels: ["Weiter"],
    callback: function (idx) {
      if (idx === 0) { // "Weiter" clicked
        if (isCorrect) {
          richtigeAntworten++;
        } else {
          falscheAntworten++;
        }

        // Handle Joker round logic if needed (it was logic specific to round 8 correct answer)
        // But looking at original code, round 8 correct answer had specific logic:
        // falscheAntworten = falscheAntworten - (falscheAntworten % 2);
        // We need to preserve this specific logic.
        // Let's pass a callback or handle it in the main flow? 
        // Actually, let's keep the increment logic outside or pass it in.
        // EXCEPT: The prompt implies simple "Richtig" or "Falsch". 
        // However, the original code had specific logic for scoring.
        // Let's adjust handleResult to be simple UI, and keeping state update logic in pruefeAntwort might be tricky if we want "Weiter" to trigger it.
        // Better approach: State update happens on "Weiter"? 
        // Risk: User sees "Richtig", closes dialog, sees question again.
        // If they click "Weiter" later, should it re-score? 
        // Or should scoring happen immediately and "Weiter" just navigates?
        // If scoring happens immediately, then "Close" allows them to see the question but they can't change the answer?
        // The prompt says: "Close just closes the alarm msg pop up, and continue send the user two the next question".
        // This implies they successfully answered.
        // If I update score immediately:
        // User answers -> Score++ -> Dialog. 
        // User closes dialog. User is on same page. 
        // User clicks answer again -> Score++ again? PROBLEM.
        //
        // Solution: Only update score when proceeding to next question?
        // Or disable buttons?
        // Let's follow the prompt: "continue send the user two the next question".
        // Use a callback for the "continue" action.

        runde++;
        naechsteFrage();
      }
    }
  });
}

function pruefeAntwort(antwortNr) {
  // If called with 0 (Submit), proceed.
  if (antwortNr !== 0) return; // Should not happen with new HTML, but safety check.

  if (hasAnswered) return;
  hasAnswered = true;

  let isCorrect = false;
  let isJokerCorrect = false;

  if (runde == 1) {
    if (document.getElementById("checkbox1").checked == false &&
      document.getElementById("checkbox2").checked == true) {
      isCorrect = true;
    }
  } else if (runde == 2) {
    if (currentSelection == 1) isCorrect = true;
  } else if (runde == 3) {
    if (currentSelection == 2) isCorrect = true;
  } else if (runde == 4) {
    if (document.getElementById("AusfuellenAntwort").value == "IfSG") isCorrect = true;
  } else if (runde == 5) {
    if (currentSelection == 3) isCorrect = true;
  } else if (runde == 6) {
    if (document.getElementById("AusfuellenAntwort").value == "Karl Wilhelm Lauterbach") isCorrect = true;
  } else if (runde == 7) {
    if (document.getElementById("checkbox1").checked == true &&
      document.getElementById("checkbox2").checked == false &&
      document.getElementById("checkbox3").checked == false &&
      document.getElementById("checkbox4").checked == true) {
      isCorrect = true;
    }
  } else if (runde == 8) {
    if (currentSelection == 3) {
      isCorrect = true;
      isJokerCorrect = true;
    }
  }

  let title = "";
  let message = "";
  if (isCorrect) {
    title = "Richtig";
    message = "Weiter so!";
  } else {
    title = "Falsche Antwort";
    message = "Das war leider nicht korrekt.";
  }

  ons.notification.confirm({
    title: title,
    message: message,
    buttonLabels: ["Weiter"],
    callback: function (idx) {
      if (idx === 0) { // Weiter
        if (isCorrect) {
          richtigeAntworten++;
          if (isJokerCorrect) {
            falscheAntworten = falscheAntworten - (falscheAntworten % 2);
          }
        } else {
          falscheAntworten++;
        }
        runde++;
        naechsteFrage();
      }
    }
  });
}
