"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCursor } from "../Shared/Cursor";
import styles from "../app.module.css";

type Result = {
  id: string;
  title: string;
  sub: string;
  desc: string;
  tags: string[];
};

const RESULTS: Result[] = [
  {
    id: "system",
    title: "Systems Thinker",
    sub: "Architecture first. Always.",
    desc: "You see the whole pipeline before writing a line. Architecture-first, bottleneck-aware, latency-obsessed.",
    tags: ["Distributed Systems", "Backend", "Platform"],
  },
  {
    id: "shipper",
    title: "Rapid Shipper",
    sub: "Ship it. Learn. Repeat.",
    desc: "You live in the deploy cycle. Working software beats perfect software, and you prove it every sprint.",
    tags: ["Product", "Velocity", "Full-Stack"],
  },
  {
    id: "product",
    title: "Product Engineer",
    sub: "Half engineer, half PM.",
    desc: "You obsess over the user journey as much as the code that powers it. UX is part of your mental model.",
    tags: ["Product Thinking", "UX", "Cross-functional"],
  },
  {
    id: "ai",
    title: "AI-Native Builder",
    sub: "LLMs as a primitive.",
    desc: "LLMs aren't a feature to you — they're a primitive. You ship AI-integrated products by default.",
    tags: ["LLMs", "AI Integration", "Inference"],
  },
];

const QUESTIONS = [
  {
    q: "You're starting a new project. What's your first instinct?",
    options: [
      { text: "Draw the system architecture", result: "system" },
      { text: "Ship a prototype by end of day", result: "shipper" },
      { text: "Define the user journey first", result: "product" },
      { text: "Ask: where does AI fit in here?", result: "ai" },
    ],
  },
  {
    q: "A feature is 90% done but edge cases are messy. You:",
    options: [
      { text: "Design a clean abstraction to handle them", result: "system" },
      { text: "Ship it — handle edge cases in v2", result: "shipper" },
      { text: "Ask: do users even hit these cases?", result: "product" },
      { text: "Use an LLM to handle ambiguity at runtime", result: "ai" },
    ],
  },
  {
    q: "Your ideal stack for a new product?",
    options: [
      { text: "Whatever scales to 10M requests/day", result: "system" },
      { text: "Whatever ships the fastest", result: "shipper" },
      { text: "Whatever the user won't notice (that's the point)", result: "product" },
      { text: "Next.js + Vercel AI SDK, obviously", result: "ai" },
    ],
  },
  {
    q: "Your pull request review philosophy?",
    options: [
      { text: "I'm here to spot architectural drift", result: "system" },
      { text: "Is it working and deployed? Merge.", result: "shipper" },
      { text: "Does this make the product better for users?", result: "product" },
      { text: "Could any of this be replaced with an AI call?", result: "ai" },
    ],
  },
  {
    q: "What does 'done' mean to you?",
    options: [
      { text: "Observable, monitored, and load-tested", result: "system" },
      { text: "In production and getting real feedback", result: "shipper" },
      { text: "Users complete their goals without friction", result: "product" },
      { text: "The AI is making the right calls autonomously", result: "ai" },
    ],
  },
];

const KEYS = ["A", "B", "C", "D"];

export function Quiz() {
  const { setCursor } = useCursor();
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({ system: 0, shipper: 0, product: 0, ai: 0 });
  const [result, setResult] = useState<Result | null>(null);

  const answer = (resultId: string) => {
    const next = { ...scores, [resultId]: scores[resultId] + 1 };
    setScores(next);
    if (step < QUESTIONS.length - 1) {
      setStep((s) => s + 1);
    } else {
      const winner = Object.entries(next).sort((a, b) => b[1] - a[1])[0][0];
      setResult(RESULTS.find((r) => r.id === winner) ?? RESULTS[0]);
    }
  };

  const reset = () => {
    setStep(0);
    setScores({ system: 0, shipper: 0, product: 0, ai: 0 });
    setResult(null);
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
          <p className={styles.panelEyebrow}>07 — Engineer Quiz</p>
          <h1 className={styles.panelTitle}>What kind of<br />engineer are you?</h1>
          <p className={styles.panelDesc}>5 questions. No wrong answers. Honest result.</p>
        </div>

        <div className={styles.quiz}>
          <AnimatePresence mode="wait">
            {!result ? (
              <motion.div
                key={`q-${step}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.2 }}
              >
                <div className={styles.quizProgress}>
                  {QUESTIONS.map((_, i) => (
                    <div
                      key={i}
                      className={`${styles.quizProgressDot} ${i === step ? styles.quizProgressDotActive : ""}`}
                      style={i < step ? { background: "var(--accent-bright)" } : undefined}
                    />
                  ))}
                </div>

                <p className={styles.quizQ}>{QUESTIONS[step].q}</p>

                <div className={styles.quizOptions}>
                  {QUESTIONS[step].options.map((opt, i) => (
                    <button
                      key={opt.text}
                      className={styles.quizOption}
                      onClick={() => answer(opt.result)}
                      onMouseEnter={() => setCursor("hover")}
                      onMouseLeave={() => setCursor("default")}
                    >
                      <span className={styles.quizOptionKey}>{KEYS[i]}</span>
                      <span className={styles.quizOptionText}>{opt.text}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="result"
                className={styles.quizResult}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                <h2 className={styles.quizResultType}>{result.title}</h2>
                <p className={styles.quizResultSub}>{result.sub}</p>
                <p className={styles.quizResultDesc}>{result.desc}</p>

                <div className={styles.quizResultCard}>
                  <p className={styles.quizResultCardLabel}>Domains</p>
                  <p className={styles.quizResultCardValue}>{result.tags.join(" · ")}</p>
                </div>

                <div className={styles.quizResultCard}>
                  <p className={styles.quizResultCardLabel}>Hangyeom&apos;s type</p>
                  <p className={styles.quizResultCardValue}>AI-Native Builder — Systems Thinker is a close second.</p>
                </div>

                <div className={styles.quizActions}>
                  <button
                    className={styles.btnSecondary}
                    onClick={reset}
                    onMouseEnter={() => setCursor("hover")}
                    onMouseLeave={() => setCursor("default")}
                  >
                    Retake quiz
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
