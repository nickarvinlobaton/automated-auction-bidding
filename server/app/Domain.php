<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Domain extends Model
{
    protected $fillable = [
        'user_id',
        'domain_id',
        'domain_name',
        'max_price'
    ];

    public function user()
    {
        return $this->belongsTo('App\User', 'user_id');
    }
}
