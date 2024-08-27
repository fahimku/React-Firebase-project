import React, { useState, useEffect } from 'react';
import { Input, Button, List, notification } from 'antd';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { app } from "../config/firebase";

const db = getDatabase(app);

export function TextScreen() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const messagesRef = ref(db, 'messages/');
    
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const msgs = data ? Object.entries(data).map(([id, value]) => ({ id, ...value })) : [];
      setMessages(msgs.reverse());
    });
  }, []);

  const sendMessage = async () => {
    if (text.trim() === '') {
      notification.warning({
        message: 'Input is empty',
        description: 'Please write something before sending.',
      });
      return;
    }

    try {
      await push(ref(db, 'messages/'), {
        text,
        createdAt: new Date().toISOString(),
      });
      setText('');
      notification.success({
        message: 'Message sent',
      });
    } catch (error) {
      notification.error({
        message: 'Error sending message',
        description: error.message,
      });
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Text Storage</h1>
      <Input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write something..."
        style={{ width: '300px', marginBottom: '10px' }}
      />
      <Button type="primary" onClick={sendMessage}>
        Send
      </Button>
      <div style={{ marginTop: '20px' }}>
        <List
          header={<div>Messages</div>}
          bordered
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <div>{item.text}</div>
              <div>{new Date(item.createdAt).toDateString()}</div>
            </List.Item>
          )}
          style={{ width: '300px', margin: 'auto' }}
        />
      </div>
    </div>
  );
}
