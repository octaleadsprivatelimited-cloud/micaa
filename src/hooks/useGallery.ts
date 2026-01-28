import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  collection, 
  query, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy,
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface GalleryImage {
  id: string;
  title?: string;
  description?: string;
  image_url: string;
  display_order: number;
  created_at: Date;
}

export interface GalleryImageInput {
  title?: string;
  description?: string;
  image_url: string;
  display_order?: number;
}

export const useGallery = () => {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: async () => {
      const galleryRef = collection(db, "gallery");
      const q = query(galleryRef, orderBy("display_order", "asc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        created_at: docSnap.data().created_at?.toDate() || new Date(),
      })) as GalleryImage[];
    },
  });
};

export const useCreateGalleryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (image: GalleryImageInput) => {
      const galleryRef = collection(db, "gallery");
      const docRef = await addDoc(galleryRef, {
        ...image,
        display_order: image.display_order || 0,
        created_at: Timestamp.now(),
      });
      
      const docSnap = await getDocs(query(collection(db, "gallery")));
      const newDoc = docSnap.docs.find((d) => d.id === docRef.id);
      
      return {
        id: docRef.id,
        ...newDoc?.data(),
        created_at: newDoc?.data()?.created_at?.toDate() || new Date(),
      } as GalleryImage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
};

export const useUpdateGalleryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...image }: GalleryImageInput & { id: string }) => {
      const imageRef = doc(db, "gallery", id);
      await updateDoc(imageRef, image);
      
      const updatedDoc = await getDocs(query(collection(db, "gallery")));
      const docData = updatedDoc.docs.find((d) => d.id === id);
      
      return {
        id,
        ...docData?.data(),
        created_at: docData?.data()?.created_at?.toDate() || new Date(),
      } as GalleryImage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
};

export const useDeleteGalleryImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const imageRef = doc(db, "gallery", id);
      await deleteDoc(imageRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
};
