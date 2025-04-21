import { useState, useEffect, useRef } from "react";
import {
  Send,
  X,
  Dumbbell,
  ChevronRight,
  MessageSquare,
  User,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import allProductsController from "../../../controllers/Admin/allProducts"; // Import the controller function

export default function VitalGearAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "bot",
      content:
        "Hey fitness enthusiast! I'm your VitalGear Assistant. Ask me about supplements, workout gear, or nutrition products to power your fitness journey!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [allAvailableProducts, setAllAvailableProducts] = useState([]); // State for all products
  const messagesEndRef = useRef(null);

  // API URL for your FastAPI backend
  const API_URL = "http://localhost:8000";
  // Remove PRODUCTS_API_URL as it's handled by the controller
  // const PRODUCTS_API_URL = "http://localhost:3000"; // Adjust if different

  // Fetch all products when component mounts using the controller
  useEffect(() => {
    // Define dummy functions for setLoading and setError if not needed here
    const dummySetLoading = () => {};
    const dummySetError = (err) => { console.error("Error fetching products via controller:", err); }; // Keep logging errors

    // Call the imported controller function
    allProductsController(setAllAvailableProducts, dummySetLoading, dummySetError);
  }, []); // Empty dependency array ensures this runs only once on mount

  // Auto-scroll to bottom of messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // Extract product information from text using available products
  const extractProductInfo = (text, availableProducts) => {
    const products = [];
    const lowerCaseText = text.toLowerCase();

    if (!availableProducts || availableProducts.length === 0) {
      console.log("No available products to check against.");
      return products; // Return empty if no products fetched yet
    }

    // Check each available product against the bot response text
    availableProducts.forEach((product, index) => { // Add index for fallback key
      // Check if product name (or other relevant fields) is mentioned
      // Using includes for simple matching, could be enhanced with more robust NLP
      if (product.productName && lowerCaseText.includes(product.productName.toLowerCase())) {
        // Check if product already added to avoid duplicates (using productName as primary check)
        if (!products.some(p => p.name === product.productName)) { // Check against name property of the object we are pushing
           products.push({
            // Assuming your product object has these fields, adjust as necessary
            id: product._id || product.id || `${product.productName}-${index}`, // Use backend ID or fallback to name+index
            name: product.brandName + " " + product.productName, // Use productName
            category: product.category || "Fitness", // Use category
            description: product.productDetails?.description || "Premium fitness product", // Use nested description
            price: product.price?.productPrice || 49.99, // Use nested price
            rating: product.rating || 4.7, // Use top-level rating
            image: product.images?.[0]?.url || '', // Add first image URL
          });
        }
      }
      // Add more checks here if needed (e.g., check product.category, product.keywords)
    });

    // Limit the number of suggested products if needed
    return products.slice(0, 2); // Example: Limit to 2 suggestions
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.trim() === "") return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      sender: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput("");

    // Show typing indicator
    setIsTyping(true);

    try {
      // Call the FastAPI backend
      const response = await fetch(`${API_URL}/query`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: input }),
      });

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const botResponseText = data.response;
      
      // Extract product recommendations from the response using fetched products
      console.log("Available products before extraction:", allAvailableProducts); // Log available products
      const products = extractProductInfo(botResponseText, allAvailableProducts);
      console.log("Extracted products:", products); // Log extracted products

      // Create bot response
      const botResponse = {
        id: messages.length + 2,
        sender: "bot",
        content: botResponseText,
        products: products,
        timestamp: new Date(),
      };

      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, botResponse]);
    } catch (error) {
      console.error("Error fetching response:", error);
      
      // Handle error gracefully
      setIsTyping(false);
      const errorResponse = {
        id: messages.length + 2,
        sender: "bot",
        content: "I'm having trouble connecting to my knowledge base right now. Please try again in a moment.",
        timestamp: new Date(),
      };
      
      setMessages((prevMessages) => [...prevMessages, errorResponse]);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={toggleChat}
          className="fixed bottom-6 right-6 bg-[#09274d] text-white p-3 rounded-full shadow-lg hover:bg-[#395c87] transition-all z-50"
        >
          <MessageSquare size={24} />
        </button>
      )}

      {/* Chat Interface */}
      <div
        className={`fixed right-0 bottom-0 top-0 w-96 max-w-full bg-white shadow-xl transition-all duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Chat Header */}
        <div className="bg-[#09274d] text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Dumbbell className="mr-2" size={20} />
            <h3 className="font-bold">VitalGear Assistant</h3>
          </div>
          <button
            onClick={toggleChat}
            className="text-white hover:text-gray-200"
          >
            <X size={20} />
          </button>
        </div>

        {/* Welcome Banner */}
        <div className="bg-[#dae0ef] p-4">
          <h4 className="font-semibold text-[#09274d]">
            Your Fitness Journey Assistant
          </h4>
          <p className="text-sm text-[#395c87]">
            Ask me about supplements, equipment, or nutrition to power your
            workouts!
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-3/4 rounded-lg p-3 ${
                  message.sender === "user"
                    ? "bg-[#395c87] text-white rounded-tr-none"
                    : "bg-white border border-gray-200 rounded-tl-none shadow-sm"
                }`}
              >
                {message.sender === "bot" && (
                  <div className="flex items-center mb-1">
                    <Dumbbell size={14} className="text-[#09274d] mr-1" />
                    <span className="text-xs font-medium text-[#09274d]">
                      VitalGear Assistant
                    </span>
                  </div>
                )}

                <p className="text-sm">{message.content}</p>

                {/* Product Recommendations */}
                {message.products && message.products.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    {message.products.map((product) => (
                      <div
                        key={product.id}
                        className="bg-[#dae0ef] rounded-md p-2 mt-2"
                      >
                        <div className="flex justify-between">
                          <span className="font-medium text-[#09274d]">
                            {product.name}
                          </span>
                          <span className="text-sm font-bold">
                          ₹{product.price}
                          </span>
                        </div>
                        {/* Replace description with image */}
                       
                          {/* <img 
                            src={product?.images[0]?.url}
                            alt={product.productName}
                            className="w-full h-24 object-cover mt-1 rounded"
                          /> */}
                      
                        <div className="flex justify-between items-center mt-2">
                          <div className="flex items-center">
                            <span className="text-yellow-500">★</span>
                            <span className="text-xs ml-1">
                              {product.rating}
                            </span>
                          </div>
                          <NavLink to={`/Products/${product.id}`} state={product.category}>
                          <button className="text-xs bg-[#09274d] text-white py-1 px-2 rounded flex items-center">
                            View Product
                            <ChevronRight size={12} className="ml-1" />
                          </button>
                          </NavLink>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-gray-200"
                      : "text-gray-400"
                  }`}
                >
                  {formatTime(message.timestamp)}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start mb-4">
              <div className="bg-white border border-gray-200 rounded-lg rounded-tl-none p-3 shadow-sm">
                <div className="flex space-x-1">
                  <div
                    className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "0ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "150ms" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"
                    style={{ animationDelay: "300ms" }}
                  ></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form
          onSubmit={handleSubmit}
          className="p-4 border-t border-gray-200 bg-white"
        >
          <div className="relative">
            <input
              type="text"
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about fitness products..."
              className="w-full border border-gray-300 rounded-full py-2 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#395c87] focus:border-transparent"
            />
            <button
              type="submit"
              className="absolute right-1 top-1 bg-[#09274d] text-white p-1.5 rounded-full hover:bg-[#395c87]"
              disabled={input.trim() === ""}
            >
              <Send size={16} />
            </button>
          </div>
          <div className="text-xs text-center mt-2 text-gray-500">
            Powered by VitalGear AI
          </div>
        </form>
      </div>

      {/* Overlay to close the chat when clicking outside */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-20 z-40"
          onClick={toggleChat}
        ></div>
      )}
    </>
  );
}