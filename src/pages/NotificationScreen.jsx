import React, { useState, useEffect } from 'react';
import { Button, notification } from 'antd';
import { messaging } from "../config/firebase";
import { getToken, onMessage } from "firebase/messaging";

export function NotificationScreen() {
  const [token, setToken] = useState("");

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      // Generate Token
      const token = await getToken(messaging, {
        vapidKey:
          "BEnFa9hVGYX27Z_rKyzCj0BIHnxn0vAht-atyzI07Fy_253PLK2mypw1M4ts5VxMxmxRwXYUUhA5YG3suz_29mM",
      });
      setToken(token);
      // Send this token to the server (db)
    } else if (permission === "denied") {
      alert("You denied the notification permission");
    }
  }

  console.log(token, "token");

  useEffect(() => {
    // Request user for notification permission
    requestPermission();

    // Handle incoming messages
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      if (payload.notification) {
        displayAntDesignNotification(payload.notification.title, payload.notification.body);
      } else {
        console.error('No notification data found in the payload.');
      }
    });

  }, []);

  const displayAntDesignNotification = (title, description) => {
    if (Notification.permission === "granted") {
      new Notification(title);
    }
    notification.open({
      message: title,
      description: description,
      onClick: () => {
        console.log('Notification Clicked!');
      },
    });
  };

  const showNotification = () => {
    displayAntDesignNotification('Custom Notification', 'This is a custom notification sent from the frontend!');
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Notification</h1>
      <Button
        type="primary"
        size="large"
        style={{ backgroundColor: 'red', borderColor: 'red', color: 'white' }}
        onClick={showNotification}
      >
        Press Me!
      </Button>
    </div>
  );
}
