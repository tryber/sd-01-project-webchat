import React from 'react';

function OnlineUsers({ users }) {
  return (
    <div>
      <p>Conectados atualmente:</p>
      {users.map(user => <p key={user}>{user}</p>)}
    </div>
  );
}

export default OnlineUsers;
