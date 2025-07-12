import { useRef } from "react";
import { FaPaperclip, FaPaperPlane, FaTimesCircle } from "react-icons/fa";

const MessageInput = ({
  value,
  onKeyDown,
  onClick,
  setMessages,
  onImageChange,
  selectedImages,
  clearImages,
}) => {
  const fileInputRef = useRef();

  return (
    <div className="flex flex-col p-3 bg-white border-t">
      {/* Image preview */}
      {selectedImages?.length > 0 && (
        <div className="flex space-x-2 mb-2 overflow-x-auto">
          {selectedImages.map((img, i) => (
            <div key={i} className="relative">
              <img
                src={img}
                alt={`preview-${i}`}
                className="w-20 h-20 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={() =>
                  clearImages && clearImages() // clear all or customize to remove individual
                }
                className="absolute top-0 right-0 text-white bg-black bg-opacity-50 rounded-full p-1"
              >
                <FaTimesCircle />
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center">
        <button
          onClick={() => fileInputRef.current.click()}
          className="text-gray-500 text-xl mr-3 cursor-pointer"
          aria-label="Attach Image"
          type="button"
        >
          <FaPaperclip />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => {
            if (onImageChange) onImageChange(e.target.files);
            e.target.value = null; // reset input so same file can be uploaded again
          }}
          className="hidden"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => setMessages(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Say something..."
          className="flex-grow bg-gray-100 rounded-full px-4 py-2 outline-none"
        />
        <button
          onClick={onClick}
          className="ml-3 bg-purple-500 text-white p-2 rounded-full hover:bg-purple-600"
          aria-label="Send Message"
          type="button"
        >
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
