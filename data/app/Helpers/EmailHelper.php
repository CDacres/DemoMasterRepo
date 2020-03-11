<?php

namespace App\Helpers;

use Illuminate\Support\Facades\Mail as Mailer;
use App\Models\User;

class EmailHelper
{
    public function sendAdminMail($view = '', $subjectData = [], $messageData = [], $domain = 'uk', $action = '')
    {
        $admin_user = User::where('email', env('DEV_EMAIL_ADDRESS'))->first();
        if (!is_null($admin_user))
        {
            $this->sendMail($admin_user, $view, $subjectData, $messageData, $domain, $action);
        }
    }

    public function sendMail($toUser = '', $view = '', $subjectData = [], $messageData = [], $domain = 'uk', $action = '', $fromUser = [], $type = 'html')
    {
        $to = $toUser->email;
        $lang = $toUser->language_pref;
        $bcc = '';
        $env = new EnvHelper();
        if ($env->acceptsInsecureCertificates())
        {
            $to = env('DEV_EMAIL_ADDRESS');
        }
        else
        {
            $bcc = 'audit@zipcube.com';
        }
        try
        {
            if ($lang == 'en_US' || $lang == 'en_IE')
            {
                $lang = 'en'; //hack!
            }
            if (view()->exists('emails.' . $view . '.' . $lang))
            {
                $translated_subject = $this->_subject($lang, 'emails.' . $view, $subjectData);
                $messageData['analytics_str'] = '?source=zipcube&medium=email&type=sys&detail=' . $translated_subject;
                if ($action != '')
                {
                    $messageData['action'] = $action;
                }
                $messageData['domain'] = $domain;
                $messageData['view'] = view('emails.' . $view . '.' . $lang, $messageData);
                switch ($type)
                {
                    case 'html_non_brand':

                        Mailer::send('emails.template_non_brand.v1.' . $lang, $messageData, function ($message) use ($to, $bcc, $translated_subject, $fromUser) {
                            $message->subject($translated_subject);
                            $message->to($to);
                            if ($bcc != '')
                            {
                                $message->bcc($bcc);
                            }
                            if (count($fromUser) > 0 && strpos($fromUser->email, '@zipcube.com') !== false)
                            {
                                $message->from($fromUser->email, $fromUser->firstname . ' - Zipcube');
                            }
                        });
                    break;

                    default:

                        Mailer::send('emails.template.v1.' . $lang, $messageData, function ($message) use ($to, $bcc, $translated_subject, $fromUser) {
                            $message->subject($translated_subject);
                            $message->to($to);
                            if ($bcc != '')
                            {
                                $message->bcc($bcc);
                            }
                            if (count($fromUser) > 0 && strpos($fromUser->email, '@zipcube.com') !== false)
                            {
                                $message->from($fromUser->email, $fromUser->firstname . ' - Zipcube');
                            }
                        });
                    break;
                }

            }
        }
        catch (Exception $ex)
        {
            Log::error('Mailer failed with ' . $view . ". Exception was: " . $ex->getMessage());
        }
    }

    private function _subject($lang, $subject, $subjectData)
    {
        $lang_pointer = str_replace(".", "/", $subject) . ".subject";
        return trans($lang_pointer, $subjectData, $lang);
    }
}