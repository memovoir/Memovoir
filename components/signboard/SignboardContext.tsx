"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef
} from "react";

/* ---------------- TYPES ---------------- */

type Stroke = any;

interface SignboardContextType {
  strokes: Stroke[];
  tool: string;
  color: string;
  setTool: (t: string) => void;
  setColor: (c: string) => void;
  addStroke: (s: Stroke) => void;
  undo: () => void;
  redo: () => void;
  clearBoard: () => void;
  loadStrokes: (wallId: string) => Promise<void>; // ✅ REQUIRED
}

/* ---------------- CONTEXT ---------------- */

const SignboardContext = createContext<SignboardContextType | null>(null);

export function useSignboard() {
  const ctx = useContext(SignboardContext);
  if (!ctx) throw new Error("useSignboard outside provider");
  return ctx;
}

/* ---------------- PROVIDER ---------------- */

export function SignboardProvider({
  children
}: {
  children: ReactNode;
}) {
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");
  const [redoStack, setRedoStack] = useState<Stroke[]>([]);
  const lastClearSnapshot = useRef<any[] | null>(null);
  const clearUndoSnapshot = useRef<any[] | null>(null);

  
  const addStroke = (s: Stroke) => {
    setStrokes((prev) => [...prev, s]);
    setRedoStack([]);
  };

  const undo = () => {
    if (strokes.length === 0 && clearUndoSnapshot.current) {
      setStrokes(clearUndoSnapshot.current);
      clearUndoSnapshot.current = null;
      return;
    }
    if (strokes.length === 0 && lastClearSnapshot.current) {
      setStrokes(lastClearSnapshot.current);
      lastClearSnapshot.current = null;
      return;
    }
    setStrokes((prev) => {
    
      if (!prev.length) return prev;
      const copy = [...prev];
      const last = copy.pop();
      if (last) setRedoStack((r) => [...r, last]);
      return copy;
    });
  };

  const redo = () => {
    setRedoStack((prev) => {
      if (!prev.length) return prev;
      const copy = [...prev];
      const last = copy.pop();
      if (last) setStrokes((s) => [...s, last]);
      return copy;
    });
  };

  const clearBoard = () => {
    // store snapshot ONLY for undo-after-clear
    if (strokes.length > 0) {
      clearUndoSnapshot.current = [...strokes];
    } else {
      clearUndoSnapshot.current = null;
    }
  
    // clear state
    setStrokes([]);
  
    // clear canvas pixels
    const canvas = (window as any).__SIGNBOARD_CANVAS__ as HTMLCanvasElement | undefined;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  };
  
  

  // ✅ THIS WAS MISSING FROM CONTEXT CONTRACT
  const loadStrokes = async (wallId: string) => {
    try {
      const res = await fetch(`/api/signboard/load?wall_id=${wallId}`);
      if (!res.ok) return;
      const data = await res.json();
      if (Array.isArray(data.strokes)) {
        setStrokes(data.strokes);
      }
    } catch (err) {
      console.error("Failed to load signboard:", err);
    }
  };

  return (
    <SignboardContext.Provider
      value={{
        strokes,
        tool,
        color,
        setTool,
        setColor,
        addStroke,
        undo,
        redo,
        clearBoard,
        loadStrokes // ✅ NOW GUARANTEED
      }}
    >
      {children}
    </SignboardContext.Provider>
  );
}
