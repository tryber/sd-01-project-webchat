import React, { useState } from 'react';

function Nickname({ nickname, setNickname }) {
  const [value, setValue] = useState(nickname);
  return (
    <div className="Nick">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <input type="button" value="Mudar" disabled={!value} onClick={setNickname(value)} />
    </div>
  );
}

export default Nickname;
