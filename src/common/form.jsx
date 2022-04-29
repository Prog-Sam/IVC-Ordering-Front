import React from 'react';

const form = () => {
  const [account, setAccount] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});

  const schema = {
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(account, schema, options);
    if (!error) return null;

    const localErrors = {};
    for (let item of error.details) localErrors[item.path[0]] = item.message;

    return localErrors;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const localSchema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, localSchema);

    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    //call the server
    console.log(account);
  };

  const handleChange = ({ currentTarget: input }) => {
    const localErrors = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) localErrors[input.name] = errorMessage;
    else delete localErrors[input.name];

    let accountInDb = { ...account };
    accountInDb[input.name] = input.value;

    setErrors(localErrors);
    setAccount(accountInDb);
  };
  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name='username'
          label='Username'
          onChange={handleChange}
          value={account.username}
          type='text'
          error={errors.username}
        />
        <Input
          name='password'
          label='Password'
          onChange={handleChange}
          value={account.password}
          type='password'
          error={errors.password}
        />
        <button
          disabled={validate()}
          className='btn btn-primary d-flex align-items-left'
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default form;
