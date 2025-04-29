import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Toaster, toast } from "sonner";

<Toaster position="top-right" richColors />

interface Product {
  id?: number;
  product_id: string;
  title: string;
  description: string;
  image?: string;
  supplier_name: string;
  contact: string;
  quantity: number;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  product?: Product | null;
}

export default function ProductFormModal({ isOpen, closeModal, product }: Props) {
  const [formData, setFormData] = useState<Product>({
    product_id: "",
    title: "",
    description: "",
    image: "",
    supplier_name: "",
    contact: "",
    quantity: 1,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    if (product) {
      setFormData({
        product_id: product.product_id,
        title: product.title,
        description: product.description,
        image: product.image || "",
        supplier_name: product.supplier_name,
        contact: product.contact,
        quantity: product.quantity,
      });
      setPreview(product.image || "");
      setSelectedFile(null);
    } else {
      setFormData({
        product_id: "",
        title: "",
        description: "",
        image: "",
        supplier_name: "",
        contact: "",
        quantity: 1,
      });
      setPreview("");
      setSelectedFile(null);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      data.append(key, value.toString());
    });
    if (selectedFile) {
      data.append("image", selectedFile);
    }

    const successMessage = product?.id ? "Product Updated Successfully" : "Product Created Successfully";
    const errorMessage = product?.id ? "Failed to Update Product" : "Failed to Create Product";

    if (product?.id) {
      data.append("_method", "PUT");
      router.post(`/products/${product.id}`, data, {
        onSuccess: () => {
          toast.success(successMessage);
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          toast.error(errorMessage);
          console.error(errors.message || "Failed to submit product.");
        },
      });
    } else {
      router.post("/products", data, {
        onSuccess: () => {
          toast.success(successMessage);
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          toast.error(errorMessage);
          console.error(errors.message || "Failed to submit product.");
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">{product ? "Edit Product" : "Add Product"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="block text-sm font-medium">Product ID</label>
            <input
              type="text"
              name="product_id"
              value={formData.product_id}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Image (optional)</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="w-full"
              accept="image/*"
            />
          </div>
          {preview && (
            <div className="mb-3">
              <p className="text-sm mb-1">Image Preview:</p>
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            </div>
          )}
          <div className="mb-3">
            <label className="block text-sm font-medium">Supplier Name</label>
            <input
              type="text"
              name="supplier_name"
              value={formData.supplier_name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Contact</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{product ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
