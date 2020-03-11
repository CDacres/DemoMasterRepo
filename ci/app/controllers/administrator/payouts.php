<?php
if (!defined('BASEPATH')) exit('No direct script access allowed');

class Payouts extends Controller_Base__Admin
{
    public function index()
    {
        $modelPaymentPeriods = Model__payment_periods::class;
        $this->load->model($modelPaymentPeriods);
        $db_periods = $this->$modelPaymentPeriods->get_payment_period_collection();
        $all_periods = new DatePeriod(new DateTime('2014-03-05'), new DateInterval('P1M'), new DateTime('last day of +3 month')); //first reservation date to last month
        $periodArr = [];
        foreach ($all_periods as $period)
        {
            $periodArr[$period->format('Y') . "_" . $period->format('n')]['identifiers']['year'] = $period->format('Y');
            $periodArr[$period->format('Y') . "_" . $period->format('n')]['identifiers']['month'] = $period->format('n');
            $periodArr[$period->format('Y') . "_" . $period->format('n')]['status'] = 0;
        }
        foreach ($db_periods->object() as $db_period)
        {
            $periodArr[$db_period->get('period_year') . "_" . $db_period->get('period_month')]['status'] = 1;
        }
        $missing = array_filter($periodArr, function ($value) {
            return $value['status'] === 0;
        });
        if (count($missing) > 0)
        {
            foreach ($missing as $missingPeriod)
            {
                $newPeriod = new Payment_Period();
                $newPeriod->set('period_year', $missingPeriod['identifiers']['year']);
                $newPeriod->set('period_month', $missingPeriod['identifiers']['month']);
                $this->$modelPaymentPeriods->insert_update($newPeriod);
            }
            $this->data['payment_periods'] = $this->$modelPaymentPeriods->get_payment_period_collection();
        }
        else
        {
            $this->data['payment_periods'] = $db_periods;
        }
        $this->_add_js(auto_version('modals/reservation_audit.js'));
        $this->_add_js(auto_version('modals/invoices.js'));
        $this->_add_js(auto_version('modals/hubspot.js'));
        $this->_add_js(auto_version('administrator/admin.js'));
        $this->_add_js(auto_version('administrator/invoices.js'));
        $this->data['message_element'] = 'administrator/invoices/view_list_invoices';
        $this->_render();
    }

    public function update_invoice_table()
    {
        try
        {
            $period_id = $this->input->post('period_id', 'is_natural|required');
            $type = $this->input->post('type');
            $columns = [
                'Financial Entity',
                'Transaction',
                'Venue Price',
                'Com %',
                'Com',
                'Payout VAT',
                'Payout',
                'Left to pay',
                'Status',
                'To Do',
                'Number',
                'Bank Details',
                'Notes',
                'Contact'
            ];
            $payout_totals = [];
            $entity_reservations = [];
            $payment_totals = [];
            $entity_counts = [];
            $totalArr = [];
            $paidArr = [];
            $toPayEURArr = [];
            $toPayGBPArr = [];
            $toPayUSDArr = [];
            $attentionArr = [];
            $modelPaymentPeriods = Model__payment_periods::class;
            $this->load->model($modelPaymentPeriods);
            $period = $this->$modelPaymentPeriods->get_base_object_by_id($period_id);
            if ($period->exists_in_db())
            {
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                $reservations = $this->$modelReservations->get_reservations_by_period_run($period->get('period_year'), $period->get('period_month'));
                if ($reservations->exists_in_db())
                {
                    $date = new DateTime('last day of ' . $period->get('period_year') . '-' . $period->get('period_month'));
                    foreach ($reservations->object() as $reservation_entity)
                    {
                        if (!isset($entity_counts[$reservation_entity->get('financial_entity_id')]))
                        {
                            $entity_counts[$reservation_entity->get('financial_entity_id')] = [
                                'paid_count' => 0,
                                'to_pay_EUR_count' => 0,
                                'to_pay_GBP_count' => 0,
                                'to_pay_USD_count' => 0,
                                'attention_count' => 0,
                                'total_count' => 0,
                            ];
                        }
                        $entity_counts[$reservation_entity->get('financial_entity_id')]['paid_count'] += $reservation_entity->get('is_paid');
                        if ($reservation_entity->get('currency') == 'EUR')
                        {
                            $entity_counts[$reservation_entity->get('financial_entity_id')]['to_pay_EUR_count'] += $reservation_entity->get('to_pay_EUR_count');
                        }
                        elseif ($reservation_entity->get('currency') == 'GBP')
                        {
                            $entity_counts[$reservation_entity->get('financial_entity_id')]['to_pay_GBP_count'] += $reservation_entity->get('to_pay_GBP_count');
                        }
                        elseif ($reservation_entity->get('currency') == 'USD')
                        {
                            $entity_counts[$reservation_entity->get('financial_entity_id')]['to_pay_USD_count'] += $reservation_entity->get('to_pay_USD_count');
                        }
                        $entity_counts[$reservation_entity->get('financial_entity_id')]['attention_count'] += $reservation_entity->get('attention_count');
                        ++$entity_counts[$reservation_entity->get('financial_entity_id')]['total_count'];
                        if ($type == 'all' || $type == 'paid' && $reservation_entity->get('is_paid') || $type == 'to_pay_EUR' && $reservation_entity->get('to_pay_EUR_count') || $type == 'to_pay_GBP' && $reservation_entity->get('to_pay_GBP_count') || $type == 'to_pay_USD' && $reservation_entity->get('to_pay_USD_count') || $type == 'attention' && $reservation_entity->get('attention_count'))
                        {
                            if (!isset($payout_totals[$reservation_entity->get('currency')]))
                            {
                                $payout_totals[$reservation_entity->get('currency')] = [
                                    'total_payout_paid' => 0,
                                    'total_payout_unpaid' => 0
                                ];
                            }
                            $fin_data = '';
                            if (!$reservation_entity->is_null('financial_entity_financial_data') && $reservation_entity->get('financial_entity_financial_data') != 'null')
                            {
                                if ($reservation_entity->get('currency') == 'GBP')
                                {
                                    $fin_data = $reservation_entity->wrangle('financial_data')->formatted('sort_code') . ', ' . $reservation_entity->wrangle('financial_data')->formatted('account_code');
                                }
                                elseif ($reservation_entity->get('currency') == 'EUR')
                                {
                                    $fin_data = wordwrap($reservation_entity->wrangle('financial_data')->formatted('iban'), 4, " ", true) . ', ' . $reservation_entity->wrangle('financial_data')->formatted('bic');
                                }
                                elseif ($reservation_entity->get('currency') == 'USD')
                                {
                                    $fin_data = '';
                                }
                            }
                            if ($reservation_entity->is_true('is_paid'))
                            {
                                $payout_totals[$reservation_entity->get('currency')]['total_payout_paid'] += $reservation_entity->get_payout_amount();
                            }
                            else
                            {
                                $payout_totals[$reservation_entity->get('currency')]['total_payout_unpaid'] += $reservation_entity->get_payout_amount();
                            }
                            if (!isset($entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]))
                            {
                                $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')] = [
                                    'name' => $reservation_entity->get('financial_entity_name') . ' (' . $reservation_entity->get('financial_entity_id') . ')',
                                    'number' => $this->_get_invoice_number($reservation_entity->get('venue_country_code'), $reservation_entity->get('financial_entity_id'), $date),
                                    'user' => (!$reservation_entity->is_null('financial_account_user_id') ? $reservation_entity->wrangle('financial_account_user_name')->formatted() . ' (' . $reservation_entity->get('financial_account_user_id') . ')<br />' . $reservation_entity->wrangle('financial_account_user_email')->get_email_html() . $reservation_entity->wrangle('financial_account_user_phone')->get_phone_html() . '<br />' . (($reservation_entity->get('financial_account_user_role_id') != User::ADMINUSER) ? '<a target="_blank" href="/' . $this->data['country_lang_url'] . '/administrator/adopt_profile/' . $reservation_entity->get('financial_account_user_id') . '">Adopt</a>':''):''),
                                    'financial_data' => $fin_data,
                                    'notes' => $reservation_entity->get('invoice_notes'),
                                    'total_price' => 0,
                                    'total_venue_price' => 0,
                                    'commission_percent' => 0,
                                    'total_commission' => 0,
                                    'total_payout_vat' => 0,
                                    'total_payout' => 0,
                                    'total_count' => 0,
                                    'paid_count' => 0,
                                    'payment_diff' => false,
                                    'currency_symbol' => $reservation_entity->get('currency_symbol_left'),
                                    'cancelled_count' => 0,
                                    'total_venue_payment' => 0
                                ];
                            }
                            $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['total_price'] += $reservation_entity->get_transaction_price_total();
                            $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['total_venue_price'] += $reservation_entity->get('price');
                            $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['commission_percent'] += $reservation_entity->get_commission_rate();
                            $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['total_commission'] += $reservation_entity->get('toZipcube');
                            $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['total_payout_vat'] += (($reservation_entity->is_null('toVenue_vat'))?0:$reservation_entity->get('toVenue_vat'));
                            $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['total_payout'] += $reservation_entity->get_payout_amount();
                            ++$entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['total_count'];
                            $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['paid_count'] += $reservation_entity->get('is_paid');
                            if ($reservation_entity->wrangle('total_payment')->round_to_currency_quantum() != $reservation_entity->wrangle('total_price')->round_to_currency_quantum())
                            {
                                $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['payment_diff'] = true;
                            }
                            if ($reservation_entity->get('booking_closure_status') == Booking_Status::CANCELLED)
                            {
                                ++$entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['cancelled_count'];
                            }
                            foreach ($reservation_entity->get('venue_payments')->object() as $venue_payment)
                            {
                                if (!isset($payment_totals[$reservation_entity->get_id()]))
                                {
                                    $payment_totals[$reservation_entity->get_id()] = 0;
                                }
                                $payment_totals[$reservation_entity->get_id()] += $venue_payment->get('amount');
                                $entity_reservations[$reservation_entity->get('financial_entity_id')][$reservation_entity->get('venue_country_code')]['total_venue_payment'] += $venue_payment->get('amount');
                            }
                        }
                    }
                    if (count($entity_counts) > 0)
                    {
                        foreach ($entity_counts as $entity => $totals)
                        {
                            $totalArr[] = $entity;
                            if ($totals['paid_count'] == $totals['total_count'])
                            {
                                $paidArr[] = $entity;
                            }
                            if ($totals['to_pay_EUR_count'] > 0)
                            {
                                $toPayEURArr[] = $entity;
                            }
                            if ($totals['to_pay_GBP_count'] > 0)
                            {
                                $toPayGBPArr[] = $entity;
                            }
                            if ($totals['to_pay_USD_count'] > 0)
                            {
                                $toPayUSDArr[] = $entity;
                            }
                            if ($totals['attention_count'] > 0)
                            {
                                $attentionArr[] = $entity;
                            }
                        }
                    }
                }
            }
            else
            {
                $reservations = new Base__Null();
            }
            echo $reservations->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/administrator/invoices/invoice_table', ['columns' => $columns, 'country_lang_url' => $this->data['country_lang_url'], 'period_id' => $period->get_id(), 'reservations' => $reservations, 'entity_reservations' => $entity_reservations, 'payment_totals' => $payment_totals, 'type' => $type, 'total_count' => count($totalArr), 'paid_count' => count($paidArr), 'to_pay_EUR_count' => count($toPayEURArr), 'to_pay_GBP_count' => count($toPayGBPArr), 'to_pay_USD_count' => count($toPayUSDArr), 'attention_count' => count($attentionArr)], true), 'payout_html' => $this->load->view(THEME_FOLDER . '/administrator/invoices/payout_table', ['payout_totals' => $payout_totals], true)]);
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function view_invoice()
    {
        try
        {
            $period_id = $this->input->post('period_id', 'is_natural|required');
            $entity_id = $this->input->post('entity_id', 'is_natural|required');
            $country = $this->input->post('country', 'required');
            $language = $this->input->post('language', 'required');
            if (!isset(config_item('languages')[$language]))
            {
                $language = 'en';
            }
            $this->config->set_item('language_code', $language);
            $modelPaymentPeriods = Model__payment_periods::class;
            $this->load->model($modelPaymentPeriods);
            $period = $this->$modelPaymentPeriods->get_base_object_by_id($period_id);
            if ($period->exists_in_db())
            {
                $modelFinancialEntities = Model__financial_entities::class;
                $this->load->model($modelFinancialEntities);
                $fin_entity = $this->$modelFinancialEntities->get_financial_entity_object_by_id($entity_id);
                if ($fin_entity->exists_in_db())
                {
                    $modelVatRates = Model__vat_rates::class;
                    $this->load->model($modelVatRates);
                    $vat_rate = $this->$modelVatRates->get_default_vat_rate_by_country($country);
                    if ($vat_rate->exists_in_db())
                    {
                        $modelReservations = Model__reservations::class;
                        $this->load->model($modelReservations);
                        $reservations = $this->$modelReservations->get_reservations_by_financial_entity($fin_entity->get_id(), $country, $period->get('period_year'), $period->get('period_month'));
                        if ($reservations->exists_in_db())
                        {
                            $this->lang->load('common', $language);
                            $this->lang->load('dashboard', $language);
                            setlocale(LC_TIME, config_item('languages')[$language]['locale'], config_item('languages')[$language]['locale'] . '.utf8', config_item('languages')[$language]['locale'] . '.UTF-8');
                            $date = new DateTime('last day of ' . $period->get('period_year') . '-' . $period->get('period_month'));
                            $modelContactInfo = Model__contact_info::class;
                            $this->load->model($modelContactInfo);
                            $contact_info = $this->$modelContactInfo->get_default_contact_info_object();
                            $reservations_total = [
                                'total_venue_price' => 0,
                                'total_commission' => 0,
                                'total_payout_vat' => 0,
                                'total_payout' => 0,
                                'total_payout_due' => 0,
                                'currency' => $reservations->get_first()->get('currency')
                            ];
                            $payment_total = [];
                            foreach ($reservations->object() as $reservation_entity)
                            {
                                $reservations_total['total_venue_price'] += $reservation_entity->get('price');
                                $reservations_total['total_commission'] += $reservation_entity->get('toZipcube');
                                $reservations_total['total_payout_vat'] += (($reservation_entity->is_null('toVenue_vat'))?0:$reservation_entity->get('toVenue_vat'));
                                $reservations_total['total_payout'] += $reservation_entity->get_payout_amount();
                                $reservations_total['total_payout_due'] += $reservation_entity->get_payout_amount();
                                foreach ($reservation_entity->get('venue_payments')->object() as $venue_payment)
                                {
                                    if (!isset($payment_total[$reservation_entity->get_id()]))
                                    {
                                        $payment_total[$reservation_entity->get_id()] = 0;
                                    }
                                    $payment_total[$reservation_entity->get_id()] += $venue_payment->get('amount');
                                    $reservations_total['total_payout_due'] -= $venue_payment->get('amount');
                                }
                            }
                            $invoice_num = $this->_get_invoice_number($country, $fin_entity->get_id(), $date);
                            echo $fin_entity->get_as_ajax_response('Choosing that option gave an error.', false, ['html' => $this->load->view(THEME_FOLDER . '/administrator/invoices/view_invoice_doc', ['lang' => $this->data['lang'], 'contact_info' => $contact_info, 'date' => strftime("%b %d, %Y", $date->getTimestamp()), 'invoice_num' => $invoice_num, 'description' => $this->lang->line('dashboard_inv_bookings', strftime("%B", $date->getTimestamp())), 'phone_number_display' => $this->data['phone_number_display'], 'entity' => $fin_entity, 'vat_rate' => $vat_rate, 'reservations_total' => $reservations_total, 'payment_total' => $payment_total, 'reservations' => $reservations], true), 'invoice_save_as' => $fin_entity->get('name') . '-' . $invoice_num]);
                        }
                    }
                }
            }
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function payment_csv()
    {
        try
        {
            $period_id = $this->input->get('period', 'is_natural|required');
            $entity_id = $this->input->get('entity', 'is_natural|required');
            $country = $this->input->get('country', 'required');
            $modelPaymentPeriods = Model__payment_periods::class;
            $this->load->model($modelPaymentPeriods);
            $period = $this->$modelPaymentPeriods->get_base_object_by_id($period_id);
            if ($period->exists_in_db())
            {
                $modelFinancialEntities = Model__financial_entities::class;
                $this->load->model($modelFinancialEntities);
                $fin_entity = $this->$modelFinancialEntities->get_financial_entity_object_by_id($entity_id);
                if ($fin_entity->exists_in_db())
                {
                    $modelReservations = Model__reservations::class;
                    $this->load->model($modelReservations);
                    $reservations = $this->$modelReservations->get_reservations_by_financial_entity($fin_entity->get_id(), $country, $period->get('period_year'), $period->get('period_month'));
                    if ($reservations->exists_in_db())
                    {
                        $date = new DateTime('last day of ' . $period->get('period_year') . '-' . $period->get('period_month'));
                        $total_payout_due = 0;
                        foreach ($reservations->object() as $reservation_entity)
                        {
                            $total_payout_due += $reservation_entity->get_payout_amount();
                            foreach ($reservation_entity->get('venue_payments')->object() as $venue_payment)
                            {
                                $total_payout_due -= $venue_payment->get('amount');
                            }
                        }
                        $payment_data = [
                            [
                                'Name' => $fin_entity->get_id() . '-' . $fin_entity->get('name'),
                                'Recipient type' => 'COMPANY',
                                'Account number' => $fin_entity->wrangle('financial_data')->formatted('account_code'),
                                'Sort code or Routing number' => $fin_entity->wrangle('financial_data')->formatted('sort_code'),
                                'IBAN' => $reservation_entity->wrangle('financial_data')->formatted('iban'),
                                'BIC' => $reservation_entity->wrangle('financial_data')->formatted('bic'),
                                'Recipient bank country' => $country,
                                'Currency' => $reservations->get_first()->get('currency'),
                                'Amount' => round($total_payout_due, 2),
                                'Payment reference' => $this->_get_invoice_number($country, $fin_entity->get_id(), $date),
                                'Recipient country' => '',
                                'State or province' => '',
                                'Address line 1' => '',
                                'Address line 2' => '',
                                'City' => '',
                                'Postal code' => ''
                            ]
                        ];
                        $header_data = [
                            'Name',
                            'Recipient type',
                            'Account number',
                            'Sort code or Routing number',
                            'IBAN',
                            'BIC',
                            'Recipient bank country',
                            'Currency',
                            'Amount',
                            'Payment reference',
                            'Recipient country',
                            'State or province',
                            'Address line 1',
                            'Address line 2',
                            'City',
                            'Postal code'
                        ];
                        return $this->admin_csv_from_array($fin_entity->get('name') . '_' . $date->format('my'), $header_data, $payment_data);
                    }
                }
            }
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    public function batch_payment_csv()
    {
        try
        {
            $period_id = $this->input->get('period', 'is_natural|required');
            $currency = $this->input->get('currency', 'required');
            $modelPaymentPeriods = Model__payment_periods::class;
            $this->load->model($modelPaymentPeriods);
            $period = $this->$modelPaymentPeriods->get_base_object_by_id($period_id);
            if ($period->exists_in_db())
            {
                $modelReservations = Model__reservations::class;
                $this->load->model($modelReservations);
                $reservations = $this->$modelReservations->get_reservations_by_period_run($period->get('period_year'), $period->get('period_month'), $currency, true);
                if ($reservations->exists_in_db())
                {
                    $date = new DateTime('last day of ' . $period->get('period_year') . '-' . $period->get('period_month'));
                    $payment_data = [];
                    foreach ($reservations->object() as $reservation_entity)
                    {
                        if (!isset($payment_data[$reservation_entity->get('financial_entity_id')]))
                        {
                            $payment_data[$reservation_entity->get('financial_entity_id')] = [
                                'Name' => $reservation_entity->get('financial_entity_id') . '-' . $reservation_entity->get('financial_entity_name'),
                                'Recipient type' => 'COMPANY',
                                'Account number' => $reservation_entity->wrangle('financial_data')->formatted('account_code'),
                                'Sort code or Routing number' => $reservation_entity->wrangle('financial_data')->formatted('sort_code'),
                                'IBAN' => $reservation_entity->wrangle('financial_data')->formatted('iban'),
                                'BIC' => $reservation_entity->wrangle('financial_data')->formatted('bic'),
                                'Recipient bank country' => $reservation_entity->get('venue_country_code'),
                                'Currency' => $reservation_entity->get('currency'),
                                'Amount' => 0,
                                'Payment reference' => $this->_get_invoice_number($reservation_entity->get('venue_country_code'), $reservation_entity->get('financial_entity_id'), $date),
                                'Recipient country' => '',
                                'State or province' => '',
                                'Address line 1' => '',
                                'Address line 2' => '',
                                'City' => '',
                                'Postal code' => ''
                            ];
                        }
                        $payment_data[$reservation_entity->get('financial_entity_id')]['Amount'] += $reservation_entity->get_payout_amount();
                        foreach ($reservation_entity->get('venue_payments')->object() as $venue_payment)
                        {
                            $payment_data[$reservation_entity->get('financial_entity_id')]['Amount'] -= $venue_payment->get('amount');
                        }
                        $payment_data[$reservation_entity->get('financial_entity_id')]['Amount'] = round($payment_data[$reservation_entity->get('financial_entity_id')]['Amount'], 2);
                    }
                    $header_data = [
                        'Name',
                        'Recipient type',
                        'Account number',
                        'Sort code or Routing number',
                        'IBAN',
                        'BIC',
                        'Recipient bank country',
                        'Currency',
                        'Amount',
                        'Payment reference',
                        'Recipient country',
                        'State or province',
                        'Address line 1',
                        'Address line 2',
                        'City',
                        'Postal code'
                    ];
                    return $this->admin_csv_from_array('BulkPayout-for-' . $date->format('Y-m') . '-on-' . (new DateTime())->format('Y-m-d') . '-' . $currency, $header_data, $payment_data);
                }
            }
        }
        catch (Exception $ex)
        {
            echo $this->_generate_ajax_error($ex->getMessage());
        }
    }

    private function _get_invoice_number($country, $entityId, $date)
    {
        return 'ZIPINV' . $country . $entityId . '-' . $date->format('my');
    }
}
