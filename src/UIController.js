import Storage from "./Storage";
import taskFactory from "./Task";

export default class UI {

    static pageRender() {   // renders page
        UI.projectLoader()
        UI.taskLoader("Home")   // load Home custom
        UI.initButtonEvents()   // initiates buttons
    }

    static projectLoader() {
        for (let i = 0; i < 3; i++) { // First three project of todolist is custom projects
            if (Storage.getAllProjects()[i].name === "Home" ||
                Storage.getAllProjects()[i].name === "Today" ||
                Storage.getAllProjects()[i].name === "This Week") {
                document.getElementById(`${Storage.getAllProjects()[i].name.replace(/\s/g, '')}`).addEventListener("click",
                    () => {
                        document.getElementById("add-task-btn").style.display = "block" // today and this week will not have add new task button, they will display tasks acc to dates
                        UI.taskLoader(Storage.getAllProjects()[i].name)
                        document.getElementById("tags").style.display = "none"
                    })
            }
        }
        UI.createNavElement()
    }

    static createNavElement() { // loads all created projects not custom projects (Home, Today, This week)
        const nav = document.getElementById("nav-project");
        nav.textContent = "";
        for (let i = 3; i < Storage.getAllProjects().length; i++) { // iterate over all projects and creates and loads projects as nav items
            let project = Storage.getProject(Storage.getAllProjects()[i].name)

            let navProjectItem = document.createElement("div")
            navProjectItem.setAttribute("id", `${project.name}`)

            let projectLink = document.createElement("a");
            projectLink.setAttribute("class", "nav-item project-item");

            const editProjectButton = document.createElement("button");
            editProjectButton.setAttribute("class", `fa-regular fa-pen-to-square`)

            let projectNameNode = document.createTextNode(`${project.name}`);
            projectLink.appendChild(projectNameNode)

            projectLink.addEventListener("click", () => {   // add event to projects to load tasks of it
                UI.taskLoader(project.name)
                document.getElementById("add-task-btn").style.display = "block"
                document.getElementById("tags").style.display = "none"
            })

            editProjectButton.addEventListener("click", () => {
                UI.createNavElement()
                UI.editProject(project.name)
            })

            navProjectItem.appendChild(editProjectButton)
            navProjectItem.appendChild(projectLink)

            nav.appendChild(navProjectItem);
        }
    }

    static taskLoader(projectName) {    // loads task of named project
        let tasks = Storage.getProject(projectName).tasks  // gets named projects tasks
        document.getElementById("project-name").textContent = `${projectName}`

        const tasksDiv = document.getElementById("project-tasks")
        tasksDiv.textContent = ""

        for (let i = 0; i < tasks.length; i++) {
            let taskDiv = `
                <tr id="task-${tasks[i].name}">
                    
                <th><p id = "task-name">${tasks[i].name}</p></th>
                <th><p>${tasks[i].description}</p></th>
                <th>${tasks[i].date}</th>
                <th>${tasks[i].tag}</th>
                </tr>
                <button id="btn-${tasks[i].name}" class="fa-regular fa-pen-to-square edit-task"></button>
                `;

            tasksDiv.insertAdjacentHTML("beforeend", taskDiv);
        }

        let editTaskBtn = document.querySelectorAll(".edit-task")
        editTaskBtn.forEach(btn => {
            btn.addEventListener("click", () => {
                UI.editTask(btn.id.substring(4)) // removes 'btn-' part from id and gets only name of task
            });
        })
    }

    static editProject(projectName) {
        let projectDiv = document.getElementById(`${projectName}`)
        projectDiv.textContent = "";

        const editProjectNameInput = document.createElement("input");
        editProjectNameInput.setAttribute("value", `${projectName}`)

        const projectEditApproveBtn = document.createElement("button")
        const projectEditCancelBtn = document.createElement("button")
        const projectEditDeleteBtn = document.createElement("button")

        projectEditApproveBtn.setAttribute("class", "fa-solid fa-check btn")
        projectEditCancelBtn.setAttribute("class", "fa-solid fa-xmark btn")
        projectEditDeleteBtn.setAttribute("class", "fa-solid fa-trash")

        projectEditApproveBtn.addEventListener("click", () => {
            if (!UI.checkField(editProjectNameInput.value, "Project Name")) return
            Storage.editProject(projectName, editProjectNameInput.value);
            UI.createNavElement();
        })
        projectEditCancelBtn.addEventListener("click", () => {
            UI.createNavElement()
        })
        projectEditDeleteBtn.addEventListener("click", () => {
            Storage.deleteProject(projectName);
            UI.createNavElement()
        })

        projectDiv.appendChild(editProjectNameInput);
        projectDiv.appendChild(projectEditApproveBtn);
        projectDiv.appendChild(projectEditCancelBtn);
        projectDiv.appendChild(projectEditDeleteBtn);
    }

    static editTask(taskName) {
        UI.taskLoader(UI.getActiveProjectName())

        let taskDiv = document.getElementById(`task-${taskName}`)
        let task = Storage.getProject(UI.getActiveProjectName()).tasks.find(item => item.name === taskName) // find task

        taskDiv.innerHTML = `
            <tr>
            <th><input name="name" class="edit-task-input" type="text" placeholder="Name" max="20" min="2" value = ${task.name}></th>
            <th><input class="edit-task-input" type="text" placeholder="Description" max="100" value = ${task.description}></th>
            <th><input name="due-date" class="edit-task-input" type="date" value = ${task.date}></th>
            <th><input class="edit-task-input" type="text" value = ${task.tag}></th>
            </tr>
            <button id = "edit-task-approve-${task.name}" class="btn"><i class="fa-solid fa-check btn"></i></button>
            <button id = "edit-task-cancel-${task.name}" class="btn"><i class="fa-solid fa-xmark btn"></i></button>
            <button id = "edit-task-delete-${task.name}" class="btn"><i class="fa-solid fa-trash btn"></i></button>
            `;

        let editTaskApproveBtn = document.getElementById(`edit-task-approve-${task.name}`);
        let editTaskCancelBtn = document.getElementById(`edit-task-cancel-${task.name}`);
        let editTaskdeleteBtn = document.getElementById(`edit-task-delete-${task.name}`);

        let editTaskInputs = document.querySelectorAll(".edit-task-input")

        editTaskApproveBtn.addEventListener("click", () => {
            let formsFilled = false;    // checks if name and due date form inputs filled
            if (UI.checkField(editTaskInputs[0].value, "Task Name") && UI.checkField(editTaskInputs[2].value, "Task Due Date")) {
                formsFilled = true
            }
            if (formsFilled) {
                let newTask = taskFactory(editTaskInputs[0].value, editTaskInputs[1].value, editTaskInputs[2].value, editTaskInputs[3].value)   // will make loop for all prop.
                Storage.editTask(UI.getActiveProjectName(), task.name, newTask);
                UI.taskLoader(UI.getActiveProjectName())
            }
        })
        editTaskCancelBtn.addEventListener("click", () => {
            UI.taskLoader(UI.getActiveProjectName())
        })
        editTaskdeleteBtn.addEventListener("click", () => {
            Storage.deleteTask(UI.getActiveProjectName(), task.name)
            UI.taskLoader(UI.getActiveProjectName())
        })
    }

    static addProjectForm() {
        const addProjectBtn = document.getElementById("add-project-btn");
        const addProjectForm = document.getElementById("add-project-form");
        const addProjectFormInput = document.getElementById("project-name-input");
        const addProjectFormBtn = document.getElementById("add-project-form-btn");
        const cancelProjectFormBtn = document.getElementById("cancel-project-form-btn");

        addProjectBtn.addEventListener("click", () => {
            addProjectForm.style.display = "block";
        });

        addProjectFormBtn.addEventListener("click", () => {
            if (UI.checkField(addProjectFormInput.value, "Project Name")) {
                Storage.addProject(addProjectFormInput.value);
                UI.createNavElement()
                addProjectForm.style.display = "none";
                addProjectFormInput.value = ""
            }
            else { return }
        })

        cancelProjectFormBtn.addEventListener("click", () => {
            addProjectForm.style.display = "none";
            addProjectFormInput.value = ""
        })
    }

    static addTaskForm() {
        let newTaskBtn = document.getElementById("add-task-btn")
        let taskInputs = document.querySelectorAll(".task-input");
        let addTaskForm = document.getElementById("add-task-form");
        let addTaskFormBtn = document.getElementById("add-task-form-btn");
        let cancelTaskFormBtn = document.getElementById("cancel-task-form-btn");

        newTaskBtn.addEventListener("click", () => {
            addTaskForm.style.display = "table"
        })
        addTaskFormBtn.addEventListener("click", () => {
            let formsFilled = false
            if (UI.checkField(taskInputs[0].value, "Task Name") && UI.checkField(taskInputs[2].value, "Task Due Date")) {
                formsFilled = true
            }

            if (formsFilled) {
                let newTask = taskFactory(taskInputs[0].value, taskInputs[1].value, taskInputs[2].value, taskInputs[3].value) // will make loop for all prop.
                Storage.addTask(UI.getActiveProjectName(), newTask)
                UI.taskLoader(UI.getActiveProjectName())
                addTaskForm.style.display = "none";
                taskInputs.forEach(item => {
                    item.value = "";
                })
            }
        })

        cancelTaskFormBtn.addEventListener("click", () => {
            addTaskForm.style.display = "none"
            taskInputs.forEach(item => {
                item.value = ""
            })
        })

    }

    static tags() {
        const tagsNav = document.getElementById("TagsNav")
        const tasksDiv = document.getElementById("project-tasks")
        const addTaskBtn = document.getElementById("add-task-btn")

        tagsNav.addEventListener("click", () => {
            document.getElementById("project-name").textContent = "Sort tasks by Tags";
            document.getElementById("tags").style.display = "block"
            tasksDiv.textContent = ""
            addTaskBtn.style.display = "none"
            UI.createTagBtn(Storage.getAllTags())
        })
    }

    static createTagBtn(tagSet) { // tagSet is a set for all unique tags (it is Set)
        let tagsDiv = document.getElementById("tags")
        const tasksDiv = document.getElementById("project-tasks")

        tagsDiv.textContent = ""

        tagSet.forEach(tag => {
            let tagFilter = document.createElement("button");
            tagFilter.setAttribute("class", "tag-filter");
            tagFilter.textContent = tag;
            tagFilter.addEventListener("click", () => {
                tagFilter.classList.toggle("active")    // activate tag

                let activeTags = [];
                let activeTasks = Storage.getAllTasks();    // initially there is no active tag so all tasks active

                tagsDiv.childNodes.forEach(item => {
                    if (item.classList.contains("active")) {
                        activeTags.push(item.textContent)   // if tag is active, pushes it to activeTags
                    }
                })

                tasksDiv.textContent = ""

                for (let task of Storage.getAllTasks()) {   // checks if task contains all activeTags, if not it removes that task from activeTasks
                    let tagsofTask = [] // tags of that task
                    if (task.tag.includes(",")) {
                        task.tag.split(",").forEach(e => {
                            tagsofTask.push(e)
                        });
                    }
                    else tagsofTask.push(task.tag)
                    for (let _tag of activeTags) {  // removes tasks from activeTasks if not contains all active tags
                        if (!tagsofTask.includes(_tag)) {
                            activeTasks = activeTasks.filter(_task => _task.name !== task.name)
                        }
                    }
                }

                for (let task of activeTasks) { // displays remainder activeTasks
                    let taskDiv = `
                            <tr id="task-${task.name}">
                                
                            <th><p id = "task-name">${task.name}</p></th>
                            <th><p>${task.description}</p></th>
                            <th>${task.date}</th>
                            <th>${task.tag}</th>
                            </tr>
                            `;
                    tasksDiv.insertAdjacentHTML("beforeend", taskDiv);
                }
            })
            tagsDiv.appendChild(tagFilter)
        })
    }

    static getActiveProjectName() {
        let activeProject = Storage.getProject(document.getElementById("project-name").textContent);
        return activeProject.name
    }

    static checkField(fieldValue, fieldName) {
        if (fieldValue === "") {
            alert(`${fieldName} form must be filled`)
            return false
        }
        return true
    }

    static initButtonEvents() {
        UI.addProjectForm()
        UI.addTaskForm()
        UI.tags()
    }
}