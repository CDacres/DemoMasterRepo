<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="jumbotron">
                <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                        <div class="row">
                            <div class="col-lg-9 col-md-9 col-sd-9">
                                <div class="panel panel-transparent">
                                    <div class="panel-body">
                                        <h4>Financial Entities: <?php echo $num_results;?></h4>
                                        <?php
                                            if (isset($keyword))
                                            {
                                                echo '<h5>Search terms: ' . $keyword . '</h5>';
                                            }
                                            foreach ($filters as $buttonStatus => $buttonText)
                                            {
                                                echo '<a href="' . site_url($country_lang_url . '/administrator/financial_entities/index/' . $buttonStatus) . '" class="btn admin-button ' . (($buttonStatus == $status)?'btn-success':'btn-default') . '">' . $buttonText . '</a>';
                                            }
                                        ?>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
	            		<form accept-charset="UTF-8" action="<?php echo site_url($country_lang_url . '/administrator/financial_entities/entitykeyword');?>" method="post">
                                    <input class="bottom-m-1" id="q" name="q" placeholder="Search Financial Entities" type="text" value="" />
                                    <button type="submit" class="btn btn-default btn-sm">Find</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-heading">
                        <?php
                            if (strlen($pagination))
                            {
                                echo '<div>' . $pagination . '</div>';
                            }
                        ?>
                    </div>
                    <div class="panel-body table-responsive">
                        <table class="table table-hover text-left administrator-table">
                            <thead>
                                <tr>
                                    <?php
                                        foreach ($fields as $field_name => $field_display)
                                        {
                                            echo '<th width="';
                                            switch ($field_name)
                                            {
                                                case 'name':
                                                    echo '30';
                                                break;

                                                case 'address':
                                                    echo '25';
                                                break;

                                                case 'account_user':
                                                    echo '15';
                                                break;

                                                case 'financial_data':
                                                    echo '10';
                                                break;

                                                default:
                                                    echo '5';
                                                break;
                                            }
                                            echo '%"><a href="/' . $country_lang_url . '/administrator/financial_entities/' . ((isset($keyword))?'entitykeyword/' . $keyword:'index/' . $status) . '/' . $field_name . '/' . (($sort_order == 'desc' && $sort_by == $field_name)?'asc':'desc') . '">' . $field_display;
                                            if ($sort_by == $field_name)
                                            {
                                                echo '<div class="order"' . (($sort_order == 'asc')?' style="transform: rotate(180deg);"':'') . '><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display: block; height: 9px; width: 9px;"><path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"/></svg></div>';
                                            }
                                            echo '</a></th>';
                                        }
                                    ?>
                                    <th width="20%">Venues</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    foreach ($entities->object() as $entity)
                                    {
                                        $entityId = $entity->get_id();
                                ?>
                                        <tr class="text-left">
                                            <td width="5%"><?php echo $entityId;?></td>
                                            <td width="20%"><?php echo $entity->get('name');?></td>
                                            <td width="25%"><?php echo $entity->get('address');?></td>
                                            <td width="10%">
                                                <?php
                                                    if (!$entity->is_null('financial_data') && $entity->get('financial_data') != 'null')
                                                    {
                                                        $account_code = $entity->wrangle('financial_data')->formatted('account_code');
                                                        $sort_routing_code = $entity->wrangle('financial_data')->formatted('sort_code');
                                                        $iban = $entity->wrangle('financial_data')->formatted('iban');
                                                        $bic = $entity->wrangle('financial_data')->formatted('bic');
                                                        if ($sort_routing_code != '')
                                                        {
                                                            echo $sort_routing_code . ', ' . $account_code;
                                                        }
                                                        if ($iban != '')
                                                        {
                                                            echo wordwrap($iban, 4, " ", true) . ', ' . $bic;
                                                        }
                                                    }
                                                    else
                                                    {
                                                        echo '<a class="zc_financial_data_fin_ent btn btn-default btn-sm" data-id="' . $entityId . '" data-toggle="modal" data-target="#mainModal">Add Bank Details</a>';
                                                    }
                                                ?>
                                            </td>
                                            <td width="5%"><?php echo $entity->get('vat_number');?></td>
                                            <td width="15%">
                                                <?php echo $entity->wrangle('account_user_name')->formatted();?>:
                                                <br />
                                                <?php echo $entity->wrangle('account_user_email')->get_email_html() . $entity->wrangle('account_user_phone')->get_phone_html();?>
                                                <br />
                                                <a data-id="<?php echo $entityId;?>" class="zc_entity_user_edit pointer">Edit</a>
                                                <div class="zc_entity_user_enc select select-block" style="display: none;" data-id="<?php echo $entityId;?>">
                                                    <select class="zc_entity_user" data-id="<?php echo $entityId;?>">
                                                        <?php
                                                            foreach ($entity->get('contact_details')->object() as $contacts)
                                                            {
                                                                echo '<option value="' . $contacts->get('user_id') . '"';
                                                                if ($contacts->get('user_id') == $entity->get('account_user'))
                                                                {
                                                                    echo ' selected';
                                                                }
                                                                echo '>' . $contacts->wrangle('full_name')->formatted() . '</option>';
                                                            }
                                                        ?>
                                                    </select>
                                                </div>
                                                <a data-id="<?php echo $entityId;?>" class="zc_entity_user_save pointer" style="display: none;">Save</a>
                                                <a data-id="<?php echo $entityId;?>" class="zc_entity_user_cancel pointer" style="display: none;">Cancel</a>
                                            </td>
                                            <td width="20%">
                                                <?php
                                                    foreach ($entity->get('venues')->object() as $venue)
                                                    {
                                                        if ($venue->is_true('enabled'))
                                                        {
                                                            echo '<a href="' . get_venue_url($venue) . '" target="_blank" title="View venue">' . $venue->wrangle('defaulted_name')->value() . ' (' . $venue->get_id() . ')</a>';
                                                        }
                                                        else
                                                        {
                                                            echo $venue->wrangle('defaulted_name')->value() . ' (' . $venue->get_id() . ') (<span class="text-danger">disabled</span>)';
                                                        }
                                                        echo '<br />';
                                                    }
                                                ?>
                                            </td>
                                        </tr>
                                        <?php
                                    }
                                        ?>
                            </tbody>
                        </table>
                        <?php
                            if (strlen($pagination))
                            {
                                echo '<div>' . $pagination . '</div>';
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>