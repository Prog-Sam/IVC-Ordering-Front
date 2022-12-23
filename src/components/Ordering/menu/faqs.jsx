import React, { useState, useEffect } from 'react';
import { Accordion } from 'react-bootstrap-accordion';
import { getPosts } from '../../../services/postService';

const FAQs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function populatePosts() {
      const { data } = await getPosts('?type=2faqs');
      setPosts(data);
    }

    populatePosts();
  }, []);
  return (
    <div>
      <h1>FAQs</h1>
      <h6>Frequently Asked Questions will be addressed here in this page.</h6>

      {posts.map((p) => (
        <Accordion title={p.title} children={p.message} />
      ))}
    </div>
  );
};

export default FAQs;
