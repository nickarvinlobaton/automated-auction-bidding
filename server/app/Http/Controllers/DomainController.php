<?php

namespace App\Http\Controllers;

use App\Domain;
use App\Http\Resources\DomainCollection;
use App\Http\Resources\DomainResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class DomainController extends Controller
{
    public function index()
    {
        $domains = Domain::all();
        $domains = $domains->sortKeysDesc();

        return (new DomainCollection($domains))->response()->setStatusCode(200);
    }

    public function show($userId)
    {
        $domains = DB::table('domains')->where([
            ['user_id', '=', $userId],
            ['enabled', '=', true],
        ])
            ->orderBy('id', 'desc')->get()->toArray();
        return response()->json([
            'data' => $domains
        ], 200);
    }

    public function showDisabled($userId)
    {
        $domains = DB::table('domains')->where([
            ['user_id', '=', $userId],
            ['enabled', '=', false],
        ])
            ->orderBy('id', 'desc')->get()->toArray();
        return response()->json([
            'data' => $domains
        ], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'domain_id' => 'required',
            'domain_name' => 'required',
            'max_price' => 'required'
        ]);

        if ($validator->fails()) {
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

    public function disableAuction($id)
    {
        $domain = DB::table('domains')
            ->where('id', $id)
            ->update(['enabled' => false]);

        return response()->json([
            'error' => false,
            'message' => 'Auction disabled successfully!'
        ], 200);
    }

    public function enableAuction($id)
    {
        $domain = DB::table('domains')
            ->where('id', $id)
            ->update(['enabled' => true]);

        return response()->json([
            'error' => false,
            'message' => 'Auction enabled successfully!'
        ], 200);
    }
}
