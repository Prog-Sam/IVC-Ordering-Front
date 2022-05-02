import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Users from '../services/users.json';
import Branches from '../services/branches.json';
import Pagination from './../common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './../common/listGroup';
import UserTable from '../common/userTable';
import _ from 'lodash';

const User = () => {
  const [users, setUsers] = useState([]);
  const [branches, setBranches] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({});
  const [localEnums, setLocalEnums] = useState({
    status: [
      { id: 0, value: 'TEMPORARY' },
      { id: 1, value: 'ACTIVE' },
      { id: 2, value: 'DISABLED' },
    ],
    access: [
      { id: 0, value: 'DEVELOPER' },
      { id: 1, value: 'OIC' },
      { id: 2, value: 'ASSISTANT OIC' },
      { id: 3, value: 'MANAGEMENT' },
      { id: 4, value: 'OPTOMETRIST' },
      { id: 5, value: 'ENCODER' },
      { id: 6, value: 'SALES' },
    ],
  });

  useEffect(() => {
    handlePageChange(0);
    setUsers(Users);
    setBranches(Branches);
  }, []);

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handlePageChange = (i) => {
    setCurrentPage(i + 1);
  };

  const getPagedData = () => {
    // const filtered

    const sortedUsers = _.orderBy(users, [sortColumn.path], [sortColumn.order]);

    return paginate(sortedUsers, currentPage, pageSize);
  };

  return (
    <div className='row'>
      {/* <div className='col-2'><ListGroup items={ }/></div> */}
      <div className='col'>
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
        <UserTable
          users={getPagedData()}
          localEnums={localEnums}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          totalItems={users.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default User;
