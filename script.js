const pathOfBody = document.getElementsByTagName('body')[0];

//  criação do titulo

const newTitle = document.createElement('h1');
newTitle.id = 'title';
newTitle.innerText = 'Paleta de Cores';

pathOfBody.appendChild(newTitle);
