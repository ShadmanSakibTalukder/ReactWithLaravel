<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $fillable = [
        'product_id',
        'title',
        'description',
        'image',
        'supplier_name',
        'contact',
        'quantity',
    ];

    // public function supplier()
    // {
    //     return $this->belongsTo(supplier::class);
    // }
}
