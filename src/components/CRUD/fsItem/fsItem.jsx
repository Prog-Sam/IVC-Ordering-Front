import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getFsItems } from '../../../services/fsItemService';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../utils/paginate';
import FsItemTable from '../../../common/fsItemTable';
import MenuHeader from '../../../common/menuHeader';

const FsItem = () => {
  const [fsItems, setFsItems] = useState([]);
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
      const { data } = await getFsItems();
      setFsItems(data);
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
    let filtered = fsItems;
    if (searchQuery)
      filtered = fsItems.filter((u) =>
        `${u.Brand.name} ${u.FscsaModel.modelName}`
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
          path='fsItems'
          header={'FRAMES'}
          buttonLabel='Frame'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <FsItemTable
          fsItems={getPagedData().paginated}
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

export default FsItem;
