"use strict";


let nav = document.getElementById("navigator");
let correctAnswersCount = 0;
let wrongAnswersCount = 0;
let round = 1;
let currentSelection = 0;
let hasAnswered = false;

let playerName = localStorage.getItem("sname");
let playerAge = 0;
let country = "";
let gender = "";

function saveSettings() {
  playerName = document.getElementById("playerName").value;

  if (document.getElementById("radio_female").checked == true) {
    gender = "Frau";
  } else if (document.getElementById("radio_male").checked == true) {
    gender = "Herr";
  } else {
    gender = "Divers";
  }

  country = document.getElementById("country").value;

  if (isNaN(document.getElementById("ageInput").value)) {
    alert("Sie müssen bei Alter eine Zahl eingegebn!");
  } else {
    playerAge = document.getElementById("ageInput").value;
  }

  alert(
    "Folgende Daten wurden gespeichert: \nAlter: " +
    playerAge +
    " \nName: " +
    playerName +
    " \nLand: " +
    country +
    " \nAnrede: " +
    gender
  );

  nav.pushPage("home");
}

function restartGame() {
  round = 1;
  correctAnswersCount = 0;
  wrongAnswersCount = 0;
  currentSelection = 0;
  hasAnswered = false;
  nav.resetToPage("home");
}

function updateAge() {
  document.getElementById("ageInput").value =
    document.getElementById("ageSlider").value;
}

function nextQuestion() {
  currentSelection = 0;
  hasAnswered = false;
  if (round == 1) {
    nav.resetToPage("questionYesNo").then(function () {
      document.getElementById("questionTextYesNo").textContent =
        "Sind Coronavirus, COVID-19 und SARS-COV-2 gleichbedeutend?";
      document.getElementById("yesNoAnswerText1").textContent = "Ja";
      document.getElementById("yesNoAnswerText2").textContent = "Nein";
      document
        .getElementById("questionImage")
        .setAttribute("src", "grafik/wordsalat.png");
    });
  } else if (round == 2) {
    nav.resetToPage("question").then(function () {
      document.getElementById("questionText").textContent =
        "Die Häufigkeit im Mittel der von einer infizierten Person angesteckten Menschen wird als _____ bezeichnet";
      document.getElementById("answerText1").textContent =
        "R-Wert";
      document.getElementById("answerText2").textContent =
        "O-Wert";
      document.getElementById("answerText3").textContent =
        "V-Wert";
      document.getElementById("answerText4").textContent =
        "G-Wert";
      document.getElementById("questionImage").setAttribute("src", "grafik/graphic.png");
    });
  } else if (round == 3) {
    nav.resetToPage("question").then(function () {
      document.getElementById("questionText").textContent =
        "Die 7-Tage-Inzidenz gibt die Anzahl von Personen pro _____ Einwohner an, die sich in den vergangenen 7 Tagen neu mit Corona infiziert haben";
      document.getElementById("answerText1").textContent =
        "1,00,000 Einwohner";
      document.getElementById("answerText2").textContent = "100,000 Einwohner";
      document.getElementById("answerText3").textContent = "10,000 Einwohner";
      document.getElementById("answerText4").textContent = "1,000 Einwohner";
      document.getElementById("questionImage").setAttribute("src", "grafik/7tage.png");
    });
  } else if (round == 4) {
    nav.resetToPage("questionFillIn").then(function () {
      document.getElementById("questionText").textContent =
        "Wie heißt die gesetzliche Grundlage für die Eindämmung der Sars-CoV-2-Pandemie in der Bundesrepublik Deutschland? (Erwartete Antwort: Abkürzung)";
      document
        .getElementById("questionImage")
        .setAttribute("src", "grafik/paragraph.jpg");
    });
  } else if (round == 5) {
    nav.resetToPage("question").then(function () {
      document.getElementById("questionText").textContent =
        "Wofür steht die Abkürzung STIKO?";
      document.getElementById("answerText1").textContent =
        "Ständige Impfen-kommission";
      document.getElementById("answerText2").textContent =
        "Ständige Impfungskommissariat";
      document.getElementById("answerText3").textContent =
        "Ständige Impfkommission";
      document.getElementById("answerText4").textContent =
        "Stange-Impfkommission";
      document.getElementById("questionImage").setAttribute("src", "grafik/stiko.png");
    });
  } else if (round == 6) {
    nav.resetToPage("questionFillIn").then(function () {
      document.getElementById("questionText").textContent =
        "Wie heißt die Person, die derzeit als Deutscher Bundesminister für Gesundheit dient.(Erwartete Antwort: 1. Vor- 2. Vor- Nachname)";
      document.getElementById("questionImage").setAttribute("src", "grafik/bmg.png");
    });
  }
  else if (round == 7) {
    nav.resetToPage("questionMultiple").then(function () {
      document.getElementById("questionTextMultiple").textContent =
        "Die häufigsten Symptome bei Infektionen mit dem Coronavirus sind: ";
      document.getElementById("multipleChoiceText1").textContent = "Fieber";
      document.getElementById("multipleChoiceText2").textContent = "Halluzinationen";
      document.getElementById("multipleChoiceText3").textContent = "Krampfanfall";
      document.getElementById("multipleChoiceText4").textContent = "Husten";

      document.getElementById("questionImage").setAttribute("src", "grafik/symptom.jpg");
    });
  }

  else if (round == 8) {
    nav.resetToPage("question").then(function () {
      document.getElementById("questionText").textContent =
        "JOKER-Frage:   Wie heißt die neueste Variante des Corona-Virus? \n Bei einer richtigen Antwort werden die Hälfte der falschen Antworten entfernt";
      document.getElementById("answerText1").textContent =
        "Omega";
      document.getElementById("answerText2").textContent =
        "Omigron";
      document.getElementById("answerText3").textContent =
        "Omikron";
      document.getElementById("answerText4").textContent =
        "Omicron";
      document.getElementById("questionImage").setAttribute("src", "grafik/joker.jpg");
    });
  }


  else {
    nav.resetToPage("end").then(function () {
      let isGood = correctAnswersCount >= wrongAnswersCount;
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

      document.getElementById("correctAnswersCount").textContent = correctAnswersCount;
      document.getElementById("wrongAnswersCount").textContent = wrongAnswersCount;
    });
  }
}

function selectAnswer(n) {
  if (hasAnswered) return;
  currentSelection = n;

  // Visual Feedback
  for (let i = 1; i <= 4; i++) {
    let btn = document.getElementById("answerText" + i);
    if (btn) {
      if (i === n) {
        btn.classList.remove("button--outline");
      } else {
        btn.classList.add("button--outline");
      }
    }
  }
}

function handleSelection(n) {
  selectAnswer(n);
  checkAnswer(0);
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
          correctAnswersCount++;
        } else {
          wrongAnswersCount++;
        }

        round++;
        nextQuestion();
      }
    }
  });
}

function checkAnswer(antwortNr) {
  // If called with 0 (Submit), proceed.
  if (antwortNr !== 0) return; // Should not happen with new HTML, but safety check.

  if (hasAnswered) return;
  hasAnswered = true;

  let isCorrect = false;
  let isJokerCorrect = false;

  if (round == 1) {
    if (currentSelection == 2) {
      isCorrect = true;
    }
  } else if (round == 2) {
    if (currentSelection == 1) isCorrect = true;
  } else if (round == 3) {
    if (currentSelection == 2) isCorrect = true;
  } else if (round == 4) {
    if (document.getElementById("fillInAnswerInput").value == "IfSG") isCorrect = true;
  } else if (round == 5) {
    if (currentSelection == 3) isCorrect = true;
  } else if (round == 6) {
    if (document.getElementById("fillInAnswerInput").value == "Karl Wilhelm Lauterbach") isCorrect = true;
  } else if (round == 7) {
    if (document.getElementById("checkbox_answer_1").checked == true &&
      document.getElementById("checkbox_answer_2").checked == false &&
      document.getElementById("checkbox_answer_3").checked == false &&
      document.getElementById("checkbox_answer_4").checked == true) {
      isCorrect = true;
    }
  } else if (round == 8) {
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
          correctAnswersCount++;
          if (isJokerCorrect) {
            wrongAnswersCount = wrongAnswersCount - (wrongAnswersCount % 2);
          }
        } else {
          wrongAnswersCount++;
        }
        round++;
        nextQuestion();
      }
    }
  });
}
