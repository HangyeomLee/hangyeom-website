"use client";

import { useEffect, useState } from "react";
import styles from "../app.module.css";

export type Category = { id: string; name: string; slug: string; color: string };

type Props = {
  open: boolean;
  onClose: () => void;
  onChange?: (categories: Category[]) => void;
};

const COLOR_PRESETS = ["#7C3AED", "#0891B2", "#16A34A", "#D97706", "#DC2626", "#DB2777"];

export function CategoryManager({ open, onClose, onChange }: Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [color, setColor] = useState(COLOR_PRESETS[0]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editColor, setEditColor] = useState(COLOR_PRESETS[0]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = () => {
    setLoading(true);
    fetch("/api/categories")
      .then((r) => r.json())
      .then((data: Category[]) => { setCategories(data); onChange?.(data); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { if (open) load(); }, [open]);

  if (!open) return null;

  const create = async () => {
    if (!name.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, color }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "생성 실패");
      setName("");
      setColor(COLOR_PRESETS[0]);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "생성 실패");
    } finally {
      setBusy(false);
    }
  };

  const startEdit = (c: Category) => {
    setEditingId(c.id);
    setEditName(c.name);
    setEditColor(c.color);
    setError("");
  };

  const saveEdit = async (id: string) => {
    if (!editName.trim() || busy) return;
    setBusy(true);
    setError("");
    try {
      const res = await fetch(`/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: editName, color: editColor }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "수정 실패");
      setEditingId(null);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "수정 실패");
    } finally {
      setBusy(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("이 카테고리를 삭제하시겠습니까? 연결된 글은 카테고리가 해제됩니다.")) return;
    setBusy(true);
    try {
      await fetch(`/api/categories/${id}`, { method: "DELETE" });
      if (editingId === id) setEditingId(null);
      load();
    } finally {
      setBusy(false);
    }
  };

  const ColorPicker = ({ value, onPick }: { value: string; onPick: (c: string) => void }) => (
    <div className={styles.categoryColorPicker}>
      {COLOR_PRESETS.map((c) => (
        <button
          key={c}
          type="button"
          className={styles.categoryColorSwatch}
          style={{ background: c, outline: value === c ? "2px solid var(--text-strong)" : "none", outlineOffset: 2 }}
          onClick={() => onPick(c)}
          aria-label={c}
        />
      ))}
    </div>
  );

  return (
    <div className={styles.imgModalOverlay} onClick={onClose}>
      <div className={styles.imgModal} style={{ width: 480 }} onClick={(e) => e.stopPropagation()}>
        <div className={styles.imgModalHeader}>
          <span className={styles.imgModalTitle}>카테고리 관리</span>
          <button className={styles.imgModalClose} onClick={onClose}>×</button>
        </div>
        <div className={styles.imgModalBody}>
          <div className={styles.categoryAddRow}>
            <ColorPicker value={color} onPick={setColor} />
            <input
              className={styles.imgUrlInput}
              placeholder="새 카테고리 이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") create(); }}
            />
            <button
              className={styles.btnPrimary}
              onClick={create}
              disabled={busy || !name.trim()}
              style={{ minHeight: 36, padding: "0 1rem", flexShrink: 0 }}
            >
              추가
            </button>
          </div>
          {error && <p className={styles.imgModalError}>{error}</p>}

          {loading ? (
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "1.25rem" }}>Loading…</p>
          ) : categories.length === 0 ? (
            <p style={{ color: "var(--muted)", fontSize: "0.85rem", marginTop: "1.25rem" }}>카테고리가 없습니다. 위에서 추가해보세요.</p>
          ) : (
            <ul className={styles.categoryList}>
              {categories.map((c) => (
                <li key={c.id} className={styles.categoryListItem}>
                  {editingId === c.id ? (
                    <>
                      <ColorPicker value={editColor} onPick={setEditColor} />
                      <input
                        className={styles.imgUrlInput}
                        value={editName}
                        onChange={(e) => setEditName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(c.id);
                          if (e.key === "Escape") setEditingId(null);
                        }}
                        autoFocus
                      />
                      <button
                        className={styles.categoryListAction}
                        onClick={() => saveEdit(c.id)}
                        disabled={busy}
                      >
                        저장
                      </button>
                      <button
                        className={styles.categoryListAction}
                        onClick={() => setEditingId(null)}
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <span className={styles.categoryDot} style={{ background: c.color }} />
                      <span className={styles.categoryListName}>{c.name}</span>
                      <button
                        className={styles.categoryListAction}
                        onClick={() => startEdit(c)}
                      >
                        수정
                      </button>
                      <button
                        className={`${styles.categoryListAction} ${styles.categoryListActionDanger}`}
                        onClick={() => remove(c.id)}
                      >
                        삭제
                      </button>
                    </>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
