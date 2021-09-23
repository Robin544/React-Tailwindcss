import { useEffect, useState } from 'react';
import './App.css';
import Form from './form';

function App() {
  const [allUsers, setAllUsers] = useState([]);
  const [index, setIndex] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    let users = localStorage.getItem("users");
    if (users) {
      setAllUsers(JSON.parse(users));
    }
  }

  const handleSubmit = (data, idx) => {
    let users = localStorage.getItem("users");
    if (!users) {
      return localStorage.setItem("users", JSON.stringify([data]));
    }
    users = JSON.parse(users);

    if (idx != undefined && idx != null) {
      users[idx] = data;
      setIndex(null);
    } else {
      users.push(data);
    }
    localStorage.setItem("users", JSON.stringify(users));
    setAllUsers(users);
  }

  const handleDelete = (idx) => {
    let users = allUsers.filter((user, ind) => ind != idx);
    localStorage.setItem("users", JSON.stringify(users));
    setAllUsers(users);
    setIndex(null);
  }

  return (
    <div className="App">
      <div className="container px-10">
        <div className="grid grid-cols-3 gap-4">
          <Form handleSubmit={handleSubmit} handleDelete={handleDelete} index={index} />
          <div className="col-span-2">
            <table className="table-fixed text-center w-full">
              <thead className="text-lg border-solid rounded-t-lg border-black border-t-8 border-opacity-50">
                <tr>
                  <th className="w-1/4 p-2">User Name</th>
                  <th className="w-1/2 p-2">Email</th>
                  <th className="w-1/4 p-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {allUsers.length ?
                  allUsers.map((user, idx) => (
                    <tr className={idx % 2 == 0 ? "bg-black bg-opacity-10" : ""} key={idx}>
                      <td className="p-2 rounded-l-full">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2 rounded-r-full cursor-pointer hover:text-red-800" onClick={() => setIndex(idx)}>Edit</td>
                    </tr>
                  ))
                  :
                  (<tr className="bg-black bg-opacity-10">
                    <td className="p-2 rounded-l-full"></td>
                    <td className="p-2">No Record Found!</td>
                    <td className="p-2 rounded-r-full cursor-pointer hover:text-red-800"></td>
                  </tr>)
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
