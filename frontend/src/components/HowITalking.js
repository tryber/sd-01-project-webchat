import React, { useContext } from 'react';
import { MessageContext } from '../context';
import { Link } from 'react-router-dom';
import '../style/component/HowITalking.css';

const getName = (array, id) => {
  return array.find(user => user.id === id);
}

function HowITalking({ privateUser }) {
  const { users, login } = useContext(MessageContext);
  return (
    <div className="HowITalking">
      <Link className="link" to="/">{`Voltar`}</Link>
      <h2 className="names">{`${login.userName} ------->> ${getName(users, privateUser).userName}`}</h2>
    </div>
  );
}

export default HowITalking;
