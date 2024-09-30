"use strict"

let taskNum = 0;

const addTask = () => {
    const taskText = document.getElementById('task-input').value;
    document.getElementById('task-input').value = '';  

    const div = document.querySelector('div.task-container');
    addTaskToContainer(div, taskText);
}

const deleteTask = index => {
    const tasks = document.querySelectorAll('.task');
    if (tasks.length > 0) tasks[index - 1].remove();
}

const taskDoneMark = index => {
    return;
}

const addTaskToContainer = (parentDiv, taskText) => {
    let tsk = document.createElement('div');
    tsk.classList.add('task'); 
    parentDiv.append(tsk); 

    let tskRadioBut = document.createElement('div');
    tskRadioBut.classList.add('task-radio-button');
    tskRadioBut.addEventListener('click', taskDoneMark);

    let tskTextDiv = document.createElement('div');
    tskTextDiv.classList.add('task-text');
    tskTextDiv.innerText = taskText;

    let tskDeleteBut = document.createElement('div');
    tskDeleteBut.classList.add('task-delete-button');
    tskDeleteBut.addEventListener('click', deleteTask);

    tsk.append(tskRadioBut);
    tsk.append(tskTextDiv);
    tsk.append(tskDeleteBut);
}