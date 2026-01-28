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

export interface Category {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface CategoryInput {
  name: string;
  description?: string;
  image_url?: string;
  display_order?: number;
}

export const useCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const categoriesRef = collection(db, "product_categories");
      const q = query(categoriesRef, orderBy("display_order", "asc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        created_at: doc.data().created_at?.toDate() || new Date(),
        updated_at: doc.data().updated_at?.toDate() || new Date(),
      })) as Category[];
    },
  });
};

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: CategoryInput) => {
      const categoriesRef = collection(db, "product_categories");
      const docRef = await addDoc(categoriesRef, {
        ...category,
        display_order: category.display_order || 0,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });
      
      const docSnap = await getDocs(query(collection(db, "product_categories")));
      const newDoc = docSnap.docs.find((d) => d.id === docRef.id);
      
      return {
        id: docRef.id,
        ...newDoc?.data(),
        created_at: newDoc?.data()?.created_at?.toDate() || new Date(),
        updated_at: newDoc?.data()?.updated_at?.toDate() || new Date(),
      } as Category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...category }: CategoryInput & { id: string }) => {
      const categoryRef = doc(db, "product_categories", id);
      await updateDoc(categoryRef, {
        ...category,
        updated_at: Timestamp.now(),
      });
      
      const updatedDoc = await getDocs(query(collection(db, "product_categories")));
      const docData = updatedDoc.docs.find((d) => d.id === id);
      
      return {
        id,
        ...docData?.data(),
        created_at: docData?.data()?.created_at?.toDate() || new Date(),
        updated_at: docData?.data()?.updated_at?.toDate() || new Date(),
      } as Category;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const categoryRef = doc(db, "product_categories", id);
      await deleteDoc(categoryRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
