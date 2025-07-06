import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, MessageCircle, TrendingUp, BarChart3, Target, DollarSign, Sparkles, Zap } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  type?: 'text' | 'insight' | 'chart' | 'action';
}

interface ChatSystemProps {
  onInsightRequest?: (type: string) => void;
}

const ChatSystem: React.FC<ChatSystemProps> = ({ onInsightRequest }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm your AI business assistant. I can help you with sales predictions, marketing insights, and business analytics. What would you like to know?",
      sender: 'ai',
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickActions = [
    { text: 'Show sales predictions', icon: TrendingUp, action: 'sales', color: 'bg-green-500 hover:bg-green-600' },
    { text: 'Marketing insights', icon: BarChart3, action: 'marketing', color: 'bg-blue-500 hover:bg-blue-600' },
    { text: 'Revenue analysis', icon: DollarSign, action: 'revenue', color: 'bg-purple-500 hover:bg-purple-600' },
    { text: 'Customer insights', icon: Target, action: 'customers', color: 'bg-orange-500 hover:bg-orange-600' }
  ];

  const generateAIResponse = async (userMessage: string) => {
    setIsTyping(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));

    let response = '';
    let type: 'text' | 'insight' | 'chart' | 'action' = 'text';

    const lowerMessage = userMessage.toLowerCase();

    if (lowerMessage.includes('sales') || lowerMessage.includes('prediction')) {
      response = "Based on your recent sales data, I predict a 15% increase in revenue over the next quarter. Your top-performing products are showing strong growth trends, particularly in the premium segment. Would you like me to show you detailed sales forecasts?";
      type = 'insight';
    } else if (lowerMessage.includes('marketing') || lowerMessage.includes('campaign')) {
      response = "Your marketing campaigns are performing well! TikTok shows the highest ROI at 4.1x, while Google Ads needs optimization. I recommend increasing TikTok budget by 30% and focusing on retargeting campaigns for Meta. Here's a detailed breakdown:";
      type = 'insight';
    } else if (lowerMessage.includes('revenue') || lowerMessage.includes('profit')) {
      response = "Your current revenue projection is $19,960 across all marketing channels. With the recommended optimizations, you could increase this to $24,500. The highest potential is in TikTok campaigns and Google Ads optimization.";
      type = 'insight';
    } else if (lowerMessage.includes('customer') || lowerMessage.includes('audience')) {
      response = "Your customer base is growing steadily! Key insights: 65% are repeat customers, average order value is $85, and peak ordering times are 6-8 PM. Your TikTok audience is particularly engaged with video content.";
      type = 'insight';
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      response = "I can help you with:\n• Sales predictions and forecasting\n• Marketing campaign analysis\n• Revenue optimization\n• Customer insights\n• Performance recommendations\n\nJust ask me anything about your business data!";
      type = 'text';
    } else {
      response = "I understand you're asking about '" + userMessage + "'. Let me analyze your data and provide insights. Would you like me to focus on sales predictions, marketing performance, or customer analytics?";
      type = 'text';
    }

    return { response, type };
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    const { response, type } = await generateAIResponse(inputText);
    
    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'ai',
      timestamp: new Date(),
      type
    };

    setMessages(prev => [...prev, aiMessage]);
    setIsTyping(false);
  };

  const handleQuickAction = async (action: string) => {
    const actionMessages = {
      sales: "Show me the latest sales predictions and trends.",
      marketing: "What are the current marketing insights and recommendations?",
      revenue: "Give me a revenue analysis and projections.",
      customers: "What customer insights do you have?"
    };

    setInputText(actionMessages[action as keyof typeof actionMessages]);
    await handleSendMessage();
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-xl h-[700px] flex flex-col border border-gray-200">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-lg">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <Bot className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">AI Business Assistant</h3>
            <p className="text-blue-100 text-sm">Powered by advanced analytics</p>
          </div>
          <div className="ml-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-blue-100">Online</span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                  : 'bg-white text-gray-900 border border-gray-200'
              }`}
            >
              <div className="flex items-start space-x-2">
                {message.sender === 'ai' && (
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-3 h-3 text-blue-600" />
                  </div>
                )}
                <div className="flex-1">
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-2 ${
                    message.sender === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white text-gray-900 px-4 py-3 rounded-2xl shadow-sm border border-gray-200">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                  <Bot className="w-3 h-3 text-blue-600" />
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Actions */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="grid grid-cols-2 gap-3 mb-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={() => handleQuickAction(action.action)}
              className={`flex items-center space-x-2 px-4 py-3 text-sm ${action.color} text-white rounded-lg transition-all duration-300 transform hover:scale-105 font-medium`}
            >
              <action.icon className="w-4 h-4" />
              <span>{action.text}</span>
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask me about your business data..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12"
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <Sparkles className="w-4 h-4 text-gray-400" />
            </div>
          </div>
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 font-medium"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatSystem; 