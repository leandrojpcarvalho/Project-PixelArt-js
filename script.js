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
const arrayColor = ['black', 'red', 'green', 'yellow'];
for (let i = 0; i < 4; i += 1) {
  newDiv = document.createElement('div');
  newDiv.className = 'color';
  newDiv.style.backgroundColor = arrayColor[i];

  pathOfBody.lastChild.lastChild.appendChild(newDiv);
}

const newButton = document.createElement('button');
newButton.id = 'button-random-color';
newButton.innerHTML = 'Cores aleatórias';

pathOfBody.lastChild.lastChild.appendChild(newButton);

function randomColors() {
  const letters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let newColor = '#';

  for (let i = 0; i < 6; i += 1) {
    newColor += letters[Math.floor(Math.random() * 16)];
  }
  return newColor;
}

const pathOfButton = document.getElementById('button-random-color');
const pathOfColor = document.getElementsByClassName('color');

pathOfButton.addEventListener('click', () => {
  for (let i = 0; i < 3; i += 1) {
    pathOfColor[i + 1].style.backgroundColor = randomColors();
  }
});
