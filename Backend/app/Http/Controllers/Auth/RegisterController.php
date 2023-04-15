<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class RegisterController extends Controller
{
    public function create(Request $request)
    {
        $vs = Validator::make($request->all(),[
            'name' => ['required','string'],
            'email' =>['required','email', 'unique:users'],
            'password' => ['required', 'min:8', 'confirmed'],
            'groupe_id' => ['required']
        ]);

        if($vs->fails()){
            return response()->json([
                'err_message' => $vs->errors() 
            ]);
        } else {
            User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => Hash::make($request->password),
                'groupe_id' => $request->groupe_id,
            ]);
            return response()->json([
                'message' => "Utilisateur créer avec success" 
            ]);
        }
    }
}
