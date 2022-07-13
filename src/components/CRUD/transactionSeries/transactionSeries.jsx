import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getTransactionSeriess } from '../../../services/transactionSeriesService';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../utils/paginate';
import TransactionSeriesTable from '../../../common/transactionSeriesTable';
import MenuHeader from '../../../common/menuHeader';

const TransactionSeries = () => {
  const [transactionSeriess, setTransactionSeriess] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({});
  const [localEnums, setLocalEnums] = useState({
    status: [
      { id: true, value: 'ACTIVE' },
      { id: false, value: 'INACTIVE' },
    ],
  });

  useEffect(() => {
    handlePageChange(0);

    async function getData() {
      const { data } = await getTransactionSeriess();
      setTransactionSeriess(data);
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
    let filtered = transactionSeriess;
    if (searchQuery)
      filtered = transactionSeriess.filter((u) =>
        u.BranchDetail.name
          .toLowerCase()
          .startsWith(searchQuery.toLocaleLowerCase())
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
          path='transactionSeries'
          header={'TRANSACTION SERIES'}
          buttonLabel='Transaction Series'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <TransactionSeriesTable
          transactionSeriess={getPagedData().paginated}
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

export default TransactionSeries;
