const addTaskButton = document.getElementById('criar-tarefa');
const input = document.getElementById('texto-tarefa');
const list = document.getElementById('lista-tarefas');

addTaskButton.addEventListener('click', () => {
  const inputValue = input.value;
  if (inputValue !== '') {
    input.value = '';
    const li = document.createElement('li');
    li.innerText = inputValue;
    li.className = 'list-item';
    list.appendChild(li);
  } else {
    alert('Task inválida!!')
  }
});
