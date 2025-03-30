// Study Plan Section
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

const lebronImages = {
    raw: "images/mediubron.jpg.webp",
    medium: "images/rawbron.jpeg",
    wellDone: "welldonebron.jpg"
};

if (document.getElementById("generate-btn")) {
    document.getElementById("generate-btn").addEventListener("click", generatePlan);
}

function generatePlan() {
    const examDate = new Date(document.getElementById("exam-date").value);
    const currentDate = new Date();
    const cookedLevel = document.getElementById("cooked-level").value;

    if (!examDate) {
        alert("Please select an exam date!");
        return;
    }

    const timeDiff = examDate - currentDate;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

    if (daysLeft <= 0) {
        alert("Exam date must be in the future!");
        return;
    }

    const resultSection = document.getElementById("result");
    resultSection.style.display = "block";

    const randomQuote = lebronQuotes[cookedLevel][Math.floor(Math.random() * lebronQuotes[cookedLevel].length)];
    document.getElementById("quote").innerHTML = `<p>${randomQuote}</p>`;

    document.getElementById("countdown").innerHTML = `<p>⏳ ${daysLeft} days until the Finals (Exam Day)!</p>`;

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

// Main Page To-Do List
if (document.getElementById("todo-list")) {
    const todoList = document.getElementById("todo-list");
    const editBtn = document.getElementById("edit-btn");

    function loadTasks() {
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
            li.appendChild(document.createTextNode(task));
            todoList.appendChild(li);
        });
    }

    editBtn.addEventListener("click", () => {
        window.location.href = "tasks.html";
    });

    loadTasks();
}

// Task Editor Page
if (document.getElementById("add-task")) {
    const taskInput = document.getElementById("task-input");
    const addTaskBtn = document.getElementById("add-task");
    const editTodoList = document.getElementById("edit-todo-list");
    const backBtn = document.getElementById("back-btn");

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        editTodoList.innerHTML = "";

        tasks.forEach((task) => {
            const li = document.createElement("li");
            li.textContent = task;
            editTodoList.appendChild(li);
        });
    }

    addTaskBtn.addEventListener("click", () => {
        const task = taskInput.value.trim();
        if (task === "") {
            alert("Enter a task name!");
            return;
        }
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = "";
        loadTasks();
    });

    backBtn.addEventListener("click", () => {
        window.location.href = "index.html";
    });

    loadTasks();
}
