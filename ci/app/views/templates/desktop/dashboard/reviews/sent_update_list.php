<?php
    foreach ($review_audits->object() as $review_audit)
    {
?>
        <tr class="text-left">
            <td class="v-align-middle"><?php echo $review_audit->get('first_name');?></td>
            <td class="v-align-middle"><?php echo $review_audit->get('email');?></td>
            <td class="v-align-middle"><?php echo $review_audit->get('venue_name');?></td>
            <td class="v-align-middle"><?php echo $review_audit->wrangle('created_date')->formatted();?></td>
            <td class="v-align-middle">
                <?php
                    if ($review_audit->is_null('review_token'))
                    {
                        echo $lang->line('dashboard_review_completed');
                    }
                    else
                    {
                        echo $lang->line('dashboard_review_sent');
                    }
                ?>
            </td>
        </tr>
        <?php
    }