import React from 'react';
import { useState, useEffect } from 'react';
import _ from 'lodash';
import { getPosts } from '../../../services/postService';
import Pagination from '../../../common/pagination';
import { paginate } from '../../../utils/paginate';
import PostTable from '../../../common/postTable';
import MenuHeader from '../../../common/menuHeader';

const Post = () => {
  const [posts, setPosts] = useState([]);
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
    type: [
      { id: '1anns', value: 'IVC ORDERING CRUD Announcement' },
      { id: '1faqs', value: 'IVC ORDERING CRUD FAQs' },
      { id: '2anns', value: 'IVC ORDERING SYSTEM Announcement' },
      { id: '2faqs', value: 'IVC ORDERING SYSTEM FAQs' },
    ],
  });

  useEffect(() => {
    handlePageChange(0);

    async function getData() {
      const { data } = await getPosts('?includeUsers=true');
      setPosts(data);
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
    let filtered = posts;
    if (searchQuery)
      filtered = posts.filter((u) =>
        u.modelName.toLowerCase().indexOf(searchQuery.toLocaleLowerCase()) != -1
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
          path='posts'
          header={'POSTS'}
          buttonLabel='Post'
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />
        <PostTable
          posts={getPagedData().paginated}
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

export default Post;
