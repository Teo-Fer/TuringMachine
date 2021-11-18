const fs = require("fs");

function readCsv(path) {
  let csv;
  fs.readFile("./input.csv", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }
    csv = data;
    console.log(data);
  });
  console.log(csv);
}
