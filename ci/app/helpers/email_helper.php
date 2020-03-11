<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

function is_email_zipcube($email)
{
    if (strpos($email, '@zipcube.com') !== false)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function neverBounceStatusToEmailStatus($status)
{
    $retStatus = '';
    switch ($status)
    {
        case 'catchall':

            $retStatus = User::EMAILUNVERIFIABLE;
        break;

        case 'disposable':

            $retStatus = User::EMAILDISPOSABLE;
        break;

        case 'invalid':

            $retStatus = User::EMAILINVALID;
        break;

        case 'unknown':

            $retStatus = User::EMAILUNKNOWN;
        break;

        case 'valid':

            $retStatus = User::EMAILVALID;
        break;

        default:

            $retStatus = User::EMAILOTHER;
        break;
    }
    return $retStatus;
}

function emailStatusToHubspot($status)
{
    $retStatus = '';
    switch ($status)
    {
        case User::EMAILDISPOSABLE:

            $retStatus = 'Disposable';
        break;

        case User::EMAILINVALID:

            $retStatus = 'Invalid';
        break;

        case User::EMAILUNKNOWN:

            $retStatus = 'Unknown';
        break;

        case User::EMAILUNVERIFIABLE:

            $retStatus = 'Catchall';
        break;

        case User::EMAILVALID:

            $retStatus = 'Valid';
        break;

        default:

            $retStatus = '';
        break;
    }
    return $retStatus;
}

function neverBounceStatusToHubspot($status)
{
    $retStatus = '';
    switch ($status)
    {
        case 'catchall':

            $retStatus = 'Catchall';
        break;

        case 'disposable':

            $retStatus = 'Disposable';
        break;

        case 'invalid':

            $retStatus = 'Invalid';
        break;

        case 'unknown':

            $retStatus = 'Unknown';
        break;

        case 'valid':

            $retStatus = 'Valid';
        break;

        default:

            $retStatus = '';
        break;
    }
    return $retStatus;
}

function shouldSendEmailToAddress($status)
{
    $retBool = false;
    switch ($status)
    {
        case User::EMAILDISPOSABLE:
        case User::EMAILINVALID:

            $retBool = false;
        break;

        case User::EMAILOTHER:
        case User::EMAILUNKNOWN:
        case User::EMAILUNVERIFIABLE:
        case User::EMAILVALID:

            $retBool = true;
        break;

        default:

            $retBool = false;
        break;
    }
    return $retBool;
}
