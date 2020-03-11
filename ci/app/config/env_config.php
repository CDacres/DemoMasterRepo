<?php
/*
|--------------------------------------------------------------------------
| Error Logging Threshold
|--------------------------------------------------------------------------
|
| If you have enabled error logging, you can set an error threshold to
| determine what gets logged. Threshold options are:
| You can enable error logging by setting a threshold over zero. The
| threshold determines what gets logged. Threshold options are:
|
|	0 = Disables logging, Error logging TURNED OFF
|	1 = Error Messages (including PHP errors)
|	2 = Debug Messages
|	3 = Informational Messages
|	4 = All Messages
|
| For a live site you'll usually only enable Errors (1) to be logged otherwise
| your log files will fill up very fast.
|
*/

if (defined('ENVIRONMENT'))
{
    switch (ENVIRONMENT)
    {
        case 'development':

            $config['log_threshold'] = 4;
        break;

        case 'production':

            $config['log_threshold'] = 1;
        break;

        default:

            $config['log_threshold'] = 4;
        break;
    }
}
else
{
    $config['log_threshold'] = 4;
}
