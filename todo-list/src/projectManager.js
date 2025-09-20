import Todo from './todo.js';
import Project from './project.js';

class ProjectManager {
    constructor(projects = [], activeProject = null) {
        this.projects = projects;
        this.activeProject = activeProject;
    }

    addProject(project) {
        this.projects.push(project);

        if (!this.activeProject) {
            this.activeProject = project;
        }
    }

    removeProject(project) {
        const index = this.projects.indexOf(project);
        if (index === -1) {
            throw new Error("Project not found");
        }

        this.projects.splice(index, 1);

        if (this.activeProject === project) {
            this.activeProject = this.projects.length > 0 ? this.projects[0] : null;
        }
    }

    setActiveProject(project) {
        if (!this.projects.includes(project)) {
            throw new Error("Project does not exist in the project list");
        }

        this.activeProject = project;
    }

    getActiveProject() {
        return this.activeProject;
    }

    saveToStorage() {
        if (typeof localStorage === "undefined") return; // skip in Node
        const jsonObj = JSON.stringify(this.projects);
        localStorage.setItem("todoAppData", jsonObj);
    }

    loadFromStorage() {
        if (typeof localStorage === "undefined") return;

        const stored = localStorage.getItem("todoAppData");
        if (!stored) {
            return; // nothing saved yet
        }

        try {
            const rawProjects = JSON.parse(stored);

            this.projects = rawProjects.map(projectObj => {
                const rebuiltTodos = Array.isArray(projectObj.todos)
                    ? projectObj.todos.map(todoObj =>
                        new Todo(
                            todoObj.title,
                            todoObj.description,
                            todoObj.dueDate,
                            todoObj.priority,
                            todoObj.completed
                        )
                    ): [];

                return new Project(projectObj.name, rebuiltTodos);
            });

        } catch(error) {
            console.warn("Corrupted data in localStorage, clearing...", error);
            localStorage.removeItem("todoAppData");
            this.projects = [];
        }

        this.activeProject = this.projects.length > 0 ? this.projects[0] : null;
    }

    findProject(projectName) {
        const project = this.projects.find(p => p.name === projectName);

        if (!project) {
            throw new Error("Project not found")
        }

        return project;
    }

    findTodo(projectName, todoTitle) {
        const project = this.findProject(projectName);
        const todo = project.todos.find(t => t.title === todoTitle);

        if (!todo) {
            throw new Error("Todo not found");
        }

        return {project, todo}
;
    }

    addTodoToProject(projectName, todo) {
        const project = this.findProject(projectName);
        project.addTodo(todo);
        this.saveToStorage();
    }

    removeTodoFromProject(projectName, todoTitle) {
        const { project, todo } = this.findTodo(projectName, todoTitle);
        project.removeTodo(todo);
        this.saveToStorage();
    }

    toggleTodo(projectName, todoTitle) {
        const { todo } = this.findTodo(projectName, todoTitle);
        todo.toggleComplete();
        this.saveToStorage();
    }
}

export default ProjectManager;
