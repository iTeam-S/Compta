<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Firebase\JWT\JWT;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\HasApiTokens;

class LoginController extends Controller
{

    public function login(Request $request)
    {

        $vs = Validator::make($request->all(),[
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);
        // $array_user = [];
        $user = User::where('email',$request->email)->first();
        return $user;

        if($vs->fails()){
            return response()->json(['er_message' => $vs->errors()]);
        } else {
            $user = User::where('email',$request->email)->first();
            $user->groupe;
            $key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
            $user->groupe->permissions;
            $array_user = [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'groupe' => [
                    'id' => $user->groupe->id,
                    'nom' => $user->groupe->nom,
                ],
                'permissions' => [
                    'id' => $user->groupe->permissions->id,
                    'nom' => $user->groupe->permissions->nom,
                ]
            ];
            if(!$user) return response()->json(['err_message'=>'Utilisateur invalide']);
            if(!Hash::check($request->password,$user->password)) return response()->json(['err_message' => 'Mot de passe incorrect']);
            $token = JWT::encode($array_user,$key);
            return response()->json(['user' => $array_user,'token' => $token]);
        }
    }
}
