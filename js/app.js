const addBtn = document.getElementById('add-btn');
const newTaskInput = document.getElementById('new-task');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');

function createTaskItem(text) {
    const li = document.createElement('li');
    li.className = 'task-item';

    // Checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', () => {
        li.classList.toggle('completed', checkbox.checked);
    });

    // Text
    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = text;

    // Delete knapp
    const delBtn = document.createElement('button');
    delBtn.className = 'delete-btn';
    delBtn.textContent = '×'; // kors-symbol
    delBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        updateClearBtnVisibility();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(delBtn);

    return li;
}

function updateClearBtnVisibility() {
    clearBtn.style.display = taskList.children.length > 0 ? 'block' : 'none';
}

addBtn.addEventListener('click', () => {
    const text = newTaskInput.value.trim();
    if (text === '') return;

    const taskItem = createTaskItem(text);
    taskList.appendChild(taskItem);
    newTaskInput.value = '';
    newTaskInput.focus();
    updateClearBtnVisibility();
});

newTaskInput.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') addBtn.click();
});

clearBtn.addEventListener('click', () => {
    taskList.innerHTML = '';
    updateClearBtnVisibility();
});

// Starta med rensa-knappen gömd om inga punkter
updateClearBtnVisibility();
