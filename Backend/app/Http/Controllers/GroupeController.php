<?php

namespace App\Http\Controllers;

use App\Models\Groupe;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class GroupeController extends Controller
{
    /**
     * Affichage liste de groupe
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $groupes = Groupe::all();

        return $groupes;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $vs = Validator::make($request->all(),[
            'nom' => 'required',
            'role' => 'required'
        ]);

        if($vs->fails()) return response()->json(['err_message' => $vs->messages()]);

        Groupe::create([
            'nom' => $request->nom,
            'role' => $request->role,
        ]);

        return response()->json(['message' => 'Created successfuly']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Groupe  $groupe
     * @return \Illuminate\Http\Response
     */
    public function show(Groupe $groupe)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Groupe  $groupe
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Groupe $groupe)
    {
        $vs = Validator::make($request->all(),[
            'nom' => 'required',
            'role' => 'required'
        ]);

        if($vs->fails()) return response()->json(['err_message' => $vs->messages()]);

        $groupe->update([
            'nom' => $request->nom,
            'role' => $request->role,
        ]);
        return response()->json(['message' => 'Update successfuly']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Groupe  $groupe
     * @return \Illuminate\Http\Response
     */
    public function destroy(Groupe $groupe)
    {
        $groupe->delete();
        return response()->json(['message' => 'Supprimer avec success']);
    }
}
