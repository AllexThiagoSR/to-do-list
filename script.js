const addTaskButton = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');
const clicked = document.getElementsByClassName('clicked');
const clearListButtton = document.getElementById('apaga-tudo');
const removeCompletedButton = document.getElementById('remover-finalizados');

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

addTaskButton.addEventListener('click', () => {
  const inputValue = input.value;
  if (inputValue !== '') {
    input.value = '';
    const li = document.createElement('li');
    li.innerText = inputValue;
    li.className = 'list-item';
    li.addEventListener('click', selectTask);
    li.addEventListener('dblclick', completeTask);
    list.appendChild(li);
  } else {
    alert('Task inválida!!');
  }
});

clearListButtton.addEventListener('click', () => {
  list.innerHTML = '';
});

removeCompletedButton.addEventListener('click', () => {
  const completed = document.querySelectorAll('.completed');

  for (let index = 0; index < completed.length; index += 1) {
    completed[index].remove();
  }
});
