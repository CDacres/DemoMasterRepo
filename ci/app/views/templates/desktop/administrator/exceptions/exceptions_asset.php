<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-body table-responsive">
                        <?php echo $this->load->view(THEME_FOLDER . '/administrator/exceptions/snippets/exception_menu', ['snippet' => 'asset'], true);?>
                        <br />
                        <?php
                            if (isset($asset_missing_owner_results))
                            {
                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="asset_missing_owner" visibility="hidden">Assets without any users with permissions (<?php echo $asset_missing_owner_results;?>)</h4>
                                <?php
                                    if (isset($asset_missing_owner) && count($asset_missing_owner) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/asset_missing_owner');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Asset (type) (ID)</th>
                                                </tr>
                                            </thead>
                                            <tbody id="asset_missing_owner_rows" style="display: none;">
                                                <?php
                                                    foreach ($asset_missing_owner as $miss_asset_owner)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <?php
                                                                    $hasLink = false;
                                                                    if ($miss_asset_owner['venue_name'] != null)
                                                                    {
                                                                        $hasLink = true;
                                                                        echo '<a href="/venues/' . $miss_asset_owner['ref_id'] . '" target="_blank">' . trim($miss_asset_owner['venue_name']);
                                                                    }
                                                                    elseif ($miss_asset_owner['room_name'] != null)
                                                                    {
                                                                        $hasLink = true;
                                                                        echo '<a href="/rooms/' . $miss_asset_owner['ref_id'] . '" target="_blank">' . trim($miss_asset_owner['room_name']);
                                                                    }
                                                                    echo ' (' . $miss_asset_owner['asset_type'] . ') (' . $miss_asset_owner['ref_id'] . ')';
                                                                    if ($hasLink)
                                                                    {
                                                                        echo '</a>';
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