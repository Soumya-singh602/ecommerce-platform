import {
  useEffect,
  useState,
  useRef
} from "react";

import {
  connectChatSocket,
  sendMessage,
  disconnectChatSocket
} from "../../services/chatSocket";

import {
  getHistory
} from "../../api/chatApi";

function ChatWindow(){
  const adminId = 6;
  const customerId = localStorage.getItem("user_id");

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  
  // Socket instance ko hold karne ke liye useRef
  const socketRef = useRef(null);

  useEffect(() => {
    loadHistory();

    // Socket connect karke ref mein store kar rahe hain
    socketRef.current = connectChatSocket(
      adminId,
      customerId,
      (msg) => {
        setMessages(prev => [
          ...prev,
          msg
        ]);
      }
    );

    // Cleanup function jab component unmount ho
    return () => {
      disconnectChatSocket(socketRef.current);
    };
  }, [adminId, customerId]);

  const loadHistory = async () => {
    try {
      const data = await getHistory(adminId, customerId);
      setMessages(data);
    } catch (error) {
      console.log("Error loading history:", error);
    }
  };

  const send = () => {
    // Yahan socketRef.current pass karna zaroori hai
    sendMessage(socketRef.current, text);
    setText("");
  };

  return (
    <div>
      <h2>
        Admin Support
      </h2>

      <div>
        {
          messages.map(
            (msg) => (
              <div key={msg.id || Math.random()}>
                {msg.sender} : {msg.message}
              </div>
            )
          )
        }
      </div>

      <input
        value={text}
        onChange={e => setText(e.target.value)}
      />

      <button onClick={send}>
        Send
      </button>
    </div>
  );
}

export default ChatWindow;