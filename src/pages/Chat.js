import React, { useState, useEffect } from 'react';
import api from '../api';

export default function Chat() {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [text, setText] = useState('');

  // Load conversations on mount
  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const res = await api.get('/conversations');
        setConversations(res.data);
        if (res.data.length > 0) {
          setSelectedConversation(res.data[0]);
        }
      } catch (err) {
        console.error('Error loading conversations:', err);
      }
    };
    fetchConversations();
  }, []);

  // Load messages when conversation changes
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedConversation) return;
      try {
        const res = await api.get(`/messages/${selectedConversation._id}`);
        setMessages(res.data);
      } catch (err) {
        console.error('Error loading messages:', err);
      }
    };
    fetchMessages();
  }, [selectedConversation]);

  const sendMessage = async () => {
    if (!text.trim()) return;
    try {
      await api.post('/messages', {
        conversationId: selectedConversation._id,
        sender: localStorage.getItem('username') || 'Unknown',
        text
      });
      setText('');
      // reload messages after sending
      const res = await api.get(`/messages/${selectedConversation._id}`);
      setMessages(res.data);
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
        <h3>Conversations</h3>
        {conversations.map(conv => (
          <div
            key={conv._id}
            style={{
              padding: '8px',
              cursor: 'pointer',
              background: selectedConversation?._id === conv._id ? '#eee' : 'white'
            }}
            onClick={() => setSelectedConversation(conv)}
          >
            {conv.name}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, padding: '10px' }}>
        <h3>Messages</h3>
        <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc' }}>
          {messages.map((msg, index) => (
            <div key={index}>
              <strong>{msg.sender}: </strong> {msg.text}
            </div>
          ))}
        </div>
        <div style={{ marginTop: '10px' }}>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your message"
            style={{ width: '80%' }}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}
