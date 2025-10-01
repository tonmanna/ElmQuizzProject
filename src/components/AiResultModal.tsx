import React from "react";
import ReactMarkdown from "react-markdown";

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
            <ReactMarkdown>{aiResult}</ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Markdown Styles */}
      <style>
        {`
          .ai-result-content {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
            line-height: 1.7;
            color: #1f2937;
          }

          .ai-result-content h1 {
            font-size: 28px;
            font-weight: 700;
            color: #059669;
            margin-top: 32px;
            margin-bottom: 16px;
            padding-bottom: 12px;
            border-bottom: 3px solid rgba(16, 185, 129, 0.2);
          }

          .ai-result-content h2 {
            font-size: 22px;
            font-weight: 700;
            color: #047857;
            margin-top: 28px;
            margin-bottom: 14px;
            padding-bottom: 8px;
            border-bottom: 2px solid rgba(16, 185, 129, 0.15);
          }

          .ai-result-content h3 {
            font-size: 18px;
            font-weight: 600;
            color: #065f46;
            margin-top: 24px;
            margin-bottom: 12px;
          }

          .ai-result-content p {
            margin-bottom: 16px;
            color: #374151;
            font-size: 15px;
          }

          .ai-result-content ul, .ai-result-content ol {
            margin-bottom: 16px;
            padding-left: 24px;
          }

          .ai-result-content li {
            margin-bottom: 8px;
            color: #4b5563;
            line-height: 1.6;
          }

          .ai-result-content strong {
            font-weight: 600;
            color: #1f2937;
          }

          .ai-result-content em {
            font-style: italic;
            color: #6b7280;
          }

          .ai-result-content code {
            background: rgba(16, 185, 129, 0.1);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            color: #047857;
          }

          .ai-result-content pre {
            background: #f9fafb;
            border: 1px solid rgba(16, 185, 129, 0.2);
            border-radius: 8px;
            padding: 16px;
            overflow-x: auto;
            margin-bottom: 16px;
          }

          .ai-result-content pre code {
            background: transparent;
            padding: 0;
            color: #1f2937;
          }

          .ai-result-content blockquote {
            border-left: 4px solid #10b981;
            padding-left: 16px;
            margin: 16px 0;
            color: #6b7280;
            font-style: italic;
          }

          .ai-result-content hr {
            border: none;
            border-top: 2px solid rgba(16, 185, 129, 0.2);
            margin: 32px 0;
          }

          .ai-result-content table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 16px;
          }

          .ai-result-content th,
          .ai-result-content td {
            border: 1px solid rgba(16, 185, 129, 0.2);
            padding: 10px 12px;
            text-align: left;
          }

          .ai-result-content th {
            background: rgba(16, 185, 129, 0.1);
            font-weight: 600;
            color: #047857;
          }

          .ai-result-content a {
            color: #059669;
            text-decoration: none;
            border-bottom: 1px solid rgba(16, 185, 129, 0.3);
            transition: all 0.2s ease;
          }

          .ai-result-content a:hover {
            color: #047857;
            border-bottom-color: #047857;
          }
        `}
      </style>
    </>
  );
};

export default AiResultModal;
