<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'username' => 'required|unique:users|max:255',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => true,
                'message' => 'User insert failed!'
            ], 422);
        } else {
            $item = User::create([
                'name' => $request['name'],
                'username' => $request['username'],
                'password' => Hash::make($request['password']),
            ]);

            return response()->json([
                'error' => false,
                'message' => 'User added successfully!'
            ], 200);
        }
    }
}
