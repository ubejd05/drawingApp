const clearBtn = document.querySelector('#clear');
const rangeInput = document.querySelector('#brush-size');
const colorInput = document.querySelector('#color');
const saveBtn = document.querySelector('#save');
const colorBtns = document.querySelectorAll('.color');

const canvas = document.querySelector('#canvas');
const ctx = canvas.getContext('2d');

//Resize canvas to full screen
canvas.width = window.innerWidth - 50;
canvas.height = window.innerHeight - 300;

let painting = false;
let brushSize = rangeInput.value;
let color = colorInput.value;

function startPosition(e) {
  painting = true;
  draw(e);
}

function finishedPosition() {
  painting = false;
  ctx.beginPath();
}

// set line color 


function draw(e) {
  if(!painting) return;
  ctx.lineWidth = brushSize;
  ctx.lineCap = 'round';
  ctx.strokeStyle = color;

  ctx.lineTo(e.clientX, e.clientY);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(e.clientX, e.clientY);
} 


canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);





window.addEventListener('resize', () => {
  canvas.width = window.innerWidth - 50;
  canvas.height = window.innerHeight - 200;
})


clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
})


rangeInput.addEventListener('input', (e) => {
  brushSize = e.target.value;
})

colorInput.addEventListener('input', (e) => {
  color = e.target.value;
})

saveBtn.addEventListener('click', () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'paint';
  link.click();
})

colorBtns.forEach(btn => { 
  btn.addEventListener('click', (e) => {
    color = e.target.dataset.color;
    console.log(e.target.dataset.color);
  })
})