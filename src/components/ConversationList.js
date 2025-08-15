import React from 'react';

export default function ConversationList({ conversations, onSelect }) {
  return (
    <div style={{ width: '30%', borderRight: '1px solid gray' }}>
      <h3>Conversations</h3>
      {conversations.map((c) => (
        <div
          key={c._id}
          style={{ padding: '8px', cursor: 'pointer' }}
          onClick={() => onSelect(c)}
        >
          {c.name}
        </div>
      ))}
    </div>
  );
}
