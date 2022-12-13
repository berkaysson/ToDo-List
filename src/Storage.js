import taskFactory from "./Task";
import projectFactory from "./Project";
import todolistFactory from "./TodoList";

const storageFactory = () => {
    
    const storeTodolist = (data) => {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    const getTodolist = () => {
        const _todolist = todolistFactory();
        const todolist = JSON.parse(localStorage.getItem('todolist'))
        // console.log("Todolist created")

        for (let i = 0; i < Object.values(todolist)[0].length; i++) {
            let project = Object.values(todolist)[0][i]
            let _project = projectFactory(Object.values(project)[1], Object.values(project)[2])
            // console.log("Project created /*/ " + _project.getName())
            for (let j=0 ; j<project["tasks"].length;j++){
                let task = project["tasks"][j]
                let _task = taskFactory(Object.values(task)[0],Object.values(task)[1],
                Object.values(task)[2], Object.values(task)[3])
                // console.log("Task created /*/" + _task.getName())
                _project.addTask(_task);
                // console.log("Task added to project /*/" + _task.getName())
            }
            // console.log("Project added to todolist /*/ " + _project.getName())
            _todolist.addProject(_project);
        }

        return _todolist
    }

    return {
        storeTodolist, getTodolist
    }
}

export default storageFactory