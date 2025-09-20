function renderProjects(projectManager) {
    const projectsDiv = document.getElementById('projects-list')
    projectsDiv.innerHTML = '';

    console.log("Rendering projects:", projectManager.projects);

    for (const project of projectManager.projects) {
        const newDiv = document.createElement("div");
        newDiv.textContent = project.name;

        if (project === projectManager.getActiveProject()) {
            newDiv.classList.add("active-project-item");
        } else {
            newDiv.classList.add("project-item");
        }
        
        newDiv.dataset.projectName = project.name;
        projectsDiv.appendChild(newDiv);
    }
}

function renderTodos(project) {
    const todosDiv = document.getElementById('todos-list');
    todosDiv.innerHTML = '';

    console.log(`Rendering todos for project: ${project.name}`, project.getTodos());

    if (project.getTodos().length === 0) {
        const noTodosDiv = document.createElement('div');
        noTodosDiv.textContent = 'No todos in this project yet.';
        noTodosDiv.classList.add('no-todos-message');
        todosDiv.appendChild(noTodosDiv);
        return;
    }

    for (const todo of project.getTodos()) {
        const newDiv = document.createElement('div');
        const checkbox = document.createElement('input');

        const viewButton = document.createElement('button');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        viewButton.classList.add('view-button-item');
        viewButton.textContent = 'View';
        viewButton.dataset.todoIndex = project.getTodos().indexOf(todo);

        editButton.classList.add('edit-button-item');
        editButton.textContent = 'Edit Todo';
        editButton.dataset.todoIndex = project.getTodos().indexOf(todo);

        deleteButton.classList.add('delete-button-item');
        deleteButton.textContent = 'Delete Todo';
        deleteButton.dataset.todoIndex = project.getTodos().indexOf(todo);

        checkbox.type = "checkbox";
        checkbox.classList.add('checkbox-item')
        checkbox.dataset.todoIndex = project.getTodos().indexOf(todo);

        if (todo.completed === true) {
            checkbox.checked = true;
        } else {
            checkbox.checked = false;
        }

        const textSpan = document.createElement('span');
        textSpan.textContent = `${todo.title} (due: ${todo.dueDate})`;

        if (todo.completed) {
            textSpan.style.textDecoration = 'line-through';
            textSpan.style.color = 'gray';
        }

        newDiv.classList.add("todo-item");
        newDiv.dataset.todoIndex = project.getTodos().indexOf(todo)

        newDiv.appendChild(textSpan);
        newDiv.appendChild(viewButton);
        newDiv.appendChild(editButton);
        newDiv.appendChild(deleteButton);

        todosDiv.appendChild(newDiv);
    }
}

function attachEventListeners(projectManager) {
    const projectsDiv = document.getElementById('projects');
    const todosDiv = document.getElementById('todos');

    projectsDiv.addEventListener('click', (e) => {
        console.log('Click detected on:', e.target);

        if (e.target.classList.contains('project-item')) {
            const projectName = e.target.dataset.projectName;
            console.log('Project clicked:', projectName);

            const project = projectManager.projects.find(p => p.name === projectName);
            console.log('Found project:', project);

            if (project) {
                projectManager.setActiveProject(project);
                localStorage.setItem('activeProjectName', project.name);
                renderProjects(projectManager);
                renderTodos(project);
            }
        }
    });

    todosDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-button-item')) {
            const todoIndex = e.target.dataset.todoIndex;
            const todo = projectManager.getActiveProject().getTodos()[todoIndex];

            showModalForm(`
                <h3>Todo Details</h3>
                <div class="todo-details">
                    <p><strong>Title:</strong> ${todo.title}</p>
                    <p><strong>Description:</strong> ${todo.description}</p>
                    <p><strong>Due Date:</strong> ${todo.dueDate}</p>
                    <p>
                        <strong>Priority:</strong> 
                        <span class="priority priority-${todo.priority.toLowerCase()}">
                            ${todo.priority}
                        </span>
                    </p>
                    <p><strong>Status:</strong> ${todo.completed ? 'Completed' : 'Not Completed'}</p>
                </div>
                <div class="modal-buttons">
                    <button type="button" class="cancel-modal">Close</button>
                </div>
            `, () => {});
        }
    });

    todosDiv.addEventListener('click', (e) => {
        console.log("Click detected on:", e.target);

        if (e.target.classList.contains('todo-item')) {
            const todoIndex = e.target.dataset.todoIndex;
            console.log('Todo clicked:', todoIndex);

            const todo = projectManager.getActiveProject().getTodos()[todoIndex];

            showModalForm(`
            <h3>Todo Details</h3>
            <div class="todo-details">
                <p><strong>Title:</strong> ${todo.title}</p>
                <p><strong>Description:</strong> ${todo.description}</p>
                <p><strong>Due Date:</strong> ${todo.dueDate}</p>
                <p>
                    <strong>Priority:</strong> 
                    <span class="priority priority-${todo.priority.toLowerCase()}">
                        ${todo.priority}
                    </span>
                </p>
                <p><strong>Status:</strong> ${todo.completed ? 'Completed' : 'Not Completed'}</p>
            </div>
            <div class="modal-buttons">
                <button type="button" class="cancel-modal">Close</button>
            </div>
        `, () => {});
        }
    })

    todosDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('edit-button-item')) {
            console.log('editing todo');

            const todoIndex = e.target.dataset.todoIndex;
            console.log(todoIndex);
            const todo = projectManager.getActiveProject().getTodos()[todoIndex];

            showModalForm(`
                <h3>Edit Todo</h3>
                <label>Title <input name="title" value="${todo.title}" required></label>
                <label>Description <textarea name="description" required>${todo.description}</textarea></label>
                <label>Due Date <input type="date" name="dueDate" value="${todo.dueDate}" required></label>
                <label>Priority
                    <select name="priority" required>
                        <option value="low" ${todo.priority === 'low' ? 'selected' : ''}>Low</option>
                        <option value="medium" ${todo.priority === 'medium' ? 'selected' : ''}>Medium</option>
                        <option value="high" ${todo.priority === 'high' ? 'selected' : ''}>High</option>
                    </select>
                </label>
                <label class="checkbox-label">
                    Mark as completed
                    <input type="checkbox" name="completed" ${todo.completed ? 'checked' : ''}>
                    <span class="custom-checkbox"></span>
                </label>
                <div class="modal-buttons">
                    <button id="update-todo" type="submit">Update Todo</button>
                    <button id="cancel-modal" type="button" class="cancel-modal">Cancel</button>
                </div>
            `, (formData) => {
                const title = formData.get("title");
                const description = formData.get("description");
                const dueDate = formData.get("dueDate");
                const priority = formData.get("priority");
                const completed = formData.get("completed") === 'on';

                if (title && title.trim() !== "") {
                    const changes = {
                        'title': title.trim(),
                        'description': description.trim(),
                        'dueDate': dueDate.trim(),
                        'priority': priority.trim()
                    };

                    todo.updateTodo(changes);
                    todo.completed = completed;
                    projectManager.saveToStorage();
                    renderTodos(projectManager.getActiveProject());
                }
            });
        }
    });

    todosDiv.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete-button-item')) {
            const todoIndex = e.target.dataset.todoIndex;
            console.log(todoIndex)
            const todo = projectManager.getActiveProject().getTodos()[todoIndex];
            const project = projectManager.getActiveProject();

            showModalForm(`
                <h3>Delete Todo</h3>
                <p>Are you sure you want to delete "<strong>${todo.title}</strong>"?</p>
                <p>This action cannot be undone.</p>
                <div class="modal-buttons">
                    <button type="submit" style="background-color: #dc3545; color: white;">Delete</button>
                    <button type="button" class="cancel-modal">Cancel</button>
                </div>
            `, () => {
                project.removeTodo(todo);
                projectManager.saveToStorage();
                renderTodos(projectManager.getActiveProject());
            });
        }
    })
}

function showModalForm(htmlContent, onSubmit, onCancel = null) {
  const overlay = document.getElementById('modal-overlay');
  const form = document.getElementById('modal-form');
  form.innerHTML = htmlContent;

  // Cancel logic
  if (form.querySelector('.cancel-modal')) {
    form.querySelector('.cancel-modal').onclick = (e) => {
      e.preventDefault();
      overlay.classList.add('hidden');
      if (onCancel) onCancel();
    };
  }

  overlay.classList.remove('hidden');
  form.onsubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    onSubmit(formData);
    overlay.classList.add('hidden');
    form.onsubmit = null;
  };

    overlay.onclick = (e) => {
        if (e.target === overlay) {
            overlay.classList.add('hidden');
            if (onCancel) onCancel();
        }
    };
}

export { renderProjects, renderTodos, attachEventListeners, showModalForm }
