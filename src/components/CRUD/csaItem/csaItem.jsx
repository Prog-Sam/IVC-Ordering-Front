import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getCsaItems } from '../../../services/csaItemService';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../utils/paginate';
import CsaItemTable from '../../../common/csaItemTable';
import MenuHeader from '../../../common/menuHeader';
import access from './../../../config/accessConfig.json';

const CsaItem = () => {
  const [csaItems, setCsaItems] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({});
  const { databaseEmp } = access;
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
      const { data } = await getCsaItems();
      setCsaItems(data);
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
    let filtered = csaItems;

    if (searchQuery)
      filtered = csaItems.filter((u) =>
        `${u.Brand.name} ${u.FscsaModel.modelName}`
          .toLowerCase()
          .indexOf(searchQuery.toLocaleLowerCase()) != -1
          ? true
          : false
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
          path='csaItems'
          header={'CSA'}
          buttonLabel='CSA'
          onSearch={handleSearch}
          searchQuery={searchQuery}
          userLevels={databaseEmp}
        />
        <CsaItemTable
          csaItems={getPagedData().paginated}
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

export default CsaItem;
