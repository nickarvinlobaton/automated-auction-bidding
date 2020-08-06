<?php

namespace App\Http\Controllers;

use App\Domain;
use App\Http\Resources\DomainCollection;
use App\Http\Resources\DomainResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class DomainController extends Controller
{
    public function index()
    {
        $domains = Domain::all();
        $domains = $domains->sortKeysDesc();

        return (new DomainCollection($domains))->response()->setStatusCode(200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'domain_id' => 'required',
            'domain_name' => 'required',
            'max_price' => 'required'
        ]);

        if($validator->fails()) {
            return response()->json([
                'error' => true,
                'message' => 'Domain list insert failed!'
            ], 422);
        } else {
            $domain = Domain::create($request->all());

            return response()->json([
                'error' => false,
                'message' => 'Domain list added successfully!'
            ], 200);
        }
    }
}
