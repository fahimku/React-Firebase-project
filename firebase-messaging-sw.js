importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);

const firebaseConfig = {
    apiKey: "AIzaSyCqsdtxNOuD9sDih1xFv8ra6CdHc_48Ni8",
    authDomain: "fahim-pushnotification.firebaseapp.com",
    projectId: "fahim-pushnotification",
    storageBucket: "fahim-pushnotification.appspot.com",
    messagingSenderId: "344809008260",
    appId: "1:344809008260:web:f41c5ba4f795cb924366d1"
};


firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
