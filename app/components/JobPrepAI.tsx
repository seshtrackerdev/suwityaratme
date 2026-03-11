import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
}

interface JobPrepAIProps {
  jobDetails?: {
    company: string;
    position: string;
    jobDescription: string;
    requirements: string;
    whyInterested: string;
    relevantExperience: string;
  };
}

const JOB_PREP_PROMPTS = [
  "Help me prepare for a technical interview",
  "What questions should I ask the interviewer?",
  "How can I improve my resume for this role?",
  "Give me STAR method examples for my experience",
  "What salary range should I expect?",
  "How do I follow up after an interview?",
  "What are common red flags in job postings?",
  "Help me practice elevator pitch"
];


export default function JobPrepAI({ jobDetails }: JobPrepAIProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your job prep AI assistant. I can help you with interview preparation, resume optimization, salary research, and more. What would you like to work on today?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for authentication
        body: JSON.stringify({
          message: userMessage,
          jobDetails: jobDetails
        }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication required. Please log in to use the AI assistant.');
        }
        throw new Error(`AI service error: ${response.status}`);
      }

      const data = await response.json() as { success: boolean; response: string };
      
      if (!data.success) {
        throw new Error('AI service returned an error');
      }

      return data.response;
    } catch (error) {
      console.error('AI API Error:', error);
      
      // Fallback to a helpful error message
      if (error instanceof Error) {
        if (error.message.includes('Authentication')) {
          return `I'm having trouble accessing the AI service. Please make sure you're logged in to the admin panel and try again.`;
        }
        return `I'm experiencing some technical difficulties right now. Please try again in a moment, or feel free to ask me a different question.`;
      }
      
      return `I apologize, but I'm having trouble processing your request right now. Please try again in a moment.`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(userMessage.content);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I apologize, but I'm having trouble processing your request right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInputValue(prompt);
  };

  const clearChat = () => {
    setMessages([
      {
        id: '1',
        type: 'ai',
        content: "Hi! I'm your job prep AI assistant. I can help you with interview preparation, resume optimization, salary research, and more. What would you like to work on today?",
        timestamp: new Date()
      }
    ]);
  };

  return (
    <div className="rounded-3xl border border-black bg-white shadow-[0_6px_0_0_#000] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="font-bold text-lg">Job Prep AI Assistant</h3>
              <p className="text-sm opacity-90">Your personal career coach</p>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              title="Clear chat"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
              title={isExpanded ? "Minimize" : "Expand"}
            >
              <svg className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            {/* Quick Prompts */}
            <div className="p-4 border-b border-black/10 bg-neutral-50">
              <h4 className="text-sm font-semibold mb-3 text-neutral-700">Quick Start Prompts:</h4>
              <div className="flex flex-wrap gap-2">
                {JOB_PREP_PROMPTS.map((prompt, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="px-3 py-1.5 text-xs font-medium bg-white border border-black/20 rounded-lg hover:bg-neutral-100 transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div className="h-96 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    message.type === 'user' 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-neutral-100 text-neutral-900'
                  }`}>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed">
                      {message.content}
                    </div>
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.type === 'user' ? 'text-blue-100' : 'text-neutral-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-neutral-100 rounded-2xl px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      <span className="text-sm text-neutral-600">AI is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-black/10">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about job prep, interviews, or career advice..."
                  className="flex-1 rounded-xl border border-black/20 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                  disabled={isLoading}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || isLoading}
                  className="rounded-xl border border-blue-600 bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-[0_2px_0_0_#2563eb] active:translate-y-[2px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
