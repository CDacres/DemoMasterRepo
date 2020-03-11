<?php
    if (!$bookings->is_null_object() && $bookings->get_count() > 0)
    {
        foreach ($bookings->object() as $booking)
        {
?>
            <tr>
                <td>
                    <span class="label label-<?php echo $booking->get_status_label_colour()['name'];?>"><?php echo $lang->line($booking->get('status_name'));?></span>
                </td>
                <td style="max-width:190px;">
                    <?php
                        if ($booking->is_true('venue_enabled') && $booking->is_true('venue_approved'))
                        {
                    ?>
                            <a target="_blank" href="<?php echo get_venue_url($booking);?>" title="<?php echo $booking->get('venue_name');?>"><?php echo $booking->get('venue_name');?></a>
                            <?php
                        }
                        else
                        {
                            echo $booking->get('venue_name') . ' (disabled)';
                        }
                        echo '<br />';
                        if ($booking->is_true('venue_enabled') && $booking->is_true('venue_approved') && $booking->is_true('room_enabled') && $booking->is_true('room_approved'))
                        {
                            ?>
                            <a target="_blank" href="<?php echo get_room_url($booking);?>" title="<?php echo $booking->get('room_name');?>"><?php echo $booking->get('room_name');?></a>
                            <?php
                        }
                        else
                        {
                            echo $booking->get('room_name') . ' (disabled)';
                        }
                        echo '<br />' . $booking->get('venue_address');
                            ?>
                </td>
                <td class="booking-dates">
                    <?php echo $booking->wrangle('reservation_start_date_time')->formatted('admin_full');?>
                    <br />
                    <?php echo $booking->wrangle('reservation_end_date_time')->formatted('admin_full');?>
                </td>
                <td>
                    <?php
                        echo $booking->wrangle('total_price')->formatted(true);
                        if (!$booking->is_null('client_discount') && !$booking->is_null('discount_applied'))
                        {
                            echo '<br />' . $lang->line('common_member_discount', $booking->get('discount_applied'));
                        }
                        $venue_invoice = false;
                        foreach ($booking->get('payment_details')->object() as $payment_detail)
                        {
                            if ($payment_detail->get('payment_type_id') == Payment_Type::VENUEINVOICE)
                            {
                                $venue_invoice = true;
                            }
                        }
                        if ($venue_invoice)
                        {
                            echo '<br /><span>(' . $lang->line('dashboard_pay_venue') . ')</span>';
                        }
                    ?>
                </td>
                <td>
                    <ul class="list-unstyled">
                        <li>
                            <a href="/<?php echo $country_lang_url;?>/messages/conversation/<?php echo $booking->get_id();?>"><?php echo $lang->line('dashboard_table_history');?></a>
                        </li>
                        <?php
                            if ($booking->is_progressing_naturally() || $booking->has_been_cancelled(false))
                            {
                        ?>
                                <li>
                                    <a class="zc_receipt_page pointer" data-toggle="modal" data-target="#full_modal" zc_object_id="<?php echo $booking->get_id();?>"><?php echo $lang->line('dashboard_table_receipt');?></a>
                                </li>
                                <?php
                            }
                                ?>
                    </ul>
                </td>
                <td>
                    <?php
                        if ($booking->is_true('venue_enabled') && $booking->is_true('venue_approved') && $booking->is_true('room_enabled') && $booking->is_true('room_approved'))
                        {
                    ?>
                            <a target="_blank" href="<?php echo get_room_url($booking);?>">
                                <button class="btn btn-primary btn-sm" type="button"><?php echo $lang->line('dashboard_table_book_button');?></button>
                            </a>
                            <?php
                        }
                            ?>
                </td>
            </tr>
            <?php
        }
    }