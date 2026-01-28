import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  collection, 
  query, 
  getDocs, 
  getDoc,
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy,
  where,
  limit,
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Product {
  id: string;
  name: string;
  description?: string;
  category_id?: string;
  features?: string[];
  images?: string[];
  youtube_url?: string;
  pdf_url?: string;
  whatsapp_message?: string;
  is_featured: boolean;
  display_order: number;
  created_at: Date;
  updated_at: Date;
  product_categories?: { name: string };
}

export interface ProductInput {
  name: string;
  description?: string;
  category_id?: string | null;
  features?: string[];
  images?: string[];
  youtube_url?: string;
  pdf_url?: string;
  whatsapp_message?: string;
  is_featured?: boolean;
  display_order?: number;
}

const getCategoryName = async (categoryId: string | null | undefined): Promise<string | undefined> => {
  if (!categoryId) return undefined;
  try {
    const categoryDoc = await getDoc(doc(db, "product_categories", categoryId));
    return categoryDoc.data()?.name;
  } catch {
    return undefined;
  }
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const productsRef = collection(db, "products");
      const q = query(productsRef, orderBy("display_order", "asc"));
      const querySnapshot = await getDocs(q);
      
      const products = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const categoryName = await getCategoryName(data.category_id);
          return {
            id: docSnap.id,
            ...data,
            product_categories: categoryName ? { name: categoryName } : undefined,
            created_at: data.created_at?.toDate() || new Date(),
            updated_at: data.updated_at?.toDate() || new Date(),
          };
        })
      );
      
      return products as Product[];
    },
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const productDoc = await getDoc(doc(db, "products", id));
      if (!productDoc.exists()) throw new Error("Product not found");
      
      const data = productDoc.data();
      const categoryName = await getCategoryName(data.category_id);
      
      return {
        id: productDoc.id,
        ...data,
        product_categories: categoryName ? { name: categoryName } : undefined,
        created_at: data.created_at?.toDate() || new Date(),
        updated_at: data.updated_at?.toDate() || new Date(),
      } as Product;
    },
    enabled: !!id,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const productsRef = collection(db, "products");
      const q = query(
        productsRef, 
        where("is_featured", "==", true),
        orderBy("display_order", "asc"),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      
      const products = await Promise.all(
        querySnapshot.docs.map(async (docSnap) => {
          const data = docSnap.data();
          const categoryName = await getCategoryName(data.category_id);
          return {
            id: docSnap.id,
            ...data,
            product_categories: categoryName ? { name: categoryName } : undefined,
            created_at: data.created_at?.toDate() || new Date(),
            updated_at: data.updated_at?.toDate() || new Date(),
          };
        })
      );
      
      return products as Product[];
    },
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: ProductInput) => {
      const productsRef = collection(db, "products");
      const docRef = await addDoc(productsRef, {
        ...product,
        is_featured: product.is_featured || false,
        display_order: product.display_order || 0,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });
      
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      const categoryName = await getCategoryName(data?.category_id);
      
      return {
        id: docRef.id,
        ...data,
        product_categories: categoryName ? { name: categoryName } : undefined,
        created_at: data?.created_at?.toDate() || new Date(),
        updated_at: data?.updated_at?.toDate() || new Date(),
      } as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...product }: ProductInput & { id: string }) => {
      const productRef = doc(db, "products", id);
      await updateDoc(productRef, {
        ...product,
        updated_at: Timestamp.now(),
      });
      
      const updatedDoc = await getDoc(productRef);
      const data = updatedDoc.data();
      const categoryName = await getCategoryName(data?.category_id);
      
      return {
        id,
        ...data,
        product_categories: categoryName ? { name: categoryName } : undefined,
        created_at: data?.created_at?.toDate() || new Date(),
        updated_at: data?.updated_at?.toDate() || new Date(),
      } as Product;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const productRef = doc(db, "products", id);
      await deleteDoc(productRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};
