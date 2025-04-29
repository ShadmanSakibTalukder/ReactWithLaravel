<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GoodsFormRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'description' => 'required|string|max:1000',
            'price' => 'required|numerical|min:0',
            'featured_image' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:5120'
        ];
    }

    public function messages(): array {

        return [
            'name.required' => 'Please enter the product name',
            'name.string' => 'The product name must be a string',
            'name.max' => 'The product name may not be greater than 255 characters',
            'desciption.required' => 'Please enter product description',
            'description.string' => 'The product description must be a string',
            'description.max' => 'The product description may not be greater than 255 characters',
            'price.required' => 'Please enter the product price',
            'price.numerical' => 'The product price must be a number',
            'price.min' => 'The product price must be atleast 0',
            'featured_image.image' => 'The featured image must be an image file',
            'featured_image.mimes' => 'The featured image must be a file type:jpg,png,jpeg,gif',
            'featured_image.max' => 'The featured image may not be greater than 5120 kilobytes'
        ];
    }
}
