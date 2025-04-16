<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('products', [
            'products' => Product::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'product_id'    => 'required|string|max:255',
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'image'         => 'nullable|image|max:2048',
            'supplier_name' => 'required|string|max:255',
            'contact'       => 'required|string|max:255',
            'quantity'      => 'required|integer|min:1',
        ]);

        $data = $request->only(['product_id', 'title', 'description', 'supplier_name', 'contact', 'quantity']);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');
            $data['image'] = '/storage/' . $path;
        }

        Product::create($data);

        return redirect()->route('products.index')->with('success', 'Product created successfully.');
    }

    public function update(Request $request, Product $product)
    {
        $request->validate([
            'product_id'    => 'required|string|max:255',
            'title'         => 'required|string|max:255',
            'description'   => 'required|string',
            'image'         => 'nullable|image|max:2048',
            'supplier_name' => 'required|string|max:255',
            'contact'       => 'required|string|max:255',
            'quantity'      => 'required|integer|min:1',
        ]);

        $data = $request->only(['product_id', 'title', 'description', 'supplier_name', 'contact', 'quantity']);

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $filename = time() . '_' . $file->getClientOriginalName();
            $path = $file->storeAs('uploads', $filename, 'public');
            $data['image'] = '/storage/' . $path;
        }

        $product->update($data);

        return redirect()->route('products.index')->with('success', 'Product updated successfully.');
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return redirect()->route('products.index')->with('success', 'Product deleted successfully.');
    }
}
