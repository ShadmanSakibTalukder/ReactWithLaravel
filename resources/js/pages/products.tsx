import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import ProductFormModal from "@/components/ui/ProductFormModal";
import AppLayout from "@/layouts/app-layout";
import { Toaster, toast } from "sonner";

export default function Products() {
  const { products } = usePage<{ products: { id: number; product_id: string; title: string; description: string; image?: string; supplier_name: string; contact: string; quantity: number }[] }>().props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<{ id: number; product_id: string; title: string; description: string; image?: string; supplier_name: string; contact: string; quantity: number } | null>(null);

  const openModal = (product: { id: number; product_id: string; title: string; description: string; image?: string; supplier_name: string; contact: string; quantity: number } | null = null) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    router.delete(`/products/${id}`, {
      onSuccess: () => {
        toast.success("Product deleted successfully");
        router.reload();
      },
      onError: () => {
        toast.error("Failed to delete product");
        console.error("Failed to delete product.");
      },
    });
  };

  return (
    <AppLayout>
      <Head title="Products" />

      <Toaster position="top-right" richColors />

      <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">
        <div className="flex justify-end">
          <button onClick={() => openModal()} className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
            Add Product
          </button>
        </div>

        <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-800 border-b">
              {["Image", "Product ID", "Title", "Description", "Supplier", "Contact", "Qty", "Actions"].map((header) => (
                <th key={header} className="border p-3 text-left">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.length ? (
              products.map((product) => (
                <tr key={product.id} className="border-b">
                  <td className="p-3">
                    {product.image ? <img src={product.image} alt="Product" className="w-16 h-16 object-cover rounded-full" /> : "No Image"}
                  </td>
                  <td className="p-3">{product.product_id}</td>
                  <td className="p-3">{product.title}</td>
                  <td className="p-3">{product.description}</td>
                  <td className="p-3">{product.supplier_name}</td>
                  <td className="p-3">{product.contact}</td>
                  <td className="p-3">{product.quantity}</td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => openModal(product)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
                    <button onClick={() => handleDelete(product.id)} className="bg-red-500 text-sm text-white px-3 py-1 rounded">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr><td colSpan={8} className="text-center p-4 text-gray-600">No products found.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      <ProductFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} product={selectedProduct} />
    </AppLayout>
  );
}
