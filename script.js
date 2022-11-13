const addTaskButton = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');
const clicked = document.getElementsByClassName('clicked');
const clearListButtton = document.getElementById('apaga-tudo');
const removeCompletedButton = document.getElementById('remover-finalizados');
const saveButton = document.getElementById('salvar-tarefas');
const moveUp = document.getElementById('mover-cima');
const moveDown = document.getElementById('mover-baixo');
const removeSelected = document.getElementById('remover-selecionado');

const selectTask = (event) => {
  const clickedTarget = event.target;
  if (clickedTarget.className.includes('clicked')) {
    clickedTarget.classList.remove('clicked');
  } else if (clicked.length === 0) {
    clickedTarget.classList.add('clicked');
  } else {
    clicked[0].classList.remove('clicked');
    clickedTarget.classList.add('clicked');
  }
};

const completeTask = (event) => {
  const clickedTarget = event.target;

  if (clickedTarget.className.includes('completed')) {
    clickedTarget.classList.remove('completed');
  } else {
    clickedTarget.classList.add('completed');
  }
};

const creatListItem = (text, classes=[]) => {
  const li = document.createElement('li');
  li.innerText = text;
  li.className = 'list-item';
  for (let index = 0; index < classes.length; index += 1) {
    li.classList.add(classes[index]);
  }
  li.addEventListener('click', selectTask);
  li.addEventListener('dblclick', completeTask);
  return li;
};

const savedTasks = () => {
  if (localStorage.taskList === undefined) {
    localStorage.setItem('taskList', '[]');
  } else {
    const taskList = JSON.parse(localStorage.getItem('taskList'));

    for (let index = 0; index < taskList.length; index += 1) {
      const classesAndText = taskList[index];
      list.appendChild(creatListItem(classesAndText.text, classesAndText.classes));
    }
  }
};

const addTask = () => {
  const inputValue = input.value;
  if (inputValue !== '') {
    input.value = '';
    list.appendChild(creatListItem(inputValue));
  } else {
    alert('Task inválida!!');
  }
};

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

addTaskButton.addEventListener('click', addTask);

clearListButtton.addEventListener('click', () => {
  list.innerHTML = '';
  localStorage.setItem('taskList', '[]');
});

removeCompletedButton.addEventListener('click', () => {
  const completed = document.querySelectorAll('.completed');

  for (let index = 0; index < completed.length; index += 1) {
    completed[index].remove();
  }
});

saveButton.addEventListener('click', () => {
  if (list.children.length === 0) {
    alert('Sem tarefas para salvar');
  } else {
    const tasks = [];

    for (let i = 0; i < list.children.length; i += 1) {
      tasks.push({text: list.children[i].innerText,
        classes: list.children[i].className.split(' ')});
    }
    localStorage.setItem('taskList', JSON.stringify(tasks));
    alert('Lista salva com sucesso!!');
  }
});

moveUp.addEventListener('click', () => {
  const elementToMove = document.querySelector('.clicked');
  let previousElement = null;
  if (elementToMove !== null) {
    previousElement = elementToMove.previousElementSibling;
  }
  if (previousElement !== null) {
    list.insertBefore(elementToMove, previousElement);
  }
});

moveDown.addEventListener('click', () => {
  const elementToMove = document.querySelector('.clicked');
  let nextElement = null;
  if (elementToMove !== null) {
    nextElement = elementToMove.nextElementSibling;
  }
  if (nextElement !== null) {
    nextElement.after(elementToMove);
  }
});

removeSelected.addEventListener('click', () => {
  const elementToRemove = document.querySelector('.clicked');

  elementToRemove.remove();
});

savedTasks();
