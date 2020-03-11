<div class="row">
    <div class="col-sm-12">
        <div class="p-t-20 clearfix p-r-10">
            <div class="pull-left">
                <p class="bold text-uppercase">Reservation ID: <?php echo $reservation->get_id();?></p>
                <p class="bold text-uppercase">Venue ID: <?php echo $reservation->get('venue_id');?></p>
            </div>
        </div>
    </div>
</div>
<form>
    <div class="space-top-2">
        <?php echo $reservation->get_html_data_input('id', null, 'hidden', 'zc_reservation_id');?>
        <div class="form-group form-group-default">
            <div class="row bottom-m-1">
                <div class="col-sm-6">
                    <input class="fin_ent_select_add" type="radio" name="fin_ent_select_add" value="choose_fin_ent" id="choose_fin_ent" checked /> Choose Financial Entity
                    <br />
                    <input class="fin_ent_select_add" type="radio" name="fin_ent_select_add" value="add_fin_ent" id="add_fin_ent" /> Add New Financial Entity
                </div>
            </div>
            <div class="row bottom-p-1">
                <div class="col-sm-6">
                    <div id="choose_fin_ent_details">
                        <label for="zc_financial_entity_id">Financial Entity</label>
                        <div class="select select-block">
                            <select id="zc_financial_entity_id" name="zc_financial_entity_id">
                                <option value='' selected>Select...</option>
                                <?php
                                    foreach ($financial_entities->object() as $financial_entity)
                                    {
                                        echo '<option value="' . $financial_entity->get_id() . '">' . $financial_entity->get('name') . ' (' . $financial_entity->get_id() . ')</option>';
                                    }
                                ?>
                            </select>
                        </div>
                    </div>
                    <div id="add_fin_ent_details" style="display: none;">
                        <label for="financial_entity_name">Name</label>
                        <input id="zc_financial_entity_name" name="financial_entity_name" type="text" value="" />
                        <span class="label label-danger">
                            <strong>Only enter a name if you are sure that it doesn't exist already!</strong>
                        </span>
                        <hr />
                        <?php echo $this->load->view('/modals/administrator/snippets/financial_data');?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</form>