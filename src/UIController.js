import Storage from "./Storage";
import taskFactory from "./Task";

export default class UI {

    static pageRender() {
        UI.projectLoader()
        UI.taskLoader("Home")
        UI.initButtonEvents()
    }

    static projectLoader() {
        for (let i = 0; i < 3; i++) {
            if (Storage.getAllProjects()[i].name === "Home" ||
                Storage.getAllProjects()[i].name === "Today" ||
                Storage.getAllProjects()[i].name === "This Week") {
                document.getElementById(`${Storage.getAllProjects()[i].name.replace(/\s/g, '')}`).addEventListener("click",
                    () => {
                        UI.taskLoader(Storage.getAllProjects()[i].name)
                    })
            }
        }
        UI.createNavElement()
    }

    static createNavElement() {
        const nav = document.getElementById("nav-project");
        nav.textContent = "";
        for (let i = 3; i < Storage.getAllProjects().length; i++) {
            let project = Storage.getProject(Storage.getAllProjects()[i].name)

            let navProjectItem = document.createElement("div")
            navProjectItem.setAttribute("id", `${project.name}`)

            let newNavElement = document.createElement("a");
            newNavElement.setAttribute("class", "nav-item project-item");

            // const projectIcon = document.createElement("i");
            // projectIcon.setAttribute("class", "fa-solid fa-list-check")

            const editProjectButton = document.createElement("button");
            const editIcon = document.createElement("button");
            editIcon.setAttribute("class", `fa-regular fa-pen-to-square`)
            editProjectButton.appendChild(editIcon);

            let projectName = document.createTextNode(`${project.name}`);
            // newNavElement.appendChild(projectIcon);
            newNavElement.appendChild(projectName)
            // projectName.parentNode.insertBefore(projectIcon, projectName);

            newNavElement.addEventListener("click", () => {
                UI.taskLoader(project.name)
            })

            editProjectButton.addEventListener("click", () => { 
                UI.createNavElement()
                UI.editProject(project.name) })

            navProjectItem.appendChild(editProjectButton)
            navProjectItem.appendChild(newNavElement)

            nav.appendChild(navProjectItem);
        }
    }

    static taskLoader(name) {
        let tasks = Storage.getAllProjects().find(item => item.name === name).getAllTasks()
        document.getElementById("project-name").textContent = `${name}`

        const tasksDiv = document.getElementById("project-tasks")
        tasksDiv.textContent = ""

        for (let i = 0; i < tasks.length; i++) {
            let taskDiv = `
                <tr>
                    
                <th><p id = "task-name">${tasks[i].name}</p></th>
                <th><p>${tasks[i].description}</p></th>
                <th>${tasks[i].date}</th>
                <th>${tasks[i].tag}</th>
                </tr>`;
            tasksDiv.insertAdjacentHTML("beforeend", taskDiv);
        }
    }

    static editProject(name) {
        let projectDiv = document.getElementById(`${name}`)
        projectDiv.textContent = "";

        const projectNameInput = document.createElement("input");
        projectNameInput.setAttribute("value", `${name}`)

        const projectEditApprove = document.createElement("i")
        const projectEditCancel = document.createElement("i")
        const projectEditDelete = document.createElement("i")

        projectEditApprove.setAttribute("class", "fa-solid fa-check btn")
        projectEditCancel.setAttribute("class", "fa-solid fa-xmark btn")
        projectEditDelete.setAttribute("class", "fa-solid fa-trash")

        projectEditApprove.addEventListener("click", () => {
            Storage.editProject(name, projectNameInput.value);
            UI.createNavElement();
        })
        projectEditCancel.addEventListener("click", () => {
            UI.createNavElement()
        })
        projectEditDelete.addEventListener("click", () => {
            Storage.deleteProject(name);
            UI.createNavElement()
        })

        projectDiv.appendChild(projectNameInput);
        projectDiv.appendChild(projectEditApprove);
        projectDiv.appendChild(projectEditCancel);
        projectDiv.appendChild(projectEditDelete);
    }

    static addProjectForm() {
        const $addProjectBtn = document.getElementById("add-project-btn");
        const $addProjectForm = document.getElementById("add-project-form");
        const $addProjectFormInput = document.getElementById("project-name-input");
        const $addProjectFormBtn = document.getElementById("add-project-form-btn");
        const $cancelProjectFormBtn = document.getElementById("cancel-project-form-btn");

        $addProjectBtn.addEventListener("click", () => {
            $addProjectForm.style.display = "block";
        });

        $addProjectFormBtn.addEventListener("click", () => {
            if (UI.checkField($addProjectFormInput.value, "Project Name")) {
                Storage.addProject($addProjectFormInput.value);
                UI.createNavElement()
                $addProjectForm.style.display = "none";
                $addProjectFormInput.value = ""
            }
            else { return }
        })

        $cancelProjectFormBtn.addEventListener("click", () => {
            $addProjectForm.style.display = "none";
            $addProjectFormInput.value = ""
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
            taskInputs.forEach(item => {
                if(item.name === "name" || item.name === "due-date") {
                    if(UI.checkField(item.value, item.name)) {
                        formsFilled = true}
                    else {
                        formsFilled = false
                    }
                }
            })

            if(formsFilled) {
                let newTask = taskFactory(taskInputs[0].value, taskInputs[1].value, taskInputs[2].value, taskInputs[3].value)
                console.log(newTask)
            }  
        })

        cancelTaskFormBtn.addEventListener("click", () => {
            addTaskForm.style.display = "none"
            taskInputs.forEach(item => {
                item.value = ""
            })
        })

    }

    static initButtonEvents() {
        UI.addProjectForm()
        UI.addTaskForm()
    }

    static checkField(fieldValue, fieldName) {
        if (fieldValue === "") {
            alert(`${fieldName} form must be filled`)
            return false
        }

        return true
    }
}

