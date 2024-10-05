"use strict"

window.onload = () => {
    const div = document.querySelector('div.task-container');

    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        let value = JSON.parse(localStorage.getItem(key));

        let tsk = document.createElement('div');
        tsk.classList.add('task');
        div.append(tsk);

        let tskRadioBut = document.createElement('div');
        tskRadioBut.classList.add('task-radio-button');

        let tskTextDiv = document.createElement('div');
        tskTextDiv.classList.add('task-text');
        tskTextDiv.innerText = value.text;

        const taskId = key;

        tskRadioBut.addEventListener('click', () => {
            const curTaskState = taskDoneMark(value.state, tskRadioBut, tskTextDiv);
            saveTaskToLocalStorage(taskId, value.text, curTaskState);
        });

        if (value.state) {
            taskDoneMark(!value.state, tskRadioBut, tskTextDiv);
        }

        let tskDeleteBut = document.createElement('div');
        tskDeleteBut.classList.add('task-delete-button');
        tskDeleteBut.addEventListener('click', () => deleteTask(tsk, taskId));

        tsk.append(tskRadioBut);
        tsk.append(tskTextDiv);
        tsk.append(tskDeleteBut);
    }
}

const addTask = () => {
    const taskText = document.getElementById('task-input').value;
    if (taskText === '') return;
    document.getElementById('task-input').value = '';
    const div = document.querySelector('div.task-container');

    let tsk = document.createElement('div');
    tsk.classList.add('task');
    div.append(tsk);

    let tskRadioBut = document.createElement('div');
    tskRadioBut.classList.add('task-radio-button');

    let tskTextDiv = document.createElement('div');
    tskTextDiv.classList.add('task-text');
    tskTextDiv.innerText = taskText;

    let taskState = false;
    const taskId = `task-${Date.now()}`;
    saveTaskToLocalStorage(taskId, taskText, taskState);

    tskRadioBut.addEventListener('click', () => {
        let curTaskState = taskDoneMark(taskState, tskRadioBut, tskTextDiv);
        saveTaskToLocalStorage(taskId, taskText, curTaskState);
    });

    let tskDeleteBut = document.createElement('div');
    tskDeleteBut.classList.add('task-delete-button');
    tskDeleteBut.addEventListener('click', () => deleteTask(tsk, taskId));

    tsk.append(tskRadioBut);
    tsk.append(tskTextDiv);
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

// Зарефакторить код
// Сделать список с прокруткой, если задач больше 3
// Адаптировать верстку для разных экранов