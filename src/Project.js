const projectFactory = (name, color) => { //will remove color prop
    let tasks = [];

    const addTask = (newTask) => {
        tasks.push(newTask);
    }

    return {
        addTask, tasks, name, color
    }
}

export default projectFactory