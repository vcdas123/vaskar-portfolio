"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodeBlockProps {
  code: string;
  language?: string;
}

export function CodeBlock({ code, language = "typescript" }: CodeBlockProps) {
  return (
    <div className="my-4 rounded-xl overflow-hidden border border-white/10 [&_pre]:!p-4 [&_pre]:!m-0 [&_pre]:!text-sm [&_pre]:!overflow-x-auto">
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers
        customStyle={{
          background: "#282c34",
          padding: 0,
          margin: 0,
          fontSize: "0.875rem",
        }}
        codeTagProps={{
          style: {
            fontFamily: "var(--font-jetbrainsMono), 'JetBrains Mono', monospace",
          },
        }}
        lineNumberStyle={{
          minWidth: "2.25em",
          paddingRight: "1em",
          color: "#6b7280",
          userSelect: "none",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
