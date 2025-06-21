"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { Upload, FileText, X } from "lucide-react"

interface FileUploadStepProps {
  uploadedFiles: File[]
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onFileRemove: (index: number) => void
}

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 },
}

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.4,
}

export default function FileUploadStep({ uploadedFiles, onFileUpload, onFileRemove }: FileUploadStepProps) {
  return (
    <motion.div
      key="step4"
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem" }}>
        <motion.div
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "3rem",
            height: "3rem",
            backgroundColor: "var(--accent)",
            borderRadius: "50%",
            marginBottom: "1rem",
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Upload size={24} color="var(--primary)" />
        </motion.div>
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "700",
            color: "var(--foreground)",
            marginBottom: "0.5rem",
          }}
        >
          Upload your study materials
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "var(--muted-foreground)",
            margin: 0,
          }}
        >
          Add your notes and study materials (optional)
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <motion.div
            style={{
              border: "2px dashed var(--border)",
              borderRadius: "var(--radius)",
              padding: "2rem",
              textAlign: "center",
              backgroundColor: "var(--secondary)",
              marginBottom: "1rem",
              cursor: "pointer",
            }}
            whileHover={{ borderColor: "var(--primary)", backgroundColor: "var(--accent)" }}
            transition={{ duration: 0.2 }}
          >
            <FileText size={32} color="var(--muted-foreground)" style={{ margin: "0 auto 1rem auto" }} />
            <p
              style={{
                fontSize: "1rem",
                color: "var(--muted-foreground)",
                marginBottom: "1rem",
              }}
            >
              Drag and drop files here, or click to browse
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              onChange={onFileUpload}
              style={{
                display: "none",
              }}
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              style={{
                display: "inline-block",
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                padding: "0.75rem 1.5rem",
                borderRadius: "var(--radius)",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "500",
                transition: "all 0.2s ease",
              }}
            >
              Choose Files
            </label>
          </motion.div>
        </motion.div>

        {/* Uploaded Files */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <h3
            style={{
              fontSize: "0.875rem",
              fontWeight: "600",
              color: "var(--foreground)",
              marginBottom: "0.75rem",
            }}
          >
            Uploaded Files ({uploadedFiles.length})
          </h3>
          <div style={{ display: "grid", gap: "0.5rem", maxHeight: "200px", overflowY: "auto" }}>
            <AnimatePresence>
              {uploadedFiles.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.75rem",
                    backgroundColor: "var(--secondary)",
                    borderRadius: "var(--radius)",
                    border: "1px solid var(--border)",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flex: 1, minWidth: 0 }}>
                    <FileText size={16} color="var(--muted-foreground)" />
                    <span
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--foreground)",
                        fontWeight: "500",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {file.name}
                    </span>
                  </div>
                  <motion.button
                    onClick={() => onFileRemove(index)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "#ef4444",
                      cursor: "pointer",
                      padding: "0.25rem",
                      borderRadius: "var(--radius)",
                      fontSize: "0.875rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={14} />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
            {uploadedFiles.length === 0 && (
              <div
                style={{
                  padding: "2rem",
                  textAlign: "center",
                  color: "var(--muted-foreground)",
                  fontSize: "0.875rem",
                }}
              >
                No files uploaded yet
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
