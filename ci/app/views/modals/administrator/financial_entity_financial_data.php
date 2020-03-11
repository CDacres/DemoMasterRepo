<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">Financial Entity ID: <?php echo $entity->get_id();?></p>
            </div>
        </div>
    </div>
</div>
<form>
    <div class="space-top-2">
        <div class="form-group form-group-default">
            <div class="row bottom-p-1">
                <div class="col-sm-6">
                    <?php echo $entity->get('name');?>
                    <hr />
                    <?php echo $this->load->view('/modals/administrator/snippets/financial_data');?>
                </div>
            </div>
        </div>
    </div>
</form>