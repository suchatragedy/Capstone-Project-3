import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

let dataDay = []

let taskListWork = [];
var taskToAddWork = "";
let dataWork = {
  addedTaskWork: taskListWork,
};

app.use(bodyParser.urlencoded({ extended: true }));

function addTaskToListWork(req, res, next) {
  taskToAddWork = req.body["taskWork"];
  next();
}

app.use(addTaskToListWork);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("index.ejs", { data: dataDay });
});

app.post("/", (req, res) => {
  dataDay.push({
    task: req.body["taskDay"],
    isChecked: false
  })

  res.render("index.ejs",  { data: dataDay });
});

app.post("/:id", (req, res) => {
  let id = req.params["id"]

  dataDay[id].isChecked = !dataDay[id].isChecked
  
  res.render("index.ejs",  { data: dataDay });
})

app.get("/work", (req, res) => {
  res.render("work.ejs", dataWork);
});

app.post("/addWork", (req, res) => {
  taskListWork.push(taskToAddWork);
  res.render("work.ejs", dataWork);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}.`);
});
