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
  Timestamp 
} from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  is_published: boolean;
  published_at?: Date;
  author_id?: string;
  created_at: Date;
  updated_at: Date;
}

export interface BlogPostInput {
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  cover_image?: string;
  is_published?: boolean;
  published_at?: Date;
  author_id?: string;
}

export const useBlogPosts = () => {
  return useQuery({
    queryKey: ["blog_posts"],
    queryFn: async () => {
      const postsRef = collection(db, "blog_posts");
      const q = query(
        postsRef, 
        where("is_published", "==", true),
        orderBy("published_at", "desc")
      );
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          published_at: data.published_at?.toDate(),
          created_at: data.created_at?.toDate() || new Date(),
          updated_at: data.updated_at?.toDate() || new Date(),
        };
      }) as BlogPost[];
    },
  });
};

export const useBlogPost = (slug: string) => {
  return useQuery({
    queryKey: ["blog_posts", slug],
    queryFn: async () => {
      const postsRef = collection(db, "blog_posts");
      const q = query(
        postsRef,
        where("slug", "==", slug),
        where("is_published", "==", true)
      );
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) throw new Error("Post not found");
      
      const docSnap = querySnapshot.docs[0];
      const data = docSnap.data();
      
      return {
        id: docSnap.id,
        ...data,
        published_at: data.published_at?.toDate(),
        created_at: data.created_at?.toDate() || new Date(),
        updated_at: data.updated_at?.toDate() || new Date(),
      } as BlogPost;
    },
    enabled: !!slug,
  });
};

export const useAllBlogPosts = () => {
  return useQuery({
    queryKey: ["blog_posts", "all"],
    queryFn: async () => {
      const postsRef = collection(db, "blog_posts");
      const q = query(postsRef, orderBy("created_at", "desc"));
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map((docSnap) => {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          published_at: data.published_at?.toDate(),
          created_at: data.created_at?.toDate() || new Date(),
          updated_at: data.updated_at?.toDate() || new Date(),
        };
      }) as BlogPost[];
    },
  });
};

export const useCreateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (post: BlogPostInput) => {
      const postsRef = collection(db, "blog_posts");
      const docRef = await addDoc(postsRef, {
        ...post,
        is_published: post.is_published || false,
        published_at: post.is_published ? Timestamp.now() : null,
        created_at: Timestamp.now(),
        updated_at: Timestamp.now(),
      });
      
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      
      return {
        id: docRef.id,
        ...data,
        published_at: data?.published_at?.toDate(),
        created_at: data?.created_at?.toDate() || new Date(),
        updated_at: data?.updated_at?.toDate() || new Date(),
      } as BlogPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
    },
  });
};

export const useUpdateBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...post }: BlogPostInput & { id: string }) => {
      const postRef = doc(db, "blog_posts", id);
      const updateData: any = {
        ...post,
        updated_at: Timestamp.now(),
      };
      
      if (post.is_published && !(await getDoc(postRef)).data()?.published_at) {
        updateData.published_at = Timestamp.now();
      }
      
      await updateDoc(postRef, updateData);
      
      const updatedDoc = await getDoc(postRef);
      const data = updatedDoc.data();
      
      return {
        id,
        ...data,
        published_at: data?.published_at?.toDate(),
        created_at: data?.created_at?.toDate() || new Date(),
        updated_at: data?.updated_at?.toDate() || new Date(),
      } as BlogPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
    },
  });
};

export const useDeleteBlogPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const postRef = doc(db, "blog_posts", id);
      await deleteDoc(postRef);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blog_posts"] });
    },
  });
};
