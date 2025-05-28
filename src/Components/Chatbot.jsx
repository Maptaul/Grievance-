import { useEffect, useRef, useState } from "react";
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
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Focus input when chatbot opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle Enter key for sending
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

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
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-4 z-[999]">
      {isOpen && (
        <div className="w-[340px] max-w-[95vw] border border-gray-200 rounded-2xl flex flex-col overflow-hidden bg-white shadow-2xl animate-fade-in-up">
          <div className="flex items-center justify-between bg-[#640D5F] text-white px-4 py-2">
            <h4
              className="text-base font-semibold m-0"
              role="heading"
              aria-level="2"
            >
              {t("chatbot_title")}
            </h4>
            <button
              className="btn btn-xs btn-circle bg-white text-[#640D5F] border-none hover:bg-gray-100"
              onClick={() => setIsOpen(false)}
              aria-label={t("chatbot_close_label")}
            >
              ✕
            </button>
          </div>
          <div
            className="flex-1 p-4 h-[320px] overflow-y-auto flex flex-col gap-2 bg-gray-50"
            role="log"
            aria-live="polite"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`px-3 py-2 rounded-xl max-w-[80%] whitespace-pre-line text-sm shadow-sm transition-all duration-200
                  ${
                    msg.sender === "bot"
                      ? "bg-white text-black self-start border border-gray-200"
                      : "bg-[#640D5F] text-white self-end"
                  }
                `}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form
            className="flex items-center gap-2 p-2 border-t border-gray-200 bg-white"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
            autoComplete="off"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("chatbot_input_placeholder")}
              className="flex-1 px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#640D5F] text-sm bg-gray-50 text-black"
              aria-label={t("chatbot_input_label")}
              aria-describedby="chatbot-input-description"
              maxLength={200}
            />
            <button
              type="submit"
              className="btn btn-primary btn-circle min-w-0 w-10 h-10 flex items-center justify-center shadow-none"
              aria-label={t("chatbot_send_label")}
              disabled={!input.trim()}
            >
              <IoSendSharp size={20} />
            </button>
          </form>
          <div id="chatbot-input-description" className="sr-only">
            {t("chatbot_input_description")}
          </div>
        </div>
      )}
      <button
        className="bg-[#640D5F] w-[56px] h-[56px] border-none rounded-full mt-5 flex items-center justify-center shadow-lg hover:scale-105 transition-transform duration-200"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={t("chatbot_toggle_label")}
        style={{ boxShadow: "0 4px 24px 0 rgba(100,13,95,0.15)" }}
      >
        <AiOutlineMessage className="text-white" size={32} />
      </button>
    </div>
  );
};

export default Chatbot;
