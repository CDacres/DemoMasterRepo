<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <?php echo $venue->get_id();?></p>
            </div>
        </div>
    </div>
</div>
<form>
    <?php echo $venue->get_html_data_input('id', null, 'hidden', 'zc_venue_id');?>
    <div class="space-top-2">
        <div class="form-group form-group-default">
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="commission_percent_frontend">Commission (%)</label>
                    <?php echo $venue->get_html_data_input('commission_percent_frontend', 'form-control zc_venue_commission_percent', 'text', 'zc_venue_commission_percent');?>
                </div>
            </div>
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <label for="zc_venue_vat_rate">VAT rate (%)</label>
                    <div class="select select-block">
                        <select id="zc_venue_vat_rate">
                            <?php
                                foreach ($vat_rates->object() as $vat_rate)
                                {
                                    if ($vat_rate->get('country_code') == $venue->get('country_code'))
                                    {
                                        echo '<option value="' . $vat_rate->get_id() . '"';
                                        if ($venue->get('vat_rate_id') == $vat_rate->get_id())
                                        {
                                            echo ' selected';
                                        }
                                        echo '>' . $vat_rate->get('vat_percentage') . '</option>';
                                    }
                                }
                            ?>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>