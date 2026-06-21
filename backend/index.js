const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); 


const app = express();


app.use(cors({
    origin: 'https://employe-detail-mern-raqj-git-main-muhammad-ali2211.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
}));


app.options('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://employe-detail-mern-raqj-git-main-muhammad-ali2211.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With, Accept');
    res.sendStatus(200);
});
app.use(express.json());


const MONGO_URI = process.env.MONGO_URI || "mongodb://moon:moon2211@ac-l2ejgmi-shard-00-00.koufj2e.mongodb.net:27017,ac-l2ejgmi-shard-00-01.koufj2e.mongodb.net:27017,ac-l2ejgmi-shard-00-02.koufj2e.mongodb.net:27017/?ssl=true&replicaSet=atlas-fic7lp-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  salary: Number,
});

const Employee = mongoose.model("Employee", employeeSchema);

app.get("/", (req, res) => {
  res.json({ message: "Employee API is running successfully!" });
});

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
    { returnDocument: 'after' } 
  );
  res.json(updated);
});

app.delete("/employees/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
module.exports = app;