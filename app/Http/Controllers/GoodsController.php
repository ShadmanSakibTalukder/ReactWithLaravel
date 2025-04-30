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
       return Inertia::render('goods/index');
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
                'featured_image' => $request->featuredImage,
                'featured_image_original_name'=> $request->featuredImageOriginalName,
    
           ]);
           if ($goods){
            return redirect()->route('goods.index')->with('success', 'Good Created Successfully');
           }

           elseif ($goods) {
            return redirect()->back()->with('error', 'Unable to create good, Please try again');
           }
    

        } catch(Exception $e){
            Log::error('Good creation failed: ' .$e->getMessage());

        }

           }

    /**
     * Display the specified resource.
     */
    public function show(Goods $goods)
    {
        //
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
