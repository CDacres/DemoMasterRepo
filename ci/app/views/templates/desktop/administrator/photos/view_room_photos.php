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
                                        <h4>Room Images: <?php echo $num_results;?></h4>
                                        <?php
                                            if (isset($keyword))
                                            {
                                                echo '<h5>Search terms: ' . $keyword . '</h5>';
                                            }
                                            foreach ($filters as $buttonStatus => $buttonText)
                                            {
                                                echo '<a href="' . site_url($country_lang_url . '/administrator/photos/rooms/' . $buttonStatus) . '" class="btn admin-button ' . (($buttonStatus == $status)?'btn-success':'btn-default') . '">' . $buttonText . '</a>';
                                            }
                                        ?>
                                        <div class="btn-group" role="group">
                                            <a class="btn admin-button btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <?php
                                                    if (isset($city_dropdown))
                                                    {
                                                        echo $city_dropdown;
                                                    }
                                                    else
                                                    {
                                                        echo 'Select City';
                                                    }
                                                ?>
                                                <span class="caret"></span>
                                            </a>
                                            <ul class="dropdown-menu">
                                                <?php
                                                    if ($image_locations->exist())
                                                    {
                                                        echo '<li>Flagged</li>';
                                                        foreach ($image_locations->object() as $img_loc)
                                                        {
                                                            if ($img_loc->get('flagged_image_count') > 0)
                                                            {
                                                ?>
                                                                <li>
                                                                    <a href="<?php echo site_url($country_lang_url . '/administrator/photos/index/flagged_' . $img_loc->get('city') . '_' . $img_loc->get('country_code'));?>"><?php echo $img_loc->get('city') . ' (' . $img_loc->get('flagged_image_count') . ')';?></a>
                                                                </li>
                                                                <?php
                                                            }
                                                        }
                                                        echo '<li>Cosmetic</li>';
                                                        foreach ($image_locations->object() as $img_loc)
                                                        {
                                                            if ($img_loc->get('cosmetic_image_count') > 0)
                                                            {
                                                                ?>
                                                                <li>
                                                                    <a href="<?php echo site_url($country_lang_url . '/administrator/photos/index/cosmetic_' . $img_loc->get('city') . '_' . $img_loc->get('country_code'));?>"><?php echo $img_loc->get('city') . ' (' . $img_loc->get('cosmetic_image_count') . ')';?></a>
                                                                </li>
                                                                <?php
                                                            }
                                                        }
                                                    }
                                                    else
                                                    {
                                                        echo '<li>No cities</li>';
                                                    }
                                                                ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
	            		<form accept-charset="UTF-8" action="<?php echo site_url($country_lang_url . '/administrator/photos/roomkeyword');?>" method="post">
                                    <input class="bottom-m-1" id="q" name="q" placeholder="Search Images" type="text" value="" />
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
                                                case 'comments':
                                                    echo '30';
                                                break;

                                                case 'room_name':
                                                case 'venue_name':
                                                    echo '15';
                                                break;

                                                case 'image':
                                                case 'configuration_id':
                                                    echo '10';
                                                break;

                                                default:
                                                    echo '5';
                                                break;
                                            }
                                            echo '%">';
                                            if ($field_name == 'image')
                                            {
                                                echo $field_display;
                                            }
                                            else
                                            {
                                                echo '<a href="/' . $country_lang_url . '/administrator/photos/' . ((isset($keyword))?'roomkeyword/' . $keyword:'rooms/' . $status) . '/' . $field_name . '/' . (($sort_order == 'desc' && $sort_by == $field_name)?'asc':'desc') . '">' . $field_display;
                                                if ($sort_by == $field_name)
                                                {
                                                    echo '<div class="order"' . (($sort_order == 'asc')?' style="transform: rotate(180deg);"':'') . '><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display: block; height: 9px; width: 9px;"><path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"/></svg></div>';
                                                }
                                                echo '</a>';
                                            }
                                            echo '</th>';
                                        }
                                    ?>
                                    <th width="5%">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    foreach ($images->object() as $image)
                                    {
                                        $url = $image->get_url('large');
                                ?>
                                        <tr class="text-left">
                                            <td width="15%">
                                                <?php
                                                    if ($image->is_true('room_enabled') && $image->is_true('venue_enabled'))
                                                    {
                                                        echo '(<a href="' . get_room_url($image) . '" target="_blank">' . $image->get('room_id') . '</a> - <a href="' . get_room_url($image, '', true) . '" target="_blank" title="Edit listing">Edit listing</a>)';
                                                    }
                                                    else
                                                    {
                                                        echo $image->get('room_id') . ' (<span class="text-danger">disabled</span>)';
                                                    }
                                                ?>
                                                <br />
                                                <?php echo $image->wrangle('defaulted_room_name')->value();?>
                                            </td>
                                            <td width="15%">
                                                <?php
                                                    if ($image->is_true('venue_enabled'))
                                                    {
                                                        echo '(<a href="' . get_venue_url($image) . '" target="_blank">' . $image->get('venue_id') . '</a> - <a href="' . get_venue_url($image, true) . '" target="_blank" title="Edit listing">Edit listing</a>)';
                                                    }
                                                    else
                                                    {
                                                        echo $image->get('venue_id') . ' (<span class="text-danger">disabled</span>)';
                                                    }
                                                ?>
                                                <br />
                                                <?php echo $image->wrangle('defaulted_venue_name')->value();?>
                                                <br />
                                                <?php echo $image->wrangle('main_contact_name')->formatted() . ' (' . $image->get('main_user_id') . ')';?>
                                                <br />
                                                <?php echo $image->wrangle('main_user_email')->get_email_html() . $image->wrangle('main_user_phone')->get_phone_html();?>
                                                <br />
                                                <?php
                                                    if ($image->get('main_user_role_id') != User::ADMINUSER)
                                                    {
                                                        echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $image->get('main_user_id') . '">Adopt</a> · ';
                                                    }
                                                    echo '<a class="contact_details pointer" data-toggle="modal" data-target="#mainModal" id="' . $image->get('venue_id') . '">Contact Details</a>';
                                                ?>
                                            </td>
                                            <td width="10%">
                                                <a class="fancybox" rel="<?php echo $image->get_id();?>" href="<?php echo $url;?>">
                                                    <img src="<?php echo $url;?>" alt="<?php echo $image->wrangle('defaulted_room_name')->value();?>" title="<?php echo $image->wrangle('defaulted_room_name')->value();?>">
                                                </a>
                                            </td>
                                            <td width="10%">
                                                <div class="select select-block">
                                                    <select class="zc_image_configuration" id="zc_image_configuration_<?php echo $image->get_id();?>" zc_asset_id="<?php echo $image->get('subject_id');?>" zc_object_id="<?php echo $image->get_id();?>">
                                                        <option value='' selected>Select...</option>
                                                        <?php
                                                            foreach ($configurations->object() as $configType)
                                                            {
                                                                echo '<option value="' . $configType->get('id') . '"';
                                                                if ($configType->get('id') == $image->get('configuration_id'))
                                                                {
                                                                    echo ' selected';
                                                                }
                                                                echo '>' . $configType->get('desc') . '</option>';
                                                            }
                                                        ?>
                                                    </select>
                                                </div>
                                            </td>
                                            <td width="5%">
                                                <input type="checkbox" value="<?php echo $image->is_true('flagged');?>" name="zc_image_flagged" class="zc_image_flagged js-switch" data-colour="#f7462b" zc_asset_id="<?php echo $image->get('subject_id');?>" zc_object_id="<?php echo $image->get_id();?>"
                                                    <?php
                                                        if ($image->is_true('flagged'))
                                                        {
                                                            echo ' checked';
                                                        }
                                                    ?>
                                                />
                                            </td>
                                            <td width="5%">
                                                <input type="checkbox" value="<?php echo $image->is_true('cosmetic');?>" name="zc_image_cosmetic" class="zc_image_cosmetic js-switch" data-colour="#f7462b" zc_asset_id="<?php echo $image->get('subject_id');?>" zc_object_id="<?php echo $image->get_id();?>"
                                                    <?php
                                                        if ($image->is_true('cosmetic'))
                                                        {
                                                            echo ' checked';
                                                        }
                                                    ?>
                                                />
                                            </td>
                                            <td width="30%"><?php echo $image->get('comments');?></td>
                                            <td width="5%">
                                                <button class="zc_view_image_btn btn btn-default" data-id="<?php echo $image->get_id();?>" data-asset-id="<?php echo $image->get('subject_id');?>" type="button">Edit</button>
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