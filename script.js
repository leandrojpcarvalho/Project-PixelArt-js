const pathOfBody = document.getElementsByTagName('body')[0];

//  criação do titulo

let newTitle = document.createElement('h1');
newTitle.id = 'title';
newTitle.innerText = 'Paleta de Cores';

pathOfBody.appendChild(newTitle);

// criação de uma seção para comportar a paleta de cores
const newSection = document.createElement('section');

pathOfBody.appendChild(newSection);

let newDiv = document.createElement('div');
newDiv.id = 'color-palette';

pathOfBody.lastChild.appendChild(newDiv);

//  criação do titulo h2
newTitle = document.createElement('h2');
newTitle.innerText = 'Paleta de Cores';
pathOfBody.lastChild.firstChild.appendChild(newTitle);

// criação de cada paleta de cor
const arrayColor = ['blue', 'red', 'green', 'yellow'];
for (let i = 0; i < 4; i += 1) {
  newDiv = document.createElement('div');
  newDiv.className = 'color';
  newDiv.style.backgroundColor = arrayColor[i];

  pathOfBody.lastChild.lastChild.appendChild(newDiv);
}
