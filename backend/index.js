const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());


mongoose.connect(
        "mongodb://moon:moon2211@ac-l2ejgmi-shard-00-00.koufj2e.mongodb.net:27017,ac-l2ejgmi-shard-00-01.koufj2e.mongodb.net:27017,ac-l2ejgmi-shard-00-02.koufj2e.mongodb.net:27017/?ssl=true&replicaSet=atlas-fic7lp-shard-0&authSource=admin&appName=Cluster0"
)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);


app.get("/employees", async (req, res) => {
  const data = await Employee.find();
  res.json(data);
});


app.post("/employees", async (req, res) => {
  try {
    const emp = await Employee.create(req.body);
    res.json(emp);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});


app.put("/employees/:id", async (req, res) => {
  const updated = await Employee.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});


app.delete("/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

app.listen(4000, () => console.log("Server running on port 4000"));