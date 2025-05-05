import { useState } from "react";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSendSharp } from "react-icons/io5";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [...prev, { text: "How are you?", sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-[100px] right-[10px] z-[999]">
      {isOpen && (
        <div className="w-[300px] border border-gray-300 rounded-lg flex flex-col overflow-hidden bg-white shadow-lg">
          <h4 className="text-sm text-center m-0 bg-[#640D5F] text-white py-2">
            Smart AI Chatbot
          </h4>
          <div className="flex-1 p-4 h-[300px] overflow-y-auto flex flex-col gap-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-[80%] ${
                  msg.sender === "bot"
                    ? "bg-gray-100 self-start"
                    : "bg-teal-600 text-white self-end"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="flex p-1 border-t border-gray-300">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 p-1 border-none outline-none"
            />
            <button
              onClick={sendMessage}
              className="p-1 px-2 bg-teal-600 text-white border-none rounded-md"
            >
              <IoSendSharp />
            </button>
          </div>
        </div>
      )}
      <button
        className="bg-[#640D5F] w-[50px] h-[50px] border-none rounded-full mt-5 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <AiOutlineMessage className="text-white" size={30} />
      </button>
    </div>
  );
};

export default Chatbot;
