<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class createTaskRequest extends FormRequest
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
     * @return array<string, \Illuminate\Contracts\Validation\Rule|array|string>
     */
    public function rules(): array
    {
        return [
            'title'=>'required|max:100',
            'body'=>'required|max:255',
            'category_id'=>'required',
        ];
    }

    public function message()
    {
        return [
            
            'category_id'.'required'=>'the category field is required',
        ];
    }

}
