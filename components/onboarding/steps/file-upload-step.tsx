"use client";

import type React from "react";
import { useState } from "react";
import { Upload, FileText, X, Plus } from "lucide-react";

interface FileUploadStepProps {
  uploadedFiles: File[];
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileRemove: (index: number) => void;
}

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
    <div key="step4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-accent rounded-full mb-4">
          <Upload size={24} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Upload your study materials
        </h2>
        <p className="text-muted-foreground">
          Add your notes and study materials (optional)
        </p>
      </div>

      <div className="max-w-xl mx-auto">
        <div className="mb-8">
          <div
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`border-2 dashed rounded-lg p-12 text-center cursor-pointer transition-all duration-200 ease-in-out
              ${isDragOver ? "border-primary bg-accent scale-105" : "border-border bg-card hover:border-primary/50 hover:bg-accent"}`}
          >
            <div className={`mb-6 transition-transform duration-200 ease-in-out ${isDragOver ? "scale-110" : ""}`}>
              <Upload
                size={48}
                className="text-primary mx-auto"
              />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              {isDragOver ? "Yay!" : "Drop your files here"}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Drag and drop your study materials, or click to browse
              <br />
              <span className="text-xs">
                Supports PDF, DOC, DOCX, TXT, PNG, JPG files
              </span>
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
              onChange={onFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg cursor-pointer text-sm font-semibold transition-all duration-200 hover:bg-primary/90"
            >
              <Plus size={16} />
              Choose Files
            </label>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-foreground">
                Uploaded Files ({uploadedFiles.length})
              </h3>
            </div>
            <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
              {uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-card border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText size={20} className="text-primary" />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground truncate max-w-xs">
                        {file.name}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {(file.size / 1024).toFixed(1)} KB
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onFileRemove(index)}
                    className="p-1.5 rounded-full text-muted-foreground hover:bg-accent hover:text-destructive transition-all duration-200 hover:scale-110 active:scale-95"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
