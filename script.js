"use strict"

window.onload = () => {
    const div = document.querySelector('div.task-container');
    const elem = true;

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));

        const taskId = key;
        addTaskHTMLElement(div, taskId, value.text, value.state, elem);
    }
}

const addTask = () => {
    const elem = false;
    const div = document.querySelector('div.task-container');
    const taskText = document.getElementById('task-input').value;
    if (taskText === '') return;
    document.getElementById('task-input').value = '';

    
    let taskState = false;
    const taskId = `task-${Date.now()}`;
    saveTaskToLocalStorage(taskId, taskText, taskState);
    addTaskHTMLElement(div, taskId, taskText, taskState, elem);
}

const addTaskHTMLElement = (div, taskId, text, state, elem) => {
    let tsk = document.createElement('div');
        tsk.classList.add('task');
        div.append(tsk);

        let tskRadioBut = document.createElement('div');
        tskRadioBut.classList.add('task-radio-button');

        let tskTextDiv = document.createElement('div');
        tskTextDiv.classList.add('task-text');
        tskTextDiv.innerText = text;

        let tskTextTooltip = document.createElement('div');
        tskTextTooltip.classList.add('tooltip');
        tskTextTooltip.innerText = text;

        let currentTaskState = state;

        tskRadioBut.addEventListener('click', () => {
            currentTaskState = taskDoneMark(currentTaskState, tskRadioBut, tskTextDiv);
            saveTaskToLocalStorage(taskId, text, currentTaskState);
        });

        if (state && elem) taskDoneMark(!state, tskRadioBut, tskTextDiv);

        let tskDeleteBut = document.createElement('div');
        tskDeleteBut.classList.add('task-delete-button');
        tskDeleteBut.addEventListener('click', () => deleteTask(tsk, taskId));

        tsk.append(tskRadioBut);
        tsk.append(tskTextDiv);
        tsk.append(tskTextTooltip);
        tsk.append(tskDeleteBut);
}

const deleteTask = (tskIndex, taskId) => {
    tskIndex.remove();
    localStorage.removeItem(taskId);
}

const taskDoneMark = (taskState, tskRadio, tskText) => {
    if (!taskState) {
        tskRadio.style.backgroundImage = "url('./resources/483327.png')";
        tskRadio.style.backgroundSize = 'cover';
        tskText.style.textDecoration = 'line-through';
        tskText.style.textDecorationColor = '#F38D68';
        tskText.style.textDecorationThickness = '2px';
        return true;
    } else {
        tskRadio.style.removeProperty('background-image');
        tskRadio.style.removeProperty('background-size');
        tskText.style.removeProperty('text-decoration');
        tskText.style.removeProperty('text-decoration-color');
        tskText.style.removeProperty('text-decoration-thickness');
        return false;
    }
}

const saveTaskToLocalStorage = (id, text, state) => {
    const task = { text: text, state: state };
    localStorage.setItem(id, JSON.stringify(task));
}

const logAllLocalStorageData = () => {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const task = localStorage.getItem(key); 
        console.log(`${key}: ${task}`);
    }
}
