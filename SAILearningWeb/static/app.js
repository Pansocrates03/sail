let contador = 0;
function myFunctin(){
  contador++
  let Elemento = document.getElementById("ddl");
  if(contador%2 == 0){
    
    console.log(Elemento);
    Elemento.style.display = "none";
  }
  else {
    Elemento.style.display = "block";
  }
  
}