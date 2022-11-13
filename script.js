const addTaskButton = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');
const clicked = document.getElementsByClassName('clicked');
const clearList = document.getElementById('apaga-tudo');

const selectTask = (event) => {
  const target = event.target;
  if (target.className.includes('clicked')) {
    target.classList.remove('clicked');
  } else if (clicked.length === 0) {
    target.classList.add('clicked');
  } else {
    clicked[0].classList.remove('clicked');
    target.classList.add('clicked');
  }
};

const completeTask = (event) => {
  const target = event.target;

  if (target.className.includes('completed')) {
    target.classList.remove('completed');
  } else {
    target.classList.add('completed');
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
    alert('Task inválida!!')
  }
});

clearList.addEventListener('click', () =>{
  list.innerHTML = '';
});
