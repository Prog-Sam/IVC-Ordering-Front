import React from 'react';
import { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getOrderFromDb } from '../../../services/orderService';
import { getItems } from '../../../services/orderItemService';
import { paginate } from '../../../utils/paginate';
import Pagination from '../../../common/pagination';
import CartContext from '../../../context/cartContext';
import { localizeOrder } from '../../../utils/itemizer';
import StatusItemTable from '../../../common/statusItemTable';

const StatusItem = (props) => {
  const cartContext = useContext(CartContext);
  const [statusItems, setStatusItems] = useState([]);
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
  const orderId = props.match.params.id;

  useEffect(() => {
    handlePageChange(0);

    async function getData() {
      // const { data } = await getOrderFromDb(orderId);
      // setStatusItems(localizeOrder(data).items);
      const data = await getItems(orderId, true);
      setStatusItems(data);
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
    let filtered = statusItems;
    if (searchQuery)
      filtered = statusItems.filter((u) =>
        u.type.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginated = paginate(sorted, currentPage, pageSize);
    return { paginated, filtered };
  };

  return (
    <div className='row'>
      <div className='col'>
        <h1 className='d-flex align-items-left'>ITEMS</h1>
        <h4 className='d-flex align-items-left'>{`TRANSACTION NUMBER: ${props.match.params.id}`}</h4>
        <StatusItemTable
          statusItems={getPagedData().paginated}
          localEnums={localEnums}
          onSort={handleSort}
          sortColumn={sortColumn}
          orderId={orderId}
          setStatusItems={setStatusItems}
        />
        <Pagination
          totalItems={getPagedData().filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
        <Link to={`/status`} className='btn btn-warning'>
          CLOSE
        </Link>
      </div>
    </div>
  );
};

export default StatusItem;
