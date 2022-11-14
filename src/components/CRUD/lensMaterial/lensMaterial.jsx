import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getLensMaterials } from '../../../services/lensMaterialService';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../utils/paginate';
import LensMaterialTable from '../../../common/lensMaterialTable';
import MenuHeader from '../../../common/menuHeader';

const LensMaterial = () => {
  const [lensMaterials, setLensMaterials] = useState([]);
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
      const { data } = await getLensMaterials();
      setLensMaterials(data);
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
    let filtered = lensMaterials;

    if (searchQuery)
      filtered = lensMaterials.filter((u) =>
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
          path='lensMaterials'
          header={'LENS MATERIALS'}
          buttonLabel='Lens Material'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <LensMaterialTable
          lensMaterials={getPagedData().paginated}
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

export default LensMaterial;
