import React, { useState, useEffect } from 'react';
import api from '../api';

export default function MessageList({ conversation, socket }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');

  useEffect(() => {
    api.get(`/messages/${conversation._id}`).then((res) => {
      setMessages(res.data);
    });

    if (socket) {
      socket.on('message', (msg) => {
        if (msg.conversationId === conversation._id) {
          setMessages((prev) => [...prev, msg]);
        }
      });
    }
  }, [conversation, socket]);

  const sendMessage = async () => {
    const res = await api.post('/messages', {
      conversationId: conversation._id,
      text,
    });
    setText('');
  };

  return (
    <div style={{ flex: 1, padding: '8px' }}>
      <h3>{conversation.name}</h3>
      <div style={{ height: '300px', overflowY: 'scroll' }}>
        {messages.map((m) => (
          <div key={m._id}>
            <strong>{m.sender?.username}:</strong> {m.text}
          </div>
        ))}
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
