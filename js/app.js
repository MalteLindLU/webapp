const menuBtn = document.getElementById('menu-btn');
const sidebar = document.getElementById('sidebar');
const menuItems = document.querySelectorAll('button.menu-item');
const views = document.querySelectorAll('section.view');

menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('hidden');
});

// Visa valt vy och göm resten
function showView(viewId) {
    views.forEach(view => {
        if(view.id === viewId) {
            view.classList.remove('hidden');
        } else {
            view.classList.add('hidden');
        }
    });
    // Stäng menyn automatiskt vid val (bra för mobiler)
    sidebar.classList.add('hidden');
}

// Lyssna på menyval
menuItems.forEach(btn => {
    btn.addEventListener('click', () => {
        const viewId = btn.getAttribute('data-view');
        showView(viewId);
    });
});

// --- Din checklistkod här ---

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

updateClearBtnVisibility();
