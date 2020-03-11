<?php
if ($venue_payments->exists_in_db())
{
    $runningTotal = 0;
    foreach ($venue_payments->object() as $venue_payment)
    {
        $runningTotal += $venue_payment->get('amount');
        echo '<br />' . $venue_payment->wrangle('date_time')->formatted() . ': ' . $venue_payment->wrangle('payment_amount')->formatted(true) . ((!$venue_payment->is_null('first_name'))?' (' . $venue_payment->wrangle('full_name')->formatted() . ')':'');
    }
    echo '<br /><b>Total: ' . $venue_payment->wrangle('payment_amount')->symbols() . format_price($runningTotal) . '</b>';
}
else
{
    echo '<br />- None';
}