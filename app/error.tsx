"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("Application error:", error)
  }, [error])

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "20px",
      fontFamily: "system-ui, -apple-system, sans-serif",
      backgroundColor: "#f5f5f5",
    }}>
      <div style={{
        backgroundColor: "white",
        padding: "40px",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        maxWidth: "500px",
        textAlign: "center",
      }}>
        <h1 style={{ color: "#333", marginBottom: "16px" }}>
          Oops! Something went wrong
        </h1>
        <p style={{ color: "#666", marginBottom: "24px" }}>
          An error occurred. The page will try to recover automatically.
        </p>
        {error.message && (
          <details style={{
            textAlign: "left",
            backgroundColor: "#f9f9f9",
            padding: "12px",
            borderRadius: "4px",
            marginBottom: "24px",
            border: "1px solid #ddd",
          }}>
            <summary style={{ cursor: "pointer", fontWeight: "bold" }}>
              Error Details
            </summary>
            <pre style={{
              marginTop: "12px",
              fontSize: "12px",
              overflow: "auto",
              color: "#d32f2f",
            }}>
              {error.message}
            </pre>
          </details>
        )}
        <button
          onClick={() => reset()}
          style={{
            backgroundColor: "#8B4513",
            color: "white",
            border: "none",
            padding: "12px 24px",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#6B340D")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#8B4513")}
        >
          Try Again
        </button>
      </div>
    </div>
  )
}
