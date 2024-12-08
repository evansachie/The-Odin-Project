import Todo from './modules/todo';
import Project from './modules/project';

const defaultProject = new Project('Default Project');

function loadProjects() {
  const savedProjects = JSON.parse(localStorage.getItem('projects'));
  if (savedProjects && savedProjects.length) {
    savedProjects.forEach((projectData) => {
      const project = new Project(projectData.name);
      projectData.todos.forEach((todoData) => {
        const todo = new Todo(
          todoData.title,
          todoData.description,
          todoData.dueDate,
          todoData.priority
        );
        project.addTodo(todo);
      });
      projects.push(project);
    });
  }
}

let projects = [defaultProject];

loadProjects();

function saveProjects() {
  localStorage.setItem('projects', JSON.stringify(projects));
}

function renderProjects() {
  const projectsContainer = document.getElementById('projects');
  projectsContainer.innerHTML = '';

  projects.forEach((project) => {
    const projectElement = document.createElement('div');
    projectElement.textContent = project.name;

    const todosList = document.createElement('ul');
    project.todos.forEach(todo => {
      const todoItem = document.createElement('li');
      todoItem.textContent = `${todo.title} - Due: ${todo.dueDate}`;
      todosList.appendChild(todoItem);
    });

    projectElement.appendChild(todosList);
    projectsContainer.appendChild(projectElement);
  });
}

renderProjects();

document.getElementById('addTodo').addEventListener('click', () => {
  const todo = new Todo('New Todo', 'Description here', '2024-12-31', 'high');
  defaultProject.addTodo(todo);
  saveProjects();
  renderProjects();
});
