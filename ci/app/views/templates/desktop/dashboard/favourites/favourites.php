<div class="dashboard-page-wrapper space-top-4 space-4">
    <div class="panel space-4">
        <div class="panel-header active-panel-header">
            <div class="row">
                <div class="col-sm-6 active-panel-padding"><?php echo $lang->line('dashboard_favourites');?></div>
            </div>
        </div>
        <ul id="zc_venue_list" class="panel-list list-unstyled list-layout"><?php echo $this->load->view(THEME_FOLDER . '/dashboard/favourites/favourite_update_list', ['rooms' => $rooms], true);?></ul>
    </div>
</div>