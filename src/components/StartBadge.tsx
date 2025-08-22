import React from "react";
import { MainModel } from "../types";

interface Props {
  model: MainModel;
  onStart: () => void;
  onChangeCandidateID: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeRole: (role: string) => void;
}

const StartBadge: React.FC<Props> = ({
  model,
  onStart,
  onChangeCandidateID,
  onChangeRole,
}) => (
  <div style={{ 
    display: "flex", 
    flexDirection: "column", 
    alignItems: "center", 
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "40px 20px",
    fontFamily: "'Inter', 'Segoe UI', 'Roboto', sans-serif"
  }}>
    {/* Luxury Card Container */}
    <div style={{
      background: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(20px)",
      borderRadius: "24px",
      padding: "50px 40px",
      maxWidth: "600px",
      width: "100%",
      boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      position: "relative",
      overflow: "hidden"
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: "absolute",
        top: "-50%",
        right: "-50%",
        width: "200px",
        height: "200px",
        background: "linear-gradient(45deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1))",
        borderRadius: "50%",
        zIndex: 0
      }} />
      <div style={{
        position: "absolute",
        bottom: "-30%",
        left: "-30%",
        width: "150px",
        height: "150px",
        background: "linear-gradient(45deg, rgba(118, 75, 162, 0.1), rgba(102, 126, 234, 0.1))",
        borderRadius: "50%",
        zIndex: 0
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Logo */}
        <div style={{ 
          display: "flex", 
          justifyContent: "center", 
          marginBottom: "40px" 
        }}>
          <img
            src="https://www.itopplus.com/images/LOGO_ITOPPLUS_GREEN.png"
            style={{ 
              width: "180px",
              maxWidth: "100%",
              height: "auto",
              transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
              filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05) translateY(-2px)";
              e.currentTarget.style.filter = "drop-shadow(0 8px 25px rgba(0, 0, 0, 0.15))";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1) translateY(0)";
              e.currentTarget.style.filter = "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))";
            }}
          />
        </div>
        
        {/* Welcome Text */}
        <div style={{ 
          textAlign: "center", 
          marginBottom: "50px"
        }}>
          <h1 style={{
            fontSize: "32px",
            fontWeight: "700",
            background: "linear-gradient(135deg, #667eea, #764ba2)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            marginBottom: "20px",
            letterSpacing: "-0.5px"
          }}>
            Excellence Awaits
          </h1>
          <p style={{ 
            fontSize: "16px",
            color: "#6b7280",
            lineHeight: "1.7",
            marginBottom: "16px",
            fontWeight: "400"
          }}>
            Welcome to the ITOPPLUS Professional Assessment Platform. 
            Your expertise will be evaluated through our comprehensive examination system.
          </p>
          {/* Important Warning Box */}
          <div style={{
            background: "linear-gradient(135deg, #fef3c7, #fed7aa)",
            border: "2px solid #f59e0b",
            borderRadius: "16px",
            padding: "20px",
            marginTop: "10px",
            position: "relative",
            overflow: "hidden"
          }}>
            <div style={{
              position: "absolute",
              top: "-50%",
              right: "-50%",
              width: "100px",
              height: "100px",
              background: "linear-gradient(45deg, rgba(245, 158, 11, 0.1), rgba(251, 191, 36, 0.1))",
              borderRadius: "50%",
              zIndex: 0
            }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px"
              }}>
                <div style={{
                  fontSize: "24px",
                  animation: "pulse 2s infinite"
                }}>⚠️</div>
                <strong style={{
                  fontSize: "16px",
                  color: "#92400e",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px"
                }}>
                  Critical Notice
                </strong>
              </div>
              <p style={{
                fontSize: "15px",
                color: "#92400e",
                lineHeight: "1.6",
                fontWeight: "600",
                margin: "0"
              }}>
                Please ensure a stable internet connection. 
                <span style={{ 
                  color: "#dc2626", 
                  fontWeight: "700",
                  textDecoration: "underline"
                }}>
                  Refreshing the page will reset your progress
                </span> and you'll need to start over.
              </p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div style={{ 
          display: "flex", 
          flexDirection: "column", 
          gap: "32px"
        }}>
          {/* Name Input */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            gap: "12px"
          }}>
            <label style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              Candidate Name
            </label>
            <input
              style={{ 
                padding: "16px 20px",
                fontSize: "16px",
                border: "2px solid #e5e7eb",
                borderRadius: "12px",
                width: "100%",
                background: "#fafafa",
                transition: "all 0.3s ease",
                outline: "none",
                fontWeight: "500"
              }}
              type="text"
              value={model.candidateID}
              placeholder="Enter your full name"
              onChange={onChangeCandidateID}
              onFocus={(e) => {
                e.target.style.borderColor = "#667eea";
                e.target.style.background = "#ffffff";
                e.target.style.boxShadow = "0 0 0 3px rgba(102, 126, 234, 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "#e5e7eb";
                e.target.style.background = "#fafafa";
                e.target.style.boxShadow = "none";
              }}
            />
          </div>
          
          {/* Role Selection */}
          <div style={{ 
            display: "flex", 
            flexDirection: "column",
            gap: "20px"
          }}>
            <label style={{
              fontSize: "14px",
              fontWeight: "600",
              color: "#374151",
              textTransform: "uppercase",
              letterSpacing: "0.5px",
              textAlign: "center"
            }}>
              Select Your Professional Role
            </label>
            <div style={{ 
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
              gap: "16px"
            }}>
              {["TESTER", "DEVELOPER", "DATA ENGINEER", "PRODUCT OWNER", "SALES MANAGER"].map((role) => (
                <button
                  key={role}
                  onClick={() => onChangeRole(role)}
                  style={{ 
                    padding: "20px 16px",
                    fontSize: "14px",
                    fontWeight: "600",
                    border: `2px solid ${model.selectedRole === role ? "#667eea" : "#e5e7eb"}`,
                    borderRadius: "16px",
                    background: model.selectedRole === role 
                      ? "linear-gradient(135deg, #667eea, #764ba2)" 
                      : "#ffffff",
                    color: model.selectedRole === role ? "#ffffff" : "#6b7280",
                    cursor: "pointer",
                    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                    textTransform: "uppercase",
                    letterSpacing: "0.5px",
                    position: "relative",
                    overflow: "hidden"
                  }}
                  onMouseEnter={(e) => {
                    if (model.selectedRole !== role) {
                      e.currentTarget.style.borderColor = "#667eea";
                      e.currentTarget.style.background = "#f8faff";
                      e.currentTarget.style.transform = "translateY(-2px)";
                      e.currentTarget.style.boxShadow = "0 8px 25px rgba(102, 126, 234, 0.15)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (model.selectedRole !== role) {
                      e.currentTarget.style.borderColor = "#e5e7eb";
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }
                  }}
                >
                  {role}
                </button>
              ))}
            </div>
          </div>
          
          {/* Start Button */}
          <div style={{ 
            display: "flex", 
            justifyContent: "center",
            marginTop: "20px"
          }}>
            <button
              onClick={model.candidateID && model.selectedRole ? onStart : undefined}
              disabled={!model.candidateID || !model.selectedRole}
              style={{ 
                padding: "18px 48px",
                fontSize: "18px",
                fontWeight: "700",
                border: "none",
                borderRadius: "50px",
                background: model.candidateID && model.selectedRole
                  ? "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
                  : "#d1d5db",
                color: "#ffffff",
                cursor: model.candidateID && model.selectedRole ? "pointer" : "not-allowed",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                textTransform: "uppercase",
                letterSpacing: "1px",
                boxShadow: model.candidateID && model.selectedRole
                  ? "0 10px 30px rgba(102, 126, 234, 0.4)"
                  : "none",
                position: "relative",
                overflow: "hidden"
              }}
              onMouseEnter={(e) => {
                if (model.candidateID && model.selectedRole) {
                  e.currentTarget.style.transform = "translateY(-3px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(102, 126, 234, 0.5)";
                }
              }}
              onMouseLeave={(e) => {
                if (model.candidateID && model.selectedRole) {
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "0 10px 30px rgba(102, 126, 234, 0.4)";
                }
              }}
            >
              Begin Assessment →
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default StartBadge;
