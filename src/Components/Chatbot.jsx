import { useState } from "react";
import { useTranslation } from "react-i18next";
import { AiOutlineMessage } from "react-icons/ai";
import { IoSendSharp } from "react-icons/io5";

const Chatbot = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { text: t("chatbot_initial_message"), sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { text: t("chatbot_followup_message"), sender: "bot" },
      ]);
    }, 1000);
  };

  return (
    <div className="fixed bottom-[80px] right-[16px] z-[999]">
      {isOpen && (
        <div className="w-[300px] border border-gray-300 rounded-lg flex flex-col overflow-hidden bg-white shadow-lg">
          <h4
            className="text-sm text-center m-0 bg-[#640D5F] text-white py-2"
            role="heading"
            aria-level="2"
          >
            {t("chatbot_title")}
          </h4>
          <div
            className="flex-1 p-4 h-[300px] overflow-y-auto flex flex-col gap-2"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-md max-w-[80%] whitespace-normal ${
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
              placeholder={t("chatbot_input_placeholder")}
              className="flex-1 p-1 border-none outline-none"
              aria-label={t("chatbot_input_label")}
              aria-describedby="chatbot-input-description"
            />
            <button
              onClick={sendMessage}
              className="p-1 px-2 bg-teal-600 text-white border-none rounded-md"
              aria-label={t("chatbot_send_label")}
            >
              <IoSendSharp />
            </button>
          </div>
          <div id="chatbot-input-description" className="sr-only">
            {t("chatbot_input_description")}
          </div>
        </div>
      )}
      <button
        className="bg-[#640D5F] w-[50px] h-[50px] border-none rounded-full mt-5 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("chatbot_toggle_label")}
      >
        <AiOutlineMessage className="text-white" size={30} />
      </button>
    </div>
  );
};

export default Chatbot;