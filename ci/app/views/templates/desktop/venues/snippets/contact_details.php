<?php
    if (!$data->is_null('phone') && $data->data_not_empty('phone'))
    {
        echo $data->wrangle('phone')->get_phone_html() . '<br />';
    }
    if (!$data->is_null('website') && $data->data_not_empty('website'))
    {
        echo $data->wrangle('website')->get_website_html(false) . '<br />';
    }
?>
<a data-assetid="<?php echo $data->get_asset_id();?>" data-id="<?php echo $data->get_id();?>" class="zc_contact_edit pointer">Edit Main Contact</a>
<div class="zc_contact_enc select select-block" style="display: none;" data-assetid="<?php echo $data->get_asset_id();?>" data-id="<?php echo $data->get_id();?>">
    <select class="zc_contact" data-assetid="<?php echo $data->get_asset_id();?>" data-id="<?php echo $data->get_id();?>">
        <?php
            foreach ($data->get('contact_details')->object() as $contacts)
            {
                echo '<option value="' . $contacts->get('user_id') . '"';
                if ($contacts->get('user_id') == $data->get('main_contact'))
                {
                    echo ' selected';
                }
                echo '>' . $contacts->wrangle('full_name')->formatted() . '</option>';
            }
        ?>
    </select>
</div>
<a data-assetid="<?php echo $data->get_asset_id();?>" data-id="<?php echo $data->get_id();?>" class="zc_contact_save pointer" style="display: none;">Save</a>
<a data-assetid="<?php echo $data->get_asset_id();?>" data-id="<?php echo $data->get_id();?>" class="zc_contact_cancel pointer" style="display: none;">Cancel</a>
<?php
    foreach ($data->get('contact_details')->object() as $contact_details)
    {
        echo '<br />';
        if ($contact_details->get('role_id') != User::ADMINUSER)
        {
            echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $contact_details->get('user_id') . '">Adopt</a> - ';
        }
        echo $contact_details->wrangle('full_name')->formatted() . ': ' . $contact_details->wrangle('email')->get_email_html(null, false) . ' · ' . $contact_details->wrangle('phone_number')->get_phone_html();
    }