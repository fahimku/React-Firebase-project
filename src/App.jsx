import React from 'react';
import { Tabs } from 'antd';
import { Signup } from './pages/Signup';
import { NotificationScreen } from './pages/NotificationScreen';
import { PhotoScreen } from './pages/PhotoScreen';
import { TextScreen } from './pages/TextScreen';
import { Calculator } from './pages/Calculator';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('../public/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    })
    .catch((err) => {
      console.log('Service Worker registration failed:', err);
    });
}
const items = [
  {
    key: '1',
    label: 'Sign up screen',
    children: <Signup />,
  },
  {
    key: '2',
    label: 'Notification screen',
    children: <NotificationScreen />,
  },
  {
    key: '3',
    label: 'Photo screen',
    children: <PhotoScreen/>,
  },
  {
    key: '4',
    label: 'Text screen',
    children: <TextScreen/>,
  },
  {
    key: '5',
    label: 'Calculator screen',
    children: <Calculator/>,
  },
];

const App = () => {
  return (
      <div className='main-wrapper'>
        <Tabs
          tabBarExtraContent={{
            left: <h5 className='m-4'>React Test</h5>
          }}
          defaultActiveKey="1"
          centered
          items={items}
          className='main-nav'
        />
      </div>
  );
};

export default App;
