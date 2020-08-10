<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class AuctionDetails extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'auction:details {auction_id}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command to display details from an auction';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $auction_id = $this->argument('auction_id');

        // execute command
        exec("node public/js/puppeteer/auction_details.js " .$auction_id, $output);

        // print output from command
        $this->comment( implode( PHP_EOL, $output ) );
        return 0;
    }
}
