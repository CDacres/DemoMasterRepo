<ul class="nav nav-tabs" role="tablist">
    <li role="presentation" class="<?php echo (($snippet == 'audit')?'active':'');?>">
        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/audit');?>">Audit Issues</a>
    </li>
    <li role="presentation" class="<?php echo (($snippet == 'asset')?'active':'');?>">
        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/asset');?>">Asset Issues</a>
    </li>
    <li role="presentation" class="<?php echo (($snippet == 'company')?'active':'');?>">
        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/company');?>">Company Issues</a>
    </li>
    <li role="presentation" class="<?php echo (($snippet == 'venue')?'active':'');?>">
        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/venue');?>">Venue Issues</a>
    </li>
    <li role="presentation" class="<?php echo (($snippet == 'room')?'active':'');?>">
        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/room');?>">Room Issues</a>
    </li>
    <li role="presentation" class="<?php echo (($snippet == 'reservation')?'active':'');?>">
        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/reservation');?>">Reservation Issues</a>
    </li>
    <li role="presentation" class="<?php echo (($snippet == 'user')?'active':'');?>">
        <a href="<?php echo site_url($country_lang_url . '/administrator/exceptions/user');?>">User Issues</a>
    </li>
</ul>