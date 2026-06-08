"use client";

import { createPortal } from "react-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  useEditor,
  EditorContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import type { NodeViewProps, Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Image as TiptapImage } from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import ReactCrop, { type Crop, type PixelCrop } from "react-image-crop";
import { useCursor } from "../Shared/Cursor";
import { CategoryManager, type Category } from "./CategoryManager";
import styles from "../app.module.css";
import type { View } from "../PortfolioApp";

type Post = {
  id: string;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  published: boolean;
  categoryId: string | null;
};

type Props = {
  slug?: string;
  setView: (v: View) => void;
};

const SIZE_PRESETS = [
  { label: "원본", value: "" },
  { label: "25%", value: "25%" },
  { label: "50%", value: "50%" },
  { label: "75%", value: "75%" },
  { label: "100%", value: "100%" },
];

// ─── Image Node View ─────────────────────────────────────────────

function ImageNodeView({ node, updateAttributes, selected }: NodeViewProps) {
  const [showControls, setShowControls] = useState(false);
  const [cropMode, setCropMode] = useState(false);
  const [crop, setCrop] = useState<Crop>({ unit: "%", width: 90, x: 5, y: 5, height: 90 });
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [applying, setApplying] = useState(false);
  const [cropError, setCropError] = useState("");
  const wrapRef = useRef<HTMLDivElement>(null);
  const cropImgRef = useRef<HTMLImageElement>(null);
  const { src, alt, width } = node.attrs;

  useEffect(() => {
    if (!showControls) return;
    const handler = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setShowControls(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showControls]);

  const applyCrop = async () => {
    if (!cropImgRef.current || !completedCrop?.width || !completedCrop?.height) return;
    setApplying(true);
    setCropError("");
    const img = cropImgRef.current;
    const scaleX = img.naturalWidth / img.width;
    const scaleY = img.naturalHeight / img.height;
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(completedCrop.width * scaleX);
    canvas.height = Math.round(completedCrop.height * scaleY);
    const ctx = canvas.getContext("2d");
    if (!ctx) { setApplying(false); return; }
    try {
      ctx.drawImage(
        img,
        completedCrop.x * scaleX,
        completedCrop.y * scaleY,
        completedCrop.width * scaleX,
        completedCrop.height * scaleY,
        0, 0,
        canvas.width, canvas.height
      );
    } catch {
      setCropError("이미지를 자를 수 없습니다. (CORS 제한 — Supabase에 업로드된 이미지만 자르기 가능)");
      setApplying(false);
      return;
    }
    canvas.toBlob(async (blob) => {
      if (!blob) { setApplying(false); return; }
      const fd = new FormData();
      fd.append("file", new File([blob], "crop.png", { type: "image/png" }));
      try {
        const res = await fetch("/api/upload", { method: "POST", body: fd });
        const data = await res.json();
        if (data.url) updateAttributes({ src: data.url });
        setCropMode(false);
      } catch {
        setCropError("업로드 실패");
      } finally {
        setApplying(false);
      }
    }, "image/png");
  };

  return (
    <NodeViewWrapper>
      <div
        ref={wrapRef}
        style={{ display: "inline-block", position: "relative", maxWidth: "100%", userSelect: "none" }}
        data-drag-handle
      >
        <img
          src={src}
          alt={alt ?? ""}
          style={{
            width: width || undefined,
            maxWidth: "100%",
            display: "block",
            cursor: "pointer",
            borderRadius: 4,
            outline: (showControls || selected) ? "2px solid var(--accent)" : "none",
            outlineOffset: 2,
          }}
          onClick={() => setShowControls((p) => !p)}
          draggable={false}
        />

        {showControls && (
          <div className={styles.imgControls}>
            <span className={styles.imgControlsLabel}>크기</span>
            {SIZE_PRESETS.map((s) => (
              <button
                key={s.label}
                className={`${styles.imgControlBtn} ${(width ?? "") === s.value ? styles.imgControlBtnActive : ""}`}
                onMouseDown={(e) => e.preventDefault()}
                onClick={(e) => { e.stopPropagation(); updateAttributes({ width: s.value || null }); }}
              >
                {s.label}
              </button>
            ))}
            <span className={styles.imgControlSep} />
            <button
              className={styles.imgControlBtn}
              onMouseDown={(e) => e.preventDefault()}
              onClick={(e) => {
                e.stopPropagation();
                setCropMode(true);
                setShowControls(false);
                setCompletedCrop(null);
                setCropError("");
              }}
            >
              ✂ 자르기
            </button>
          </div>
        )}
      </div>

      {cropMode &&
        typeof document !== "undefined" &&
        createPortal(
          <div className={styles.cropModalOverlay} onClick={() => setCropMode(false)}>
            <div className={styles.cropModal} onClick={(e) => e.stopPropagation()}>
              <div className={styles.cropModalHeader}>
                <span className={styles.imgModalTitle}>이미지 자르기</span>
                <button className={styles.imgModalClose} onClick={() => setCropMode(false)}>×</button>
              </div>
              <div className={styles.cropModalBody}>
                <ReactCrop
                  crop={crop}
                  onChange={(c) => setCrop(c)}
                  onComplete={(c) => setCompletedCrop(c)}
                >
                  <img
                    ref={cropImgRef}
                    src={src}
                    alt=""
                    crossOrigin="anonymous"
                    style={{ maxWidth: "100%", maxHeight: "60vh", display: "block" }}
                  />
                </ReactCrop>
                {cropError && <p className={styles.imgModalError}>{cropError}</p>}
              </div>
              <div className={styles.cropModalFooter}>
                <button className={styles.btnSecondary} onClick={() => setCropMode(false)}>취소</button>
                <button
                  className={styles.btnPrimary}
                  onClick={applyCrop}
                  disabled={applying || !completedCrop?.width}
                >
                  {applying ? "처리 중…" : "자르기 적용"}
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}
    </NodeViewWrapper>
  );
}

// ─── Custom Image Extension ────────────────────────────────────────

const CustomImage = TiptapImage.extend({
  addAttributes() {
    return {
      ...this.parent?.(),
      width: {
        default: null,
        parseHTML: (el) => el.getAttribute("width"),
        renderHTML: (attrs) => (attrs.width ? { width: attrs.width } : {}),
      },
    };
  },
  addNodeView() {
    return ReactNodeViewRenderer(ImageNodeView);
  },
});

// ─── Toolbar config ────────────────────────────────────────────────

type ToolbarItem =
  | { type: "btn"; label: string; title: string; action: (e: Editor) => void; isActive?: (e: Editor) => boolean }
  | { type: "sep" };

const TOOLBAR: ToolbarItem[] = [
  { type: "btn", label: "H1", title: "제목 1", action: (e) => e.chain().focus().toggleHeading({ level: 1 }).run(), isActive: (e) => e.isActive("heading", { level: 1 }) },
  { type: "btn", label: "H2", title: "제목 2", action: (e) => e.chain().focus().toggleHeading({ level: 2 }).run(), isActive: (e) => e.isActive("heading", { level: 2 }) },
  { type: "btn", label: "H3", title: "제목 3", action: (e) => e.chain().focus().toggleHeading({ level: 3 }).run(), isActive: (e) => e.isActive("heading", { level: 3 }) },
  { type: "sep" },
  { type: "btn", label: "B", title: "굵게", action: (e) => e.chain().focus().toggleBold().run(), isActive: (e) => e.isActive("bold") },
  { type: "btn", label: "I", title: "기울임", action: (e) => e.chain().focus().toggleItalic().run(), isActive: (e) => e.isActive("italic") },
  { type: "btn", label: "~~", title: "취소선", action: (e) => e.chain().focus().toggleStrike().run(), isActive: (e) => e.isActive("strike") },
  { type: "btn", label: "`", title: "인라인 코드", action: (e) => e.chain().focus().toggleCode().run(), isActive: (e) => e.isActive("code") },
  { type: "sep" },
  { type: "btn", label: "```", title: "코드 블록", action: (e) => e.chain().focus().toggleCodeBlock().run(), isActive: (e) => e.isActive("codeBlock") },
  { type: "btn", label: '"', title: "인용", action: (e) => e.chain().focus().toggleBlockquote().run(), isActive: (e) => e.isActive("blockquote") },
  { type: "btn", label: "—", title: "구분선", action: (e) => e.chain().focus().setHorizontalRule().run() },
  { type: "sep" },
  { type: "btn", label: "• ", title: "목록", action: (e) => e.chain().focus().toggleBulletList().run(), isActive: (e) => e.isActive("bulletList") },
  { type: "btn", label: "1.", title: "번호 목록", action: (e) => e.chain().focus().toggleOrderedList().run(), isActive: (e) => e.isActive("orderedList") },
];

// ─── PostEditor ────────────────────────────────────────────────────

export function PostEditor({ slug, setView }: Props) {
  const { setCursor } = useCursor();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const editorRef = useRef<Editor | null>(null);
  const [title, setTitle] = useState("");
  const [tagInput, setTagInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState("");
  const [existingSlug, setExistingSlug] = useState<string | null>(null);
  const [showUrlModal, setShowUrlModal] = useState(false);
  const [urlValue, setUrlValue] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryId, setCategoryId] = useState<string | null>(null);
  const [showCategoryManager, setShowCategoryManager] = useState(false);

  const loadCategories = useCallback(() => {
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: Category[]) => setCategories(data))
      .catch(() => {});
  }, []);

  useEffect(() => { loadCategories(); }, [loadCategories]);

  const uploadAndInsert = useCallback(async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url && editorRef.current) {
        editorRef.current.chain().focus().setImage({ src: data.url, alt: "" }).run();
      }
    } catch {
      // silent
    }
  }, []);

  const editor = useEditor({
    extensions: [
      StarterKit,
      CustomImage.configure({ inline: false }),
      Placeholder.configure({
        placeholder: "여기에 작성하세요… 이미지는 Ctrl+V로 붙여넣거나 툴바 🖼 버튼을 사용하세요.",
      }),
    ],
    editorProps: {
      handlePaste(_view, event) {
        const items = event.clipboardData?.items;
        if (!items) return false;
        for (const item of Array.from(items)) {
          if (item.type.startsWith("image/")) {
            event.preventDefault();
            const file = item.getAsFile();
            if (file) {
              const fd = new FormData();
              fd.append("file", file);
              fetch("/api/upload", { method: "POST", body: fd })
                .then((r) => r.json())
                .then((data) => {
                  if (data.url && editorRef.current) {
                    editorRef.current.chain().focus().setImage({ src: data.url, alt: "" }).run();
                  }
                });
            }
            return true;
          }
        }
        return false;
      },
    },
    onCreate({ editor: e }) { editorRef.current = e; },
    onUpdate({ editor: e }) { editorRef.current = e; },
    immediatelyRender: false,
  });

  useEffect(() => {
    if (!slug || !editor) return;
    fetch(`/api/posts/${slug}`)
      .then((r) => r.json())
      .then((post: Post) => {
        editor.commands.setContent(post.content);
        setTitle(post.title);
        setTags(post.tags);
        setCategoryId(post.categoryId ?? null);
        setExistingSlug(post.slug);
      });
  }, [slug, editor]);

  const save = async (publish: boolean) => {
    if (!editor) return;
    if (!title.trim()) { setSaveMsg("제목을 입력해주세요."); return; }
    const content = editor.getHTML();
    if (!content || content === "<p></p>") { setSaveMsg("내용을 입력해주세요."); return; }
    setSaving(true);
    setSaveMsg("");
    const body = { title, content, tags, published: publish, categoryId };
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
      if (publish) setTimeout(() => setView({ type: "post", slug: saved.slug }), 600);
    } catch (e: unknown) {
      setSaveMsg(e instanceof Error ? e.message : "저장 실패");
    } finally {
      setSaving(false);
    }
  };

  const insertUrlImage = () => {
    const url = urlValue.trim();
    if (!url || !editor) return;
    editor.chain().focus().setImage({ src: url, alt: "" }).run();
    setShowUrlModal(false);
    setUrlValue("");
  };

  const addTag = () => {
    const t = tagInput.trim().replace(/^#/, "");
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setTagInput("");
  };

  const removeTag = (t: string) => setTags((prev) => prev.filter((x) => x !== t));

  return (
    <div className={styles.editorLayout}>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) uploadAndInsert(file);
          e.target.value = "";
        }}
      />

      {showUrlModal && (
        <div className={styles.imgModalOverlay} onClick={() => setShowUrlModal(false)}>
          <div className={styles.imgModal} onClick={(e) => e.stopPropagation()}>
            <div className={styles.imgModalHeader}>
              <span className={styles.imgModalTitle}>이미지 URL 삽입</span>
              <button className={styles.imgModalClose} onClick={() => setShowUrlModal(false)}>×</button>
            </div>
            <div className={styles.imgModalBody}>
              <input
                className={styles.imgUrlInput}
                placeholder="https://example.com/image.png"
                value={urlValue}
                onChange={(e) => setUrlValue(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") insertUrlImage(); }}
                autoFocus
              />
              <button
                className={styles.btnPrimary}
                onClick={insertUrlImage}
                style={{ width: "100%", marginTop: "0.75rem" }}
              >
                삽입
              </button>
            </div>
          </div>
        </div>
      )}

      <CategoryManager
        open={showCategoryManager}
        onClose={() => setShowCategoryManager(false)}
        onChange={(cats) => {
          setCategories(cats);
          if (categoryId && !cats.some((c) => c.id === categoryId)) setCategoryId(null);
        }}
      />

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
        <div className={styles.editorCategoryRow}>
          <span className={styles.editorCategoryLabel}>카테고리</span>
          <select
            className={styles.editorCategorySelect}
            value={categoryId ?? ""}
            onChange={(e) => setCategoryId(e.target.value || null)}
          >
            <option value="">없음</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <button
            type="button"
            className={styles.editorCategoryManageBtn}
            onClick={() => setShowCategoryManager(true)}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            관리
          </button>
        </div>
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
              if (e.key === "Backspace" && !tagInput && tags.length) setTags((prev) => prev.slice(0, -1));
            }}
          />
        </div>
      </div>

      <div className={styles.editorPane} style={{ flexDirection: "column" }}>
        <div className={styles.editorToolbar}>
          {TOOLBAR.map((item, i) =>
            item.type === "sep" ? (
              <div key={i} className={styles.toolbarSep} />
            ) : (
              <button
                key={item.label}
                title={item.title}
                className={`${styles.toolbarBtn} ${editor && item.isActive?.(editor) ? styles.toolbarBtnActive : ""}`}
                onMouseDown={(e) => { e.preventDefault(); if (editor) item.action(editor); }}
                onMouseEnter={() => setCursor("hover")}
                onMouseLeave={() => setCursor("default")}
              >
                {item.label}
              </button>
            )
          )}
          <div className={styles.toolbarSep} />
          <button
            title="파일에서 이미지 삽입"
            className={styles.toolbarBtn}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => fileInputRef.current?.click()}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            🖼
          </button>
          <button
            title="URL로 이미지 삽입"
            className={styles.toolbarBtn}
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => setShowUrlModal(true)}
            onMouseEnter={() => setCursor("hover")}
            onMouseLeave={() => setCursor("default")}
          >
            🔗
          </button>
        </div>

        <div className={styles.editorContentWrap}>
          <EditorContent editor={editor} className={styles.editorContent} />
        </div>
      </div>
    </div>
  );
}
