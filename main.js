/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Project.js":
/*!************************!*\
  !*** ./src/Project.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst projectFactory = (name,color) => {\r\n    let tasks = [];\r\n\r\n    const addTask = (newTask) => {\r\n        tasks.push(newTask);\r\n    }\r\n\r\n    const getTask = (task) => {\r\n        return tasks.find((_task) => _task.name === task);\r\n    }\r\n\r\n    const deleteTask = (task) => {\r\n        tasks = tasks.filter(_task => _task.name !== task);\r\n    }\r\n\r\n    return {\r\n        getTask, addTask, deleteTask, tasks, name, color\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (projectFactory);\n\n//# sourceURL=webpack://todo-list/./src/Project.js?");

/***/ }),

/***/ "./src/Storage.js":
/*!************************!*\
  !*** ./src/Storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Storage)\n/* harmony export */ });\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ \"./src/Task.js\");\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ \"./src/Project.js\");\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoList */ \"./src/TodoList.js\");\n\r\n\r\n\r\n\r\nclass Storage {\r\n\r\n    static setTodolist(data) {\r\n        localStorage.setItem(\"todolist\", JSON.stringify(data));\r\n    }\r\n\r\n    static getTodolist() {\r\n        if (localStorage.getItem('todolist') === null) {\r\n            let newTodolist = (0,_TodoList__WEBPACK_IMPORTED_MODULE_2__[\"default\"])()\r\n            let homeProject = (0,_Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"Home\", \"no color\")\r\n            let todayProject = (0,_Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"Today\", \"no color\")\r\n            let thisweekProject = (0,_Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(\"This Week\", \"no color\")\r\n            newTodolist.addProject(homeProject)\r\n            newTodolist.addProject(todayProject)\r\n            newTodolist.addProject(thisweekProject)\r\n            Storage.setTodolist(newTodolist);\r\n            return newTodolist;\r\n        }\r\n\r\n        let todolistParsed = JSON.parse(localStorage.getItem('todolist'))\r\n        let todolist = (0,_TodoList__WEBPACK_IMPORTED_MODULE_2__[\"default\"])();\r\n        for (let projectKey = 0; projectKey < todolistParsed[\"projects\"].length; projectKey++) {\r\n            let projectParsed = todolistParsed[\"projects\"][projectKey] // it gives project object with tasks: array, name, color but not produced with factory\r\n            let project = (0,_Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(projectParsed.name, projectParsed.color); // it creates new project\r\n            // console.log(\"///\"+projectParsed.name)\r\n            // console.log(projectParsed[\"tasks\"].length)\r\n            for (let taskKey = 0; taskKey < projectParsed[\"tasks\"].length; taskKey++) {\r\n                let taskParsed = projectParsed[\"tasks\"][taskKey];\r\n                let task = (0,_Task__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(taskParsed.name, taskParsed.description,\r\n                    taskParsed.date, taskParsed.tag);\r\n                project.addTask(task);\r\n            }\r\n            todolist.addProject(project);\r\n            // if ((project.name === \"Home\" || project.name === \"Today\" || project.name === \"This Week\") && project.tasks.length > 0) {\r\n            //     todolist.projects.name.addTask(project.tasks)\r\n            // }\r\n            // else {\r\n            //     todolist.addProject(project);\r\n            // }\r\n        }\r\n        return todolist\r\n    }\r\n\r\n    static getAllProjects() {\r\n        let todolist = Storage.getTodolist()\r\n        return todolist.projects;\r\n    }\r\n\r\n    static getProject(name) {\r\n        let todolist = Storage.getTodolist();\r\n        let project = todolist.projects.find(item => item.name === name);\r\n        return project;\r\n    }\r\n\r\n    static addProject(project) {\r\n        let todolist = Storage.getTodolist();\r\n        const newProject = (0,_Project__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(project, \"no color\");\r\n        todolist.addProject(newProject);\r\n        Storage.setTodolist(todolist);\r\n    }\r\n\r\n    static deleteProject(name) { \r\n        let todolist = Storage.getTodolist();\r\n        todolist.projects = todolist.projects.filter(_project => _project.name !== name);\r\n        Storage.setTodolist(todolist);\r\n    }\r\n\r\n    static editProject(name, newName) {\r\n        let todolist = Storage.getTodolist();\r\n        let project = todolist.projects.find(item => item.name === name);\r\n        project.name = newName;\r\n        Storage.setTodolist(todolist)\r\n    }\r\n\r\n    static addTask(projectName, task) {\r\n        let todolist = Storage.getTodolist();\r\n        todolist.projects.find(item => item.name === projectName).addTask(task);\r\n        Storage.setTodolist(todolist);\r\n    }\r\n}\n\n//# sourceURL=webpack://todo-list/./src/Storage.js?");

/***/ }),

/***/ "./src/Task.js":
/*!*********************!*\
  !*** ./src/Task.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst taskFactory = (name, description, date, tag) => {\r\n    const getDate = () => {\r\n        const day = date.split('/')[0]\r\n        const month = date.split('/')[1]\r\n        const year = date.split('/')[2]\r\n        return `${day}/${month}/${year}`;\r\n    }\r\n\r\n    return {\r\n        getDate, name, description, date, tag\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (taskFactory);\n\n//# sourceURL=webpack://todo-list/./src/Task.js?");

/***/ }),

/***/ "./src/TodoList.js":
/*!*************************!*\
  !*** ./src/TodoList.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Project */ \"./src/Project.js\");\n\r\n\r\nconst todolistFactory = () => {\r\n    let projects = [];\r\n    \r\n    const addProject = (newProject) => {\r\n        projects.push(newProject);\r\n    }\r\n\r\n    const deleteProject = (name) => {\r\n        projects = projects.filter(_project => _project.name !== name);\r\n        return projects\r\n    }\r\n\r\n    const getProject = (project) => {\r\n        return projects.find((_project) => _project.name === project);\r\n    }\r\n\r\n    return {\r\n        addProject, deleteProject, getProject, projects\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (todolistFactory);\n\n//# sourceURL=webpack://todo-list/./src/TodoList.js?");

/***/ }),

/***/ "./src/UIController.js":
/*!*****************************!*\
  !*** ./src/UIController.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ UI)\n/* harmony export */ });\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Storage */ \"./src/Storage.js\");\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Task */ \"./src/Task.js\");\n\r\n\r\n\r\nclass UI {\r\n\r\n    static pageRender() {\r\n        UI.projectLoader()\r\n        UI.taskLoader(\"Home\")\r\n        UI.initButtonEvents()\r\n    }\r\n\r\n    static projectLoader() {\r\n        for (let i = 0; i < 3; i++) {\r\n            if (_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllProjects()[i].name === \"Home\" ||\r\n                _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllProjects()[i].name === \"Today\" ||\r\n                _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllProjects()[i].name === \"This Week\") {\r\n                document.getElementById(`${_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllProjects()[i].name.replace(/\\s/g, '')}`).addEventListener(\"click\",\r\n                    () => {\r\n                        UI.taskLoader(_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllProjects()[i].name)\r\n                    })\r\n            }\r\n        }\r\n        UI.createNavElement()\r\n    }\r\n\r\n    static createNavElement() {\r\n        const nav = document.getElementById(\"nav-project\");\r\n        nav.textContent = \"\";\r\n        for (let i = 3; i < _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllProjects().length; i++) {\r\n            let project = _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProject(_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllProjects()[i].name)\r\n\r\n            let navProjectItem = document.createElement(\"div\")\r\n            navProjectItem.setAttribute(\"id\", `${project.name}`)\r\n\r\n            let newNavElement = document.createElement(\"a\");\r\n            newNavElement.setAttribute(\"class\", \"nav-item project-item\");\r\n\r\n            // const projectIcon = document.createElement(\"i\");\r\n            // projectIcon.setAttribute(\"class\", \"fa-solid fa-list-check\")\r\n\r\n            const editProjectButton = document.createElement(\"button\");\r\n            editProjectButton.setAttribute(\"class\", `fa-regular fa-pen-to-square`)\r\n\r\n            let projectName = document.createTextNode(`${project.name}`);\r\n            // newNavElement.appendChild(projectIcon);\r\n            newNavElement.appendChild(projectName)\r\n            // projectName.parentNode.insertBefore(projectIcon, projectName);\r\n\r\n            newNavElement.addEventListener(\"click\", () => {\r\n                UI.taskLoader(project.name)\r\n            })\r\n\r\n            editProjectButton.addEventListener(\"click\", () => { \r\n                UI.createNavElement()\r\n                UI.editProject(project.name) })\r\n\r\n            navProjectItem.appendChild(editProjectButton)\r\n            navProjectItem.appendChild(newNavElement)\r\n\r\n            nav.appendChild(navProjectItem);\r\n        }\r\n    }\r\n\r\n    static taskLoader(projectName) {\r\n        let tasks = _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getAllProjects().find(item => item.name === projectName).tasks\r\n        document.getElementById(\"project-name\").textContent = `${projectName}`\r\n\r\n        const tasksDiv = document.getElementById(\"project-tasks\")\r\n        tasksDiv.textContent = \"\"\r\n\r\n        const editTaskButton = document.createElement(\"button\");\r\n        const editIcon = document.createElement(\"button\");\r\n        editIcon.setAttribute(\"class\", `fa-regular fa-pen-to-square`)\r\n        editTaskButton.appendChild(editIcon);\r\n\r\n        for (let i = 0; i < tasks.length; i++) {\r\n            let taskDiv = `\r\n                <tr>\r\n                    \r\n                <th><p id = \"task-name\">${tasks[i].name}</p></th>\r\n                <th><p>${tasks[i].description}</p></th>\r\n                <th>${tasks[i].date}</th>\r\n                <th>${tasks[i].tag}</th>\r\n                </tr>\r\n                <button class=\"fa-regular fa-pen-to-square\"></button>\r\n                `;\r\n            tasksDiv.insertAdjacentHTML(\"beforeend\", taskDiv);\r\n        }\r\n    }\r\n\r\n    static editProject(name) {\r\n        let projectDiv = document.getElementById(`${name}`)\r\n        projectDiv.textContent = \"\";\r\n\r\n        const projectNameInput = document.createElement(\"input\");\r\n        projectNameInput.setAttribute(\"value\", `${name}`)\r\n\r\n        const projectEditApprove = document.createElement(\"i\")\r\n        const projectEditCancel = document.createElement(\"i\")\r\n        const projectEditDelete = document.createElement(\"i\")\r\n\r\n        projectEditApprove.setAttribute(\"class\", \"fa-solid fa-check btn\")\r\n        projectEditCancel.setAttribute(\"class\", \"fa-solid fa-xmark btn\")\r\n        projectEditDelete.setAttribute(\"class\", \"fa-solid fa-trash\")\r\n\r\n        projectEditApprove.addEventListener(\"click\", () => {\r\n            _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].editProject(name, projectNameInput.value);\r\n            UI.createNavElement();\r\n        })\r\n        projectEditCancel.addEventListener(\"click\", () => {\r\n            UI.createNavElement()\r\n        })\r\n        projectEditDelete.addEventListener(\"click\", () => {\r\n            _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].deleteProject(name);\r\n            UI.createNavElement()\r\n        })\r\n\r\n        projectDiv.appendChild(projectNameInput);\r\n        projectDiv.appendChild(projectEditApprove);\r\n        projectDiv.appendChild(projectEditCancel);\r\n        projectDiv.appendChild(projectEditDelete);\r\n    }\r\n\r\n    static addProjectForm() {\r\n        const $addProjectBtn = document.getElementById(\"add-project-btn\");\r\n        const $addProjectForm = document.getElementById(\"add-project-form\");\r\n        const $addProjectFormInput = document.getElementById(\"project-name-input\");\r\n        const $addProjectFormBtn = document.getElementById(\"add-project-form-btn\");\r\n        const $cancelProjectFormBtn = document.getElementById(\"cancel-project-form-btn\");\r\n\r\n        $addProjectBtn.addEventListener(\"click\", () => {\r\n            $addProjectForm.style.display = \"block\";\r\n        });\r\n\r\n        $addProjectFormBtn.addEventListener(\"click\", () => {\r\n            if (UI.checkField($addProjectFormInput.value, \"Project Name\")) {\r\n                _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addProject($addProjectFormInput.value);\r\n                UI.createNavElement()\r\n                $addProjectForm.style.display = \"none\";\r\n                $addProjectFormInput.value = \"\"\r\n            }\r\n            else { return }\r\n        })\r\n\r\n        $cancelProjectFormBtn.addEventListener(\"click\", () => {\r\n            $addProjectForm.style.display = \"none\";\r\n            $addProjectFormInput.value = \"\"\r\n        })\r\n\r\n    }\r\n\r\n    static addTaskForm() {\r\n        let newTaskBtn = document.getElementById(\"add-task-btn\")\r\n        let taskInputs = document.querySelectorAll(\".task-input\");\r\n        let addTaskForm = document.getElementById(\"add-task-form\");\r\n        let addTaskFormBtn = document.getElementById(\"add-task-form-btn\");\r\n        let cancelTaskFormBtn = document.getElementById(\"cancel-task-form-btn\");\r\n\r\n        newTaskBtn.addEventListener(\"click\", () => {\r\n            addTaskForm.style.display = \"table\"\r\n        })\r\n        addTaskFormBtn.addEventListener(\"click\", () => {\r\n            let formsFilled = false\r\n            taskInputs.forEach(item => {\r\n                if(item.name === \"name\" || item.name === \"due-date\") {\r\n                    if(UI.checkField(item.value, item.name)) {\r\n                        formsFilled = true}\r\n                    else {\r\n                        formsFilled = false\r\n                    }\r\n                }\r\n            })\r\n\r\n            if(formsFilled) {\r\n                let newTask = (0,_Task__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(taskInputs[0].value, taskInputs[1].value, taskInputs[2].value, taskInputs[3].value)\r\n                _Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].addTask(UI.getActiveProjectName(), newTask)\r\n                UI.taskLoader(UI.getActiveProjectName())\r\n                addTaskForm.style.display = \"none\";\r\n                taskInputs.forEach(item => {\r\n                    item.value = \"\";\r\n                })\r\n            }  \r\n        })\r\n\r\n        cancelTaskFormBtn.addEventListener(\"click\", () => {\r\n            addTaskForm.style.display = \"none\"\r\n            taskInputs.forEach(item => {\r\n                item.value = \"\"\r\n            })\r\n        })\r\n\r\n    }\r\n\r\n    static getActiveProjectName() {\r\n        let activeProject =_Storage__WEBPACK_IMPORTED_MODULE_0__[\"default\"].getProject(document.getElementById(\"project-name\").textContent);\r\n        return activeProject.name\r\n    }\r\n\r\n    static checkField(fieldValue, fieldName) {\r\n        if (fieldValue === \"\") {\r\n            alert(`${fieldName} form must be filled`)\r\n            return false\r\n        }\r\n\r\n        return true\r\n    }\r\n\r\n    static initButtonEvents() {\r\n        UI.addProjectForm()\r\n        UI.addTaskForm()\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://todo-list/./src/UIController.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _Task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Task */ \"./src/Task.js\");\n/* harmony import */ var _Project__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Project */ \"./src/Project.js\");\n/* harmony import */ var _TodoList__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./TodoList */ \"./src/TodoList.js\");\n/* harmony import */ var _Storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Storage */ \"./src/Storage.js\");\n/* harmony import */ var _UIController__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UIController */ \"./src/UIController.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n_UIController__WEBPACK_IMPORTED_MODULE_4__[\"default\"].pageRender()\n\n//# sourceURL=webpack://todo-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;