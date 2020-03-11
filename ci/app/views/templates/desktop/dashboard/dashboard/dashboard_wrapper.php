<div id="dashboard_page" class="dashboard-wrapper space-top-4 space-4">
    <?php
        if ($reserved_user->has_assets())
        {
    ?>
            <div class="row">
                <div class="col-xs-12 space-4">
                    <div class="notice green">
                        <div class="row bottom-m-1">
                            <div class="col-md-1 col-sm-2 col-xs-2">
                                <span class="glyphicon border glyphicon-flash" aria-hidden="true"></span>
                            </div>
                            <div class="col-md-11 col-sm-10 col-xs-10 left-p-0">
                                <h3><?php echo $lang->line('dashboard_live_booking');?></h3>
                                <span><?php echo $lang->line('dashboard_no_calls');?></span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2 col-md-offset-1 col-sm-2 col-sm-offset-2 col-xs-3 col-xs-offset-2 left-p-0">
                                <a href="/<?php echo $country_lang_url;?>/dashboard/widget">
                                    <button type="button" class="btn btn-success"><?php echo $lang->line('dashboard_get_widget');?></button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
            <?php
        }
        else
        {
            ?>
            <div class="row top-m-1">
            <?php
        }
            ?>
        <div class="col-md-3 space-sm-3">
            <div class="suspension-container"><?php echo $reserved_sidebar_content;?></div>
        </div>
        <div class="col-md-9 space-4">
            <div id="listings-container">
                <div class="suspension-container"><?php echo $reserved_snippet_content;?></div>
            </div>
        </div>
    </div>
</div>
