<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class supplier extends Model
{
    protected $fillable = [
        'supplier_name',
        'company',
        'address',
        'contact'
    ];

    // public function product()
    // {
    //     return $this->hasMany(Product::class);
    // }
}
