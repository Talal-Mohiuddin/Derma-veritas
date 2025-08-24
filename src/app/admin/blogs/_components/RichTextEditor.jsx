"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link as LinkIcon,
  Code,
  Quote,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function RichTextEditor({
  value,
  onChange,
  className,
  editorRef,
  showAbove = false,
}) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
      }),
      Underline.configure({}),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right"],
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-blue-500 underline cursor-pointer hover:text-blue-700",
          target: "_blank",
          rel: "noopener noreferrer",
        },
      }),
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm max-w-none focus:outline-none min-h-[300px] p-4",
      },
    },
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value);
    }
  }, [editor, value]);

  useEffect(() => {
    if (editor && editorRef) {
      editorRef.current = editor;
    }
    return () => {
      if (editorRef) {
        editorRef.current = null;
      }
    };
  }, [editor, editorRef]);

  if (!editor) {
    return <div className="min-h-[400px] bg-gray-50 rounded animate-pulse"></div>;
  }

  const renderToolbar = () => (
    <div className={`border-${showAbove ? "b" : "t"} bg-gray-50`}>
      <div className={`p-3 flex flex-wrap items-center gap-2`}>
        {/* Heading Selector */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value);
            if (level === 0) {
              editor.chain().focus().setParagraph().run();
            } else {
              editor.chain().focus().toggleHeading({ level }).run();
            }
          }}
          value={
            editor.isActive("heading", { level: 1 }) ? "1" :
            editor.isActive("heading", { level: 2 }) ? "2" :
            editor.isActive("heading", { level: 3 }) ? "3" :
            editor.isActive("heading", { level: 4 }) ? "4" :
            editor.isActive("heading", { level: 5 }) ? "5" :
            editor.isActive("heading", { level: 6 }) ? "6" : "0"
          }
          className="px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
        >
          <option value="0">Paragraph</option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>

        {/* Format Tools */}
        <div className="flex items-center border border-gray-300 rounded-md bg-white">
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none border-r border-gray-200 ${
              editor.isActive("bold") ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBold().run();
            }}
          >
            <Bold className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none border-r border-gray-200 ${
              editor.isActive("italic") ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleItalic().run();
            }}
          >
            <Italic className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none ${
              editor.isActive("underline") ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleUnderline().run();
            }}
          >
            <UnderlineIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Alignment Tools */}
        <div className="flex items-center border border-gray-300 rounded-md bg-white">
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none border-r border-gray-200 ${
              editor.isActive({ textAlign: "left" }) ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign("left").run();
            }}
          >
            <AlignLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none border-r border-gray-200 ${
              editor.isActive({ textAlign: "center" }) ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign("center").run();
            }}
          >
            <AlignCenter className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none ${
              editor.isActive({ textAlign: "right" }) ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().setTextAlign("right").run();
            }}
          >
            <AlignRight className="h-4 w-4" />
          </Button>
        </div>

        {/* List and Special Tools */}
        <div className="flex items-center border border-gray-300 rounded-md bg-white">
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none border-r border-gray-200 ${
              editor.isActive("bulletList") ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBulletList().run();
            }}
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none border-r border-gray-200 ${
              editor.isActive("orderedList") ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleOrderedList().run();
            }}
          >
            <ListOrdered className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none border-r border-gray-200 ${
              editor.isActive("codeBlock") ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleCodeBlock().run();
            }}
          >
            <Code className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className={`h-9 px-3 rounded-none ${
              editor.isActive("blockquote") ? "bg-purple-100 text-purple-700" : "hover:bg-gray-50"
            }`}
            onClick={(e) => {
              e.preventDefault();
              editor.chain().focus().toggleBlockquote().run();
            }}
          >
            <Quote className="h-4 w-4" />
          </Button>
        </div>

        {/* Link Tool */}
        <Button
          variant="ghost"
          size="sm"
          className="h-9 px-3 border border-gray-300 rounded-md bg-white hover:bg-gray-50"
          onClick={(e) => {
            e.preventDefault();
            const url = window.prompt("Enter URL:");
            if (url) {
              editor.chain().focus().setLink({ href: url }).run();
            }
          }}
        >
          <LinkIcon className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  return (
    <div className={`flex flex-col border border-gray-300 rounded-lg overflow-hidden ${className}`}>
      {showAbove && renderToolbar()}

      <div className="flex-grow bg-white">
        <EditorContent
          editor={editor}
          className="w-full h-full min-h-[300px] focus-within:outline-none
            [&_.ProseMirror]:outline-none
            [&_.ProseMirror]:min-h-[300px]
            [&_.ProseMirror]:p-4
            [&_.ProseMirror]:text-gray-900
            [&_.ProseMirror_h1]:text-3xl
            [&_.ProseMirror_h1]:font-bold
            [&_.ProseMirror_h1]:mb-4
            [&_.ProseMirror_h1]:mt-6
            [&_.ProseMirror_h2]:text-2xl
            [&_.ProseMirror_h2]:font-bold
            [&_.ProseMirror_h2]:mb-3
            [&_.ProseMirror_h2]:mt-5
            [&_.ProseMirror_h3]:text-xl
            [&_.ProseMirror_h3]:font-bold
            [&_.ProseMirror_h3]:mb-2
            [&_.ProseMirror_h3]:mt-4
            [&_.ProseMirror_p]:mb-3
            [&_.ProseMirror_ul]:list-disc
            [&_.ProseMirror_ul]:ml-6
            [&_.ProseMirror_ul]:mb-3
            [&_.ProseMirror_ol]:list-decimal
            [&_.ProseMirror_ol]:ml-6
            [&_.ProseMirror_ol]:mb-3
            [&_.ProseMirror_li]:mb-1
            [&_.ProseMirror_blockquote]:border-l-4
            [&_.ProseMirror_blockquote]:border-purple-300
            [&_.ProseMirror_blockquote]:pl-4
            [&_.ProseMirror_blockquote]:italic
            [&_.ProseMirror_blockquote]:text-gray-600
            [&_.ProseMirror_blockquote]:mb-3
            [&_.ProseMirror_pre]:bg-gray-100
            [&_.ProseMirror_pre]:p-3
            [&_.ProseMirror_pre]:rounded
            [&_.ProseMirror_pre]:overflow-x-auto
            [&_.ProseMirror_pre]:mb-3
            [&_.ProseMirror_code]:bg-gray-100
            [&_.ProseMirror_code]:px-1
            [&_.ProseMirror_code]:rounded"
        />
      </div>

      {!showAbove && renderToolbar()}
    </div>
  );
}
