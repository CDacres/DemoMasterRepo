<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Currency extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    public function cron()
    {
        $emailModel = Model__email::class;
        $this->load->model($emailModel);
        try
        {
            $eur = $this->_currency_curl('http://api.fixer.io/latest?base=EUR&symbols=GBP,USD');
            $gbp = $this->_currency_curl('http://api.fixer.io/latest?base=GBP&symbols=EUR,USD');
            $usd = $this->_currency_curl('http://api.fixer.io/latest?base=USD&symbols=EUR,GBP');
            $currencyChangeModel = Model__currency_change::class;
            $this->load->model($currencyChangeModel);
            $currencies = $this->$currencyChangeModel->get_currency_change_collection();
            foreach ($currencies->object() as $currency_change)
            {
                if ($currency_change->get('currFrom') != $currency_change->get('currInto'))
                {
                    $currencyArr = $currency_change->get('currFrom');
                    $currencyTo = strtoupper($currency_change->get('currInto'));
                    if (isset($currencyArr))
                    {
                        if ($currencyArr == 'eur' && isset($eur))
                        {
                            $currency_change->set('rate', $eur->rates->$currencyTo);
                        }
                        elseif ($currencyArr == 'gbp' && isset($gbp))
                        {
                            $currency_change->set('rate', $gbp->rates->$currencyTo);
                        }
                        elseif ($currencyArr == 'usd' && isset($usd))
                        {
                            $currency_change->set('rate', $usd->rates->$currencyTo);
                        }
                        $this->$currencyChangeModel->insert_update($currency_change);
                    }
                }
            }
        }
        catch (Exception $ex)
        {
            $this->$emailModel->sendAdminMail('email_subject_admin_exception', 'admin_exception', ['{message}' => $ex->getMessage()], 'admin_failed', 'exception');
        }
    }

    private function _currency_curl($url)
    {
        $currency_data = null;
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_TIMEOUT, 10);
        $result = curl_exec($ch);
        curl_close($ch);
        if ($result)
        {
            $currency_data = json_decode($result);
        }
        return $currency_data;
    }
}