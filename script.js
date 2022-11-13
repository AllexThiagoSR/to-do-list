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
    li.addEventListener('click', (event) => {
      const target = event.target;
      if (target.className.includes('clicked')) {
        target.classList.remove('clicked');
      } else {
        target.classList.add('clicked');
      }
    })
    list.appendChild(li);
  } else {
    alert('Task inválida!!')
  }
});
