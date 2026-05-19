"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { motion } from "framer-motion";
import { useCursor } from "../Shared/Cursor";
import styles from "../app.module.css";

const SUGGESTED = [
  "What stack do you usually work with?",
  "Tell me about FIFA2026.ca",
  "Are you open to internships?",
  "What makes you AI-native?",
];

function getTextContent(msg: { parts?: Array<{ type: string; text?: string }> }): string {
  if (!msg.parts) return "";
  return msg.parts
    .filter((p) => p.type === "text")
    .map((p) => p.text ?? "")
    .join("");
}

export function AskAI() {
  const { setCursor } = useCursor();
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });
  const [inputValue, setInputValue] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const isLoading = status === "streaming" || status === "submitted";

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    sendMessage({ text });
    setInputValue("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputValue);
  };

  return (
    <motion.div
      className={styles.panelMotion}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 10 }}
      transition={{ duration: 0.15 }}
    >
      <div className={styles.panelInner}>
        <div className={styles.panelHeader}>
          <p className={styles.panelEyebrow}>05 — Ask AI</p>
          <h1 className={styles.panelTitle}>Ask anything<br />about Hangyeom.</h1>
          <p className={styles.panelDesc}>
            A context-aware AI trained on his resume, projects, and experience.
            Ask it anything you&apos;d ask him in an interview.
          </p>
        </div>

        {messages.length === 0 && (
          <div className={styles.aiSuggestions}>
            {SUGGESTED.map((q) => (
              <button
                key={q}
                className={styles.aiSuggestion}
                onClick={() => handleSend(q)}
                onMouseEnter={() => setCursor("hover")}
                onMouseLeave={() => setCursor("default")}
              >
                {q}
              </button>
            ))}
          </div>
        )}

        <div className={styles.aiMessages}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={`${styles.aiMsg} ${m.role === "user" ? styles.aiMsgUser : styles.aiMsgAssistant}`}
            >
              {m.role === "assistant" && (
                <span className={styles.aiMsgRole}>AI</span>
              )}
              <div className={styles.aiMsgBubble}>{getTextContent(m as any)}</div>
            </div>
          ))}
          {isLoading && (
            <div className={`${styles.aiMsg} ${styles.aiMsgAssistant}`}>
              <span className={styles.aiMsgRole}>AI</span>
              <div className={styles.aiTyping}>
                <span className={styles.aiTypingDot} />
                <span className={styles.aiTypingDot} />
                <span className={styles.aiTypingDot} />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        <form className={styles.aiForm} onSubmit={handleSubmit}>
          <input
            className={styles.aiInput}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about my work, stack, availability…"
            disabled={isLoading}
          />
          <button
            type="submit"
            className={styles.aiSubmit}
            disabled={isLoading || !inputValue.trim()}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            Send ↵
          </button>
        </form>
      </div>
    </motion.div>
  );
}
