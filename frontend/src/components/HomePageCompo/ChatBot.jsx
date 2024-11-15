import React, { useState } from 'react';
import { BsChatDotsFill } from 'react-icons/bs'; // Importing an attractive chat icon

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChatbot = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-4 right-4">
      {/* Chatbot Icon */}
      <button
        onClick={toggleChatbot}
        className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full text-white shadow-lg hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 animate-bounce"
      >
        <BsChatDotsFill size={28} />
      </button>

      {/* Chatbot iframe */}
      {isOpen && (
        <div className="fixed bottom-16 right-4 w-[350px] h-[430px] bg-white border border-gray-300 shadow-lg rounded-lg overflow-hidden">
          <iframe
            width="350"
            height="430"
            allow="microphone;"
            src="https://console.dialogflow.com/api-client/demo/embedded/c2ccbee6-13e1-463c-9c51-6c0f37536d11"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
