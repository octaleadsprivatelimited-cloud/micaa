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

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface FAQInput {
  question: string;
  answer: string;
  display_order?: number;
}

export const useFAQs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: async () => {
      const faqsRef = collection(db, "faqs");
      const q = query(faqsRef, orderBy("display_order", "asc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        created_at: docSnap.data().created_at?.toDate() || new Date(),
        updated_at: docSnap.data().updated_at?.toDate() || new Date(),
      })) as FAQ[];
    },
  });
};

export const useCreateFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (faq: FAQInput) => {
      const faqsRef = collection(db, "faqs");
      const docRef = await addDoc(faqsRef, {
        ...faq,
        display_order: faq.display_order || 0,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });
      
      const docSnap = await getDocs(query(collection(db, "faqs")));
      const newDoc = docSnap.docs.find((d) => d.id === docRef.id);
      
      return {
        id: docRef.id,
        ...newDoc?.data(),
        created_at: newDoc?.data()?.created_at?.toDate() || new Date(),
        updated_at: newDoc?.data()?.updated_at?.toDate() || new Date(),
      } as FAQ;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

export const useUpdateFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...faq }: FAQInput & { id: string }) => {
      const faqRef = doc(db, "faqs", id);
      await updateDoc(faqRef, {
        ...faq,
        updated_at: Timestamp.now(),
      });
      
      const updatedDoc = await getDocs(query(collection(db, "faqs")));
      const docData = updatedDoc.docs.find((d) => d.id === id);
      
      return {
        id,
        ...docData?.data(),
        created_at: docData?.data()?.created_at?.toDate() || new Date(),
        updated_at: docData?.data()?.updated_at?.toDate() || new Date(),
      } as FAQ;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};

export const useDeleteFAQ = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const faqRef = doc(db, "faqs", id);
      await deleteDoc(faqRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
    },
  });
};
