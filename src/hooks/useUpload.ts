import { useState } from "react";
import { auth } from "@/lib/firebase";

// File validation constants
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB (reduced for base64 storage)
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/gif"];

// Convert file to base64 data URL
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);

  const validateFile = (file: File): { valid: boolean; error?: string } => {
    // Check file type
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return {
        valid: false,
        error: `Invalid file type. Allowed types: ${ALLOWED_IMAGE_TYPES.join(", ")}`,
      };
    }

    // Check file size (reduced for base64 storage)
    if (file.size > MAX_FILE_SIZE) {
      return {
        valid: false,
        error: `File size exceeds ${MAX_FILE_SIZE / 1024 / 1024}MB limit`,
      };
    }

    return { valid: true };
  };

  const uploadImage = async (file: File, folder: string = "general"): Promise<string | null> => {
    try {
      setUploading(true);

      // Validate file
      const validation = validateFile(file);
      if (!validation.valid) {
        throw new Error(validation.error || "File validation failed");
      }

      // Ensure user is authenticated
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User must be authenticated to upload images");
      }

      // Convert file to base64 data URL
      const base64DataUrl = await fileToBase64(file);

      // Return base64 data URL (stored directly in Firestore)
      return base64DataUrl;
    } catch (error: any) {
      console.error("Error uploading image:", error);
      
      if (error.message) {
        throw error;
      }
      
      throw new Error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (url: string): Promise<boolean> => {
    // For base64 images stored in Firestore, deletion is handled
    // by removing the image URL from the document
    // This function is kept for compatibility but doesn't need to do anything
    return true;
  };

  return { uploadImage, deleteImage, uploading };
};
