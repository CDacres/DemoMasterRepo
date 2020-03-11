<div class="dashboard-page-wrapper space-top-4 space-4">
    <div class="row">
        <div class="col-md-12 space-4">
            <div id="listings-container">
                <div class="suspension-container">
                    <div class="panel space-4">
                        <div class="table-responsive panel-body">
                            <?php
                                if (isset($has_rooms))
                                {
                            ?>
                                    <div id="calendar"></div>
                                    <?php
                                }
                                else
                                {
                                    echo $lang->line('dashboard_calendar_no_room');
                                }
                                    ?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>