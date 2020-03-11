<div class="panel space-4">
    <div class="panel-header active-panel-header"><?php echo $lang->line('dashboard_change_password');?></div>
    <div class="panel-body">
        <h4><?php echo $lang->line('dashboard_account_password');?></h4>
        <div class="row space-top-6 space-6">
            <div class="col-md-7">
                <form class="form-horizontal edit_account_details">
                    <div class="form-group">
                        <div class="col-sm-8">
                            <label for="zc_old_password" class="col-sm-4 control-label"><?php echo $lang->line('dashboard_old_password');?></label>
                            <input type="password" class="form-control" id="zc_old_password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-8">
                            <label for="zc_new_password" class="col-sm-4 control-label"><?php echo $lang->line('dashboard_new_password');?></label>
                            <input type="password" class="form-control" id="zc_new_password">
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-sm-8">
                            <label for="zc_new_password_confirmation" class="col-sm-4 control-label"><?php echo $lang->line('users_confirm_password');?></label>
                            <input type="password" class="form-control" id="zc_new_password_confirmation">
                        </div>
                    </div>
                </form>
            </div>
	</div>
    </div>
    <div class="panel-footer text-right">
        <span id="success" class="green-font right-m-1 hide"><?php echo $lang->line('dashboard_password_success');?></span>
        <button id="zc_change_password_submit" type="submit" class="btn btn-primary"><?php echo $lang->line('dashboard_update_password');?></button>
    </div>
</div>