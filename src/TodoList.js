const todolistFactory = () => {
    let projects = [];

    const addProject = (newProject) => {
        projects.push(newProject);
    }

    return {
        addProject, projects
    }
}

export default todolistFactory