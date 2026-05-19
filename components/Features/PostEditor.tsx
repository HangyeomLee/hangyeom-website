"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useCursor } from "../Shared/Cursor";
import styles from "../app.module.css";
import type { View } from "../PortfolioApp";

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  published: boolean;
};

type Props = {
  slug?: string;
  setView: (v: View) => void;
};

type ToolbarAction = {
  label: string;
  title: string;
  before: string;
  after?: string;
  block?: boolean;
};

const TOOLBAR: ToolbarAction[] = [
  { label: "H1", title: "제목 1", before: "# ", block: true },
  { label: "H2", title: "제목 2", before: "## ", block: true },
  { label: "H3", title: "제목 3", before: "### ", block: true },
  { label: "B", title: "굵게", before: "**", after: "**" },
  { label: "I", title: "기울임", before: "_", after: "_" },
  { label: "~~", title: "취소선", before: "~~", after: "~~" },
  { label: "`", title: "인라인 코드", before: "`", after: "`" },
  { label: "```", title: "코드 블록", before: "```\n", after: "\n```", block: true },
  { label: '"', title: "인용", before: "> ", block: true },
  { label: "—", title: "구분선", before: "\n---\n", block: true },
  { label: "• ", title: "목록", before: "- ", block: true },
  { label: "1.", title: "번호 목록", before: "1. ", block: true },
];

export function PostEditor({ slug, setView }: Props) {
  const { setCursor } = useCursor();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [showPreview, setShowPreview] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [existingSlug, setExistingSlug] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) return;
    fetch(`/api/posts/${slug}`)
      .then((r) => r.json())
      .then((post: Post) => {
        setTitle(post.title);
        setContent(post.content);
        setTags(post.tags);
        setExistingSlug(post.slug);
      });
  }, [slug]);

  const insertMarkdown = (action: ToolbarAction) => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);
    const after = action.after ?? "";

    let before = action.before;
    let newContent: string;
    let newCursorStart: number;
    let newCursorEnd: number;

    if (action.block) {
      const lineStart = content.lastIndexOf("\n", start - 1) + 1;
      newContent = content.slice(0, lineStart) + before + content.slice(lineStart);
      newCursorStart = start + before.length;
      newCursorEnd = end + before.length;
    } else {
      newContent = content.slice(0, start) + before + selected + after + content.slice(end);
      newCursorStart = start + before.length;
      newCursorEnd = start + before.length + selected.length;
    }

    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(newCursorStart, newCursorEnd);
    }, 0);
  };

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, "");
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  const save = async (publish: boolean) => {
    if (!title.trim()) { setSaveMsg("제목을 입력해주세요."); return; }
    if (!content.trim()) { setSaveMsg("내용을 입력해주세요."); return; }
    setSaving(true);
    setSaveMsg("");

    const body = { title, content, tags, published: publish };

    try {
      let res: Response;
      if (existingSlug) {
        res = await fetch(`/api/posts/${existingSlug}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      } else {
        res = await fetch("/api/posts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }

      const saved = await res.json();
      if (!res.ok) throw new Error(saved.error || "저장 실패");
      setExistingSlug(saved.slug);
      setSaveMsg(publish ? "발행 완료 ✓" : "임시저장 완료 ✓");
      setTimeout(() => setSaveMsg(""), 2500);
      if (publish) {
        setTimeout(() => setView({ type: "post", slug: saved.slug }), 600);
      }
    } catch (e: unknown) {
      setSaveMsg(e instanceof Error ? e.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  };

  const handleTabKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const ta = e.currentTarget;
      const start = ta.selectionStart;
      const newContent = content.slice(0, start) + "  " + content.slice(ta.selectionEnd);
      setContent(newContent);
      setTimeout(() => ta.setSelectionRange(start + 2, start + 2), 0);
    }
  };

  return (
    <div className={styles.editorLayout}>
      {/* Header */}
      <div className={styles.editorHeader}>
        <button
          className={styles.editorBack}
          onClick={() => setView({ type: "blog" })}
          onMouseEnter={() => setCursor("hover")}
          onMouseLeave={() => setCursor("default")}
        >
          ← Blog
        </button>

        <div className={styles.editorHeaderRight}>
          {saveMsg && <span className={styles.editorSaveMsg}>{saveMsg}</span>}
          <button
            className={styles.editorToggle}
            onClick={() => setShowPreview((p) => !p)}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            {showPreview ? "✏️ 편집" : "👁 미리보기"}
          </button>
          <button
            className={styles.btnSecondary}
            onClick={() => save(false)}
            disabled={saving}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
            style={{ minHeight: 34, padding: "0.3rem 0.9rem", fontSize: "0.85rem" }}
          >
            임시저장
          </button>
          <button
            className={styles.btnPrimary}
            onClick={() => save(true)}
            disabled={saving}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
            style={{ minHeight: 34, padding: "0.3rem 0.9rem", fontSize: "0.85rem" }}
          >
            발행 →
          </button>
        </div>
      </div>

      {/* Title */}
      <div className={styles.editorMeta}>
        <textarea
          className={styles.editorTitle}
          placeholder="제목을 입력하세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          rows={1}
          onInput={(e) => {
            const t = e.currentTarget;
            t.style.height = "auto";
            t.style.height = t.scrollHeight + "px";
          }}
        />

        {/* Tags */}
        <div className={styles.editorTags}>
          {tags.map((t) => (
            <span key={t} className={styles.editorTag}>
              #{t}
              <button
                onClick={() => removeTag(t)}
                className={styles.editorTagRemove}
                onMouseEnter={() => setCursor("hover")}
                onMouseLeave={() => setCursor("default")}
              >
                ×
              </button>
            </span>
          ))}
          <input
            className={styles.editorTagInput}
            placeholder="태그 추가 (Enter)"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === ",") { e.preventDefault(); addTag(); }
              if (e.key === "Backspace" && !tagInput && tags.length) {
                setTags((prev) => prev.slice(0, -1));
              }
            }}
          />
        </div>
      </div>

      {/* Editor pane */}
      <div className={styles.editorPane}>
        {/* Write */}
        <div className={`${styles.editorWrite} ${showPreview ? styles.editorHidden : ""}`}>
          <div className={styles.editorToolbar}>
            {TOOLBAR.map((action) => (
              <button
                key={action.label}
                title={action.title}
                className={styles.toolbarBtn}
                onClick={() => insertMarkdown(action)}
                onMouseEnter={() => setCursor("hover")}
                onMouseLeave={() => setCursor("default")}
              >
                {action.label}
              </button>
            ))}
          </div>
          <textarea
            ref={textareaRef}
            className={styles.editorTextarea}
            placeholder="마크다운으로 작성하세요…

# 제목

**굵게**, _기울임_, `코드`

> 인용문

```
코드 블록
```"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleTabKey}
            spellCheck={false}
          />
        </div>

        {/* Divider */}
        {!showPreview && <div className={styles.editorDivider} />}

        {/* Preview */}
        <div className={`${styles.editorPreview} ${!showPreview ? styles.editorPreviewSplit : ""}`}>
          <div className={styles.editorPreviewLabel}>미리보기</div>
          <div className={styles.postContent}>
            {content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
            ) : (
              <p style={{ color: "var(--muted)", fontStyle: "italic" }}>내용을 작성하면 여기에 미리보기가 표시됩니다.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
