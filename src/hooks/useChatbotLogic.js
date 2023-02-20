import { useState, useEffect } from "react";
import axios from "axios";

const useChatbotLogic = () => {
  const [messages, setMessages] = useState([
    {
      text: "Hi, I'm Botti! You can ask me anything and I'll answer you using the knowledge of OpenAI.",
      sender: "bot",
    },
  ]);
  const [userInput, setUserInput] = useState("");
  const [waitingOpenAI, setWaitingOpenAI] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userInput === "" || waitingOpenAI) return;

    setMessages([...messages, { text: userInput, sender: "user" }]);
    setUserInput("");
  };

  useEffect(() => {
    const lastMessage = messages.at(-1);
    if (lastMessage.sender === "user") {
      setMessages([...messages, { text: "", sender: "bot" }]);
      setWaitingOpenAI(true);
      axios
        .post(
          `http://${process.env.SERVER_ADDRESS}:${process.env.SERVER_PORT}/`,
          {
            userInput: lastMessage.text,
          }
        )
        .then(({ data }) => {
          setMessages([...messages, { text: data, sender: "bot" }]);
          setWaitingOpenAI(false);
        });
    }
  }, [messages]);

  return { messages, userInput, setUserInput, handleSubmit };
};

export default useChatbotLogic;
