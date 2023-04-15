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

// criação do botão gerar cores aleatórias
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
// listener butão random color e localstorage
const pathOfButton = document.getElementById('button-random-color');
const pathOfColors = document.getElementsByClassName('color');
let arrayRandomColors = [];

// função para setar cor
function setColor(arrayOfColors) {
  for (let i = 0; i < 3; i += 1) {
    pathOfColors[i + 1].style.backgroundColor = arrayOfColors[i];
  }
}

// listener do botão random color
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
// função para determinar o grid
function square(order, pixel) {
  let squareCss = '';
  for (let i = 0; i < order; i += 1) {
    squareCss += pixel + 'px ';
  }
  document.body.style.setProperty('--square', squareCss);
}

// criação dos pixels
function createPixels(order, pixel) {
  for (let i = 0; i < order ** 2; i += 1) {
    newDiv = document.createElement('div');
    newDiv.className = 'pixel';
    newDiv.id = `px-${i}`;
    document.getElementById('pixel-board').appendChild(newDiv);
  }
  square(order, pixel);
}

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

// criar objeto para armazernar cores e posições
const saveDraw = {};

// mapeamento dos pixels
function reloadMapOfPixels() {
  return Object.values(document.getElementsByClassName('pixel'));
}
// função scanner para salvar no localStorage
function scanPixels() {
  reloadMapOfPixels().forEach((pixel) => {
    saveDraw[pixel.id] = pixel.style.backgroundColor;
  });
}

// função para setar a cor dos pixels
const setPixelColor = (event) => {
  const selectedColor = document.getElementsByClassName('color selected')[0];
  const pixel = event.target;

  pixel.style.backgroundColor = selectedColor.style.backgroundColor;
  scanPixels();
  localStorage.setItem('pixelBoard', JSON.stringify(saveDraw));
};

// listener dos pixels
function addListnerPixels() {
  reloadMapOfPixels().forEach((pixel) => {
    pixel.addEventListener('click', setPixelColor);
  });
}
// nova div para botão limpar e input da largura do pixel
newDiv = document.createElement('div');
newDiv.className = 'button-input';
pathOfBody.lastChild.previousSibling.appendChild(newDiv);

// caminho para div .button-input
const pathOfButtonInputDiv = document.getElementsByClassName('button-input')[0];
// criar botão para limpar
newButton = document.createElement('button');
newButton.innerText = 'Limpar';
newButton.id = 'clear-board';

pathOfButtonInputDiv.appendChild(newButton);

function clearPixels() {
  reloadMapOfPixels().forEach((pixel) => {
    pixel.style.backgroundColor = 'white';
  });
}

// listern do botão limpar
document.getElementById('clear-board').addEventListener('click', clearPixels);

//  Função para restaurar o pixel no localstorage

function restorePixelBoard() {
  if (localStorage.getItem('boardSize')) {
    const arrayBoard = JSON.parse(localStorage.getItem('boardSize'));
    // restaurador comprimento
    removePixels();
    createPixels(arrayBoard[0], arrayBoard[1]);
    addListnerPixels();
  }
  if (localStorage.getItem('pixelBoard')) {
    const objPixelBoard = JSON.parse(localStorage.getItem('pixelBoard'));
    const arrayPixelBoard = Object.entries(objPixelBoard);
    // restaurador PixelBoard pintado
    arrayPixelBoard.forEach((arrayIdColor) => {
      const [pixelId, color] = arrayIdColor;
      const pixelLoc = document.getElementById(pixelId);
      pixelLoc.style.backgroundColor = color;
    });
  } else {
    clearPixels();
  }
}

// restaurar cores geradas
window.onload = () => {
  createPixels(5, 40);
  addListnerPixels();
  restoreLocalStorage();
  restorePixelBoard();
  addListnerPixels();
};

// +++++====+++++====+++++====Bonus====+++++====+++++====+++++
// criação do botão

const newInput = document.createElement('input');
newInput.id = 'board-size';
newInput.min = '1';
newInput.type = 'number';

pathOfButtonInputDiv.appendChild(newInput);

newButton = document.createElement('input');
newButton.id = 'generate-board';
newButton.type = 'submit';
newButton.innerText = 'VQV';

pathOfButtonInputDiv.appendChild(newButton);

// ==============================================
// caminhos do input e botão VQV
const pathBtVQV = pathOfButtonInputDiv.lastChild;
const pathOfInputVQV = pathOfButtonInputDiv.firstChild.nextSibling;
// função para limitar pixels
function maxPixel(pixel) {
  if (pixel < 5) {
    return 5;
  } else if (pixel > 50) {
    return 50;
  }
  return pixel;
}
// funções do botão VQV
function setPixels() {
  if (pathOfInputVQV.value !== '' && pathOfInputVQV.value > 0) {
    localStorage.setItem(
      'boardSize',
      JSON.stringify([pathOfInputVQV.value, pathOfInputVQV.value])
    );
    scanPixels();
    removePixels();
    createPixels(
      maxPixel(pathOfInputVQV.value),
      maxPixel(pathOfInputVQV.value)
    );
    addListnerPixels();
    document.body.style.setProperty(
      '--pixel',
      `${maxPixel(pathOfInputVQV.value)}px`
    );
  } else {
    alert('Board inválido!');
    pathOfInputVQV.value = '';
  }
}

// listener do botao VQV
pathBtVQV.addEventListener('click', setPixels);

function removePixels() {
  reloadMapOfPixels().forEach((pixel) => {
    pixel.removeEventListener('click', setPixelColor);
  });
  const parent = document.getElementById('pixel-board');
  parent.innerText = '';
}
