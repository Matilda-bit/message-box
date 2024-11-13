import './App.css';
import { useState } from 'react';
import MessageBox from './components/MessageBox';

const textTest = "this is my text with link : https://translate.google.com/ and I can provide emoji: 😅😅😅😅 and I can mention somebody with @: @polina_ovras";

function App() {
  const [messages, setMessages] = useState([textTest]);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //checks if provided string is empty:
    if (message.trim() === "") {
      return;// can set an error true to display error component
    }
   
    const updatedMessages = [...messages, message];
    setMessages(updatedMessages);
    setMessage("");
  }

  const  handleChange = (event) => {
    setMessage(event.target.value);
  };

  const mentionClicked = (mention) => {
    console.log("Mention Clicked: ", mention)
    setMessage(message + mention);
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Welcome!</h1>
        <p>
          Welcome to be message box:
        </p>
      </header>

      <section id="input-form">
        <form className="input-form" onSubmit={handleSubmit}>
          <textarea
            type="input"
            name={"text-input"}
            className=""
            placeholder={"Text Input"}
            value={message}
            onChange={handleChange}/>
            <button type="submit">Send</button>
        </form>
      </section>
    
      <section>
        <ul className="message-list">
          {messages.map((msg, index) => (
              <MessageBox key={index} msg={msg} onMentionClick={mentionClicked} />
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
