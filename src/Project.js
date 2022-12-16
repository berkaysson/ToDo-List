const projectFactory = (name,color) => {
    let tasks = [];

    const addTask = (newTask) => {
        tasks.push(newTask);
    }

    const getTask = (task) => {
        return tasks.find((_task) => _task.getName() === task);
    }

    const getAllTasks = () => {
        return tasks;
    }

    const deleteTask = (task) => {
        tasks = tasks.filter(_task => _task.getName() !== task);
    }

    return {
        getTask, addTask, getAllTasks, deleteTask, tasks, name, color
    }
}

export default projectFactory