import * as firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBIAy4TTEd-t5UyOOpWszIwEqpFK4BawGI",
  authDomain: "conference-67f3e.firebaseapp.com",
  databaseURL: "https://conference-67f3e.firebaseio.com",
  projectId: "conference-67f3e",
  storageBucket: "conference-67f3e.appspot.com",
  messagingSenderId: "567472190800",
  appId: "1:567472190800:web:2dda169ab525baa1d4e855",
  // measurementId: "G-GWN91VR3S8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.database();
var ref = db.ref("/conferences");

function detectMob() {
  const toMatch = [
    /Android/i,
    /webOS/i,
    /iPhone/i,
    /iPad/i,
    /iPod/i,
    /BlackBerry/i,
    /Windows Phone/i,
  ];

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem);
  });
}

function trackEvent(...params) {
  if (window.analytics) {
    window.analytics.track(...params);
  }
}

function identify(...params) {
  if (window.analytics) {
    window.analytics.identify(...params);
  }
}

async function postData(data = {}) {
  ref.push({
    ...data,
    timeStap: new Date().toLocaleString(),
    device: detectMob() ? "Mobile" : "Desktop",
  });
  /*const response = await fetch(
    `https://mock-server-hk.herokuapp.com/sayhello`,
    {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      //   mode: 'cors', // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({
        ...data,
        timeStap: new Date().toLocaleString(),
        device: detectMob() ? "Mobile" : "Desktop",
      }), // body data type must match "Content-Type" header
    }
  );
  return response.json(); // parses JSON response into native JavaScript objects*/
}

export { detectMob, trackEvent, identify, postData };
