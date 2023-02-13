import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [position, setPosition] = useState("");
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([]);

  const addEmployee = () => {
    console.log(name);
    axios
      .post("http://localhost:5000/create", {
        name,
        age,
        country,
        position,
        wage,
      })
      .then(() => console.log("succes"));
  };

  const getEmployee = () => {
    axios
      .get("http://localhost:5000/employees")
      .then((res) => setEmployeeList(res.data));
    // .then((response) => {
    // console.log(response);
    // });
  };
  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };
  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
        <label>Age:</label>
        <input
          type="number"
          onChange={(e) => {
            setAge(e.target.value);
          }}
        />
        <label>Country:</label>
        <input
          type="text"
          onChange={(e) => {
            setCountry(e.target.value);
          }}
        />
        <label>Position:</label>
        <input
          type="text"
          onChange={(e) => {
            setPosition(e.target.value);
          }}
        />
        <label>Wage (year):</label>
        <input
          type="number"
          onChange={(e) => {
            setWage(e.target.value);
          }}
        />
        <button onClick={addEmployee}>Add Employee</button>
      </div>
      <hr />
      <div className="emplyoees">
        <button onClick={getEmployee}>Show List</button>

        <ul>
          <div className="container">
            {employeeList.map((val, key) => {
              return (
                <div key={key} className="user">
                  <li> Name: {val.name}</li>
                  <li>Age: {val.age}</li>
                  <li>Country: {val.country}</li>
                  <li>Position: {val.position}</li>
                  <li>Wage: {val.wage}</li>
                  <button
                    onClick={() => {
                      deleteEmployee(val.id);
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}
          </div>
        </ul>
      </div>
    </div>
  );
}

export default App;
