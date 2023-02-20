import { useEffect, useRef } from "react";
import Image from "next/image";
import PulseLoader from "react-spinners/PulseLoader";
import useChatbotLogic from "../hooks/useChatbotLogic";

const Chatbot = () => {
  const { messages, userInput, setUserInput, handleSubmit } = useChatbotLogic();

  const refChatBottom = useRef();
  useEffect(() => {
    refChatBottom.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="relative min-w-[400px] max-w-[550px] h-full min-h-[400px] bg-white font-medium text-sm m-auto shadow-2xl rounded-xl overflow-hidden font-roboto">
      <div className="flex w-full h-16 bg-gray-100">
        <Image
          src="/images/chatbot.svg"
          alt="chatbot-logo"
          width="60"
          height="60"
          className="ml-3"
        />
        <h1 className="font-bold text-xl self-center ml-1">CHATBOT</h1>
      </div>
      <div className="h-[calc(100%-8rem)] px-6 py-2 overflow-y-auto hidden-scrollbar">
        <ul>
          {messages.map((message, index) => (
            <li key={index}>
              <div
                className={`${message.sender === "user" && "flex justify-end"}`}
              >
                <div
                  className={`inline-block max-w-[260px] bg-[#f2f4f8] p-[10px] my-1 rounded-t-lg rounded-br-lg ${
                    message.sender === "user" &&
                    "bg-[#2a55ad] text-white rounded-br-none rounded-bl-lg"
                  }`}
                >
                  {message.sender === "bot" && message.text === "" ? (
                    <PulseLoader
                      size={7.5}
                      speedMultiplier={0.8}
                      color="#505050"
                    />
                  ) : (
                    <div>
                      <p className={"break-words"}>{message.text}</p>
                      <div className="flex justify-end">
                        <p
                          className={
                            "font-normal text-[9px] leading-[4px] mt-1"
                          }
                        >
                          {new Date().toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
        <div ref={refChatBottom} />
      </div>
      <div className="absolute w-full h-16 bottom-0 shadow-inner">
        <div className="h-[2px] bg-gray-100" />
        <form onSubmit={handleSubmit} className="flex h-full">
          <input
            type="text"
            placeholder="Write here..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            className="flex-grow outline-none ml-5"
          />
          <button type="submit">
            <Image
              src="/images/send-button.svg"
              alt="send-button"
              width="24"
              height="24"
              className="self-center mr-6 ml-4 hover:scale-105"
            />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
