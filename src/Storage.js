import taskFactory from "./Task";
import projectFactory from "./Project";
import todolistFactory from "./TodoList";

export default class Storage {

    static setTodolist(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    static getTodolist() {
        if (localStorage.getItem('todolist') === null) {
            let newTodolist = todolistFactory()
            let homeProject = projectFactory("Home", "no color")
            let todayProject = projectFactory("Today", "no color")
            let thisweekProject = projectFactory("This Week", "no color")
            newTodolist.addProject(homeProject)
            newTodolist.addProject(todayProject)
            newTodolist.addProject(thisweekProject)
            Storage.setTodolist(newTodolist);
            return newTodolist;
        }

        let todolistParsed = JSON.parse(localStorage.getItem('todolist'))
        let todolist = todolistFactory();
        for (let projectKey = 0; projectKey < todolistParsed["projects"].length; projectKey++) {
            let projectParsed = todolistParsed["projects"][projectKey] // it gives project object with tasks: array, name, color but not produced with factory
            let project = projectFactory(projectParsed.name, projectParsed.color); // it creates new project
            // console.log("///"+projectParsed.name)
            // console.log(projectParsed["tasks"].length)
            for (let taskKey = 0; taskKey < projectParsed["tasks"].length; taskKey++) {
                let taskParsed = projectParsed["tasks"][taskKey];
                let task = taskFactory(taskParsed.name, taskParsed.description,
                    taskParsed.date, taskParsed.tag);
                project.addTask(task);
            }
            todolist.addProject(project);
            // if ((project.name === "Home" || project.name === "Today" || project.name === "This Week") && project.tasks.length > 0) {
            //     todolist.projects.name.addTask(project.tasks)
            // }
            // else {
            //     todolist.addProject(project);
            // }
        }
        return todolist
    }

    static getAllProjects() {
        let todolist = Storage.getTodolist()
        return todolist.projects;
    }

    static getProject(name) {
        let todolist = Storage.getTodolist();
        let project = todolist.projects.find(item => item.name === name);
        return project;
    }

    static addProject(project) {
        let todolist = Storage.getTodolist();
        const newProject = projectFactory(project, "no color");
        todolist.addProject(newProject);
        Storage.setTodolist(todolist);
    }

    static deleteProject(projectName) { 
        let todolist = Storage.getTodolist();
        todolist.projects = todolist.projects.filter(_project => _project.name !== projectName);
        Storage.setTodolist(todolist);
    }

    static editProject(name, newName) {
        let todolist = Storage.getTodolist();
        let project = todolist.projects.find(item => item.name === name);
        project.name = newName;
        Storage.setTodolist(todolist)
    }

    static addTask(projectName, task) {
        let todolist = Storage.getTodolist();
        todolist.projects.find(item => item.name === projectName).addTask(task);
        Storage.setTodolist(todolist);
    }

    static deleteTask(projectName, taskName) {
        let todolist = Storage.getTodolist();
        todolist.projects.find(item => item.name === projectName).tasks = todolist.projects.find(item => item.name === projectName).tasks.filter(task => task.name !== taskName);
        Storage.setTodolist(todolist);
    }

    static editTask(projectName, taskName, newTask){
        let todolist = Storage.getTodolist();
        // will make loop for all prop.
        todolist.projects.find(item => item.name === projectName).tasks.find(item => item.name === taskName).description = newTask.description
        todolist.projects.find(item => item.name === projectName).tasks.find(item => item.name === taskName).date = newTask.date
        todolist.projects.find(item => item.name === projectName).tasks.find(item => item.name === taskName).tag = newTask.tag
        todolist.projects.find(item => item.name === projectName).tasks.find(item => item.name === taskName).name = newTask.name // it is important to change name lastly otherwise can't find task by name
        Storage.setTodolist(todolist);
    }
}