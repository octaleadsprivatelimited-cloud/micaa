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
  where,
  limit,
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface Testimonial {
  id: string;
  name: string;
  company?: string;
  content: string;
  rating: number;
  image_url?: string;
  is_featured: boolean;
  created_at: Date;
}

export interface TestimonialInput {
  name: string;
  company?: string;
  content: string;
  rating?: number;
  image_url?: string;
  is_featured?: boolean;
}

export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const testimonialsRef = collection(db, "testimonials");
      const q = query(testimonialsRef, orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        created_at: docSnap.data().created_at?.toDate() || new Date(),
      })) as Testimonial[];
    },
  });
};

export const useFeaturedTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials", "featured"],
    queryFn: async () => {
      const testimonialsRef = collection(db, "testimonials");
      const q = query(
        testimonialsRef,
        where("is_featured", "==", true),
        orderBy("created_at", "desc"),
        limit(6)
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        created_at: docSnap.data().created_at?.toDate() || new Date(),
      })) as Testimonial[];
    },
  });
};

export const useCreateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (testimonial: TestimonialInput) => {
      const testimonialsRef = collection(db, "testimonials");
      const docRef = await addDoc(testimonialsRef, {
        ...testimonial,
        rating: testimonial.rating || 5,
        is_featured: testimonial.is_featured || false,
        created_at: Timestamp.now(),
      });
      
      const docSnap = await getDocs(query(collection(db, "testimonials")));
      const newDoc = docSnap.docs.find((d) => d.id === docRef.id);
      
      return {
        id: docRef.id,
        ...newDoc?.data(),
        created_at: newDoc?.data()?.created_at?.toDate() || new Date(),
      } as Testimonial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const useUpdateTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...testimonial }: TestimonialInput & { id: string }) => {
      const testimonialRef = doc(db, "testimonials", id);
      await updateDoc(testimonialRef, testimonial);
      
      const updatedDoc = await getDocs(query(collection(db, "testimonials")));
      const docData = updatedDoc.docs.find((d) => d.id === id);
      
      return {
        id,
        ...docData?.data(),
        created_at: docData?.data()?.created_at?.toDate() || new Date(),
      } as Testimonial;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};

export const useDeleteTestimonial = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const testimonialRef = doc(db, "testimonials", id);
      await deleteDoc(testimonialRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
    },
  });
};
