import React, { useState } from "react";
import { QuizResultData } from "../types";
import AiResultModal from "./AiResultModal";

interface Props {
  password: string;
  quizList: QuizResultData[];
  onChangePassword: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onGetQuizList: () => void;
  onGetQuizResult: (quizId: string) => () => void;
  onDeleteQuizResult: (quizId: string) => () => void;
}

const BottomBadges: React.FC<Props> = ({
  password,
  quizList,
  onChangePassword,
  onGetQuizList,
  onGetQuizResult,
  onDeleteQuizResult,
}) => {
  const [showResources, setShowResources] = useState(false);
  const [showStaff, setShowStaff] = useState(false);
  const [selectedAiResult, setSelectedAiResult] = useState<string | null>(null);

  const resourcesData = [
    {
      title: "Exam Basic JS (Junior Developer)",
      description: "https://github.com/iTopPlus/ExamJSTDD",
      icon: "💻",
      link: "https://github.com/iTopPlus/ExamJSTDD",
    },
    {
      title: "Extraction Site for Firebase",
      description: "https://firebase-json-export-prod.lovable.app/",
      icon: "💻",
      link: "https://firebase-json-export-prod.lovable.app/",
    },
    {
      title: "Exam Basic TDD (Junior Developer)",
      description: "https://github.com/tonmanna/TDDLab1",
      icon: "🧪",
      link: "https://github.com/tonmanna/TDDLab1",
    },
    {
      title: "ClosePackage Lab (Resource for Data Sci)",
      description: "Excel Test Exam I(Close Job)",
      icon: "📊",
      link: "./",
    },
    {
      title: "Test Website Lab (Resource for Data Sci)",
      description: "Excel Test Exam II (Test_Website Job)",
      icon: "🌐",
      link: "./",
    },
  ];

  return (
    <>
      {/* Bottom Badge Section */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: "flex",
          gap: "12px",
          zIndex: 1000,
        }}
      >
        {/* Resources Badge */}
        <button
          onClick={() => {
            setShowResources(!showResources);
            setShowStaff(false);
          }}
          style={{
            padding: "12px 20px",
            background: showResources
              ? "linear-gradient(135deg, #667eea, #764ba2)"
              : "rgba(255, 255, 255, 0.9)",
            color: showResources ? "#ffffff" : "#667eea",
            border: `2px solid ${
              showResources ? "#667eea" : "rgba(102, 126, 234, 0.3)"
            }`,
            borderRadius: "25px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
          }}
        >
          📚 Resources
        </button>

        {/* Staff Badge */}
        <button
          onClick={() => {
            setShowStaff(!showStaff);
            setShowResources(false);
          }}
          style={{
            padding: "12px 20px",
            background: showStaff
              ? "linear-gradient(135deg, #667eea, #764ba2)"
              : "rgba(255, 255, 255, 0.9)",
            color: showStaff ? "#ffffff" : "#667eea",
            border: `2px solid ${
              showStaff ? "#667eea" : "rgba(102, 126, 234, 0.3)"
            }`,
            borderRadius: "25px",
            fontSize: "14px",
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 12px 35px rgba(0, 0, 0, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
          }}
        >
          👥 Staff
        </button>
      </div>

      {/* Resources Modal */}
      {showResources && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "400px",
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "calc(100vh - 120px)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            padding: "0",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            zIndex: 999,
            animation: "slideUp 0.3s ease-out",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px 16px",
              borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              📚 Learning Resources
            </h3>
            <button
              onClick={() => setShowResources(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#9ca3af",
                padding: "4px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Content Area */}
          <div
            style={{
              padding: "0",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {/* Resource Items */}
            <div style={{ padding: "16px 24px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {resourcesData.map((resource, index) => (
                  <a
                    key={index}
                    href={resource.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      padding: "16px",
                      background: "rgba(102, 126, 234, 0.05)",
                      borderRadius: "12px",
                      border: "1px solid rgba(102, 126, 234, 0.1)",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      textDecoration: "none",
                      color: "inherit",
                      display: "block",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(102, 126, 234, 0.1)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(102, 126, 234, 0.05)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        marginBottom: "8px",
                      }}
                    >
                      <span style={{ fontSize: "20px" }}>{resource.icon}</span>
                      <h4
                        style={{
                          margin: 0,
                          fontSize: "14px",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        {resource.title}
                      </h4>
                    </div>
                    <p
                      style={{
                        margin: 0,
                        fontSize: "12px",
                        color: "#667eea",
                        lineHeight: "1.4",
                        fontWeight: "500",
                      }}
                    >
                      {resource.description}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Resource Section - Integrated */}
            <div
              style={{
                borderTop: "1px solid rgba(102, 126, 234, 0.1)",
                background: "rgba(102, 126, 234, 0.02)",
              }}
            >
              <div style={{ padding: "20px 24px" }}>
                <h4
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  🎯 Quick Actions
                </h4>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <button
                    style={{
                      padding: "12px 16px",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(102, 126, 234, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    📖 Access Documentation
                  </button>
                  <button
                    style={{
                      padding: "12px 16px",
                      background: "rgba(102, 126, 234, 0.1)",
                      color: "#667eea",
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(102, 126, 234, 0.15)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(102, 126, 234, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    💬 Get Support
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff Modal */}
      {showStaff && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "400px",
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "calc(100vh - 120px)",
            background: "rgba(255, 255, 255, 0.95)",
            backdropFilter: "blur(20px)",
            borderRadius: "16px",
            padding: "0",
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
            border: "1px solid rgba(255, 255, 255, 0.3)",
            zIndex: 999,
            animation: "slideUp 0.3s ease-out",
            overflow: "hidden",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 24px 16px",
              borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "700",
                background: "linear-gradient(135deg, #667eea, #764ba2)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              👥 Our Team
            </h3>
            <button
              onClick={() => setShowStaff(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: "18px",
                cursor: "pointer",
                color: "#9ca3af",
                padding: "4px",
              }}
            >
              ✕
            </button>
          </div>

          {/* Content Area */}
          <div
            style={{
              padding: "0",
              maxHeight: "400px",
              overflowY: "auto",
            }}
          >
            {/* Admin Access Section */}
            <div style={{ padding: "16px 24px" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                  background: "rgba(102, 126, 234, 0.05)",
                  borderRadius: "12px",
                  padding: "16px",
                  border: "1px solid rgba(102, 126, 234, 0.1)",
                }}
              >
                <h4
                  style={{
                    margin: 0,
                    fontSize: "14px",
                    fontWeight: "600",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  🔐 Staff Access Portal
                </h4>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <label
                      style={{
                        fontSize: "12px",
                        fontWeight: "500",
                        color: "#6b7280",
                        minWidth: "70px",
                      }}
                    >
                      Token ID:
                    </label>
                    <input
                      type="password"
                      value={password}
                      onChange={onChangePassword}
                      placeholder="Enter admin token"
                      style={{
                        flex: 1,
                        padding: "8px 12px",
                        fontSize: "12px",
                        border: "1px solid rgba(102, 126, 234, 0.2)",
                        borderRadius: "6px",
                        background: "#ffffff",
                        outline: "none",
                      }}
                    />
                  </div>

                  <button
                    onClick={onGetQuizList}
                    style={{
                      padding: "10px 16px",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(102, 126, 234, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    Get Candidate List »
                  </button>
                </div>
              </div>

              {/* Quiz Results Table */}
              {quizList.length > 0 && (
                <div style={{ marginTop: "16px" }}>
                  <div
                    style={{
                      background: "rgba(102, 126, 234, 0.02)",
                      borderRadius: "12px",
                      border: "1px solid rgba(102, 126, 234, 0.1)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        padding: "12px 16px",
                        background: "rgba(102, 126, 234, 0.1)",
                        borderBottom: "1px solid rgba(102, 126, 234, 0.1)",
                      }}
                    >
                      <h5
                        style={{
                          margin: 0,
                          fontSize: "13px",
                          fontWeight: "600",
                          color: "#374151",
                        }}
                      >
                        📊 Candidate Results
                      </h5>
                    </div>
                    <div style={{ padding: "8px" }}>
                      {quizList.map((quiz) => (
                        <div
                          key={quiz.id}
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            padding: "8px 12px",
                            background: "#ffffff",
                            borderRadius: "6px",
                            marginBottom: "6px",
                            border: "1px solid rgba(102, 126, 234, 0.1)",
                          }}
                        >
                          <div style={{ marginBottom: "8px" }}>
                            <div
                              style={{
                                fontSize: "12px",
                                fontWeight: "500",
                                color: "#374151",
                                marginBottom: "4px",
                              }}
                            >
                              ID: {quiz.body.candidateID}
                            </div>
                            <div
                              style={{
                                fontSize: "10px",
                                color: "#6b7280",
                              }}
                            >
                              Submit Date: {quiz.body.submitDate || "N/A"}
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                            <button
                              onClick={onGetQuizResult(quiz.id)}
                              style={{
                                padding: "4px 12px",
                                background: "rgba(102, 126, 234, 0.1)",
                                color: "#667eea",
                                border: "1px solid rgba(102, 126, 234, 0.2)",
                                borderRadius: "4px",
                                fontSize: "11px",
                                fontWeight: "500",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                flex: 1,
                                minWidth: "80px",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(102, 126, 234, 0.15)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(102, 126, 234, 0.1)";
                              }}
                            >
                              See result »
                            </button>
                            {quiz.body.aiResult?.output && (
                              <button
                                onClick={() => setSelectedAiResult(quiz.body.aiResult?.output || null)}
                                style={{
                                  padding: "4px 12px",
                                  background: "rgba(16, 185, 129, 0.1)",
                                  color: "#059669",
                                  border: "1px solid rgba(16, 185, 129, 0.2)",
                                  borderRadius: "4px",
                                  fontSize: "11px",
                                  fontWeight: "500",
                                  cursor: "pointer",
                                  transition: "all 0.2s ease",
                                  flex: 1,
                                  minWidth: "80px",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(16, 185, 129, 0.15)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background =
                                    "rgba(16, 185, 129, 0.1)";
                                }}
                              >
                                AI Result
                              </button>
                            )}
                            <button
                              onClick={onDeleteQuizResult(quiz.id)}
                              style={{
                                padding: "4px 12px",
                                background: "rgba(239, 68, 68, 0.1)",
                                color: "#dc2626",
                                border: "1px solid rgba(239, 68, 68, 0.2)",
                                borderRadius: "4px",
                                fontSize: "11px",
                                fontWeight: "500",
                                cursor: "pointer",
                                transition: "all 0.2s ease",
                                flex: 1,
                                minWidth: "60px",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(239, 68, 68, 0.15)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  "rgba(239, 68, 68, 0.1)";
                              }}
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Staff Section - Integrated */}
            <div
              style={{
                borderTop: "1px solid rgba(102, 126, 234, 0.1)",
                background: "rgba(102, 126, 234, 0.02)",
              }}
            >
              <div style={{ padding: "20px 24px" }}>
                <h4
                  style={{
                    margin: "0 0 16px 0",
                    fontSize: "16px",
                    fontWeight: "600",
                    color: "#374151",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  🏢 Department Overview
                </h4>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                    marginBottom: "16px",
                  }}
                >
                  <div
                    style={{
                      padding: "12px",
                      background: "rgba(102, 126, 234, 0.05)",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                      💻
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#374151",
                      }}
                    >
                      Engineering
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280" }}>
                      2 Members
                    </div>
                  </div>
                  <div
                    style={{
                      padding: "12px",
                      background: "rgba(102, 126, 234, 0.05)",
                      borderRadius: "8px",
                      textAlign: "center",
                    }}
                  >
                    <div style={{ fontSize: "20px", marginBottom: "4px" }}>
                      🔍
                    </div>
                    <div
                      style={{
                        fontSize: "12px",
                        fontWeight: "600",
                        color: "#374151",
                      }}
                    >
                      QA & Analytics
                    </div>
                    <div style={{ fontSize: "11px", color: "#6b7280" }}>
                      2 Members
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                  }}
                >
                  <button
                    style={{
                      padding: "12px 16px",
                      background: "linear-gradient(135deg, #667eea, #764ba2)",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)";
                      e.currentTarget.style.boxShadow =
                        "0 4px 15px rgba(102, 126, 234, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    📧 Contact Team
                  </button>
                  <button
                    style={{
                      padding: "12px 16px",
                      background: "rgba(102, 126, 234, 0.1)",
                      color: "#667eea",
                      border: "1px solid rgba(102, 126, 234, 0.2)",
                      borderRadius: "8px",
                      fontSize: "14px",
                      fontWeight: "500",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background =
                        "rgba(102, 126, 234, 0.15)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background =
                        "rgba(102, 126, 234, 0.1)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    🗓️ Schedule Meeting
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AI Result Modal */}
      <AiResultModal
        aiResult={selectedAiResult}
        onClose={() => setSelectedAiResult(null)}
      />

      {/* Add CSS Animation */}
      <style>
        {`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
};

export default BottomBadges;
