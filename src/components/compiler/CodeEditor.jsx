import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

export const CodeEditor = ({ language = "python", code = "", onChange }) => {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    
    // Define Custom Hackermind Theme inside Monaco
    monaco.editor.defineTheme('elite-hackers', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '64748b', fontStyle: 'italic' },
        { token: 'keyword', foreground: '00ff88' },
        { token: 'string', foreground: '00d4ff' },
        { token: 'number', foreground: 'ffd700' },
      ],
      colors: {
        'editor.background': 'var(--bg-primary)',
        'editor.foreground': '#e2e8f0',
        'editor.lineHighlightBackground': 'var(--bg-card)',
        'editorLineNumber.foreground': 'var(--border)',
        'editorLineNumber.activeForeground': '#00ff88',
        'editorIndentGuide.background': 'var(--border)',
        'editorIndentGuide.activeBackground': '#00ff8840',
      }
    });
    
    monaco.editor.setTheme('elite-hackers');
  };

  return (
    <div className="w-full h-full border border-border rounded-xl overflow-hidden bg-bg-primary">
      <Editor
        height="100%"
        language={language}
        value={code}
        theme="elite-hackers"
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          fontFamily: "'JetBrains Mono', monospace",
          lineHeight: 24,
          padding: { top: 16, bottom: 16 },
          scrollBeyondLastLine: false,
          smoothScrolling: true,
          cursorBlinking: 'smooth',
          cursorStyle: 'line',
          renderLineHighlight: 'all',
          matchBrackets: 'always',
          bracketPairColorization: { enabled: true },
        }}
        loading={<div className="font-mono text-primary animate-pulse text-sm p-4">Loading Compiler Core...</div>}
      />
    </div>
  );
};

export default CodeEditor;
