import React, { useState, useEffect } from 'react';
import { Alert, Button, notification } from 'antd';
import { messaging } from "../config/firebase";
import { getToken, onMessage } from "firebase/messaging";

export function NotificationScreen() {
  const [token, setToken] = useState("");
  const [permission, setPermission] = useState(true);

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
      setPermission(false);
      console.log(permission,"permission");
    }
  }
  console.log(token,"token");
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
      new Notification(title, {
        body: description,
        badge: "https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png",
        icon: "https://firebase.google.com/static/images/brand-guidelines/logo-vertical.png",
      });
    }
    notification.open({
      message: title,
      description: description,
      className: 'toast-success',
      // onClick: () => {
      //   console.log('Notification Clicked!');
      // },
    });
  };

  const showNotification = () => {
    if(permission) {
      displayAntDesignNotification('Firebase Notification', 'Firebase notification sent from the frontend!');
    }
    else {
      notification.error({
        message: "Permission Error",
        description: "You denied the notification permission",
        className: 'toast-error',
        duration: 0,
      });
    }
  };

  return (
    <>
    {!permission &&
    <div className='container mt-4'>
      <Alert message="You denied the notification permission" type="error" />
    </div>
    }

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
    </>
    
  );
}
