// ========== Animation Utilities ==========

// Fade-in effect
function fadeIn(element) {
    element.style.opacity = 0;
    element.style.display = "block";
    let opacity = 0;
    const timer = setInterval(() => {
        if (opacity >= 1) {
            clearInterval(timer);
        }
        element.style.opacity = opacity;
        opacity += 0.1;
    }, 40);
}

// Typewriter effect
function typeWriter(text, element, speed = 50) {
    element.innerHTML = "";
    let i = 0;
    function typing() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(typing, speed);
        }
    }
    typing();
}

// ========== Meal Logging (API Ninjas) ==========
document.getElementById("trackBtn").addEventListener("click", async function () {
    const foodInput = document.getElementById("foodInput").value.trim();
    const nutritionResult = document.getElementById("nutritionResult");

    if (foodInput) {
        try {
            const response = await fetch(`https://api.api-ninjas.com/v1/nutrition?query=${foodInput}`, {
                method: 'GET',
                headers: {
                    'X-Api-Key': 'LDFVe5FyQ2TCkGaJao5ybA==mBupn58aYbj2hClZ'
                }
            });

            if (!response.ok) throw new Error("Failed to fetch nutrition info");

            const data = await response.json();
            const item = data[0];

            const message = `🍌 ${item.name} - Calories: ${item.calories}, Protein: ${item.protein_g}g, Fat: ${item.fat_total_g}g`;
            typeWriter(message, nutritionResult);
            fadeIn(nutritionResult);
        } catch (error) {
            typeWriter("❌ Could not fetch nutrition info.", nutritionResult);
            fadeIn(nutritionResult);
            console.error(error);
        }
    } else {
        typeWriter("Please enter a food to log.", nutritionResult);
        fadeIn(nutritionResult);
    }
});

// ========== Mood & Energy Tracking ==========
document.getElementById("energy").addEventListener("change", function () {
    const mood = document.getElementById("mood").value;
    const energy = document.getElementById("energy").value;
    const message = `Mood: ${mood}, Energy: ${energy}. You're doing well! 🌟`;

    const moodSection = document.getElementById("mood-section");
    const output = document.createElement("div");
    output.id = "moodOutput";
    moodSection.appendChild(output);

    typeWriter(message, output);
    fadeIn(output);
});

// ========== Exercise Suggestion (Fixed for RapidAPI) ==========
document.getElementById("getExercise").addEventListener("click", async function () {
  const type = document.getElementById("exerciseType").value;
  const exerciseResult = document.getElementById("exerciseResult");

  // Map custom type to real ExerciseDB body part
  let bodyPart = "";
  switch (type) {
    case "arms":
      bodyPart = "upper arms";
      break;
    case "legs":
      bodyPart = "upper legs";
      break;
    case "core":
      bodyPart = "waist";
      break;
    case "cardio":
      bodyPart = "cardio";
      break;
    default:
      bodyPart = "cardio";
  }

  try {
    const response = await fetch(`https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'b257dcb8afmsh59ff997efabcb2fp156200jsncf48eac44b71',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    });

    if (!response.ok) throw new Error("Failed to fetch exercise");

    const data = await response.json();
    const random = data[Math.floor(Math.random() * data.length)];

    const message = `🏋️ ${random.name} — Equipment: ${random.equipment}, Target: ${random.target}`;
    typeWriter(message, exerciseResult);
    fadeIn(exerciseResult);
  } catch (error) {
    typeWriter("❌ Failed to load exercise suggestion.", exerciseResult);
    fadeIn(exerciseResult);
    console.error(error);
  }
});


// ========== Motivation Quote ==========
document.getElementById("getQuote").addEventListener("click", function () {
    const quoteDisplay = document.getElementById("quote");

    const quotes = [
        "You are stronger than you think.",
        "Every day is a fresh start.",
        "Believe in yourself and all that you are.",
        "Small steps every day lead to big results.",
        "Discipline is choosing between what you want now and what you want most."
    ];

    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    displayQuote(randomQuote);
});

function displayQuote(quoteText) {
    const quoteDisplay = document.getElementById("quote");
    typeWriter(`"${quoteText}"`, quoteDisplay, 60);
    fadeIn(quoteDisplay);
}
