import './App.css';
import { useState } from 'react';


//I search in google regex detect emoji: - 
//get info from : https://www.stefanjudis.com/snippets/how-to-detect-emojis-in-javascript-strings/
const emojiRegex = /\p{Emoji}/u;
const mentionRegex = /@\w+/;
const urlRegex = /https?:\/\/[^\s]+/;

const textTest = "this is my text with link : https://translate.google.com/ and I can provide emoji: 😅😅😅😅 and I can mention somebody with @: @polina_ovras";

function App() {
  const [messages, setMessages] = useState([textTest]);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    //checks if provided string is empty:
    if (message.trim() === "") {
      return;// set error true to display error component
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
  //can be separete component
  const messageContent = (msg) => {
    // to save cpaces after split helped by https://lalit-kushwah.medium.com/stop-using-split-to-split-string-with-space-in-javascript-7e1a1409cb0b
    const words = msg.split(/(\s+)/);
    return words.map((word, index) => {
      //to check:
      //links URL
      //URLprotocols.map maybe? or regex test? works dynamiclly for more difficult structures 
      if (urlRegex.test(word)) {
        return (
          <a key={index} href={word} target="_blank" rel="nofollow noopener noreferrer">
            {word} {" "}
          </a>
        );
      } //mention @
      else if (mentionRegex.test(word)) {
        return (
          <span key={index} className="mention" onClick={()=> mentionClicked(word)}>
            {word} {" "}
          </span>
        );
      } //emoji
      else if (emojiRegex.test(word)) { 
        return (
          <span key={index} >
          {(index - 1) > 0 ? (emojiRegex.test(words[index - 1]) ? null : <br/>) : null}
          <span className="emoji">
            {word}
          </span>
           {emojiRegex.test(words[index + 1]) ? null : <br/>}
          </span> 
        );
      } else {
        return <span key={index}>{word}</span>;
      } 
    })
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
      {/* can be separete component */}
      <section>
        <ul className="message-list">
          {messages.map((msg, index) => (
            <li key={index} className="message-box">
              <p>{messageContent(msg)}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default App;
