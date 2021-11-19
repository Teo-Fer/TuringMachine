const fs = require("fs");

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
    let alphabet = lines[0].split(",");
    console.log("alfabeto: ",alphabet);
    let matrix = new Array();
    for (let row = 1; row < lines.length; row++){
      let rowSeparated = [];
      rowSeparated = lines[row].split(",");
      for (let colum = 0; colum < rowSeparated.length; colum++){
          matrix[row-1] = rowSeparated;
      }
    }
    return matrix;
}

function readMatrix(matrix, input) {
  colum = input.split("");
  console.log(colum);
  element = matrix[0][0].split("/");
  nextState = 
  console.log(element);
}
let input = "11";
let fileCsv = readFile("./input.csv");
let matrix = csvToMatrix(fileCsv);
readMatrix(matrix, input);


