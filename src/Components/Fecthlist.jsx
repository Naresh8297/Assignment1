import React, { useEffect, useState } from "react";
import "./Fetchlist.css"

const Fetchlist = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchEmployees() {
      try {
        const response = await fetch('https://reqres.in/api/users?page=2');
        const data = await response.json();
        setEmployees(data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchEmployees();
  }, []);

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const filteredEmployees = employees.filter(employee =>
    employee.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input placeholder="Search by Name"
        type="text"
        value={searchQuery}
        onChange={e => handleSearch(e.target.value)}
      />
     <div className="card">
  {filteredEmployees.map(employee => (
    <article className="details" key={employee.id}>
      <div className="avatar-container">
        <img src={employee.avatar} alt="Avatar" className="employee-avatar" />
        <p className="employee-id">{employee.id}</p>
      </div>
      <p className="employee-name">{employee.first_name}</p>
    </article>
  ))}
</div>

    </div>
  );
};

export default Fetchlist;