const fs = require("fs");
var LAMBDA = "$";
// var path = "sucesorBinario.csv";
var path = "multiploDeTres.csv";
var alphabet;
var head = 1;
var matrix = new Array();
var transicion = null;
var estadoInicial = true;
var movimiento = "N";
var estado;
let input = "-111111-";
var file;
let delay = 3;

const readline = require("readline");

let interfazCaptura = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function readFile() {
  file = fs.readFileSync(path, "utf8");
}

const sleep = () => {
  const end = new Date().getTime() + delay*1000;
  while (new Date().getTime() < end) {
    /* do nothing */
  }
};

function setCharAt(str, index, chr) {
  if (index > str.length - 1) return str;
  return str.substring(0, index) + chr + str.substring(index + 1);
}

function validateFinalState() {
  if (matrix[estado][getColum("F")] === "1") {
    console.log("Cadena valida");
  } else {
    console.log("Cadena invalida");
  }
  process.exit(1);
}

function getColum(simbol) {
  const isSimbol = (element) => element == simbol;
  return alphabet.findIndex(isSimbol);
}

function csvToMatrix() {
  let lines = file.split(/\r\n?\n/);
  alphabet = lines[0].split(",");
  console.log("alfabeto: ", alphabet);

  for (let row = 1; row < lines.length; row++) {
    let rowSeparated = [];
    rowSeparated = lines[row].split(",");
    for (let colum = 0; colum < rowSeparated.length; colum++) {
      matrix[row - 1] = rowSeparated;
    }
  }
  console.log("Matriz:\n", matrix);
}

function printTape() {
  console.log("\nSe realiza el movimiento: " + movimiento);
  if (estado == undefined) {
    console.log("Estado actual: 0");
  } else {
    console.log("Estado actual: " + estado);
  }
  console.log("Estado a transicionar: " + transicion.split("/")[0]);
  let prettyOutPut = "";
  input.split("").forEach((e) => {
    prettyOutPut += e + " ";
  });
  console.log(prettyOutPut);
}

function printHead() {
  let marker = "";
  for (let i = 0; i < head; i++) {
    marker += "  ";
  }
  marker += "▲";
  console.log(marker);
  switch (movimiento) {
    case "R":
      if (head == input.length) {
        head = 0;
      } else {
        head += 1;
      }
      break;
    case "L":
      if (head == 0) {
        head = input.length - 1;
      } else {
        head += -1;
      }
      break;
    case "N":
      break;
    default:
      break;
  }
}

function readMatrix() {
  transicion = matrix[0][getColum(input.split("")[head])];
  while (transicion != "-") {
    if (estadoInicial) {
      estado = matrix[0][0];
      transicion = matrix[0][getColum(input.split("")[head])];
      estadoInicial = false;
    } else {
      estado = matrix[transicion.split("/")[0]][0];
      transicion = matrix[estado][getColum(input.split("")[head])];
    }

    if (transicion != "-") {
      let aux = transicion.split("/")[1];
      if (aux != "$") {
        input = setCharAt(input, head, aux);
      }
    }
    printTape();
    movimiento = transicion.split("/")[2];
    printHead();
    sleep();
  }
  validateFinalState();
}
readFile();
csvToMatrix();
interfazCaptura.question(
  "Introduzca la cadena a validar\n",
  function (respuesta) {
    input = respuesta;
    readMatrix();
    interfazCaptura.close();
  }
);