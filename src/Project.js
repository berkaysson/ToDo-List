const projectFactory = (name,color) => {
    let tasks = [];
    
    const getName = () => {
        return name;
    }

    const getColor = () => {
        return color;
    }

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
        getName, getColor, getTask, addTask, getAllTasks, deleteTask
    }
}

export default projectFactory