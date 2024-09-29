const deleteDefaultInputFieldValue = () => {
    const value = document.getElementById('task-input').value;
    if (value === "Add your task") document.getElementById('task-input').value = '';
}