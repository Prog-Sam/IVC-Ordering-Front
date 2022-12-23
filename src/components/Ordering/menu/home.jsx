import React, { useState, useEffect } from 'react';
import AnnouncementBoard from '../../../common/announcementBoard';
import { getPosts } from '../../../services/postService';

const Home = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function populatePosts() {
      const { data } = await getPosts('?type=2anns&includeUsers=true');
      setPosts(data);
    }

    populatePosts();
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {/* <FilePicker /> */}
      Welcome to IVC-ORDERING...
      <AnnouncementBoard items={posts} />
    </div>
  );
};

export default Home;
