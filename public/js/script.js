document.addEventListener('DOMContentLoaded',  ()=> {
  let canvas = document.getElementById('myCanvas');
  let context = canvas.getContext('2d');
  let isDrawing = false;
  let isErasing = false;
  let pencilSize = 5;
  let enablePencil = false;

  // set initial color
  context.strokeStyle = '#000000';

  const resizeCanvas =() =>{
    // set canvas dimensions to fill the screen
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // set the canvas background color
    context.fillStyle = '#ffffff';
    context.fillRect(0, 0, canvas.width, canvas.height);
  }

  const startDrawing = (e) => {
    if (enablePencil) {
      isDrawing = true;
      draw(e);
    }
  }

  const stopDrawing = () => {
    isDrawing = false;
    context.beginPath();
  }

  const draw = (e)=> {
    if (!isDrawing) return;

    let x = e.clientX || e.touches[0].clientX;
    let y = e.clientY || e.touches[0].clientY;

    context.lineWidth = pencilSize;
    context.lineCap = 'round';

    //Source = drawings you are about to draw on the canvas
    //Destination = drawings that are already drawn on the canvas
    // The globalCompositeOperation property sets or returns how a source are drawn over a destination

    if (isErasing) {
      context.globalCompositeOperation = 'destination-out';
    } else {
      context.globalCompositeOperation = 'source-over';
      context.strokeStyle = document.getElementById('colorPicker').value;
    }

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);

  }

   // resize canvas to fill the screen
   resizeCanvas();


  // Event listeners for canvas drawing
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  canvas.addEventListener('touchstart', startDrawing);
  canvas.addEventListener('touchmove', draw);
  canvas.addEventListener('touchend', stopDrawing);

  document.getElementById('pencilBtn').addEventListener('click', ()=> {
    enablePencil = true;
    isErasing = false;
    //canvas.style.cursor = 'url(pencil.png), auto';
  });

  document.getElementById('eraserBtn').addEventListener('click',()=> {
    enablePencil = true;
    isErasing = true;
  });

  document.getElementById('colorPicker').addEventListener('input', function () {
    context.strokeStyle = this.value;
  });

  document.getElementById('saveButton').addEventListener('click', () => {
    let image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream');
    let link = document.createElement('a');
    link.href = image;
    link.download = new Date().valueOf() + '.png';
    link.click();
  });



  // Resize canvas when the window is resized
  window.addEventListener('resize', () =>{
    resizeCanvas();
  });
});
