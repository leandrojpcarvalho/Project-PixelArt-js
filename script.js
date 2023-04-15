const pathOfBody = document.getElementsByTagName('body')[0];

//  criação do titulo

let newTitle = document.createElement('h1');
newTitle.id = 'title';
newTitle.innerText = 'Paleta de Cores';

pathOfBody.appendChild(newTitle);

// criação de uma seção para comportar a paleta de cores
let newSection = document.createElement('section');

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

// criação do botão
let newButton = document.createElement('button');
newButton.id = 'button-random-color';
newButton.innerHTML = 'Cores aleatórias';

pathOfBody.lastChild.lastChild.appendChild(newButton);
// função para gerar cor
function randomColors() {
  const letters = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];
  let newColor = '#';

  for (let i = 0; i < 6; i += 1) {
    newColor += letters[Math.floor(Math.random() * 16)];
  }
  return newColor;
}
// listener butão e localstorage
const pathOfButton = document.getElementById('button-random-color');
const pathOfColors = document.getElementsByClassName('color');
let arrayRandomColors = [];

// função para setar cor
function setColor(arrayOfColors) {
  for (let i = 0; i < 3; i += 1) {
    pathOfColors[i + 1].style.backgroundColor = arrayOfColors[i];
  }
}

// lister do botão
pathOfButton.addEventListener('click', () => {
  // limpar o arrayRandomColors
  arrayRandomColors = [];
  for (let i = 0; i < 3; i += 1) {
    arrayRandomColors.push(randomColors());
  }
  localStorage.setItem('colorPalette', JSON.stringify(arrayRandomColors));
  setColor(arrayRandomColors);
});

// localstorage
const restoreLocalStorage = () => {
  if (localStorage.getItem('colorPalette')) {
    arrayRandomColors = JSON.parse(localStorage.getItem('colorPalette'));
    setColor(arrayRandomColors);
  } else {
    setColor(arrayColor.shift());
  }
};

// criação do quadro pix
newSection = document.createElement('section');

pathOfBody.appendChild(newSection);

newDiv = document.createElement('div');
newDiv.id = 'pixel-board';

pathOfBody.lastChild.appendChild(newDiv);

// criação dos pixels
for (let i = 0; i < 25; i += 1) {
  newDiv = document.createElement('div');
  newDiv.className = 'pixel';
  pathOfBody.lastChild.lastChild.appendChild(newDiv);
}

// restaurar cores geradas
window.onload = () => {
  restoreLocalStorage();
};

pathOfColors[0].classList.add('selected');

// criar função para selecionar cores
//  mapeia a o htmlcollection
const mapOfColors = Object.values(pathOfColors);
// remove a classe selected
const removeSelected = () => {
  mapOfColors.forEach((color) => {
    color.classList.remove('selected');
  });
};
// atribui a classe selected
const selectColor = (event) => {
  const selectedColor = event.target;

  removeSelected();

  selectedColor.classList.add('selected');
};

mapOfColors.forEach((color) => {
  color.addEventListener('click', selectColor);
});

// mapeamento dos pixels
const mapOfPixels = Object.values(document.getElementsByClassName('pixel'));

// função para setar a cor dos pixels
const setPixelColor = (event) => {
  const selectedColor = document.getElementsByClassName('color selected')[0];
  const pixelColor = event.target;

  pixelColor.style.backgroundColor = selectedColor.style.backgroundColor;
};

// listener dos pixels
mapOfPixels.forEach((pixel) => {
  pixel.addEventListener('click', setPixelColor);
});

// criar botão para limpar

newButton = document.createElement('button');
newButton.innerText = 'Limpar';
newButton.id = 'clear-board';

pathOfBody.lastChild.previousSibling.appendChild(newButton);

function clearPixels() {
  mapOfPixels.forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  });
}

// listern do botão limpar
document.getElementById('clear-board').addEventListener('click', clearPixels);
