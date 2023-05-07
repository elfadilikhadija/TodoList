<?php

namespace App\Http\Controllers;
use App\Models\category ;
use Illuminate\Http\Request;

class categoryController extends Controller
{
    public function index(){
        return category::has('tasks')->get();
    }
}
