<?php
foreach ($data->get('payment_details')->object() as $payment_detail)
{
    if ($payment_detail->get('payment_type_id') != Payment_Type::VENUEINVOICE)
    {
        if ($payment_detail->get('payment_type_id') == Payment_Type::INVOICE)
        {
            echo '<a class="zc_invoice_payment pointer" zc_object_id="' . $payment_detail->get_id() . '" zc_reservation_id="' . $data->get_id() . '" data-toggle="modal" data-target="#mainModal" title="Change the invoice payment to braintree or bacs payment.">' . $payment_detail->get('external_reference') . '</a>';
        }
        elseif ($payment_detail->get('payment_type_id') == Payment_Type::BRAINTREE)
        {
            echo '<a href="https://www.braintreegateway.com/merchants/wqndsmqq8kxbxy4h/transactions/' . $payment_detail->get('external_reference') . '" target="_blank">' . $payment_detail->get('external_reference') . '</a>';
        }
        else
        {
            echo $payment_detail->get('external_reference');
            if (!$payment_detail->is_null('paid_date') && !$payment_detail->is_null('account'))
            {
                echo ' (' . $payment_detail->get('paid_date') . ', ' . $payment_detail->get('account') . ')';
            }
        }
    }
    else
    {
        echo 'Pay at Venue (' . $payment_detail->get('external_reference') . ')';
    }
    echo ' - <b>' . $payment_detail->get('status_name') . '</b> (' . $payment_detail->wrangle('price')->formatted(true) . ')<br />';
}
$totalPayment = format_price($data->get('payment_details')->get_total_amount());
echo '<b>Total: ';
if ($data->wrangle('total_price')->round_to_currency_quantum() != $totalPayment)
{
  echo '<span style="color: red">' . $totalPayment . '</span> - payment total doesn\'t match transaction price';
}
else
{
  echo $totalPayment;
}
echo '</b><br />';