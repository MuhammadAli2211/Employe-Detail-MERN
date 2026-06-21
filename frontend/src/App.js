import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const API = "http://localhost:4000/employees";

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [salary, setSalary] = useState("");
  const [editId, setEditId] = useState(null);


  const loadEmployees = async () => {
    const res = await axios.get(API);
    setEmployees(res.data);
  };

  useEffect(() => {
    loadEmployees();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name,
      email,
      department,
      salary
    };

    if (editId) {
      await axios.put(`${API}/${editId}`, data);
      setEditId(null);
    } else {
      await axios.post(API, data);
    }

    setName("");
    setEmail("");
    setDepartment("");
    setSalary("");

    loadEmployees();
  };


  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    loadEmployees();
  };


  const handleEdit = (emp) => {
    setName(emp.name);
    setEmail(emp.email);
    setDepartment(emp.department);
    setSalary(emp.salary);
    setEditId(emp._id);
  };

  return (
    <div className="container">
  <h2>Employee Management System</h2>


      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
        />

        <button type="submit">
          {editId ? "Update" : "Add"}
        </button>
      </form>
      <hr />
  <div className="employee-list">
    {employees.map((emp) => (
      <div className="employee-card" key={emp._id}>
        <div className="employee-info">
          <strong>{emp.name}</strong><br />
          {emp.email}<br />
          {emp.department}<br />
          Rs. {emp.salary}
        </div>

        <div className="actions">
          <button
            className="edit-btn"
            onClick={() => handleEdit(emp)}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => handleDelete(emp._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
</div>
  );
}

export default App;