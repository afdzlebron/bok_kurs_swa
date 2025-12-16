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

const questions = [
  {
    type: "yes_no",
    template: "questionYesNo",
    text: "Sind Coronavirus, COVID-19 und SARS-COV-2 gleichbedeutend?",
    image: "grafik/wordsalat.png",
    altText: "Wortwolke mit Begriffen zu Coronavirus",
    answers: ["Ja", "Nein"],
    correctAnswerIndex: 1 // "Nein"
  },
  {
    type: "single_choice",
    template: "question",
    text: "Die Häufigkeit im Mittel der von einer infizierten Person angesteckten Menschen wird als _____ bezeichnet",
    image: "grafik/graphic.png",
    altText: "Grafik zur Ausbreitung des Virus",
    answers: ["R-Wert", "O-Wert", "V-Wert", "G-Wert"],
    correctAnswerIndex: 0 // "R-Wert"
  },
  {
    type: "single_choice",
    template: "question",
    text: "Die 7-Tage-Inzidenz gibt die Anzahl von Personen pro _____ Einwohner an, die sich in den vergangenen 7 Tagen neu mit Corona infiziert haben",
    image: "grafik/7tage.png",
    altText: "Kalenderblatt mit 7 Tagen markiert",
    answers: ["1,00,000 Einwohner", "100,000 Einwohner", "10,000 Einwohner", "1,000 Einwohner"],
    correctAnswerIndex: 1 // "100,000 Einwohner"
  },
  {
    type: "fill_in",
    template: "questionFillIn",
    text: "Wie heißt die gesetzliche Grundlage für die Eindämmung der Sars-CoV-2-Pandemie in der Bundesrepublik Deutschland? (Erwartete Antwort: Abkürzung)",
    image: "grafik/paragraph.jpg",
    altText: "Paragraphenzeichen",
    correctAnswer: "IfSG"
  },
  {
    type: "single_choice",
    template: "question",
    text: "Wofür steht die Abkürzung STIKO?",
    image: "grafik/stiko.png",
    altText: "Logo der STIKO",
    answers: ["Ständige Impfen-kommission", "Ständige Impfungskommissariat", "Ständige Impfkommission", "Stange-Impfkommission"],
    correctAnswerIndex: 2 // "Ständige Impfkommission"
  },
  {
    type: "fill_in",
    template: "questionFillIn",
    text: "Wie heißt die Person, die derzeit als Deutscher Bundesminister für Gesundheit dient.(Erwartete Antwort: 1. Vor- 2. Vor- Nachname)",
    image: "grafik/bmg.png",
    altText: "Bundesministerium für Gesundheit",
    correctAnswer: "Karl Wilhelm Lauterbach"
  },
  {
    type: "multiple_select",
    template: "questionMultiple",
    text: "Die häufigsten Symptome bei Infektionen mit dem Coronavirus sind: ",
    image: "grafik/symptom.jpg",
    altText: "Grafik von Krankheitssymptomen",
    answers: ["Fieber", "Halluzinationen", "Krampfanfall", "Husten"],
    correctAnswerIndices: [0, 3] // "Fieber", "Husten" (Indices 0 and 3)
  },
  {
    type: "single_choice",
    template: "question",
    text: "JOKER-Frage:   Wie heißt die neueste Variante des Corona-Virus? \n Bei einer richtigen Antwort werden die Hälfte der falschen Antworten entfernt",
    image: "grafik/joker.jpg",
    altText: "Joker Karte",
    answers: ["Omega", "Omigron", "Omikron", "Omicron"],
    correctAnswerIndex: 2, // "Omikron"
    isJoker: true
  }
];

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

function restartQuiz() {
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

  if (round > questions.length) {
    // Game Over
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
    return;
  }

  const q = questions[round - 1];

  nav.resetToPage(q.template).then(function () {
    // Update Progress Counter if it exists
    let progressEl = document.getElementById("progressCounter");
    if (progressEl) {
      progressEl.textContent = "Frage " + round + " von " + questions.length;
    }

    // Set Question Text and Image
    // Note: IDs in HTML templates must match these generic expectations or be handled per template
    let textEl = document.getElementById("questionText"); // Default
    if (q.type === 'yes_no') textEl = document.getElementById("questionTextYesNo");
    else if (q.type === 'multiple_select') textEl = document.getElementById("questionTextMultiple");

    if (textEl) textEl.textContent = q.text;

    let imgEl = document.getElementById("questionImage");
    if (imgEl) {
      imgEl.setAttribute("src", q.image);
      imgEl.setAttribute("alt", q.altText);
    }

    // Populate Answers
    if (q.type === 'yes_no') {
      document.getElementById("yesNoAnswerText1").textContent = q.answers[0];
      document.getElementById("yesNoAnswerText2").textContent = q.answers[1];
    } else if (q.type === 'single_choice' || q.type === 'multiple_select') {
      for (let i = 0; i < q.answers.length; i++) {
        // Handle ID differences: answerText1 vs multipleChoiceText1
        let idPrefix = (q.type === 'multiple_select') ? "multipleChoiceText" : "answerText";
        let btn = document.getElementById(idPrefix + (i + 1));
        if (btn) btn.textContent = q.answers[i];
      }
    }
    // Fill-in requires no answer population
  });
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

function checkAnswer(antwortNr) {
  // If called with 0 (Submit), proceed.
  if (antwortNr !== 0) return;

  if (hasAnswered) return;
  hasAnswered = true;

  let isCorrect = false;
  let isJokerCorrect = false;

  const q = questions[round - 1];

  if (q.type === 'yes_no') {
    // Yes is index 0 (value 1), No is index 1 (value 2)
    // Correct answer index in data is 0-based.
    // currentSelection is 1-based (from UI).
    if ((currentSelection - 1) === q.correctAnswerIndex) {
      isCorrect = true;
    }
  } else if (q.type === 'single_choice') {
    if ((currentSelection - 1) === q.correctAnswerIndex) {
      isCorrect = true;
      if (q.isJoker) isJokerCorrect = true;
    }
  } else if (q.type === 'fill_in') {
    let input = document.getElementById("fillInAnswerInput").value;
    // Robust validation: trim and lowercase
    if (input.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()) {
      isCorrect = true;
    }
  } else if (q.type === 'multiple_select') {
    // Hardcoded logic for checkboxes based on Round 7 indices [0, 3] (1 and 4 in UI)
    // We can make this dynamic if needed, but for now specific checking logic:
    let c1 = document.getElementById("checkbox_answer_1").checked;
    let c2 = document.getElementById("checkbox_answer_2").checked;
    let c3 = document.getElementById("checkbox_answer_3").checked;
    let c4 = document.getElementById("checkbox_answer_4").checked;

    // Check against q.correctAnswerIndices
    // Correct are 0 and 3 (1 and 4)
    if (c1 && !c2 && !c3 && c4) {
      isCorrect = true;
    }
  }

  let title = "";
  let message = "";
  if (isCorrect) {
    title = "Richtig";
    message = "Richtig! " + (isCorrect && !isJokerCorrect && q.type !== 'fill_in' ? "" : ""); // Custom messages could be added
    if (q.type === 'fill_in') message = "Deine Antwort ist richtig!";
    else message = "Weiter so!";

  } else {
    title = "Falsche Antwort";
    message = "Das war leider nicht korrekt.";
  }

  ons.notification.confirm({
    title: title,
    message: message,
    buttonLabels: ["Weiter"],
    callback: function (idx) {
      if (idx === 0) { // "Weiter" clicked
        if (isCorrect) {
          correctAnswersCount++;
          if (isJokerCorrect) {
            // Joker bonus: remove half of wrong answers from score?
            // Original logic: wrongAnswersCount = wrongAnswersCount - (wrongAnswersCount % 2);
            // Wait, original logic was: if joker correct, reduce bad points? 
            // "Bei einer richtigen Antwort werden die Hälfte der falschen Antworten entfernt"
            // Implementation:
            wrongAnswersCount = Math.floor(wrongAnswersCount / 2);
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
