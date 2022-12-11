import projectFactory from "./Project";

const todolistFactory = () => {
    let projects = [];
    projects.push(projectFactory("Home", "no color"))
    projects.push(projectFactory("Today", "no color"))
    projects.push(projectFactory("This Week", "no color"))
    
    const addProject = (newProject) => {
        projects.push(newProject);
    }

    const deleteProject = (project) => {
        projects = projects.filter(_project => _project.getName() !== project);
    }

    
    const getProject = (project) => {
        return projects.find((_project) => _project.getName() === project);
    }

    const getAllProjects = () => {
        return projects;
    }


    return {
        addProject, deleteProject, getProject, getAllProjects
    }
}

export default todolistFactory