import taskFactory from "./Task";
import projectFactory from "./Project";
import todolistFactory from "./TodoList";

export default class Storage {

    static setTodolist(data) { // sets Todolist to local storage
        localStorage.setItem("todolist", JSON.stringify(data));
    }

    static getTodolist() {  // gets Todolist from local storage and add properties of it to a new todolist that create by todolistFactory()
        if (localStorage.getItem('todolist') === null) { // this will be create an empty todolist because no list were created
            let newTodolist = todolistFactory()
            let homeProject = projectFactory("Home", "no color")
            let todayProject = projectFactory("Today", "no color")
            let thisweekProject = projectFactory("This Week", "no color")
            newTodolist.addProject(homeProject)
            newTodolist.addProject(todayProject)
            newTodolist.addProject(thisweekProject) // custom projects
            Storage.setTodolist(newTodolist); // sets empty todolist
            return newTodolist;
        }

        let todolistParsed = JSON.parse(localStorage.getItem('todolist')) // if todolist setted before, this gets it and parsed it to new object
        let todolist = todolistFactory();   // empty todolist, this will take properties from parsed one
        for (let projectKey = 0; projectKey < todolistParsed["projects"].length; projectKey++) { // iterate over projects of todolistParsed and add them to new empty todolist
            let projectParsed = todolistParsed["projects"][projectKey] // projects from parsed todolist
            let project = projectFactory(projectParsed.name, projectParsed.color);
            for (let taskKey = 0; taskKey < projectParsed["tasks"].length; taskKey++) {
                let taskParsed = projectParsed["tasks"][taskKey]; // tasks from parsed todolist and parsed projects
                let task = taskFactory(taskParsed.name, taskParsed.description,
                    taskParsed.date, taskParsed.tag);
                project.addTask(task);  // adds tasks to projects
            }
            todolist.addProject(project);   // adds projects to todolist and return it thus it gives a todolistFactory object with properties from localStorage 
            // (parsed todolist is another object not created by todolistFactory)
        }
        return todolist
    }

    static getAllProjects() {
        return Storage.getTodolist().projects;
    }

    static getProject(projectName) {
        return Storage.getTodolist().projects.find(item => item.name === projectName);
    }

    static addProject(project) {
        let todolist = Storage.getTodolist();
        const newProject = projectFactory(project, "no color");
        todolist.addProject(newProject);
        Storage.setTodolist(todolist);
    }

    static deleteProject(projectName) {
        let todolist = Storage.getTodolist();
        todolist.projects = todolist.projects.filter(_project => _project.name !== projectName); // filters unmatched projects to new projects array
        Storage.setTodolist(todolist);
    }

    static editProject(projectName, newName) {
        let todolist = Storage.getTodolist();
        let project = todolist.projects.find(item => item.name === projectName);
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
        todolist.projects.find(item => item.name === projectName).tasks =
            todolist.projects.find(item => item.name === projectName).tasks.filter(task => task.name !== taskName); // finds the project that tasks and removes task 
        Storage.setTodolist(todolist);
    }

    static editTask(projectName, taskName, newTask) {
        let todolist = Storage.getTodolist();
        // may make loop for all prop.
        todolist.projects.find(item => item.name === projectName).tasks.find(item => item.name === taskName).description = newTask.description
        todolist.projects.find(item => item.name === projectName).tasks.find(item => item.name === taskName).date = newTask.date
        todolist.projects.find(item => item.name === projectName).tasks.find(item => item.name === taskName).tag = newTask.tag
        todolist.projects.find(item => item.name === projectName).tasks.find(item => item.name === taskName).name = newTask.name // it is important to change name lastly otherwise can't find task by name
        Storage.setTodolist(todolist);
    }

    static getAllTasks() {
        let projects = Storage.getAllProjects();
        let tasks = [];
        for (let i = 0; i < projects.length; i++) {
            for (let j = 0; j < projects[i].tasks.length; j++) {
                tasks.push(projects[i].tasks[j])
            }
        }
        return tasks
    }

    static getAllTags() {
        let projects = Storage.getAllProjects();
        let tags = new Set();   // used Set to tak only unique values
        for (let i = 0; i < projects.length; i++) {
            for (let j = 0; j < projects[i].tasks.length; j++) {
                if (projects[i].tasks[j].tag.includes(",")) { // splits tags by commas
                    let subTags = projects[i].tasks[j].tag.split(",")
                    for (let tag of subTags) {
                        tags.add(tag)
                    }
                }
                else {
                    tags.add(projects[i].tasks[j].tag)
                }
            }
        }
        return tags
    }
}