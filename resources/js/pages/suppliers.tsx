import { useState } from "react";
import { Head, router, usePage } from "@inertiajs/react";
import SupplierFormModal from "@/components/ui/SupplierFormModal";
import AppLayout from "@/layouts/app-layout";
import {Toaster, toast} from "sonner";


export default function Posts() {
    const { suppliers } = usePage<{ suppliers: { id: number; supplier_name: string; company: string; address: string; contact: string }[] }>().props;
  
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState<{ id: number; supplier_name: string; company: string; address: string; contact: string } | null>(null);
  
    const openModal = (supplier: {id: number; supplier_name: string; company: string; address: string; contact: string } | null = null) => {
      setSelectedSupplier(supplier);
      setIsModalOpen(true);
    };

    const handleDelete = (id: number) => {
        router.delete(`/suppliers/${id}`, {
          onSuccess: () => {
            toast.success("Suppliers deleted Successfully");
            router.reload();
          },
          onError: () => {
            toast.error("Failed to delete Supplier");
            console.error("Failed to delete Supplier.");
          },
        });
      };
      return (
          <AppLayout>
            <Head title="Suppliers" />
      
            <Toaster position="top-right" richColors/>
      
            <div className="flex flex-col gap-6 p-6 bg-white text-black shadow-lg rounded-xl">
              <div className="flex justify-end">
                <button onClick={() => openModal()} className="bg-green-600 text-white rounded px-3 py-1 text-sm hover:bg-green-700 transition">
                  Add Supplier
                </button>
              </div>
      
              <table className="w-full border-collapse bg-white text-black shadow-sm rounded-lg">
                <thead>
                  <tr className="bg-gray-100 text-gray-800 border-b">
                    {["Name", "Company", "Address","Contact", "Actions"].map((header) => (
                      <th key={header} className="border p-3 text-left">{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {suppliers.length ? (
                    suppliers.map((suppliers) => (
                      <tr key={suppliers.id} className="border-b">
                        <td className="p-3">{suppliers.supplier_name}</td>
                        <td className="p-3">{suppliers.company}</td>
                        <td className="p-3">{suppliers.address}</td>
                        <td className="p-3">{suppliers.contact}</td>
                        <td className="p-3 flex gap-2">
                          <button onClick={() => openModal(suppliers)} className="bg-blue-500 text-sm text-white px-3 py-1 rounded">Edit</button>
                          <button onClick={() => handleDelete(suppliers.id)} className="bg-red-500 text-sm text-white px-3 py-1 rounded">Delete</button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr><td colSpan={4} className="text-center p-4 text-gray-600">No supplier found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
      
            <SupplierFormModal isOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} supplier={selectedSupplier} />
          </AppLayout>
        );
      }
      