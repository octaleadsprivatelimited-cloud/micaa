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
  test_report_url?: string;
  whatsapp_message?: string;
  mine_name?: string;
  actual_price?: string;
  offer_price?: string;
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
  test_report_url?: string;
  whatsapp_message?: string;
  mine_name?: string;
  actual_price?: string;
  offer_price?: string;
  is_featured?: boolean;
  display_order?: number;
}

/** Batch-fetch all category names (one read instead of N) */
const getCategoryNameMap = async (): Promise<Map<string, string>> => {
  const categoriesRef = collection(db, "product_categories");
  const snapshot = await getDocs(categoriesRef);
  const map = new Map<string, string>();
  snapshot.docs.forEach((d) => {
    const name = d.data()?.name;
    if (name) map.set(d.id, name);
  });
  return map;
};

export const useProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const [productsSnapshot, categoryMap] = await Promise.all([
        getDocs(query(collection(db, "products"), orderBy("display_order", "asc"))),
        getCategoryNameMap(),
      ]);

      return productsSnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const categoryName = data.category_id ? categoryMap.get(data.category_id) : undefined;
        return {
          id: docSnap.id,
          ...data,
          product_categories: categoryName ? { name: categoryName } : undefined,
          created_at: data.created_at?.toDate() || new Date(),
          updated_at: data.updated_at?.toDate() || new Date(),
        };
      }) as Product[];
    },
    staleTime: 2 * 60 * 1000, // 2 minutes – products load from cache when revisiting
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const [productDoc, categoryMap] = await Promise.all([
        getDoc(doc(db, "products", id)),
        getCategoryNameMap(),
      ]);
      if (!productDoc.exists()) throw new Error("Product not found");

      const data = productDoc.data();
      const categoryName = data.category_id ? categoryMap.get(data.category_id) : undefined;

      return {
        id: productDoc.id,
        ...data,
        product_categories: categoryName ? { name: categoryName } : undefined,
        created_at: data.created_at?.toDate() || new Date(),
        updated_at: data.updated_at?.toDate() || new Date(),
      } as Product;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ["products", "featured"],
    queryFn: async () => {
      const [querySnapshot, categoryMap] = await Promise.all([
        getDocs(
          query(
            collection(db, "products"),
            where("is_featured", "==", true),
            orderBy("display_order", "asc"),
            limit(6)
          )
        ),
        getCategoryNameMap(),
      ]);

      return querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        const categoryName = data.category_id ? categoryMap.get(data.category_id) : undefined;
        return {
          id: docSnap.id,
          ...data,
          product_categories: categoryName ? { name: categoryName } : undefined,
          created_at: data.created_at?.toDate() || new Date(),
          updated_at: data.updated_at?.toDate() || new Date(),
        };
      }) as Product[];
    },
    staleTime: 2 * 60 * 1000,
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
      const categoryMap = await getCategoryNameMap();
      const categoryName = data?.category_id ? categoryMap.get(data.category_id) : undefined;

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
      const categoryMap = await getCategoryNameMap();
      const categoryName = data?.category_id ? categoryMap.get(data.category_id) : undefined;

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
