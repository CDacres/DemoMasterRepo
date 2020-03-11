<table class="table table-hover smalltable text-left">
    <thead>
        <tr>
            <th></th>
            <?php
                foreach ($period as $date)
                {
                    echo '<th>' . $date->format("j M Y") . '</th>';
                }
            ?>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Enquiries</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['enq_number'][$date->format("Y-m-d")]))?$daily_totals['enq_number'][$date->format("Y-m-d")]:0) . '</td>';
                }
            ?>
        </tr>
        <tr>
            <td>Bookings</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['res_number'][$date->format("Y-m-d")]))?$daily_totals['res_number'][$date->format("Y-m-d")]:0) . '</td>';
                }
            ?>
        </tr>
        <?php
            if (isset($daily_totals['sources']))
            {
                foreach (array_keys($daily_totals['sources']) as $source)
                {
                    echo '<tr><td> - ' . $source . '</td>';
                    foreach ($period as $date)
                    {
                        echo '<td>' . ((isset($daily_totals['source'][$date->format("Y-m-d")][$source]))?$daily_totals['source'][$date->format("Y-m-d")][$source]:0) . '</td>';
                    }
                    echo '</tr>';
                }
            }
        ?>
        <tr>
            <td>Price</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['price'][$date->format("Y-m-d")]))?format_price($daily_totals['price'][$date->format("Y-m-d")]):0) . '</td>';
                }
            ?>
        </tr>
    <!--                                <tr>
            <td>Revenue</td>
            <?php
    //                                        foreach ($period as $date)
    //                                        {
    //                                            echo '<td>' . ((isset($daily_totals['revenue'][$date->format("Y-m-d")]))?format_price($daily_totals['revenue'][$date->format("Y-m-d")]):0) . '</td>';
    //                                        }
            ?>
        </tr> -->
        <tr>
            <td>Accepted (number)</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['accept_res_number'][$date->format("Y-m-d")]))?$daily_totals['accept_res_number'][$date->format("Y-m-d")]:0) . '</td>';
                }
            ?>
        </tr>
        <tr>
            <td>Accepted (revenue)</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['accept_res_revenue'][$date->format("Y-m-d")]))?format_price($daily_totals['accept_res_revenue'][$date->format("Y-m-d")]):0) . '</td>';
                }
            ?>
        </tr>
        <tr>
            <td> - Accepted (extra fee)</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['accept_res_extra_fee'][$date->format("Y-m-d")]))?format_price($daily_totals['accept_res_extra_fee'][$date->format("Y-m-d")]):0) . '</td>';
                }
            ?>
        </tr>
        <tr>
            <td> - Accepted (flexible fee)</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['accept_res_flexible_fee'][$date->format("Y-m-d")]))?format_price($daily_totals['accept_res_flexible_fee'][$date->format("Y-m-d")]):0) . '</td>';
                }
            ?>
        </tr>
        <tr>
            <td> - Accepted (price control fee)</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['accept_res_price_control_fee'][$date->format("Y-m-d")]))?format_price($daily_totals['accept_res_price_control_fee'][$date->format("Y-m-d")]):0) . '</td>';
                }
            ?>
        </tr>
        <tr>
            <td>Closed (revenue)</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['closed_rev'][$date->format("Y-m-d")]))?format_price($daily_totals['closed_rev'][$date->format("Y-m-d")]):0) . '</td>';
                }
            ?>
        </tr>
        <tr>
            <td>Need Switch (number)</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['switch_number'][$date->format("Y-m-d")]))?$daily_totals['switch_number'][$date->format("Y-m-d")]:0) . '</td>';
                }
            ?>
        </tr>
        <tr>
            <td>Successful Switch (number)</td>
            <?php
                foreach ($period as $date)
                {
                    echo '<td>' . ((isset($daily_totals['switchcom_number'][$date->format("Y-m-d")]))?$daily_totals['switchcom_number'][$date->format("Y-m-d")]:0) . '</td>';
                }
            ?>
        </tr>
    </tbody>
</table>
<?php
    if (count($daily_performance) > 0)
    {
        ksort($daily_performance);
        foreach ($daily_performance as $person => $sources)
        {
?>
            <h2><?php echo $person;?></h2>
            <table class="table table-hover smalltable text-left">
                <thead>
                    <tr>
                        <th></th>
                        <?php
                            foreach ($period as $date)
                            {
                                echo '<th>' . $date->format("j M Y") . '</th>';
                            }
                        ?>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        ksort($sources);
                        $totalPrice = [];
                        $totalRevenue = [];
                        foreach ($sources as $sourceKey => $days)
                        {
                            echo '<tr><td>' . $sourceKey . '</td>';
                            foreach ($period as $date)
                            {
                                echo '<td>' . ((isset($days[$date->format("Y-m-d")]['number']))?$days[$date->format("Y-m-d")]['number']:0) . '</td>';
                            }
                            echo '</tr><tr><td> - Price</td>';
                            foreach ($period as $date)
                            {
                                echo '<td>';
                                $dayNo = $date->format("Y-m-d");
                                if (isset($days[$dayNo]['price']))
                                {
                                    (isset($totalPrice[$dayNo])?$totalPrice[$dayNo] += $days[$dayNo]['price']:$totalPrice[$dayNo] = $days[$dayNo]['price']);
                                    echo format_price($days[$dayNo]['price']);
                                }
                                else
                                {
                                    echo '0';
                                }
                                echo '</td>';
                            }
                            echo '</tr><tr><td> - Revenue</td>';
                            foreach ($period as $date)
                            {
                                echo '<td>';
                                $dayNo = $date->format("Y-m-d");
                                if (isset($days[$dayNo]['revenue']))
                                {
                                    (isset($totalRevenue[$dayNo])?$totalRevenue[$dayNo] += $days[$dayNo]['revenue']:$totalRevenue[$dayNo] = $days[$dayNo]['revenue']);
                                    echo format_price($days[$dayNo]['revenue']);
                                }
                                else
                                {
                                    echo '0';
                                }
                                echo '</td>';
                            }
                            echo '</tr><tr><td> - Extra Fee</td>';
                            foreach ($period as $date)
                            {
                                echo '<td>';
                                $dayNo = $date->format("Y-m-d");
                                if (isset($days[$dayNo]['rev_extra_fee']))
                                {
                                    echo format_price($days[$dayNo]['rev_extra_fee']);
                                }
                                else
                                {
                                    echo '0';
                                }
                                echo '</td>';
                            }
                            echo '</tr><tr><td> - Flexible Fee</td>';
                            foreach ($period as $date)
                            {
                                echo '<td>';
                                $dayNo = $date->format("Y-m-d");
                                if (isset($days[$dayNo]['rev_flexible_fee']))
                                {
                                    echo format_price($days[$dayNo]['rev_flexible_fee']);
                                }
                                else
                                {
                                    echo '0';
                                }
                                echo '</td>';
                            }
                            echo '</tr><tr><td> - Price Control Fee</td>';
                            foreach ($period as $date)
                            {
                                echo '<td>';
                                $dayNo = $date->format("Y-m-d");
                                if (isset($days[$dayNo]['rev_price_control_fee']))
                                {
                                    echo format_price($days[$dayNo]['rev_price_control_fee']);
                                }
                                else
                                {
                                    echo '0';
                                }
                                echo '</td>';
                            }
                            echo '</tr>';
                        }
                        echo '<tr><td>Total Price</td>';
                        foreach ($period as $date)
                        {
                            echo '<td>' . (isset($totalPrice[$date->format("Y-m-d")])?format_price($totalPrice[$date->format("Y-m-d")]):'0') . '</td>';
                        }
                        echo '</tr><tr><td>Total Revenue</td>';
                        foreach ($period as $date)
                        {
                            echo '<td>' . (isset($totalRevenue[$date->format("Y-m-d")])?format_price($totalRevenue[$date->format("Y-m-d")]):'0') . '</td>';
                        }
                        echo '</tr>';
                        if (isset($daily_switch[$person]))
                        {
                            echo '<tr><td>Total Switches</td>';
                            foreach ($period as $date)
                            {
                                echo '<td>' . (isset($daily_switch[$person][$date->format("Y-m-d")])?$daily_switch[$person][$date->format("Y-m-d")]:'0') . '</td>';
                            }
                            echo '</tr>';
                        }
                    ?>
                </tbody>
            </table>
            <?php
        }
    }
    elseif (count($daily_switch) > 0)
    {
        ksort($daily_switch);
        foreach ($daily_switch as $person => $sources)
        {
            ?>
            <h2><?php echo $person;?></h2>
            <table class="table table-hover smalltable text-left">
                <thead>
                    <tr>
                        <th></th>
                        <?php
                            foreach ($period as $date)
                            {
                                echo '<th>' . $date->format("j M Y") . '</th>';
                            }
                        ?>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Total Switches</td>
                        <?php
                            foreach ($period as $date)
                            {
                                echo '<td>' . (isset($daily_switch[$person][$date->format("Y-m-d")])?$daily_switch[$person][$date->format("Y-m-d")]:'0') . '</td>';
                            }
                        ?>
                    </tr>
                </tbody>
            </table>
            <?php
        }
    }