import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const useUpload = () => {
  const [uploading, setUploading] = useState(false);

  const uploadImage = async (file: File, folder: string = "general"): Promise<string | null> => {
    try {
      setUploading(true);

      const fileExt = file.name.split(".").pop();
      const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("images")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Error uploading image:", uploadError);
        return null;
      }

      const { data } = supabase.storage.from("images").getPublicUrl(fileName);

      return data.publicUrl;
    } catch (error) {
      console.error("Error uploading image:", error);
      return null;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (url: string): Promise<boolean> => {
    try {
      // Extract file path from Supabase Storage URL
      const urlObj = new URL(url);
      const pathParts = urlObj.pathname.split("/storage/v1/object/public/images/");
      
      if (pathParts.length < 2) return false;

      const filePath = decodeURIComponent(pathParts[1]);

      const { error } = await supabase.storage.from("images").remove([filePath]);

      if (error) {
        console.error("Error deleting image:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error deleting image:", error);
      return false;
    }
  };

  return { uploadImage, deleteImage, uploading };
};
