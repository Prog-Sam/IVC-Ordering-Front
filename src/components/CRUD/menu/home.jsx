import React, { useState, useEffect } from 'react';
import { getPosts } from '../../../services/postService';
import AnnouncementBoard from '../../../common/announcementBoard';
import FilePicker from '../../../common/filePicker';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function populatePosts() {
      const { data } = await getPosts('?type=1anns&includeUsers=true');
      setPosts(data);
    }

    populatePosts();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {/* <FilePicker /> */}
      Welcome to IVC-CRUD...
      <AnnouncementBoard items={posts} />
    </div>
  );
};

export default Home;
