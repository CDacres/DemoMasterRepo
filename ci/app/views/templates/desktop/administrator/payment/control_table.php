<?php
    if (count($currencies) > 0)
    {
?>
        <table class="table table-hover smalltable text-left">
            <thead>
                <tr>
                    <th>Currency</th>
                    <th>Currently owed to venues for past reservations</th>
                    <th>Venue VAT for past reservations</th>
                    <th>Client VAT for past reservations</th>
                    <th>Currently held for future meetings</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($currencies->object() as $currency)
                    {
                        echo '<tr class="text-left"><td>' . $currency->get('code') . '</td>';
                        if (isset($data[$currency->get('code')]))
                        {
                            echo '<td>' . ((isset($data[$currency->get('code')]['payout_total']))?round($data[$currency->get('code')]['payout_total'], 2):0) . '</td>';
                            echo '<td>' . ((isset($data[$currency->get('code')]['venue_vat_total']))?round($data[$currency->get('code')]['venue_vat_total'], 2):0) . '</td>';
                            echo '<td>' . ((isset($data[$currency->get('code')]['client_vat_total']))?round($data[$currency->get('code')]['client_vat_total'], 2):0) . '</td>';
                            echo '<td>' . ((isset($data[$currency->get('code')]['payment_amo']))?round($data[$currency->get('code')]['payment_amo'], 2):0) . '</td>';
                            echo '<td>' . ((isset($data[$currency->get('code')]['total']))?round($data[$currency->get('code')]['total'], 2):0) . '</td>';
                        }
                        else
                        {
                            echo '<td>0</td><td>0</td><td>0</td><td>0</td><td>0</td>';
                        }
                        echo '<tr>';
                    }
                ?>
            </tbody>
        </table>
        <?php
    }
    else
    {
        echo 'No results';
    }