let input = document.querySelector("#input");
let result = document.querySelector("#result");
let btn = document.querySelector("#btn");

function sendToPython() {
  var { PythonShell } = require("python-shell");

  let options = {
    mode: "text",
  };

  PythonShell.run("./py/server.py", options, function (err, results) {
    if (err) throw err;
    // results is an array consisting of messages collected during execution
    console.log("response: ", results);
  });
}

function onclick(controlButtonVal) {
  console.log(controlButtonVal);
  // console.log(`${input.value}`);
  fetch(`http://127.0.0.1:5001/${controlButtonVal}`)
    .then((data) => {
      return data.text();
    })
    .then((text) => {
      console.log("data: ", text);
      result.textContent = text;
    })
    .catch((e) => {
      console.log(e);
    });
}
sendToPython();

btn.addEventListener("click", () => {
  onclick();
});

btn.dispatchEvent(new Event("click"));

var allButtons = document.querySelectorAll(".btn");

for (var i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", function (event) {
    onclick(event.target.value);
  });
}
