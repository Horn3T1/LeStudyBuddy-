// LeBron quotes for each "phase" (based on NBA seasons)
const lebronQuotes = {
    raw: [
        "“I’m going to use all my tools, my God-given ability, and make the best life I can with it.”",
        "“You have to be able to accept failure to get better.”",
        "“I like criticism. It makes you strong.”"
    ],
    medium: [
        "“I always say, decisions I make, I live with them.”",
        "“I’m chasing greatness.”",
        "“I’m comfortable with being uncomfortable.”"
    ],
    wellDone: [
        "“I’m ready for whatever comes my way.”",
        "“I know what I’m capable of. I’m just going out there to prove it.”",
        "“It’s about being a professional.”"
    ]
};

// LeBron images (you can replace with actual image URLs)
const lebronImages = {
    raw: "images/mediubron.jpg.webp",
    medium: "images/rawbron.jpeg",
    wellDone: "welldonebron.jpg"
};

document.getElementById("generate-btn").addEventListener("click", generatePlan);

function generatePlan() {
    const examDate = new Date(document.getElementById("exam-date").value);
    const currentDate = new Date();
    const cookedLevel = document.getElementById("cooked-level").value;

    if (!examDate) {
        alert("Please select an exam date!");
        return;
    }

    // Calculate days left
    const timeDiff = examDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
        alert("Exam date must be in the future!");
        return;
    }

    // Display results
    const resultSection = document.getElementById("result");
    resultSection.style.display = "block";

    // Show LeBron quote
    const randomQuote = lebronQuotes[cookedLevel][Math.floor(Math.random() * lebronQuotes[cookedLevel].length)];
    document.getElementById("quote").innerHTML = `<p>${randomQuote}</p>`;

    // Show countdown
    document.getElementById("countdown").innerHTML = `<p>⏳ ${daysLeft} days until the Finals (Exam Day)!</p>`;

    // Generate study plan based on days left & cooked level
    let studyPlan = "";
    if (cookedLevel === "raw") {
        studyPlan = `<p>📚 <strong>Phase 1:</strong> Focus on fundamentals (2-3 hours/day).</p>`;
    } else if (cookedLevel === "medium") {
        studyPlan = `<p>📚 <strong>Phase 2:</strong> Practice problems (3-4 hours/day).</p>`;
    } else {
        studyPlan = `<p>📚 <strong>Phase 3:</strong> Mock exams & review (4-5 hours/day).</p>`;
    }

    document.getElementById("plan").innerHTML = studyPlan;

    // Display LeBron image
    document.getElementById("lebron-img").innerHTML = `<img src="${lebronImages[cookedLevel]}" alt="LeBron ${cookedLevel}">`;
}