<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <?php echo $auditObj_id;?></p>
            </div>
        </div>
    </div>
</div>
<div>
    <?php
        if ($audits->exists_in_db())
        {
            foreach ($audits->object() as $audit)
            {
                echo '<br />' . $audit->wrangle('date_time')->formatted() . ': ' . $audit->get('status_name') . ((!$audit->is_null('first_name'))?' (' . $audit->wrangle('full_name')->formatted() . ')':'');
            }
        }
    ?>
</div>