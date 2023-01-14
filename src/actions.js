
const input = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');
const clicked = document.getElementsByClassName('clicked');

export const updateSaved = () => {
  if (localStorage.getItem('taskList') !== '[]') {
    const tasks = [];

    for (let i = 0; i < list.children.length; i += 1) {
      tasks.push({
        text: list.children[i].innerText,
        classes: list.children[i].className.split(' '),
      });
    }
    localStorage.setItem('taskList', JSON.stringify(tasks));
  }
};

// Evento dos items da lista
const selectTask = (event) => {
  const clickedTarget = event.target;
  if (clicked.length === 0) {
    clickedTarget.classList.add('clicked');
  } else {
    clicked[0].classList.remove('clicked');
    clickedTarget.classList.add('clicked');
  }
};

// Eventos dos items da lista
const completeTask = (event) => {
  const clickedTarget = event.target;

  if (clickedTarget.className.includes('completed')) {
    clickedTarget.classList.remove('completed');
  } else {
    clickedTarget.classList.add('completed');
  }
};

const creatListItem = (text, classes = []) => {
  const li = document.createElement('li');
  li.innerText = text;
  li.className = 'list-item';
  for (let index = 0; index < classes.length; index += 1) {
    if (classes[index] !== 'clicked') {
      li.classList.add(classes[index]);
    }
  }
  li.addEventListener('click', selectTask);
  li.addEventListener('dblclick', completeTask);
  return li;
};

export const savedTasks = () => {
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

export const addTask = () => {
  const inputValue = input.value;
  if (inputValue !== '') {
    input.value = '';
    list.appendChild(creatListItem(inputValue));
  } else {
    alert('Task inválida!!');
  }
};
