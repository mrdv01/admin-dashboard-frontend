"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import React, { useEffect } from "react";

// Toolbar buttons for formatting options
const MenuBar = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive("bold")
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        Bold
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive("italic")
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        Italic
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive("underline")
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        Underline
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive("strike")
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        Strike
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive({ textAlign: "left" })
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        Left
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive({ textAlign: "center" })
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        Center
      </button>
      <button
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive({ textAlign: "right" })
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        Right
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive("bulletList")
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        Bullet List
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`px-3 py-1 rounded-md transition-colors ${
          editor.isActive("orderedList")
            ? "bg-gray-200 text-gray-900"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        Ordered List
      </button>
    </div>
  );
};

const TipTapEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph"],
        defaultAlignment: "left",
      }),
    ],
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose lg:prose-lg xl:prose-xl min-h-[200px] focus:outline-none",
      },
    },
    content: "",
  });

  // Set up placeholder behavior
  useEffect(() => {
    if (editor && editor.isEmpty) {
      const placeholder = document.createElement("p");
      placeholder.textContent = "Start writing your blog...";
      placeholder.className =
        "text-gray-400 pointer-events-none absolute top-4 left-4";
      editor.view.dom.parentElement?.appendChild(placeholder);

      const observer = new MutationObserver(() => {
        if (!editor.isEmpty) {
          placeholder.style.display = "none";
        } else {
          placeholder.style.display = "block";
        }
      });

      observer.observe(editor.view.dom, {
        childList: true,
        subtree: true,
        characterData: true,
      });

      return () => {
        observer.disconnect();
        placeholder.remove();
      };
    }
  }, [editor]);

  return (
    <div className="w-full max-w-4xl mx-auto">
      <MenuBar editor={editor} />
      <div className="relative">
        <EditorContent
          editor={editor}
          className="min-h-[300px] border rounded-lg p-4 bg-white shadow-sm"
        />
      </div>
    </div>
  );
};

export default TipTapEditor;
