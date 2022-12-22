const projectFactory = (name,color) => {
    let tasks = [];

    const addTask = (newTask) => {
        tasks.push(newTask);
    }

    const getTask = (task) => {
        return tasks.find((_task) => _task.name === task);
    }

    const deleteTask = (task) => {
        tasks = tasks.filter(_task => _task.name !== task);
    }

    return {
        getTask, addTask, deleteTask, tasks, name, color
    }
}

export default projectFactory