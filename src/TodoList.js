import projectFactory from "./Project";

const todolistFactory = () => {
    let projects = [];
    
    const addProject = (newProject) => {
        projects.push(newProject);
    }

    const deleteProject = (name) => {
        projects = projects.filter(_project => _project.name !== name);
        return projects
    }

    const getProject = (project) => {
        return projects.find((_project) => _project.name === project);
    }

    const getAllProjects = () => {
        return projects;
    }

    return {
        addProject, deleteProject, getProject, getAllProjects, projects
    }
}

export default todolistFactory