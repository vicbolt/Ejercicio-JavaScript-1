import {create, getTaskIndex, getAllTasks, getTask, updateTask, deleteTask, taskStore} from "./service.js"


function formvalidate() {
    const titulo = document.getElementById("titulo")
    const description = document.getElementById("description")
    const createBtn = document.getElementById("create-button")

    if (!titulo.value || !description.value){
        createBtn.setAttribute("disabled", true)
    } else {
        createBtn.removeAttribute("disabled")
    }
}

function getTaskTemplate(task){
    const taskTemplate = `
        <div class="card mt-2">
            <div class="card-body">
                <div class="col-8">
                    <h5 class="card-title">${task.titulo}</h5>
                        <p> ${task.description}</p>
                </div>
             <div class="col-2 mb-4"></div>
                <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#edit-form" onclick="openModal(${task.id})" > EDIT</button>
                <button class="btn btn-danger" onclick ="removeTask(${task.id})"> DELETE</button>
            </div>
        </div>
  `
  return taskTemplate
}

function openModal(id){
    const editTitulo = document.getElementById("edit-titulo")
    const editDescription = document.getElementById("edit-description")
    const editId = document.getElementById("edit-id")

    const task = getTask(id)

    editTitulo.value = task.titulo
    editDescription.value = task.description
    editId.value = task.id
}


function removeTask(id) {
    deleteTask(id)
    drawTask()
}

function drawTask () {
    const tasks = getAllTasks()
    const taskContainer = document.getElementById("task-container")

    taskContainer.innerHTML = ""

    let i = 0

    while (i < tasks.length){
        taskContainer.innerHTML = taskContainer.innerHTML + getTaskTemplate(tasks[i])
        i = i + 1
    }
}

function updateEditForm() {
    const editTitulo = document.getElementById("edit-titulo")
    const editDescription = document.getElementById("edit-description")
    const editId = document.getElementById("edit-id")

    const id = +editId.value
    const titulo = editTitulo.value
    const description = editDescription.value 

    updateTask(id, titulo, description)
    drawTask()
}

function createTask(){
    const titulo = document.getElementById("titulo")
    const description = document.getElementById("description")

    create(titulo.value, description.value)
    drawTask()
}

window.getTaskTemplate = getTaskTemplate
window.openModal = openModal
window.removeTask = removeTask
window.drawTask = drawTask
window.updateEditForm = updateEditForm
window.createTask = createTask
window.formvalidate = formvalidate


