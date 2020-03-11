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
                                        <h4>Locations: <?php echo $num_results;?></h4>
                                        <?php
                                            if (isset($keyword))
                                            {
                                                echo '<h5>Search terms: ' . $keyword . '</h5>';
                                            }
                                        ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/locations/index');?>" class="btn btn-success admin-button">All Locations</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3 bottom-m-1">
	            		<form accept-charset="UTF-8" action="<?php echo site_url($country_lang_url . '/administrator/locations/locationkeyword');?>" method="post">
                                    <input class="bottom-m-1" id="q" name="q" placeholder="Search Locations" type="text" value="" />
                                    <button type="submit" class="btn btn-default btn-sm">Find</button>
                                </form>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
                                <button id="zc_add_location_btn" class="btn btn-primary" type="button">Add Location</button>
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
                                                case 'human_desc':
                                                case 'parent_desc':
                                                    echo '15';
                                                break;

                                                case 'url_desc':
                                                case 'lat':
                                                case 'approved_venue_count':
                                                case 'approved_room_count':
                                                    echo '10';
                                                break;

                                                default:
                                                    echo '5';
                                                break;
                                            }
                                            echo '%"><a href="/' . $country_lang_url . '/administrator/locations/' . ((isset($keyword))?'locationkeyword/' . $keyword:'index') . '/' . $field_name . '/' . (($sort_order == 'desc' && $sort_by == $field_name)?'asc':'desc') . '">' . $field_display;
                                            if ($sort_by == $field_name)
                                            {
                                                echo '<div class="order"' . (($sort_order == 'asc')?' style="transform: rotate(180deg);"':'') . '><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display: block; height: 9px; width: 9px;"><path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"/></svg></div>';
                                            }
                                            echo '</a></th>';
                                        }
                                    ?>
                                    <th width="5%">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    foreach ($locations->object() as $location)
                                    {
                                ?>
                                        <tr class="text-left">
                                            <td width="5%"><?php echo $location->get_id();?></td>
                                            <td width="15%">
                                                <a target="_blank" href="/<?php echo $country_lang_url;?>/s/<?php echo $default_tag_slug;?>/<?php echo $location->get('search_url');?>"><?php echo $location->get('human_desc');?></a>
                                            </td>
                                            <td width="15%"><?php echo $location->get('parent_desc');?></td>
                                            <td width="10%"><?php echo $location->get('url_desc');?></td>
                                            <td width="5%"><?php echo $location->get('category_desc');?></td>
                                            <td width="10%"><?php echo $location->get('lat') . ', ' . $location->get('long');?><?php //echo $location->get_html_data_map('zc_map_input', 200, 200, 16);?></td>
                                            <td width="10%"><?php echo 'Approved - ' . (($location->is_null('approved_venue_count'))?'0':$location->get('approved_venue_count')) . '<br />Unapproved - ' . (($location->is_null('unapproved_venue_count'))?'0':$location->get('unapproved_venue_count'))?></td>
                                            <td width="10%">
                                                <?php
                                                    if ($location->get('rooms')->get_count() > 0)
                                                    {
                                                        foreach ($location->get('rooms')->object() as $roomtypes)
                                                        {
                                                            echo $roomtypes->get('tag_name') . ' - ' . $roomtypes->get('approved_room_count') . (($roomtypes->get('unapproved_room_count') > 0)?' (' . $roomtypes->get('unapproved_room_count') . ' unapproved)':'') . '<br />';
                                                        }
                                                    }
                                                    else
                                                    {
                                                        echo '0';
                                                    }
                                                ?>
                                            </td>
                                            <td width="5%">
                                                <input type="checkbox" value="<?php echo $location->get_id();?>" name="zc_crawl" class="zc_crawl js-switch"
                                                    <?php
                                                        if ($location->is_true('is_crawlable'))
                                                        {
                                                            echo ' checked';
                                                        }
                                                    ?>
                                                />
                                            </td>
                                            <td width="5%">
                                                <button class="zc_view_location_btn btn btn-default" data-id="<?php echo $location->get_id();?>">Edit</button>
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