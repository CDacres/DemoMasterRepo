<div class="panel space-4">
    <div class="panel-header active-panel-header"><?php echo $lang->line('dashboard_notifications');?></div>
    <div class="panel-body">
        <h4><?php echo $lang->line('dashboard_notification_emails');?></h4>
        <div class="row space-top-6 space-6">
            <div class="col-md-4"><?php echo $lang->line('dashboard_notification_emails_subtitle');?></div>
            <div class="col-md-8">
                <form class="form-horizontal">
                    <div class="form-group">
                        <div id="subscribe_container" class="col-sm-12">
                            <label class="col-sm-1">
                                <input type="checkbox" class="form-control" id="zc_subscribe"
                                <?php
                                    if ($user->is_true('marketing_subscribed'))
                                    {
                                        echo ' checked';
                                    }
                                ?>
                                />
                            </label>
                            <label id="subscribe_text" class="col-sm-11" for="zc_subscribe">
                                <b><?php echo $lang->line('dashboard_notification_news_title');?></b>
                                <br>
                                <span><?php echo $lang->line('dashboard_notification_news_info');?></span>
                            </label>
                        </div>
                    </div>
                </form>
            </div>
	</div>
    </div>
    <div class="panel-footer text-right">
        <span id="success" class="green-font right-m-1 hide"><?php echo $lang->line('dashboard_notification_success');?></span>
        <button id="zc_subscribe_submit" type="submit" class="btn btn-primary"><?php echo $lang->line('common_save');?></button>
    </div>
</div>