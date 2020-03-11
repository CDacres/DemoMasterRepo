<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-body table-responsive">
                        <?php echo $this->load->view(THEME_FOLDER . '/administrator/exceptions/snippets/exception_menu', ['snippet' => 'company'], true);?>
                        <br />
                        <?php
                            if (isset($company_missing_venues_results))
                            {
                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="company_missing_venues" visibility="hidden">Missing venues (<?php echo $company_missing_venues_results;?>)</h4>
                                <?php
                                    if (isset($company_missing_venues) && count($company_missing_venues) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/company_missing_venues');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Company (ID)</th>
                                                </tr>
                                            </thead>
                                            <tbody id="company_missing_venues_rows" style="display: none;">
                                                <?php
                                                    foreach ($company_missing_venues as $miss_venue_comp)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo trim($miss_venue_comp['company_name']) . ' (' . $miss_venue_comp['company_id'] . ')';?></td>
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
                            if (isset($company_missing_name_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="company_missing_name" visibility="hidden">Unnamed (<?php echo $company_missing_name_results;?>)</h4>
                                <?php
                                    if (isset($company_missing_name) && count($company_missing_name) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/company_missing_name');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Venue Count</th>
                                                </tr>
                                            </thead>
                                            <tbody id="company_missing_name_rows" style="display: none;">
                                                <?php
                                                    foreach ($company_missing_name as $unnamed_comp)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $unnamed_comp['company_id'];?></td>
                                                            <td>
                                                                <?php
                                                                    echo $unnamed_comp['venue_count'];
                                                                    if ($unnamed_comp['venue_count'] > 0)
                                                                    {
                                                                        $unnamed_comp_venuesids = explode(",", $unnamed_comp['venue_ids']);
                                                                        $unnamed_comp_venuesid_total = count($unnamed_comp_venuesids);
                                                                        if ($unnamed_comp_venuesid_total > 0)
                                                                        {
                                                                            $unnamed_comp_venueid_count = 0;
                                                                            echo ' (';
                                                                            foreach ($unnamed_comp_venuesids as $unnamed_comp_venue_id)
                                                                            {
                                                                                ++$unnamed_comp_venueid_count;
                                                                                echo '<a href="/venues/' . $unnamed_comp_venue_id . '" target="_blank">' . $unnamed_comp_venue_id . '</a>' . (($unnamed_comp_venueid_count != $unnamed_comp_venuesid_total)?', ':'');
                                                                            }
                                                                            echo ')';
                                                                        }
                                                                    }
                                                                ?>
                                                            </td>
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