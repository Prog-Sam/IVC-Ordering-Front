import React from 'react';
import PropTypes from 'prop-types';

const Pagination = ({ totalItems, pageSize, onPageChange, currentPage }) => {
  const totalPages = Math.ceil(totalItems / pageSize);

  const getPages = () => {
    let pages = [];
    for (let i = 0; i < totalPages; i++) pages.push(i + 1);
    return pages;
  };

  if (getPages().length === 1) return null;

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination d-flex flex-wrap'>
        <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
          <a
            className='page-link'
            onClick={() => {
              onPageChange(currentPage - 2);
            }}
          >
            Previous
          </a>
        </li>
        {getPages().map((page) => (
          <li
            className={page === currentPage ? 'page-item active' : 'page-item'}
            key={page}
          >
            <a
              className='page-link'
              href='#'
              onClick={() => {
                onPageChange(page - 1);
              }}
            >
              {page}
            </a>
          </li>
        ))}
        <li
          className={
            currentPage === totalPages ? 'page-item disabled' : 'page-item'
          }
        >
          <a
            className='page-link'
            onClick={() => {
              onPageChange(currentPage);
            }}
          >
            Next
          </a>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
