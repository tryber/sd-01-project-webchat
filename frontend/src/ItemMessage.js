import React from 'react';

function ItemMessage({ hour, author, content }) {
  return (
    <li className="ItemMessage">
      <div>{author}</div>
      <p>{content}</p>
      <div>{hour}</div>
    </li>
  );
}

export default ItemMessage;
