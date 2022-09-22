import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getItems } from '../../../services/orderItemService';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../utils/paginate';
import OrderItemTable from '../../../common/orderItemTable';
import { Link } from 'react-router-dom';
import MenuHeader from '../../../common/menuHeader';

const OrderItem = (props) => {
  const [orderItems, setOrderItems] = useState([]);
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
      const data = await getItems(orderId);
      setOrderItems(data);
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
    let filtered = orderItems;
    if (searchQuery)
      filtered = orderItems.filter((u) =>
        u.type.toLowerCase().startsWith(searchQuery.toLocaleLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const paginated = paginate(sorted, currentPage, pageSize);
    return { paginated, filtered };
  };

  return (
    <div className='row'>
      {/* <div className='col-2'><ListGroup items={ }/></div> */}
      <div className='col'>
        <h1 className='d-flex align-items-left'>ITEMS</h1>
        <h4 className='d-flex align-items-left'>{`ORDER ID: ${props.match.params.id}`}</h4>
        <OrderItemTable
          orderItems={getPagedData().paginated}
          localEnums={localEnums}
          onSort={handleSort}
          sortColumn={sortColumn}
          orderId={orderId}
          setOrderItems={setOrderItems}
        />
        <Pagination
          totalItems={getPagedData().filtered.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          currentPage={currentPage}
        />
        <Link to={`/orders`} className='btn btn-warning'>
          CLOSE
        </Link>
      </div>
    </div>
  );
};

export default OrderItem;
