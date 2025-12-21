import React, { useState, useEffect } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './Chatbot.module.css';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
  source_chunks?: string[];
}

export default function Chatbot() {
  const { siteConfig } = useDocusaurusContext();
  const backendUrl = (siteConfig.customFields?.backendUrl as string) || 'http://localhost:8000';
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedText, setSelectedText] = useState('');

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()?.toString().trim();
      setSelectedText(selection || '');
    };
    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, []);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !selectedText) return;

    const userText = selectedText ? `Explain this: "${selectedText}" ${input}` : input;
    setMessages(prev => [...prev, { text: userText, sender: 'user' }]);
    setInput('');
    setSelectedText('');
    setLoading(true);

    try {
      const response = await fetch(`${backendUrl}/api/chatbot/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: input || 'Explain the selected text',
          selected_text: selectedText || null,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || 'Network error');
      }

      const data = await response.json();
      setMessages(prev => [...prev, { text: data.response || 'No response', sender: 'bot', source_chunks: data.source_chunks }]);
    } catch (err) {
      setMessages(prev => [...prev, { text: 'Error: Could not connect to backend. Check if backend is running on http://localhost:8000', sender: 'bot' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button – 2025 Professional Design */}
      <button className={styles.floatingBtn} onClick={() => setIsOpen(!isOpen)}>
        <div className={styles.miniRobot}>
          <div className={styles.robotHead}></div>
          <div className={styles.robotBody}></div>
          <div className={styles.robotArmLeft}></div>
          <div className={styles.robotArmRight}></div>
          <div className={styles.glowOrb}></div>
        </div>
      </button>


      {/* Chat Window – Unique 2025 UI with Gradient, Glassmorphism, & Animations */}
      {isOpen && (
        <div className={styles.chatWindow}>
          <div className={styles.chatHeader}>
            <h3>AI Robotics Assistant</h3>
            <button onClick={() => setIsOpen(false)} className={styles.closeBtn}>×</button>
          </div>
          <div className={styles.messages}>
            {messages.length === 0 && <p className={styles.welcome}>Ask me anything about Physical AI!</p>}
            {messages.map((msg, i) => (
              <div key={i} className={msg.sender === 'user' ? styles.userMsg : styles.botMsg}>
                <span className={styles.msgBubble}>
                  {msg.text}
                </span>
                {msg.source_chunks && msg.source_chunks.length > 0 && (
                  <small className={styles.sources}>
                    Sources: {msg.source_chunks.length} chunks
                  </small>
                )}
              </div>
            ))}
            {loading && <p className={styles.loading}>Analyzing...</p>}
          </div>
          <form onSubmit={handleSend} className={styles.inputForm}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={selectedText ? `Using selected: "${selectedText.substring(0, 30)}..."` : "Type your query..."}
              className={styles.input}
              disabled={loading}
            />
            <button type="submit" className={styles.sendBtn} disabled={loading}>
              →
            </button>
          </form>
          {selectedText && <p className={styles.selectedHint}>Selected text included</p>}
        </div>
      )}
    </>
  );
}