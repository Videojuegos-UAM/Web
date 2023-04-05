

function changeFontSize() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    const targetElement = document.querySelector("body");
    const targetElement2 = document.querySelector("footer");
    
    targetElement.style.fontSize = `${vw / 2200}em`;
    targetElement2.style.fontSize = `${vw / 2200}em`;
  }
  
  window.addEventListener("resize", changeFontSize);
  changeFontSize();