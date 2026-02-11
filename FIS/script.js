// DOM Elements
const timerDisplay = document.querySelector('.time-text');
const statusText = document.querySelector('.status-text');
const toggleBtn = document.getElementById('toggle-timer');
const resetBtn = document.getElementById('reset-timer');
const modeBtns = document.querySelectorAll('.mode-btn');
const progressCircle = document.querySelector('.progress-ring__circle');
const toggleIcon = toggleBtn.querySelector('i');

// Task Elements
const taskInput = document.getElementById('new-task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const taskCountDisplay = document.getElementById('task-count');

// Constants
const MODES = {
    focus: { time: 25 * 60, label: 'Time to focus', colorVar: '--bg-focus', accentVar: '--accent-focus' },
    shortBreak: { time: 5 * 60, label: 'Time for a break', colorVar: '--bg-short', accentVar: '--accent-short' },
    longBreak: { time: 15 * 60, label: 'Time to relax', colorVar: '--bg-long', accentVar: '--accent-long' }
};

const CIRCLE_RADIUS = 140;
const CIRCLE_CIRCUMFERENCE = 2 * Math.PI * CIRCLE_RADIUS;

// State
let currentMode = 'focus';
let timeLeft = MODES[currentMode].time;
let isRunning = false;
let timerInterval = null;
let tasks = JSON.parse(localStorage.getItem('pomodoro-tasks')) || [];

// Initialization
function init() {
    progressCircle.style.strokeDasharray = `${CIRCLE_CIRCUMFERENCE} ${CIRCLE_CIRCUMFERENCE}`;
    progressCircle.style.strokeDashoffset = 0;

    updateDisplay();
    renderTasks();
    applyTheme();

    // Request notification permission
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
}

// Timer Logic
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function setProgress(percent) {
    const offset = CIRCLE_CIRCUMFERENCE - (percent / 100) * CIRCLE_CIRCUMFERENCE;
    progressCircle.style.strokeDashoffset = offset;
}

function updateDisplay() {
    timerDisplay.textContent = formatTime(timeLeft);
    const totalTime = MODES[currentMode].time;
    const percent = (timeLeft / totalTime) * 100;
    setProgress(percent);
    document.title = `${formatTime(timeLeft)} - ${currentMode === 'focus' ? 'Focus' : 'Break'}`;
}

function startTimer() {
    if (isRunning) return;

    isRunning = true;
    toggleIcon.classList.replace('ph-play', 'ph-pause');

    timerInterval = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--;
            updateDisplay();
        } else {
            completeTimer();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    toggleIcon.classList.replace('ph-pause', 'ph-play');
}

function resetTimer() {
    pauseTimer();
    timeLeft = MODES[currentMode].time;
    updateDisplay();
}

function completeTimer() {
    pauseTimer();
    new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg').play().catch(() => { }); // Simple notification sound

    if (Notification.permission === 'granted') {
        new Notification("Timer Completed!", {
            body: `${MODES[currentMode].label} finished.`,
        });
    }

    // Auto-reset or switch logic could go here
    // For now, just reset
    timeLeft = MODES[currentMode].time;
    updateDisplay();
}

function switchMode(mode) {
    currentMode = mode;
    pauseTimer();
    timeLeft = MODES[mode].time;
    statusText.textContent = MODES[mode].label;

    // Update active button
    modeBtns.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    applyTheme();
    updateDisplay();
}

function applyTheme() {
    const modeData = MODES[currentMode];
    document.documentElement.style.setProperty('--current-bg', `var(${modeData.colorVar})`);
    document.documentElement.style.setProperty('--current-accent', `var(${modeData.accentVar})`);
}

// Event Listeners
toggleBtn.addEventListener('click', () => {
    if (isRunning) pauseTimer();
    else startTimer();
});

resetBtn.addEventListener('click', resetTimer);

modeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => switchMode(e.target.dataset.mode));
});

// Task Logic
function addTask(text) {
    if (!text.trim()) return;
    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };
    tasks.push(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = '';
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = '';
    const completedCount = tasks.filter(t => t.completed).length;
    taskCountDisplay.textContent = `${completedCount}/${tasks.length}`;

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <div class="check-circle"></div>
            <span class="task-text">${task.text}</span>
            <button class="delete-btn"><i class="ph-bold ph-trash"></i></button>
        `;

        // Click to toggle
        li.addEventListener('click', (e) => {
            if (!e.target.closest('.delete-btn')) {
                toggleTask(task.id);
            }
        });

        // Delete button
        li.querySelector('.delete-btn').addEventListener('click', () => deleteTask(task.id));

        taskList.appendChild(li);
    });
}

// Task Inputs
addTaskBtn.addEventListener('click', () => addTask(taskInput.value));
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask(taskInput.value);
});

// Initialize
init();
