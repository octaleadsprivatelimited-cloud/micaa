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

export interface Service {
  id: string;
  title: string;
  description?: string;
  icon?: string;
  display_order: number;
  created_at: Date;
  updated_at: Date;
}

export interface ServiceInput {
  title: string;
  description?: string;
  icon?: string;
  display_order?: number;
}

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const servicesRef = collection(db, "services");
      const q = query(servicesRef, orderBy("display_order", "asc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        created_at: docSnap.data().created_at?.toDate() || new Date(),
        updated_at: docSnap.data().updated_at?.toDate() || new Date(),
      })) as Service[];
    },
  });
};

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (service: ServiceInput) => {
      const servicesRef = collection(db, "services");
      const docRef = await addDoc(servicesRef, {
        ...service,
        display_order: service.display_order || 0,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });
      
      const docSnap = await getDocs(query(collection(db, "services")));
      const newDoc = docSnap.docs.find((d) => d.id === docRef.id);
      
      return {
        id: docRef.id,
        ...newDoc?.data(),
        created_at: newDoc?.data()?.created_at?.toDate() || new Date(),
        updated_at: newDoc?.data()?.updated_at?.toDate() || new Date(),
      } as Service;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...service }: ServiceInput & { id: string }) => {
      const serviceRef = doc(db, "services", id);
      await updateDoc(serviceRef, {
        ...service,
        updated_at: Timestamp.now(),
      });
      
      const updatedDoc = await getDocs(query(collection(db, "services")));
      const docData = updatedDoc.docs.find((d) => d.id === id);
      
      return {
        id,
        ...docData?.data(),
        created_at: docData?.data()?.created_at?.toDate() || new Date(),
        updated_at: docData?.data()?.updated_at?.toDate() || new Date(),
      } as Service;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const serviceRef = doc(db, "services", id);
      await deleteDoc(serviceRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
  });
};
