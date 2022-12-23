import React from 'react';
import { useState, useEffect, useContext } from 'react';
import _ from 'lodash';
import { getCart } from '../../../services/cartService';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../utils/paginate';
import OrderTable from '../../../common/orderTable';
import MenuHeader from '../../../common/menuHeader';
import CartContext from '../../../context/cartContext';

const Order = () => {
  const [orders, setOrders] = useState([]);
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

  const cartContext = useContext(CartContext);

  useEffect(() => {
    handlePageChange(0);

    function getData() {
      const cart = getCart();
      setOrders(cart || []);
    }

    getData();
  }, [cartContext.ordersCount]);

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
    let filtered = orders;

    if (searchQuery)
      filtered = orders.filter((u) =>
        u.cartNumber.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) !=
        -1
          ? true
          : false
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    // const paginated = paginate(sorted, currentPage, pageSize);
    const paginated = _.reverse(paginate(sorted, currentPage, pageSize));

    return { paginated, filtered };
  };

  return (
    <div className='row'>
      {/* <div className='col-2'><ListGroup items={ }/></div> */}
      <div className='col'>
        <MenuHeader
          path='orders'
          header={'CART'}
          buttonLabel='Order'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <OrderTable
          orders={getPagedData().paginated}
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

export default Order;
