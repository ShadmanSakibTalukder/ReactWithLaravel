import { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import { Toaster, toast } from "sonner";

<Toaster position="top-right" richColors />

interface Supplier {
  // supplier_id?: string;
  supplier_name: string; // Updated to match backend field
  company: string;
  address: string;
  contact: string;
}

interface Suppiler {
  id?: number;
  // supplier_id?: string; // Added supplier_id property
  supplier_name: string; // Updated to match backend field
  company: string;
  address: string;
  contact: string;
}

interface Props {
  isOpen: boolean;
  closeModal: () => void;
  supplier?: Suppiler | null;
}

export default function SupplierFormModal({ isOpen, closeModal, supplier }: Props) {
  const [formData, setFormData] = useState<Supplier>({
    supplier_name: "", // Updated to match backend field
    company: "",
    address: "",
    contact: "",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (supplier) {
      setFormData({
        // supplier_id: supplier?.supplier_id || "",
        supplier_name: supplier?.supplier_name || "", // Updated to match backend field
        company: supplier?.company || "",
        address: supplier?.address || "",
        contact: supplier?.contact || "",
      });
      setSelectedFile(null);
    } else {
      setFormData({
        // supplier_id: "",
        supplier_name: "", // Updated to match backend field
        company: "",
        address: "",
        contact: "",

      });
      setSelectedFile(null);
    }
  }, [supplier]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
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

    const successMessage = supplier?.id ? "Supplier Updated Successfully" : "Supplier Created Successfully";
    const errorMessage = supplier?.id ? "Failed to Update Supplier" : "Failed to Create Supplier";

    if (supplier?.id) {
      data.append("_method", "PUT");
      router.post(`/suppliers/${supplier.id}`, data, {
        onSuccess: () => {
          toast.success(successMessage);
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          toast.error(errorMessage);
          console.error(errors.message || "Failed to submit supplier.");
        },
      });
    } else {
      router.post("/suppliers", data, {
        onSuccess: () => {
          toast.success(successMessage);
          closeModal();
          router.reload();
        },
        onError: (errors) => {
          toast.error(errorMessage);
          console.error(errors.message || "Failed to submit supplier.");
        },
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <h2 className="text-lg font-semibold mb-4">{supplier ? "Edit Product" : "Add Supplier"}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-3">
            <label className="block text-sm font-medium">Supplier Name</label>
            <input
              type="text"
              id=""
              name="supplier_name" 
              value={formData.supplier_name}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Company</label>
            <textarea
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            ></textarea>
          </div>
          <div className="mb-3">
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border rounded p-2"
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
            />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={closeModal} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">{supplier ? "Update" : "Create"}</button>
          </div>
        </form>
      </div>
    </div>
  );
}
