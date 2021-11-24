const fs = require("fs");

var LAMBDA = "$"
var alphabet;
var head = 0;

let input = "dcbaa";

function setCharAt(str,index,chr) {
  if(index > str.length-1) return str;
  return str.substring(0,index) + chr + str.substring(index+1);
}

function readFile(path) {
  let file = fs.readFileSync(path, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    return data;
  });
  return file;
}

function csvToMatrix(fileCsv) {
    let lines = fileCsv.split(/\r\n?\n/);
    alphabet = lines[0].split(",");
    console.log("alfabeto: ",alphabet);
    let matrix = new Array();
    for (let row = 1; row < lines.length; row++){
      let rowSeparated = [];
      rowSeparated = lines[row].split(",");
      for (let colum = 0; colum < rowSeparated.length; colum++){
          matrix[row-1] = rowSeparated;
      }
    }
    console.log("Matriz:\n",matrix);
    return matrix;
}

function printTape(charToWrite){
  if (charToWrite != LAMBDA){
      input = setCharAt(input, head, charToWrite);
  }
  let prettyOutPut="";
  input.split("").forEach(e =>{
    prettyOutPut+=e+" ";
  })
  console.log(prettyOutPut);
}

function printHead(movement, tape){
  let marker = "";
  for (let i = 0; i< head;i++){
    marker+="  "
  }
  marker+="^"
  console.log(marker);
  switch (movement) {
    case "R":
      if (head == tape.length) {
        head = 0;
      } else{
        head += 1;
      }
      break;
    case "L":
      if (head == 0) {
        head = tape.length-1;
      } else {
        head -= 1; 
      }
      break;
    case "N":
      break;
  }
 
}

function readMatrix(matrix) {
  let colum = 0;
  let row = 0;
  let prettyOutPut="";
  input.split("").forEach(e =>{
    prettyOutPut+=e+" ";
  })
  console.log("Entrada: " + prettyOutPut);

  element = matrix[row][colum].split("/");
  input.split("").forEach(char => {
    row = element[0]-1;
    colum = alphabet.indexOf(char);
    element = matrix[row][colum].split("/");
    console.log("row: "+ row+"  colum: "+ colum);
    movement = element[1];
    console.log("Realiza el movimiento: "+ movement);
    charToWrite = element[2];
    console.log("Escribe el valor: "+ charToWrite);
    printTape(charToWrite);
    printHead(movement, input);
  });
  
}
let entrada = window.prompt('Ingrese su nombre:','');
let fileCsv = readFile("./input.csv");
let matrix = csvToMatrix(fileCsv);
readMatrix(matrix, input);


