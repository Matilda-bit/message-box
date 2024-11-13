// MessageBox.js
import React from 'react';
import './../App.css';
//I search in google regex detect emoji: - 
//get info from : https://www.stefanjudis.com/snippets/how-to-detect-emojis-in-javascript-strings/
const emojiRegex = /\p{Emoji}/u;
const mentionRegex = /@\w+/;
const urlRegex = /https?:\/\/[^\s]+/;

const MessageBox = ({ msg, onMentionClick }) => {

  const renderMessageContent = (msg) => {
    const words = msg.split(/(\s+)/); // to save spaces after split helped by https://lalit-kushwah.medium.com/stop-using-split-to-split-string-with-space-in-javascript-7e1a1409cb0b
    return words.map((word, index) => {
      if (urlRegex.test(word)) {
        // url
        return (
          <a
            key={index}
            href={word}
            target="_blank"
            rel="nofollow noopener noreferrer"
          >
            {word}{" "}
          </a>
        );
      } else if (mentionRegex.test(word)) {
        // mention
        return (
          <span
            key={index}
            className="mention"
            onClick={() => onMentionClick(word)}
          >
            {word}{" "}
          </span>
        );
      } else if (emojiRegex.test(word)) {
        // emoji
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
    });
  };

  return (
    <li className="message-box">
      <p>{renderMessageContent(msg)}</p>
    </li>
  );
};

export default MessageBox;
