<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Response;
//use Barryvdh\DomPDF\Facade\Pdf;
use PDF;
use App\Models\User;

class pdfController extends Controller
{
    //pdf
    public function pdf()
    { 
      $data = User::all()->first();

      // Set document information
      PDF::SetCreator('Laravel');
      PDF::SetAuthor('Maher');
      PDF::SetTitle('User Report');
      // Add a page
      PDF::AddPage();
      // Set font
      PDF::SetFont('amiri', '', 14);
      //PDF::setRTL(true);
      // Add a title
      PDF::Write(0, 'Title', '', 0, 'C', true, 0, false, false, 0);
      //set space
      PDF::Ln(5);
      //set big line-height to the next
      PDF::SetCellHeightRatio(1.75);
      //more
      PDF::Write(0, $data->description, '', 0, 'R', true, 0, false, false, 0);
      //set space
      PDF::Ln(5);
      //set normal line-height to the next
      PDF::SetCellHeightRatio(1.45);
      PDF::Write(0, $data->name, '', 0, 'R', true, 0, false, false, 0);
      PDF::Write(0, $data->phone, '', 0, 'R', true, 0, false, false, 0);
      PDF::Write(0, $data->subject, '', 0, 'R', true, 0, false, false, 0);
      PDF::Write(0, $data->phone, '', 0, 'R', true, 0, false, false, 0);

      // Output PDF
       PDF::Output('user_report.pdf', 'I');

 

    }

}
