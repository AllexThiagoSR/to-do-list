import './style.css';
import { updateSaved, addTask, savedTasks } from './actions';

const addTaskButton = document.getElementById('criar-tarefa');
const clearListButtton = document.getElementById('apaga-tudo');
const removeCompletedButton = document.getElementById('remover-finalizados');
const saveButton = document.getElementById('salvar-tarefas');
const moveUp = document.getElementById('mover-cima');
const moveDown = document.getElementById('mover-baixo');
const removeSelected = document.getElementById('remover-selecionado');
const input = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');

input.addEventListener('keyup', (event) => {
  if (event.key === 'Enter') addTask();
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
      tasks.push({
        text: list.children[i].innerText,
        classes: list.children[i].className.split(' '),
      });
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
  updateSaved();
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
  updateSaved();
});

removeSelected.addEventListener('click', () => {
  const elementToRemove = document.querySelector('.clicked');

  elementToRemove.remove();
});

savedTasks();
