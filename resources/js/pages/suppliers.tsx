import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import PostFormModal from "@/components/ui/SupplierFormModal";
import AppLayout from "@/layouts/app-layout";
import {Toaster, toast} from "sonner";


export default function Posts() {
    const { posts } = usePage<{ posts: { id: number; name: string; company: string; address: string; contact: string }[] }>().props;
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState<{ id: number; name: string; company: string; address: string; contact: string } | null>(null);
  
    const openModal = (post: {id: number; name: string; company: string; address: string; contact: string } | null = null) => {
      setSelectedPost(post);
      setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        router.delete(`/suppliers/${id}`, {
          onSuccess: () => {
            toast.success("Post deleted Successfully");
            router.reload();
          },
          onError: () => {
            toast.error("Failed to delete Post");
            console.error("Failed to delete post.");
          },
        });
      };
      