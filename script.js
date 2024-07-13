function addTask() {
    const taskInput = document.getElementById('taskInput');
    const targetDateInput = document.getElementById('targetDate');
    const taskList = document.getElementById('taskList');

    if (taskInput.value.trim() === '') {
        alert('Please enter a task');
        return;
    }

    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.onclick = function () {
        if (checkbox.checked) {
            li.classList.add('completed');
            alert('Congratulations on completing the task!');
        } else {
            li.classList.remove('completed');
        }
    };
    li.appendChild(checkbox);

    const taskText = document.createElement('span');
    taskText.textContent = taskInput.value;
    li.appendChild(taskText);

    const targetDate = targetDateInput.value ? new Date(targetDateInput.value) : null;
    if (targetDate) {
        const targetDateSpan = document.createElement('span');
        targetDateSpan.className = 'target-date';
        targetDateSpan.textContent = `Due: ${targetDate.toDateString()}`;
        li.appendChild(targetDateSpan);
        
        const timerSpan = document.createElement('span');
        timerSpan.className = 'timer';
        li.appendChild(timerSpan);

        updateTimer(timerSpan, targetDate);
        setInterval(() => updateTimer(timerSpan, targetDate), 1000);
    }

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = function () {
        taskList.removeChild(li);
    };

    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = '';
    targetDateInput.value = '';
}

function updateTimer(timerSpan, targetDate) {
    const now = new Date();
    const timeRemaining = targetDate - now;
    if (timeRemaining < 0) {
        timerSpan.textContent = 'Time’s up!';
    } else {
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
        timerSpan.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }
}
