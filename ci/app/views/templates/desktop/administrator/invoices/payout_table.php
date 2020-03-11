<?php
    if (count($payout_totals) > 0)
    {
?>
        <table class="table text-left">
            <thead>
                <tr>
                    <th></th>
                    <th>Paid</th>
                    <th>Unpaid</th>
                    <th>Total</th>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($payout_totals as $currency => $totals)
                    {
                ?>
                        <tr>
                            <td><?php echo $currency;?></td>
                            <td><?php echo format_price($totals['total_payout_paid']);?></td>
                            <td><?php echo format_price($totals['total_payout_unpaid']);?></td>
                            <td><?php echo format_price($totals['total_payout_paid'] + $totals['total_payout_unpaid']);?></td>
                        </tr>
                        <?php
                    }
                        ?>
            </tbody>
        </table>
        <?php
    }