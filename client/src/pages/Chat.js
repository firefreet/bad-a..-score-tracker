import React, { useRef } from 'react';
import './styles/chatStyles.css';
import io from 'socket.io-client'
const socket = io();


function Chat() {

  var input = useRef();
  var ul = useRef();

  function submit(e) {
    e.preventDefault();
    socket.emit('chat message', input.current.value);
    input.current.value = ('');
    return false;
  }
  
  socket.on('chat message',function(msg) {
    const key = ul.current.childElementCount
    const li = document.createElement('li');
    li.setAttribute('key',key);
    li.innerText = msg;
    ul.current.append(li);
  });

  return (
    <div>
      <ul ref={ul} id="messages"></ul>
      <form action="">
        <input ref={input} id="m" autoComplete="off" />
        <button onClick={submit}>Send</button>
      </form>
    </div>
  )
}

export default Chat;