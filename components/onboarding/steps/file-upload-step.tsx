"use client";

import type React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, FileText, X, Plus } from "lucide-react";

interface FileUploadStepProps {
  uploadedFiles: File[];
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: (index: number) => void;
}

const pageVariants = {
  initial: { opacity: 0, x: 20 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: -20 },
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.4,
};

export default function FileUploadStep({
  uploadedFiles,
  onFileUpload,
  onFileRemove,
}: FileUploadStepProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) {
      setIsDragOver(true);
    }
  };

  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      // Create a synthetic event that matches the expected structure
      const syntheticEvent = {
        target: {
          files: files,
        },
      } as unknown as React.ChangeEvent<HTMLInputElement>;

      onFileUpload(syntheticEvent);
    }
  };

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

      <div style={{ maxWidth: "600px", margin: "0 auto" }}>
        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          style={{ marginBottom: "2rem" }}
        >
          <motion.div
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            style={{
              border: isDragOver
                ? "2px dashed var(--primary)"
                : "2px dashed var(--border)",
              borderRadius: "var(--radius)",
              padding: "3rem 2rem",
              textAlign: "center",
              backgroundColor: isDragOver ? "var(--accent)" : "var(--card)",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            whileHover={
              !isDragOver
                ? {
                    borderColor: "var(--primary)",
                    backgroundColor: "var(--accent)",
                    scale: 1.02,
                  }
                : {}
            }
            whileTap={{ scale: 0.98 }}
            animate={{
              scale: isDragOver ? 1.02 : 1,
              borderColor: isDragOver ? "var(--primary)" : undefined,
              backgroundColor: isDragOver ? "var(--accent)" : undefined,
            }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div style={{ marginBottom: "1.5rem" }}>
              <Upload
                size={48}
                color="var(--primary)"
                style={{
                  margin: "0 auto",
                  transform: isDragOver ? "scale(1.1)" : "scale(1)",
                  transition: "transform 0.2s ease",
                }}
              />
            </div>
            <h3
              style={{
                fontSize: "1.125rem",
                fontWeight: "600",
                color: "var(--foreground)",
                marginBottom: "0.5rem",
              }}
            >
              {isDragOver ? "Yay!" : "Drop your files here"}
            </h3>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--muted-foreground)",
                marginBottom: "1.5rem",
                lineHeight: "1.5",
              }}
            >
              Drag and drop your study materials, or click to browse
              <br />
              <span style={{ fontSize: "0.75rem" }}>
                Supports PDF, DOC, DOCX, TXT, PNG, JPG files
              </span>
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              onChange={onFileUpload}
              style={{ display: "none" }}
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                backgroundColor: "var(--primary)",
                color: "var(--primary-foreground)",
                padding: "0.75rem 1.5rem",
                borderRadius: "var(--radius)",
                cursor: "pointer",
                fontSize: "0.875rem",
                fontWeight: "600",
                border: "none",
                transition: "all 0.2s ease",
              }}
            >
              <Plus size={16} />
              Choose Files
            </label>
          </motion.div>
        </motion.div>

        {/* Uploaded Files Section */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "1rem",
              }}
            >
              <h3
                style={{
                  fontSize: "1rem",
                  fontWeight: "600",
                  color: "var(--foreground)",
                  margin: 0,
                }}
              >
                Uploaded Files
              </h3>
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "var(--muted-foreground)",
                  backgroundColor: "var(--secondary)",
                  padding: "0.25rem 0.75rem",
                  borderRadius: "1rem",
                  fontWeight: "500",
                }}
              >
                {uploadedFiles.length} file
                {uploadedFiles.length !== 1 ? "s" : ""}
              </span>
            </div>

            <div
              style={{
                display: "grid",
                gap: "0.75rem",
                maxHeight: "300px",
                overflowY: "auto",
                padding: "0.5rem",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius)",
                backgroundColor: "var(--card)",
              }}
            >
              <AnimatePresence>
                {uploadedFiles.map((file, index) => (
                  <motion.div
                    key={`${file.name}-${index}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "1rem",
                      backgroundColor: "var(--secondary)",
                      borderRadius: "var(--radius)",
                      border: "1px solid var(--border)",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                        flex: 1,
                        minWidth: 0,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "2rem",
                          height: "2rem",
                          backgroundColor: "var(--primary)",
                          borderRadius: "0.375rem",
                          flexShrink: 0,
                        }}
                      >
                        <FileText size={16} color="var(--primary-foreground)" />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div
                          style={{
                            fontSize: "0.875rem",
                            color: "var(--foreground)",
                            fontWeight: "500",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            marginBottom: "0.25rem",
                          }}
                        >
                          {file.name}
                        </div>
                        <div
                          style={{
                            fontSize: "0.75rem",
                            color: "var(--muted-foreground)",
                          }}
                        >
                          {(file.size / 1024).toFixed(1)} KB
                        </div>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => onFileRemove(index)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "2rem",
                        height: "2rem",
                        backgroundColor: "transparent",
                        border: "1px solid var(--border)",
                        borderRadius: "0.375rem",
                        color: "var(--muted-foreground)",
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                        flexShrink: 0,
                      }}
                      whileHover={{
                        backgroundColor: "#ef4444",
                        borderColor: "#ef4444",
                        color: "#ffffff",
                        scale: 1.05,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <X size={14} />
                    </motion.button>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {uploadedFiles.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            style={{
              textAlign: "center",
              padding: "2rem",
              color: "var(--muted-foreground)",
              fontSize: "0.875rem",
              backgroundColor: "var(--secondary)",
              borderRadius: "var(--radius)",
              border: "1px solid var(--border)",
            }}
          >
            No files uploaded yet. Your study materials will appear here once
            uploaded.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
