<?php

namespace App\Http\Controllers;

use App\Models\Permission;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $permission = Permission::all();

        return $permission;
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
            'permission' => 'required'
        ]);

        if($vs->fails()) return response()->json(['err_message' => $vs->messages()]);

        Permission::create([
            'permission' => $request->permission,
        ]);

        return response()->json(['message' => 'Created successfuly']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function show(Permission $permission)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Permission $permission)
    {
        $vs = Validator::make($request->all(),[
            'permission' => 'required'
        ]);

        if($vs->fails()) return response()->json(['err_message' => $vs->messages()]);

        $permission->update([
            'permission' => $request->permission,
        ]);

        return response()->json(['message' => 'Created successfuly']);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Permission  $permission
     * @return \Illuminate\Http\Response
     */
    public function destroy(Permission $permission)
    {
        $permission->delete();

        return response()->json(['message' => 'Deleted successfuly']);
    }
}
