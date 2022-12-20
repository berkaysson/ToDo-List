import taskFactory from "./Task";
import projectFactory from "./Project";
import todolistFactory from "./TodoList";

export default class Storage  {
    
    static setTodolist(data) {
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    static getTodolist() {
        if(localStorage.getItem('todolist') === null) {
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
        for (let projectKey = 0 ; projectKey<todolistParsed["projects"].length; projectKey++) {
            let projectParsed = todolistParsed["projects"][projectKey] // it gives project object with tasks: array, name, color but not produced with factory
            let project = projectFactory(projectParsed.name, projectParsed.color); // it creates new project
            for(let taskKey = 1; taskKey < projectParsed["tasks"].length; taskKey++) {
                let taskParsed = project["tasks"][taskKey];
                let task = taskFactory(taskParsed.name, taskParsed.description,
                     taskParsed.date, taskParsed.tag);
                project.addTask(task);
            }
            if ((project.name === "Home" || project.name === "Today" || project.name === "This Week") && project.getAllTasks().length>0){
                todolist.getProject(project.name).addTask(project.getAllTasks())
            }
            else {
                todolist.addProject(project);
            }
        }
        return todolist
    }

    static getAllProjects(){
        let todolist = Storage.getTodolist()
        return todolist.getAllProjects();
    }

    static getProject(name){
        let todolist = Storage.getTodolist();
        let project = todolist.getAllProjects().find(item => item.name === name);
        return project;
    }

    static addProject(project) {
        let todolist = Storage.getTodolist();
        const newProject = projectFactory(project, "no color");
        todolist.addProject(newProject);
        Storage.setTodolist(todolist);
    }

    static deleteProject(name) {
        let todolist = Storage.getTodolist();
        todolist.deleteProject(name);
        todolist.projects = todolist.getAllProjects()
        Storage.setTodolist(todolist);
    }

    static editProject(name, newName){
        let todolist = Storage.getTodolist();
        let project = todolist.getAllProjects().find(item => item.name === name);
        project.name = newName;
        Storage.setTodolist(todolist)
    }
}