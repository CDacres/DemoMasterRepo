<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-body table-responsive">
                        <?php echo $this->load->view(THEME_FOLDER . '/administrator/exceptions/snippets/exception_menu', ['snippet' => 'user'], true);?>
                        <br />
                        <?php
                            if (isset($user_missing_profile_results))
                            {
                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="user_missing_profile" visibility="hidden">User missing profile (<?php echo $user_missing_profile_results;?>)</h4>
                                <?php
                                    if (isset($user_missing_profile) && count($user_missing_profile) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/user_missing_profile');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>ID</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody id="user_missing_profile_rows" style="display: none;">
                                                <?php
                                                    foreach ($user_missing_profile as $miss_user_profile)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td><?php echo $miss_user_profile['user_id'];?></td>
                                                            <td><?php echo $miss_user_profile['user_email'];?></td>
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
                            if (isset($user_with_privileges_non_assetowner_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="user_with_privileges_non_assetowner" visibility="hidden">User with permissions but not set as asset owner (<?php echo $user_with_privileges_non_assetowner_results;?>)</h4>
                                <?php
                                    if (isset($user_with_privileges_non_assetowner) && count($user_with_privileges_non_assetowner) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/user_with_privileges_non_assetowner');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Asset (type) (ID)</th>
                                                    <th>User (ID)</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody id="user_with_privileges_non_assetowner_rows" style="display: none;">
                                                <?php
                                                    foreach ($user_with_privileges_non_assetowner as $user_non_assetowner)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <?php
                                                                    $hasLink = false;
                                                                    if ($user_non_assetowner['venue_name'] != null)
                                                                    {
                                                                        $hasLink = true;
                                                                        echo '<a href="/venues/' . $user_non_assetowner['ref_id'] . '" target="_blank">' . trim($user_non_assetowner['venue_name']);
                                                                    }
                                                                    elseif ($user_non_assetowner['room_name'] != null)
                                                                    {
                                                                        $hasLink = true;
                                                                        echo '<a href="/rooms/' . $user_non_assetowner['ref_id'] . '" target="_blank">' . trim($user_non_assetowner['room_name']);
                                                                    }
                                                                    echo ' (' . $user_non_assetowner['asset_type'] . ') (' . $user_non_assetowner['ref_id'] . ')';
                                                                    if ($hasLink)
                                                                    {
                                                                        echo '</a>';
                                                                    }
                                                                ?>
                                                            </td>
                                                            <td><?php echo $user_non_assetowner['user_firstname'] . ' ' . $user_non_assetowner['user_lastname'] . ' (' . $user_non_assetowner['user_id'] . ')';?></td>
                                                            <td><?php echo $user_non_assetowner['user_email'];?></td>
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
                            if (isset($unenabled_user_asset_permission_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="unenabled_user_asset_permission" visibility="hidden">Assets with unenabled users with permissions (<?php echo $unenabled_user_asset_permission_results;?>)</h4>
                                <?php
                                    if (isset($unenabled_user_asset_permission) && count($unenabled_user_asset_permission) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/unenabled_user_asset_permission');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Asset (type) (ID)</th>
                                                    <th>User (ID)</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody id="unenabled_user_asset_permission_rows" style="display: none;">
                                                <?php
                                                    foreach ($unenabled_user_asset_permission as $unenabled_user_asset)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <?php
                                                                    $hasLink = false;
                                                                    if ($unenabled_user_asset['venue_name'] != null)
                                                                    {
                                                                        $hasLink = true;
                                                                        echo '<a href="/venues/' . $unenabled_user_asset['ref_id'] . '" target="_blank">' . trim($unenabled_user_asset['venue_name']);
                                                                    }
                                                                    elseif ($unenabled_user_asset['room_name'] != null)
                                                                    {
                                                                        $hasLink = true;
                                                                        echo '<a href="/rooms/' . $unenabled_user_asset['ref_id'] . '" target="_blank">' . trim($unenabled_user_asset['room_name']);
                                                                    }
                                                                    echo ' (' . $unenabled_user_asset['asset_type'] . ') (' . $unenabled_user_asset['ref_id'] . ')';
                                                                    if ($hasLink)
                                                                    {
                                                                        echo '</a>';
                                                                    }
                                                                ?>
                                                            </td>
                                                            <td><?php echo $unenabled_user_asset['user_firstname'] . ' ' . $unenabled_user_asset['user_lastname'] . ' (' . $unenabled_user_asset['user_id'] . ')';?></td>
                                                            <td><?php echo $unenabled_user_asset['user_email'];?></td>
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
                            if (isset($unenabled_user_asset_main_contact_results))
                            {
                                        ?>
                                <br />
                                <h4 class="exception_table_display" data-id="unenabled_user_asset_main_contact" visibility="hidden">Venue with unenabled users as main contact (<?php echo $unenabled_user_asset_main_contact_results;?>)</h4>
                                <?php
                                    if (isset($unenabled_user_asset_main_contact) && count($unenabled_user_asset_main_contact) > 0)
                                    {
                                ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/exception_csv/unenabled_user_asset_main_contact');?>" target="_blank">
                                            <img src="/css/images/common/excel.png" height="35" alt="Download" />
                                        </a>
                                        <table class="table table-hover text-left">
                                            <thead>
                                                <tr>
                                                    <th>Venue (ID)</th>
                                                    <th>Venue Approved</th>
                                                    <th>User (ID)</th>
                                                    <th>Email</th>
                                                </tr>
                                            </thead>
                                            <tbody id="unenabled_user_asset_main_contact_rows" style="display: none;">
                                                <?php
                                                    foreach ($unenabled_user_asset_main_contact as $unenabled_user_main)
                                                    {
                                                ?>
                                                        <tr class="text-left">
                                                            <td>
                                                                <?php
                                                                    $hasLink = false;
                                                                    if ($unenabled_user_main['venue_name'] != null)
                                                                    {
                                                                        $hasLink = true;
                                                                        echo '<a href="/venues/' . $unenabled_user_main['venue_id'] . '" target="_blank">' . trim($unenabled_user_main['venue_name']);
                                                                    }
                                                                    echo ' (' . $unenabled_user_main['venue_id'] . ')';
                                                                    if ($hasLink)
                                                                    {
                                                                        echo '</a>';
                                                                    }
                                                                ?>
                                                            </td>
                                                            <td><?php echo $unenabled_user_main['venue_approved'];?></td>
                                                            <td><?php echo $unenabled_user_main['user_firstname'] . ' ' . $unenabled_user_main['user_lastname'] . ' (' . $unenabled_user_main['user_id'] . ')';?></td>
                                                            <td><?php echo $unenabled_user_main['user_email'];?></td>
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