<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">ID: <?php echo $reservation_id;?></p>
            </div>
        </div>
    </div>
</div>
<div><?php echo $this->load->view('/modals/administrator/snippets/venue_payments', ['venue_payments' => $venue_payments], true);?></div>