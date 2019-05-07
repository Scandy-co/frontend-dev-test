import React from 'react';
import './App.css';
import Header from './components/Header'
import ImageDropContainer from './components/ImageDropContainer';
// import * as firebase from "firebase/app";
// import 'firebase/storage';

//   // Your web app's Firebase configuration
//   var firebaseConfig = {
//     apiKey: "AIzaSyDGgR-Rr4P3FNWVPT8c1Gkk-0nF9XleAOw",
//     authDomain: "scandy-dev-test.firebaseapp.com",
//     databaseURL: "https://scandy-dev-test.firebaseio.com",
//     projectId: "scandy-dev-test",
//     storageBucket: "scandy-dev-test.appspot.com",
//     messagingSenderId: "857560367946",
//     appId: "1:857560367946:web:7a251a24d8670c7d"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);


function App() {
  return (
    <div className="App">
      <Header />
      <ImageDropContainer />
    </div>
  );
}

export default App;
