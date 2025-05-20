<?php

namespace App\Http\Controllers;

use Exception;
use Inertia\Inertia;
use App\Models\Goods;
use Illuminate\Http\Request;
use function Laravel\Prompts\error;

use Illuminate\Support\Facades\Log;
use App\Http\Requests\GoodsFormRequest;

class GoodsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $goods = Goods::latest()->get()->map(fn($goods) => [
            'id' => $goods->id,
            'name' => $goods->name,
            'description' => $goods->description,
            'price' => $goods->price,
            'featured_image' => $goods->featured_image,
            'featured_image_original_name' => $goods->featured_image_original_name,
            'created_at' => $goods->created_at->format('d M Y')

        ]);
       return Inertia::render('goods/index', [
        'goods' => $goods,
       ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('goods/goods-form');   
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(GoodsFormRequest $request)
    {
        try{ 

            $featuredImage = null;
            if ($request->file('featured_image')){
                $featuredImage = $request->file('featured_image');
                $featuredImageOriginalName = $featuredImage->getClientOriginalName();
                $featuredImage = $featuredImage->store('goods', 'public');
            }
    
           $goods =  Goods::create([
                'name' => $request->name,
                'description' => $request->description,
                'price' => $request->price,
                'featured_image' => $featuredImage,
                'featured_image_original_name'=> $featuredImageOriginalName,
    
           ]);
           if ($goods){
            return redirect()->route('goods.index')->with('success', 'Good Created Successfully');
           }

           elseif ($goods) {
            return redirect()->back()->with('error', 'Unable to create good, Please try again');
           }
    

        } catch(Exception $e){
            Log::error('Good creation failed: ' .$e->getMessage());
            return redirect()->back()->with('error', 'An unexpected error occurred. Please try again.');

        }

           }

    /**
     * Display the specified resource.
     */
    public function show(Goods $goods)
    {
        return Inertia::render('goods/goods-form', [
            'goods' => $goods,
            'isView' => true,
        ])
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Goods $goods)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Goods $goods)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Goods $goods)
    {
        //
    }
}
