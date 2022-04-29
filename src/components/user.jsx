import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Users from './../service/users.json';
import Pagination from './../common/pagination';
import { paginate } from '../utils/paginate';

const User = () => {
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    handlePageChange(0);
    setUsers(Users);
  }, []);

  const handlePageChange = (i) => {
    // let item = {
    //   index: i + 1,
    //   items: [],
    // };
    // for (let k = i * pageSize; k < i * pageSize + pageSize; k++) {
    //   if (!Users[k]) continue;
    //   item.items.push({ ...Users[k] });
    // }
    // setCurrentPage(i + 1);
    // setTableData(item.items);
    setCurrentPage(i + 1);
  };

  let tableUsers = paginate(users, currentPage, pageSize);

  return (
    <div>
      <h1 className='d-flex align-items-left'>USERS </h1>
      <div className='d-flex align-items-left'>
        <Link
          to='/users/new'
          className='btn btn-primary'
          style={{ marginBottom: 20 }}
        >
          New User
        </Link>
      </div>

      <table className='table justify-content'>
        <thead>
          <tr>
            <th scope='col'>Id</th>
            <th scope='col'>Name</th>
            <th scope='col'>Username</th>
            <th scope='col'>Access</th>
            <th scope='col'>Status</th>
          </tr>
        </thead>
        <tbody>
          {tableUsers.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>
                <Link to={'/users/' + item.id}>{item.name}</Link>
              </td>
              <td>{item.username}</td>
              <td>{item.access}</td>
              <td>{item.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        totalItems={users.length}
        pageSize={pageSize}
        onPageChange={(page) => {
          handlePageChange(page);
        }}
        currentPage={currentPage}
      />
    </div>
  );
};

export default User;
