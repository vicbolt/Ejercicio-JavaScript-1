const taskStore = []

const nameStore = "taskStore1"

let count = 1


function getStore () {

    const store = localStorage.getItem(nameStore)
   if (!store){
       return []
   } else {
       return JSON.parse(store)
   }

}


function create(titulo, description) {
   const task = {
       id: count,
       titulo: titulo,
       description: description
   }
   count = count + 1

    const store = getStore()
   store.push(task)
   localStorage.setItem(nameStore, JSON.stringify(store))
}

function getTaskIndex (id) {
    let index = -1
    let counter = 0
    const store = getStore()

    while (counter < store.length){
        const task = store[counter]
        if (task.id === id) {
            index = counter
        }
        counter = counter + 1
    }

    return index
}

function getAllTasks() {
    const store = getStore()

    return store

}


function getTask(id) {
   const index = getTaskIndex(id)
   const store = getStore()
    if (index > -1 ) {
        return store[index]
    } else {
        return undefined
    }
}

function updateTask(id, title, description) {

    const index = getTaskIndex(id)
    const store = getStore()
    if (index > -1 ){
        store[index].titulo = title
        store[index].description = description
    }

    localStorage.setItem(nameStore, JSON.stringify(store))
}


function deleteTask(id) {
    
    let index = getTaskIndex(id)
    const store = getStore()

    if (index > -1){
        store.splice(index, 1)
    }
    localStorage.setItem(nameStore, JSON.stringify(store))
}


export {create, getTaskIndex, getAllTasks, getTask, updateTask, deleteTask, taskStore}
