<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\HasApiTokens;

class LoginController extends Controller
{
    use HasApiTokens;

    public $info_user = [];

    public function login(Request $request)
    {

        $vs = Validator::make($request->all(),[
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if($vs->fails()){
            return response()->json(['er_message' => $vs->errors()]);
        } else {
            $user = User::where('email',$request->email)->first();
            $user->groupe;
            $user->groupe->permissions;
            if(!$user) return response()->json(['err_message'=>'Utilisateur invalide']);
            if(!Hash::check($request->password,$user->password)) return response()->json(['err_message' => 'Mot de passe incorrect']);
            $token = $user->createToken('CLE_SECRETE')->plainTextToken;
            
            return [
                'token' => $token,
            ];
        }
    }
}
