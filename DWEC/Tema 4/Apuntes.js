const btn = document.getElementsByTagName("button");
btn[0].addEventListener("click",()=>document.body.style.backgroundColor = "red"); 
btn[1].addEventListener("click",()=>document.body.style.backgroundColor = "blue");
//"mouseover" es el raton encima del boton y "mouseout" es lo contrario

const btn0 = document.querySelector("button"); //Tambien se puede hacer con "getElementByTagName"
btn.addEventListener("click",()=>console.log("has clickado el boton"));