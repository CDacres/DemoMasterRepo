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
                    <div class="select select-block">
                        <select class="zc_discount" zc_object_id="<?php echo $member->get_id();?>">
                            <?php
                                $discount = 0;
                                while ($discount <= 95)
                                {
                                    echo '<option value="' . $discount . '"' . (($member->get('discount') == $discount)?' selected':'') . '>' . (($discount == 100)?$lang->line('dashboard_free_member'):(($discount == 0)?$lang->line('dashboard_full_price'):$lang->line('dashboard_member_discount', $discount))) . '</option>';
                                    $discount += 5;
                                }
                            ?>
                        </select>
                    </div>
                </td>
            </tr>
            <?php
        }
    }