import React, { useState } from 'react';

function InputMessage({ sendMessage }) {
  const [value, setValue] = useState();
  return (
    <div className="SendMessage">
      <input type="text" value={value} onChange={(e) => setValue(e.target.value)} />
      <input type="button" value="Send" disabled={!value} onClick={sendMessage(value)} />
    </div>
  );
}

export default InputMessage;
