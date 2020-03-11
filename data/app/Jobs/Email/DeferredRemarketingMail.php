<?php

namespace App\Jobs\Email;

use App\Helpers\RemarketingEmailHelper;
use App\Helpers\AnalyticsHelper;
use App\Models\Marketing\MarketingMailsToUsers as UserMail;
use \App\Models\Marketing\EventTypes;
use \Exception;
use Illuminate\Support\Facades\Mail as Mailer;
use App\Jobs\ExtendedJob as Job;
use App\Contracts\Facades\ChannelLog as Log;

class DeferredRemarketingMail extends Job
{
    public $tries = 1;

    protected $_dry_run = false;
    protected $_drives;
    protected $_users;
    protected $_views;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($drives, $users, $dry_run)
    {
        $this->_dry_run = $dry_run;
        $this->_drives = $drives;
        $this->_users = $users;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $drive = $this->_drives->first();
        if ($drive !== null)
        {
            if (empty($this->_users))
            {
                $this->_users = $this->_get_cohort($drive->cohort);
            }
            if (!empty($this->_users))
            {
                $user_id = array_shift($this->_users);
                $this->_determine_relevant_mail_and_dispatch($user_id, $drive->views);
            }
            if (empty($this->_users))
            {
                $this->_drives->shift();
            }
            dispatch(new DeferredRemarketingMail($this->_drives, $this->_users, $this->_dry_run));
        }
    }

    private function _remarketing_mail()
    {
        $recipients = $this->_get_recipients();
        $language_view_name = $this->_email_helper->location();
        if (!view()->exists($language_view_name))
        {
            throw new Exception("Could not find language file name: " . $language_view_name);
        }
        else
        {
            $this->_send_mail($recipients, $language_view_name, $this->_email_helper);
        }
    }

    private function _get_recipients()
    {
        if ($this->_email_helper->is_dry_run)
        {
            $recipients = [env('MARKETING_EMAIL')];
        }
        else
        {
            $recipients = [$this->_email_helper->user->email];
        }
        return $recipients;
    }

    private function _send_mail($recipients, $language_view_name, $email_helper)
    {
        try
        {
            Mailer::send($language_view_name, $email_helper->mail_data(), function ($message) use ($recipients, $email_helper) {
                $message->from($email_helper->sender_email(), $email_helper->sender_name());
                $message->subject($email_helper->subject());
                $message->to($recipients);
                if (!$email_helper->is_dry_run)
                {
                    $message->bcc($email_helper->sender_email());
                    $message->bcc('audit@zipcube.com');
                }
            });
        }
        catch (Exception $ex)
        {
            Log::error('Mailer failed with ' . $language_view_name . ". Exception was: " . $ex->getMessage());
        }
    }

    private function _fill_helper_with_data()
    {
        foreach ($this->_email_helper->view->events as $view_event)
        {
            $this->_get_event_objects($view_event->event_type, AnalyticsHelper::get_recent_events($this->_email_helper->user->id, $view_event->event_type, 'DESC', $view_event->limit), $view_event->unique);
        }
    }

    private function _get_event_objects($event_type, $event_data_array, $unique = true)
    {
        $event_meta_data = EventTypes::LINKAGE[$event_type];
        $event_model = $event_meta_data['model'];
        $id_cf = EventTypes::generate_context_field_name($event_meta_data['cf']);
        $id_array = [];
        foreach ($event_data_array as $event_data)
        {
            $id_array[] = $event_data->$id_cf;
        }
        $model_key_column = $event_model::keyName();
        $event_collection = $event_model::whereIn($model_key_column, $id_array)->get();
        $this->_email_helper->add_events_collection($event_meta_data['view_name'], $event_collection, $unique, $model_key_column);
    }

    private function _determine_relevant_mail_and_dispatch($user_id, $views)
    {
        $view = $views->random(); //This for split testing (where available - singletons will of course always win here.)
        $this->_send_save_and_register_mail($user_id, $view);
    }

    private function _send_save_and_register_mail($user_id, $view)
    {
        $this->_email_helper = new RemarketingEmailHelper($user_id, $view, $this->_dry_run);
        if ($this->_email_helper->user_wants_email())
        {
            $this->_fill_helper_with_data();
            try {
                $this->_remarketing_mail();
                $this->_register_mail();
            }
            catch (Exception $ex)
            {
                $this->_send_tech_team_email("Remarketing mail failed for user " . $this->_email_helper->user->id . " with view " . $this->_email_helper->mail_view_id . " and language " . $this->_email_helper->lang . ". Exception reads: " . $ex->getMessage());
            }
        }
    }

    private function _register_mail()
    {
        $marketing_mail_view_id = $this->_email_helper->view->id;
        if (!$this->_email_helper->is_dry_run)
        {
            $userMail = new UserMail();
            $userMail->fill([
                'marketing_mail_view_id' => $marketing_mail_view_id,
                'user_id' => $this->_email_helper->user_id,
                'clicked_token' => $this->_email_helper->clicked_token,
                'opened_token' => $this->_email_helper->opened_token,
                'language' => $this->_email_helper->lang]);
            $userMail->save();
            AnalyticsHelper::register_step('MARKETING_EMAIL_SENT', $this->_email_helper->user->canonical_cookie_id, $this->_email_helper->lang, null, $marketing_mail_view_id, $userMail->id);
        }
    }

    private function _get_cohort($cohort)
    {
        return AnalyticsHelper::get_cohort($cohort);
    }

    private function _send_tech_team_email($subject)
    {
        try
        {
            Mailer::send('emails.internal.mail_error', [], function ($message) use ($subject) {
                $message->subject($subject);
                $message->to(env('TECH_EMAIL'));
            });
        }
        catch (Exception $ex)
        {
            Log::error('Mailer failed with tech mail error!');
        }
    }
}