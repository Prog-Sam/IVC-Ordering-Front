import http from './httpService';

export async function getPosts(query = '') {
  let url = '/posts' + query;
  const posts = await http.get(url);
  return posts;
}

export async function getPost(id, query = '') {
  let url = `/posts/${id}${query}`;
  const post = await http.get(url);
  return post;
}

export async function savePost(post) {
  let localPost = { ...post };
  delete localPost['id'];

  let postInDb = await http.post(`/posts`, localPost);
  return postInDb;
}

export async function updatePost(post) {
  let localPost = { ...post };
  delete localPost['id'];

  let postInDb = await http.put(`/posts/${post.id}`, localPost);
  return postInDb;
}
