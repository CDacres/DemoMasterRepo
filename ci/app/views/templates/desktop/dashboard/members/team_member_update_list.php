<?php
    if (!$members->is_null_object() && $assetId != '' && $members->get_count() > 0)
    {
        foreach ($members->object() as $member)
        {
?>
            <tr>
                <td><?php echo $member->wrangle('full_name')->formatted();?></td>
                <td><?php echo $member->get('email');?></td>
                <td>
                    <?php
                        if (!$member->is_null('company_privilege') && $member->get('company_privilege') == Runt_User_Asset_Privilege::get_top_privilege())
                        {
                            echo $lang->line('dashboard_company_admin');
                        }
                        else
                        {
                            $member_venues = [];
                            foreach ($member->get('venue_privileges')->object() as $member_venue)
                            {
                                $member_venues[] = $member_venue->get('name');
                            }
                            echo implode(', ', $member_venues);
                        }
                    ?>
                </td>
                <td>
                    <a href="#" data-assetid="<?php echo $assetId;?>" data-id="<?php echo $member->get_id();?>" class="zc_edit_member_btn"><?php echo $lang->line('common_edit');?></a>
                </td>
            </tr>
            <?php
        }
    }