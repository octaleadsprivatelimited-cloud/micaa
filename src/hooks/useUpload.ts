import { useState } from "react";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { storage } from "@/lib/firebase";

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, folder: string = "general"): Promise<string | null> => {
    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const storageRef = ref(storage, fileName);
      await uploadBytes(storageRef, file);
      const publicUrl = await getDownloadURL(storageRef);

      return publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (url: string): Promise<boolean> => {
    try {
      // Extract file path from Firebase Storage URL
      const decodedUrl = decodeURIComponent(url);
      const pathMatch = decodedUrl.match(/\/o\/(.+?)\?/);
      if (!pathMatch || pathMatch.length < 2) return false;

      const filePath = pathMatch[1];
      const storageRef = ref(storage, filePath);

      await deleteObject(storageRef);
      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      return false;
    }
  };

  return { uploadImage, deleteImage, uploading };
};
