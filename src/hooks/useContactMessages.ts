import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { 
  collection, 
  query, 
  getDocs, 
  updateDoc, 
  deleteDoc, 
  doc, 
  orderBy,
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  is_read: boolean;
  created_at: Date;
}

export interface ContactMessageInput {
  is_read?: boolean;
}

export const useContactMessages = () => {
  return useQuery({
    queryKey: ["contact_messages"],
    queryFn: async () => {
      const messagesRef = collection(db, "contact_messages");
      const q = query(messagesRef, orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        created_at: docSnap.data().created_at?.toDate() || new Date(),
      })) as ContactMessage[];
    },
  });
};

export const useUpdateContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...message }: ContactMessageInput & { id: string }) => {
      const messageRef = doc(db, "contact_messages", id);
      await updateDoc(messageRef, message);
      
      const updatedDoc = await getDocs(query(collection(db, "contact_messages")));
      const docData = updatedDoc.docs.find((d) => d.id === id);
      
      return {
        id,
        ...docData?.data(),
        created_at: docData?.data()?.created_at?.toDate() || new Date(),
      } as ContactMessage;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact_messages"] });
    },
  });
};

export const useDeleteContactMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const messageRef = doc(db, "contact_messages", id);
      await deleteDoc(messageRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contact_messages"] });
    },
  });
};
