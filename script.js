// ===== Study Plan Section =====
const lebronQuotes = {
    raw: [
        "“I’m going to use all my tools, my God-given ability, and make the best life I can with it.”",
        "“You have to be able to accept failure to get better.”",
        "“I like criticism. It makes you strong.”", 
        "Don't be afraid of failure. This is the way to succeed.", 
        "Something just doesn't pop under your nose; you have to work for it."
    ],
    medium: [
        "“I always say, decisions I make, I live with them.”",
        "“I’m chasing greatness.”",
        "“I’m comfortable with being uncomfortable.”",
        "The solutions to our problems rarely come as fast as we want them to, but it's our hope and faith that keep us going.",
        "Maybe my pain was motivation."

    ],
    wellDone: [
        "“I’m ready for whatever comes my way.”",
        "“I know what I’m capable of. I’m just going out there to prove it.”",
        "“It’s about being a professional.”",
        "Once you become a professional athlete or once you do anything well, then you're automatically a role model… I love it.",
        "We da best music"

    ]
};

const lebronImages = {
    raw: "images/rawbron.jpeg",
    medium: "images/mediubron.jpg.webp",
    wellDone: "welldonebron.jpg"
};

function generatePlan() {
    const examDate = new Date(document.getElementById("exam-date").value);
    const currentDate = new Date();
    const cookedLevel = document.getElementById("cooked-level").value;

    if (!examDate || isNaN(examDate)) {
        alert("Please select an exam date!");
        return;
    }

    const timeDiff = examDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
        alert("Exam date must be in the future!");
        return;
    }

    document.getElementById("result").style.display = "block";
    const randomQuote = lebronQuotes[cookedLevel][Math.floor(Math.random() * lebronQuotes[cookedLevel].length)];
    document.getElementById("quote").innerHTML = `<p>${randomQuote}</p>`;
    document.getElementById("countdown").innerHTML = `<p>⏳ ${daysLeft} days until the Finals!</p>`;

    let studyPlan = "";
    if (cookedLevel === "raw") {
        studyPlan = `<p>📚 <strong>Phase 1:</strong> Focus on fundamentals (2-3 hours/day).</p>`;
    } else if (cookedLevel === "medium") {
        studyPlan = `<p>📚 <strong>Phase 2:</strong> Practice problems (3-4 hours/day).</p>`;
    } else {
        studyPlan = `<p>📚 <strong>Phase 3:</strong> Mock exams & review (4-5 hours/day).</p>`;
    }

    document.getElementById("plan").innerHTML = studyPlan;
    document.getElementById("lebron-img").innerHTML = `<img src="${lebronImages[cookedLevel]}" alt="LeBron ${cookedLevel}">`;
}

// ===== To-Do List Section =====
function loadTasks() {
    const todoList = document.getElementById("todo-list");
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    todoList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            loadTasks();
        });
        li.appendChild(checkbox);

        const taskName = document.createElement("span");
        taskName.textContent = task.name;
        li.appendChild(taskName);

        const dateSpan = document.createElement("span");
        dateSpan.textContent = ` Due: ${task.due}`;
        dateSpan.style.fontSize = "0.8rem"; // Smaller text
        dateSpan.style.color = "#888";      // Optional: subtler color
        li.appendChild(dateSpan);

        todoList.appendChild(li);
    });
}


function addTask() {
    const taskInput = document.getElementById("task-input");
    const dueDate = document.getElementById("due-date");
    const taskName = taskInput.value.trim();
    const due = dueDate.value;

    if (taskName === "" || due === "") {
        alert("Please enter both task name and due date!");
        return;
    }

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ name: taskName, due: due });
    localStorage.setItem("tasks", JSON.stringify(tasks));
    taskInput.value = "";
    dueDate.value = "";
    loadTasks();
}

// ===== Theme Switcher =====
function applyTheme() {
    const savedTheme = localStorage.getItem("lebronTeamTheme") || "lakers";
    document.getElementById("team-select").value = savedTheme;
    document.body.classList.add(`${savedTheme}-theme`);
}

document.addEventListener("DOMContentLoaded", () => {
    applyTheme();

    document.getElementById("team-select").addEventListener("change", function() {
        document.body.classList.remove("lakers-theme", "cavaliers-theme", "heat-theme");
        const selectedTeam = this.value;
        document.body.classList.add(`${selectedTeam}-theme`);
        localStorage.setItem("lebronTeamTheme", selectedTeam);
    });

    if (document.getElementById("generate-btn")) {
        document.getElementById("generate-btn").addEventListener("click", generatePlan);
    }

    if (document.getElementById("todo-list")) {
        loadTasks();
        document.getElementById("add-task").addEventListener("click", addTask);
    }
});

//Calender 
