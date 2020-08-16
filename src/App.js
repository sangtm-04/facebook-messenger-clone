import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';
import './App.css';
import Message from './Message';
import db from './firebase';
import firebase from 'firebase';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  // useState = variable in React
  // useEffect = run code on a condition in React

  useEffect(() => {
    // Run once when the app component loads
    db.collection('messages')
    .orderBy('timestamp', 'desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id: doc.id, message: doc.data()})))
    })
  }, []);

  useEffect(() => {
    // run code here
    // if its blank inside [], this code runs ONCE when the app component loads
    // if we have a variable like input, it runs every time input change
    setUsername(prompt('Please enter your name'));
    
  }, []) // condition

  const sendMessage = (event) => {
    event.preventDefault();

    db.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })

    // All the logic to send a message goes here
    setMessages([
      ...messages, {username: username, message: input}
    ]);
    setInput('');
  }

  return (
    <div className="App">
    <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100" />
      <h1>Facebook Messenger Clone</h1>
      <h2>Welcome {username}</h2>

      <form className="app__form">
        <FormControl className="app__formControl">
          <Input className="app__input" placeholder='Enter a message...' value={input} onChange={event => setInput(event.target.value)}  />
          <IconButton className="app__iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({id, message}) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>

    </div>
  );
}

export default App;
