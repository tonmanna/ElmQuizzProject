import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

interface Props {
  aiResult: string | null;
  onClose: () => void;
}

const AiResultModal: React.FC<Props> = ({ aiResult, onClose }) => {
  if (!aiResult) return null;

  return (
    <>
      {/* AI Result Modal */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "rgba(0, 0, 0, 0.5)",
          backdropFilter: "blur(5px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
        onClick={onClose}
      >
        <div
          style={{
            background: "#ffffff",
            borderRadius: "16px",
            maxWidth: "900px",
            width: "100%",
            maxHeight: "90vh",
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.25)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "24px 32px",
              borderBottom: "2px solid rgba(16, 185, 129, 0.1)",
              background:
                "linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))",
            }}
          >
            <h2
              style={{
                margin: 0,
                fontSize: "24px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #059669, #10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span>🤖</span> AI Evaluation Result
            </h2>
            <button
              onClick={onClose}
              style={{
                background: "rgba(239, 68, 68, 0.1)",
                border: "none",
                fontSize: "20px",
                cursor: "pointer",
                color: "#dc2626",
                padding: "8px 12px",
                borderRadius: "8px",
                transition: "all 0.2s ease",
                fontWeight: "600",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(239, 68, 68, 0.1)";
              }}
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div
            className="ai-result-content"
            style={{
              padding: "32px",
              overflowY: "auto",
              flex: 1,
            }}
          >
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={{
                h1: ({ children }) => (
                  <h1 className="ai-h1">
                    <span className="ai-heading-icon">📊</span>
                    {children}
                  </h1>
                ),
                h2: ({ children }) => (
                  <h2 className="ai-h2">
                    <span className="ai-heading-icon">📋</span>
                    {children}
                  </h2>
                ),
                h3: ({ children }) => (
                  <h3 className="ai-h3">
                    <span className="ai-heading-icon">▸</span>
                    {children}
                  </h3>
                ),
                strong: ({ children }) => {
                  const text = String(children);
                  // Highlight scores
                  if (text.includes("/5")) {
                    return <strong className="ai-score">{children}</strong>;
                  }
                  // Highlight assessment levels
                  if (
                    text.includes("Score:") ||
                    text.includes("Analysis:") ||
                    text.includes("Caveat:")
                  ) {
                    return <strong className="ai-label">{children}</strong>;
                  }
                  return <strong className="ai-strong">{children}</strong>;
                },
                ul: ({ children }) => <ul className="ai-list">{children}</ul>,
                ol: ({ children }) => <ol className="ai-list-ordered">{children}</ol>,
                li: ({ children }) => (
                  <li className="ai-list-item">
                    <span className="ai-bullet">●</span>
                    <span>{children}</span>
                  </li>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="ai-quote">
                    <span className="ai-quote-icon">💡</span>
                    {children}
                  </blockquote>
                ),
                code: ({ inline, children, ...props }: any) => {
                  return inline ? (
                    <code className="ai-code-inline" {...props}>
                      {children}
                    </code>
                  ) : (
                    <code className="ai-code-block" {...props}>
                      {children}
                    </code>
                  );
                },
                hr: () => <hr className="ai-divider" />,
                table: ({ children }) => (
                  <div className="ai-table-wrapper">
                    <table className="ai-table">{children}</table>
                  </div>
                ),
              }}
            >
              {aiResult}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Enhanced Markdown Styles */}
      <style>
        {`
          .ai-result-content {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.8;
            color: #1f2937;
          }

          /* Headings with Icons */
          .ai-h1 {
            font-size: 32px;
            font-weight: 800;
            background: linear-gradient(135deg, #059669 0%, #10b981 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-top: 40px;
            margin-bottom: 24px;
            padding: 20px;
            border-radius: 12px;
            background-color: rgba(16, 185, 129, 0.05);
            background-image: linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.08) 100%);
            border-left: 5px solid #10b981;
            display: flex;
            align-items: center;
            gap: 12px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);
          }

          .ai-h2 {
            font-size: 24px;
            font-weight: 700;
            color: #047857;
            margin-top: 32px;
            margin-bottom: 16px;
            padding: 16px 20px;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02));
            border-radius: 8px;
            border-left: 4px solid #10b981;
            display: flex;
            align-items: center;
            gap: 10px;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
          }

          .ai-h3 {
            font-size: 19px;
            font-weight: 600;
            color: #065f46;
            margin-top: 24px;
            margin-bottom: 12px;
            padding-left: 12px;
            border-left: 3px solid rgba(16, 185, 129, 0.4);
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .ai-heading-icon {
            font-size: 0.9em;
            opacity: 0.8;
          }

          /* Paragraphs */
          .ai-result-content p {
            margin-bottom: 16px;
            color: #374151;
            font-size: 15px;
            line-height: 1.8;
          }

          /* Score Badges */
          .ai-score {
            background: linear-gradient(135deg, #10b981, #059669);
            color: white;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: 700;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.3);
            display: inline-block;
            margin: 0 4px;
          }

          /* Labels */
          .ai-label {
            color: #059669;
            font-weight: 700;
            font-size: 15px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-right: 8px;
          }

          /* Strong Text */
          .ai-strong {
            font-weight: 700;
            color: #1f2937;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.05));
            padding: 2px 6px;
            border-radius: 4px;
          }

          /* Lists with Custom Bullets */
          .ai-list, .ai-list-ordered {
            margin-bottom: 20px;
            padding-left: 0;
            list-style: none;
          }

          .ai-list-item {
            margin-bottom: 12px;
            color: #4b5563;
            line-height: 1.7;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            padding: 10px 16px;
            border-radius: 8px;
            transition: all 0.2s ease;
          }

          .ai-list-item:hover {
            background: rgba(16, 185, 129, 0.03);
            transform: translateX(4px);
          }

          .ai-bullet {
            color: #10b981;
            font-size: 8px;
            margin-top: 8px;
            flex-shrink: 0;
          }

          /* Blockquotes */
          .ai-quote {
            border-left: 4px solid #10b981;
            padding: 16px 20px;
            margin: 20px 0;
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.02));
            border-radius: 8px;
            font-style: italic;
            color: #047857;
            box-shadow: 0 2px 8px rgba(16, 185, 129, 0.08);
            display: flex;
            gap: 12px;
            align-items: flex-start;
          }

          .ai-quote-icon {
            font-size: 24px;
            flex-shrink: 0;
          }

          /* Code */
          .ai-code-inline {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1));
            padding: 3px 8px;
            border-radius: 6px;
            font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
            font-size: 14px;
            color: #047857;
            border: 1px solid rgba(16, 185, 129, 0.2);
            font-weight: 600;
          }

          .ai-result-content pre {
            background: linear-gradient(135deg, #f9fafb 0%, #f3f4f6 100%);
            border: 2px solid rgba(16, 185, 129, 0.2);
            border-radius: 12px;
            padding: 20px;
            overflow-x: auto;
            margin-bottom: 20px;
            box-shadow: 0 4px 12px rgba(16, 185, 129, 0.08);
            position: relative;
          }

          .ai-result-content pre::before {
            content: "CODE";
            position: absolute;
            top: 8px;
            right: 12px;
            font-size: 10px;
            color: #10b981;
            font-weight: 700;
            letter-spacing: 1px;
          }

          .ai-code-block {
            background: transparent;
            padding: 0;
            color: #1f2937;
            font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.6;
          }

          /* Emphasis */
          .ai-result-content em {
            font-style: italic;
            color: #059669;
            font-weight: 500;
          }

          /* Dividers */
          .ai-divider {
            border: none;
            height: 3px;
            background: linear-gradient(90deg, transparent, #10b981, transparent);
            margin: 40px 0;
            border-radius: 2px;
            opacity: 0.3;
          }

          /* Tables */
          .ai-table-wrapper {
            overflow-x: auto;
            margin-bottom: 24px;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(16, 185, 129, 0.1);
          }

          .ai-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border-radius: 12px;
            overflow: hidden;
          }

          .ai-result-content th,
          .ai-result-content td {
            border: 1px solid rgba(16, 185, 129, 0.2);
            padding: 14px 16px;
            text-align: left;
          }

          .ai-result-content th {
            background: linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(5, 150, 105, 0.1));
            font-weight: 700;
            color: #047857;
            text-transform: uppercase;
            font-size: 13px;
            letter-spacing: 0.5px;
          }

          .ai-result-content tr:hover {
            background: rgba(16, 185, 129, 0.03);
          }

          /* Links */
          .ai-result-content a {
            color: #059669;
            text-decoration: none;
            border-bottom: 2px solid rgba(16, 185, 129, 0.3);
            transition: all 0.3s ease;
            font-weight: 600;
            padding-bottom: 2px;
          }

          .ai-result-content a:hover {
            color: #047857;
            border-bottom-color: #047857;
            background: rgba(16, 185, 129, 0.05);
            padding: 2px 6px;
            border-radius: 4px;
          }

          /* Animations */
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          .ai-result-content > * {
            animation: fadeInUp 0.3s ease-out;
          }
        `}
      </style>
    </>
  );
};

export default AiResultModal;
