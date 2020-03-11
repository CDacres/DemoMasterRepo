<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-body table-responsive">
                        <?php echo $this->load->view(THEME_FOLDER . '/administrator/exceptions/snippets/exception_menu', ['snippet' => 'audit'], true);?>
                        <br />
                        <h3>Payments</h3>
                        <?php
                            if (isset($payment_multi_audit_results))
                            {
                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="payment_multi_audit" visibility="hidden">Multiple audit rows for same status (<?php echo $payment_multi_audit_results;?>)</h4>
                                <?php
                                    if (isset($payment_multi_audit) && count($payment_multi_audit) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/payment_multi_audit');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Status</th>
                                                    <th>Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="payment_multi_audit_rows" style="display: none;">
                                                <?php
                                                    foreach ($payment_multi_audit as $multi_payment)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $multi_payment['payment_id'];?></td>
                                                            <td><?php echo $multi_payment['payment_status'];?></td>
                                                            <td><?php echo $multi_payment['payment_count'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                            if (isset($payment_missing_audit_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="payment_missing_audit" visibility="hidden">Missing audit rows (<?php echo $payment_missing_audit_results;?>)</h4>
                                <?php
                                    if (isset($payment_missing_audit) && count($payment_missing_audit) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/payment_missing_audit');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody id="payment_missing_audit_rows" style="display: none;">
                                                <?php
                                                    foreach ($payment_missing_audit as $miss_payment)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $miss_payment['payment_id'];?></td>
                                                            <td><?php echo $miss_payment['payment_status'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                                        ?>
                        <br />
                        <h3>Reservations</h3>
                        <?php
                            if (isset($reservation_multi_audit_results))
                            {
                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="reservation_multi_audit" visibility="hidden">Multiple audit rows for same status (<?php echo $reservation_multi_audit_results;?>)</h4>
                                <?php
                                    if (isset($reservation_multi_audit) && count($reservation_multi_audit) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/reservation_multi_audit');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Status</th>
                                                    <th>Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="reservation_multi_audit_rows" style="display: none;">
                                                <?php
                                                    foreach ($reservation_multi_audit as $multi_res)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $multi_res['reservation_id'];?></td>
                                                            <td><?php echo $multi_res['reservation_status'];?></td>
                                                            <td><?php echo $multi_res['reservation_count'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                            if (isset($reservation_missing_audit_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="reservation_missing_audit" visibility="hidden">Missing audit rows (<?php echo $reservation_missing_audit_results;?>)</h4>
                                <?php
                                    if (isset($reservation_missing_audit) && count($reservation_missing_audit) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/reservation_missing_audit');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody id="reservation_missing_audit_rows" style="display: none;">
                                                <?php
                                                    foreach ($reservation_missing_audit as $miss_res)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $miss_res['reservation_id'];?></td>
                                                            <td><?php echo $miss_res['reservation_status'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                                        ?>
                        <br />
                        <h3>Enquiries</h3>
                        <?php
                            if (isset($enquiry_multi_audit_results))
                            {
                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="enquiry_multi_audit" visibility="hidden">Multiple audit rows for same status (<?php echo $enquiry_multi_audit_results;?>)</h4>
                                <?php
                                    if (isset($enquiry_multi_audit) && count($enquiry_multi_audit) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/enquiry_multi_audit');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Status</th>
                                                    <th>Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="enquiry_multi_audit_rows" style="display: none;">
                                                <?php
                                                    foreach ($enquiry_multi_audit as $multi_enq)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $multi_enq['enquiry_id'];?></td>
                                                            <td><?php echo $multi_enq['enquiry_status'];?></td>
                                                            <td><?php echo $multi_enq['enquiry_count'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                            if (isset($enquiry_missing_audit_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="enquiry_missing_audit" visibility="hidden">Missing audit rows (<?php echo $enquiry_missing_audit_results;?>)</h4>
                                <?php
                                    if (isset($enquiry_missing_audit) && count($enquiry_missing_audit) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/enquiry_missing_audit');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Status</th>
                                                </tr>
                                            </thead>
                                            <tbody id="enquiry_missing_audit_rows" style="display: none;">
                                                <?php
                                                    foreach ($enquiry_missing_audit as $miss_enq)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $miss_enq['enquiry_id'];?></td>
                                                            <td><?php echo $miss_enq['enquiry_status'];?></td>
                                                        </tr>
                                                        <?php
                                                    }
                                                        ?>
                                            </tbody>
                                        </table>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<div>None</div>';
                                    }
                            }
                                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>