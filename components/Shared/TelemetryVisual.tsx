"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import styles from "../app.module.css";

const NODES = [
  { id: "INFER", x: 200, y: 68, metric: "98ms", color: "#7C3AED" },
  { id: "STREAM", x: 72, y: 178, metric: "24 FPS", color: "#0891B2" },
  { id: "PIPELINE", x: 328, y: 178, metric: "4 ops", color: "#7C3AED" },
  { id: "MONITOR", x: 108, y: 298, metric: "6 cams", color: "#0891B2" },
  { id: "DEPLOY", x: 292, y: 298, metric: "v2.1", color: "#16A34A" },
];

const EDGES = [[0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4]];

export function TelemetryVisual() {
  const [activeEdge, setActiveEdge] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveEdge((n) => (n + 1) % EDGES.length), 1100);
    return () => clearInterval(t);
  }, []);

  return (
    <div className={styles.telemetryPanel}>
      <div className={styles.telemetryHeader}>
        <div className={styles.telemetryStatusRow}>
          <span className={styles.statusDot} />
          <span>SYSTEM LIVE</span>
        </div>
        <span className={styles.telemetryMeta}>
          {NODES.length} NODES / {EDGES.length} LINKS
        </span>
      </div>

      <svg viewBox="0 0 400 370" className={styles.telemetrySvg} aria-hidden>
        <defs>
          <pattern id="tgrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path
              d="M 40 0 L 0 0 0 40"
              fill="none"
              stroke="rgba(0,0,0,0.05)"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="400" height="370" fill="url(#tgrid)" />

        {EDGES.map(([a, b], i) => {
          const from = NODES[a];
          const to = NODES[b];
          const isActive = i === activeEdge;
          return (
            <line
              key={i}
              x1={from.x} y1={from.y}
              x2={to.x} y2={to.y}
              stroke={isActive ? "rgba(124,58,237,0.45)" : "rgba(0,0,0,0.08)"}
              strokeWidth={isActive ? 1.5 : 0.7}
              strokeDasharray="4 4"
              style={{
                transition: "stroke 0.5s ease, stroke-width 0.5s ease",
                animation: isActive ? "dashFlow 0.6s linear infinite" : "none",
              }}
            />
          );
        })}

        {NODES.map((node, i) => (
          <g key={node.id}>
            <motion.circle
              cx={node.x} cy={node.y} r={11}
              fill="none"
              stroke={node.color}
              strokeWidth={0.7}
              strokeOpacity={0.4}
              animate={{ r: [11, 20], strokeOpacity: [0.4, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
            />
            <circle cx={node.x} cy={node.y} r={5} fill={node.color} fillOpacity={0.9} />
            <circle cx={node.x} cy={node.y} r={2.5} fill="rgba(255,255,255,0.9)" />
            <text
              x={node.x} y={node.y + 22}
              textAnchor="middle"
              fill="rgba(0,0,0,0.4)"
              fontSize="10"
              fontFamily="monospace"
              letterSpacing="0.8"
            >
              {node.id}
            </text>
            <text
              x={node.x} y={node.y - 14}
              textAnchor="middle"
              fill={node.color}
              fontSize="11"
              fontFamily="monospace"
              fontWeight="600"
              fillOpacity="0.85"
            >
              {node.metric}
            </text>
          </g>
        ))}
      </svg>

      <div className={styles.telemetryFooter}>
        {[["LATENCY", "98ms"], ["THROUGHPUT", "24 FPS"], ["UPTIME", "99.9%"]].map(([k, v]) => (
          <div key={k} className={styles.telemetryMetric}>
            <span>{k}</span>
            <strong>{v}</strong>
          </div>
        ))}
      </div>

      <style>{`@keyframes dashFlow { to { stroke-dashoffset: -8; } }`}</style>
    </div>
  );
}
