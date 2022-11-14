import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getSuppliers } from '../../../services/supplierService';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../utils/paginate';
import SupplierTable from '../../../common/supplierTable';
import MenuHeader from '../../../common/menuHeader';

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [pageSize, setPageSize] = useState(25);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState({});
  const [localEnums, setLocalEnums] = useState({});

  useEffect(() => {
    handlePageChange(0);

    async function getData() {
      const { data } = await getSuppliers();
      setSuppliers(data);
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
    let filtered = suppliers;

    if (searchQuery)
      filtered = suppliers.filter((u) =>
        u.name.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) != -1
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
          path='suppliers'
          header={'SUPPLIER'}
          buttonLabel='Supplier'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <SupplierTable
          suppliers={getPagedData().paginated}
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

export default Supplier;
