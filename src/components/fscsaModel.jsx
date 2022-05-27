import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getFSCSAModels } from '../services/fscsaModelService';
import Pagination from './../common/pagination';
import { paginate } from '../utils/paginate';
import FSCSAModelTable from '../common/fscsaModelTable';
import MenuHeader from '../common/menuHeader';

const FSCSAModel = () => {
  const [fscsaModels, setFSCSAModels] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({});
  const [localEnums, setLocalEnums] = useState({
    status: [
      { id: 0, value: 'TEMPORARY' },
      { id: 1, value: 'ACTIVE' },
      { id: 2, value: 'DISABLED' },
    ],
  });

  useEffect(() => {
    handlePageChange(0);

    async function getData() {
      const { data } = await getFSCSAModels();
      setFSCSAModels(data);
    }

    getData();
  }, []);

  const handleSort = (sortColumn) => {
    setSortColumn(sortColumn);
  };

  const handlePageChange = (i) => {
    setCurrentPage(i + 1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const getPagedData = () => {
    let filtered = fscsaModels;
    if (searchQuery)
      filtered = fscsaModels.filter((u) =>
        u.name.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginated = paginate(sorted, currentPage, pageSize);
    return { paginated, filtered };
  };

  return (
    <div className='row'>
      {/* <div className='col-2'><ListGroup items={ }/></div> */}
      <div className='col'>
        <MenuHeader
          path='fscsaModels'
          header={'FS CS A MODELS'}
          buttonLabel='FS CS A Model'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <FSCSAModelTable
          fscsaModels={getPagedData().paginated}
          localEnums={localEnums}
          onSort={handleSort}
          sortColumn={sortColumn}
        />
        <Pagination
          totalItems={getPagedData().filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default FSCSAModel;
