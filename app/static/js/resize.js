

function changeFontSize() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const targetElement = document.querySelector("body");
    
    targetElement.style.fontSize = `${vw / 2200}em`;
  }
  
  window.addEventListener("resize", changeFontSize);
  changeFontSize();