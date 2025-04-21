<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Response;
use Inertia\Inertia;
use App\Models\Supplier;

class SupplierController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): Response
    {
        return Inertia::render('suppliers', [
            // Fetch all posts (no user relation)
            'suppliers' => Supplier::all(),
        ]);
    }


    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'supplier_name'   => 'required|string|max:255',
            'company' => 'required|string',
            'address' => 'nullable|string',
            'contact' => 'nullable|string', 
        ]);
    
        $data = $request->only(['supplier_name', 'company', 'address', 'contact']);
    
        Supplier::create($data);
    
        return redirect()->route('suppliers.index')->with('success', 'Supplier created successfully.');
    }


    public function update(Request $request, Supplier $supplier)
    {
        $request->validate([
            'supplier_name'   => 'required|string|max:255',
            'company' => 'required|string',
            'address' => 'nullable|string',
            'contact' => 'nullable|string', 
        ]);
    
        $data = $request->only(['supplier_name', 'company', 'address', 'contact']);
    
        $supplier->update($data);
    
        return redirect()->route('suppliers.index')->with('success', 'Supplier updated successfully.');
    }



    public function destroy(Supplier $supplier)
    {
        $supplier->delete();

        return redirect()->route('suppliers.index')->with('success', 'Supplier deleted successfully.');
    }



    
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */


    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    
}
