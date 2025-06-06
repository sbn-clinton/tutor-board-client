"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Upload, X, FileText, File } from "lucide-react"
import { useToast } from "../ui/use-toast"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploaderProps {
  onFilesSelected: (files: File[]) => void
  maxFiles?: number
  acceptedFileTypes?: string[]
  maxFileSizeMB?: number
  label?: string
  description?: string
}

export function FileUploader({
  onFilesSelected,
  maxFiles = 1,
  acceptedFileTypes = [],
  maxFileSizeMB = 10,
  label = "Upload Files",
  description,
}: FileUploaderProps) {
  const { toast } = useToast()
  const [files, setFiles] = useState<File[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      validateAndAddFiles(Array.from(e.target.files))
    }
  }

  const validateAndAddFiles = (newFiles: File[]) => {
    // Check if adding these files would exceed the max files limit
    if (files.length + newFiles.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload a maximum of ${maxFiles} file${maxFiles !== 1 ? "s" : ""}.`,
        variant: "destructive",
      })
      return
    }

    const validFiles = newFiles.filter((file) => {
      // Check file type
      if (acceptedFileTypes.length > 0 && !acceptedFileTypes.includes(file.type)) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not a supported file type.`,
          variant: "destructive",
        })
        return false
      }

      // Check file size
      if (file.size > maxFileSizeMB * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the maximum file size of ${maxFileSizeMB}MB.`,
          variant: "destructive",
        })
        return false
      }

      return true
    })

    if (validFiles.length > 0) {
      setIsUploading(true)

      // Simulate upload process
      setTimeout(() => {
        const updatedFiles = [...files, ...validFiles]
        setFiles(updatedFiles)
        onFilesSelected(updatedFiles)
        setIsUploading(false)

        toast({
          title: "Files uploaded successfully",
          description: `${validFiles.length} file${validFiles.length !== 1 ? "s" : ""} uploaded.`,
        })
      }, 1500)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files) {
      validateAndAddFiles(Array.from(e.dataTransfer.files))
    }
  }

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index)
    setFiles(updatedFiles)
    onFilesSelected(updatedFiles)
  }

  const triggerFileInput = () => {
    inputRef.current?.click()
  }

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") {
      return <FileText className="h-5 w-5 text-red-500" />
    }
    if (file.type.includes("word") || file.type.includes("document")) {
      return <FileText className="h-5 w-5 text-blue-500" />
    }
    return <File className="h-5 w-5 text-gray-500" />
  }

  return (
    <div className="space-y-4">
      <div
        className={`relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 transition-all cursor-pointer hover:bg-lime/5 ${
          isDragging
            ? "border-medium-green bg-lime/10 scale-105"
            : "border-medium-green/25 hover:border-medium-green/50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
      >
        <Input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          multiple={maxFiles > 1}
          accept={acceptedFileTypes.join(",")}
        />

        {isUploading ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-medium-green border-t-transparent"></div>
            <p className="text-sm text-forest-green dark:text-lime/80">Uploading...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-2 text-center">
            <div className="rounded-full bg-lime/20 p-3">
              <Upload className="h-6 w-6 text-medium-green dark:text-lime" />
            </div>
            <h3 className="text-sm font-medium text-dark-green dark:text-off-white">{label}</h3>
            <p className="text-xs text-forest-green dark:text-lime/80">
              Click here to select file{maxFiles !== 1 ? "s" : ""} or drag and drop
            </p>
            {description && <p className="text-xs text-forest-green dark:text-lime/80">{description}</p>}
            {acceptedFileTypes.length > 0 && (
              <p className="text-xs text-forest-green dark:text-lime/80">
                Accepted:{" "}
                {acceptedFileTypes
                  .map((type) => {
                    if (type === "application/pdf") return "PDF"
                    if (type.includes("word") || type.includes("document")) return "DOCX"
                    return type.split("/")[1]?.toUpperCase()
                  })
                  .join(", ")}
              </p>
            )}
            <p className="text-xs text-forest-green dark:text-lime/80">Max size: {maxFileSizeMB}MB</p>
            {maxFiles > 1 && <p className="text-xs text-forest-green dark:text-lime/80">Max files: {maxFiles}</p>}
          </div>
        )}
      </div>

      {/* File List */}
      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            {files.map((file, index) => (
              <motion.div
                key={`${file.name}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -10 }}
                className="flex items-center justify-between rounded-lg border border-medium-green/20 bg-off-white p-3 dark:bg-forest-green/20"
              >
                <div className="flex items-center space-x-3">
                  {getFileIcon(file)}
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-dark-green dark:text-off-white truncate max-w-[200px]">
                      {file.name}
                    </span>
                    <span className="text-xs text-forest-green dark:text-lime/80">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </span>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    removeFile(index)
                  }}
                  className="h-8 w-8 text-red-500 hover:text-red-700"
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
