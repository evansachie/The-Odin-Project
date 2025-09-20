import ProjectManager from './projectManager.js';
import Project from './project.js';
import Todo from './todo.js'
import { renderProjects, renderTodos, attachEventListeners, showModalForm } from './dom.js';

const pm = new ProjectManager();
pm.loadFromStorage();

const savedActiveProjectName = localStorage.getItem('activeProjectName');

if (savedActiveProjectName) {
    const savedProject = pm.projects.find(p => p.name === savedActiveProjectName);
    if (savedProject) {
        pm.setActiveProject(savedProject);
    }
}

if (pm.projects.length === 0) {
    const schoolProject = new Project("School");
    schoolProject.addTodo(new Todo("Math Homework", "Complete algebra problems", "2025-09-02", "high"));
    schoolProject.addTodo(new Todo("History Essay", "Write essay on WWII", "2025-09-05", "medium"));

    const workProject = new Project("Work");
    workProject.addTodo(new Todo("Team Meeting", "Weekly standup meeting", "2025-09-01", "high"));
    workProject.addTodo(new Todo("Code Review", "Review pull requests", "2025-09-03", "medium"));

    pm.addProject(schoolProject);
    pm.addProject(workProject);

    pm.saveToStorage();
}

renderProjects(pm)
if (pm.getActiveProject()) {
    renderTodos(pm.getActiveProject())
}

attachEventListeners(pm)

// add project button functionality
const addProjectBtn = document.getElementById('add-project-btn')

addProjectBtn.addEventListener('click', () => {
    showModalForm(`
        <h3>Add New Project</h3>
        <label>Project Name 
            <input name="projectName" required placeholder="Enter project name">
        </label>
        <div class="modal-buttons">
            <button id="update-todo" type="submit">Add Project</button>
            <button id="cancel-modal" type="button" class="cancel-modal">Cancel</button>
        </div>
    `, (formData) => {
        const name = formData.get("projectName");

        if (name && name.trim() !== "") {
            const newProject = new Project(name.trim());
            pm.addProject(newProject);
            pm.saveToStorage();
            renderProjects(pm);
        }
    });
});

// add todo button functionality
const addTodoBtn = document.getElementById('add-todo-button')

addTodoBtn.addEventListener('click', () => {
    showModalForm(`
      <h3>Add New Todo</h3>
      <label>Title <input name="title" required></label>
      <label>Description <textarea name="description" required></textarea></label>
      <label>Due Date <input type="date" name="dueDate" required></label>
      <label>Priority
        <select name="priority" required>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
        </select>
      </label>
      <div class="modal-buttons">
        <button id="update-todo" type="submit">Add Todo</button>
        <button id="cancel-modal" type="button" class="cancel-modal">Cancel</button>
      </div>
    `, (formData) => {
      const title = formData.get("title");
      const description = formData.get("description");
      const dueDate = formData.get("dueDate");
      const priority = formData.get("priority");

      const activeProject = pm.getActiveProject();

      if (!activeProject) {
            showModalForm(`
                <h3>No Project Selected</h3>
                <p>Please select a project first before adding todos.</p>
                <div class="modal-buttons">
                    <button type="button" class="cancel-modal">OK</button>
                </div>
            `, () => {
            });
            return;
        }

      if (title && title.trim() !== "") {
        const newTodo = new Todo(title.trim(), description.trim(), dueDate.trim(), priority.trim());
        pm.addTodoToProject(activeProject.name, newTodo);
        pm.saveToStorage();
        renderTodos(activeProject);
      }
    });
});

document.getElementById('modal-overlay').classList.add('hidden');
