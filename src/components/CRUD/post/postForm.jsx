import React, { useEffect } from 'react';
import Joi from 'joi-browser';
import _ from 'lodash';
import useForm from '../../../hooks/useForm';
import { getPost, savePost, updatePost } from '../../../services/postService';
import { toast } from 'react-toastify';
import { getCurrentUser } from '../../../services/authService';

const PostForm = (props) => {
  const localEnums = {
    type: [
      { id: '1anns', name: 'IVC ORDERING CRUD Announcement' },
      { id: '1faqs', name: 'IVC ORDERING CRUD FAQs' },
      { id: '2anns', name: 'IVC ORDERING SYSTEM Announcement' },
      { id: '2faqs', name: 'IVC ORDERING SYSTEM FAQs' },
    ],
  };

  const insertMetaData = (post) => {
    return {
      ...post,
      //   ['date']: new Date(),
      ['userId']: getCurrentUser().id,
    };
  };

  const schema = {
    id: Joi.number().label('ID'),
    type: Joi.string().required().label('Post Type'),
    title: Joi.string().required().min(1).max(200).label('Title'),
    message: Joi.string().required().min(1).label('Message'),
    date: Joi.date().allow('').label('Date'),
    userId: Joi.number().allow('').label('Author'),
  };

  useEffect(() => {
    const postId = props.match.params.id;
    if (postId === 'New') return;

    async function populatePost() {
      let { data } = await getPost(postId);
      setPost(data);
    }

    populatePost();

    if (!post) return props.history.replace('/not-found');

    return console.log('disconnect Server');
  }, []);

  const doSubmit = async () => {
    try {
      const isNew = props.match.params.id === 'New';
      const result = isNew
        ? await savePost(mapToViewModel(insertMetaData(post)))
        : await updatePost(mapToViewModel(post));
      toast(
        `Post ${post.name} with the id of ${post.id} has been ${
          isNew ? 'added.' : 'updated.'
        }`
      );
      props.history.push('/posts');
    } catch (e) {
      console.error(e);
      toast(e.message);
    }
  };

  const [
    post,
    setPost,
    handleSubmit,
    renderButton,
    renderInput,
    renderLabel,
    renderSelect,
    mapToViewModel,
    getSelectedOption,
    renderColorDaySelector,
    renderRxField,
    renderFilePicker,
    setSubscribers,
    renderTextArea,
  ] = useForm(schema, doSubmit);

  return (
    <div>
      <h1 className='d-flex align-items-left'>
        {props.match.params.id === 'New' ? 'REGISTER' : 'UPDATE'} POST
      </h1>
      <form onSubmit={handleSubmit}>
        {renderLabel('ID', props.match.params.id)}
        {renderSelect('type', 'Post Type', localEnums.type)}
        {renderInput('title', 'Title')}
        {renderTextArea('message', 'Message', 'textarea')}
        {renderButton('Submit')}
      </form>
    </div>
  );
};

export default PostForm;
