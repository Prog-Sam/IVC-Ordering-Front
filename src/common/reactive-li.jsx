import React, { useState } from 'react';

const Rli = (props) => {
  const [className, setClassName] = useState(
    'list-group-item list-group-item-action'
  );

  const handleMouseOver = () => {
    setClassName('list-group-item list-group-item-action active');
  };

  const handleMouseLeave = () => {
    setClassName('list-group-item list-group-item-action');
  };

  return (
    <li
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {props.item}
    </li>
  );
};

export default Rli;
