import React from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import Table from './table';
import moment from 'moment';

const PostTable = ({ posts, localEnums, sortColumn, onSort }) => {
  const columns = [
    { path: 'id', label: 'ID' },
    {
      key: 'date',
      content: (post) => {
        return moment(post.date).format('DD/MM/YYYY HH:mm:ss');
      },
      label: 'Date Posted',
    },
    {
      key: 'title',
      content: (post) => <Link to={'/posts/' + post.id}>{post.title}</Link>,
      label: 'Title',
    },
    { path: 'type', label: 'Type' },
    { path: 'UserId.name', label: 'Author' },
  ];

  return (
    <Table
      columns={columns}
      sortColumn={sortColumn}
      onSort={onSort}
      localEnums={localEnums}
      data={posts}
    />
  );
};

export default PostTable;
