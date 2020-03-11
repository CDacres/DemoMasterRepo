<div class="panel-body">
    <div class="col-md-6 left-p-0">
        <?php
            if (isset($tag_label) && $tag_label->exists_in_db() && $tag_label->get_count() > 0)
            {
                $tag = $tag_label->get_first();
        ?>
                <ul>
                    <li>Tag Name: <?php echo $tag->get('name');?></li>
                    <li>Language Name: <?php echo $tag->get('label');?></li>
                    <?php
                        if ($tag->get('metas')->get_count() > 0)
                        {
                            $tag_meta = $tag->get('metas')->get_first();
                    ?>
                            <li>Language Url: <?php echo $tag_meta->get('slug');?></li>
                            <li>Has Browse: <input type="checkbox" value="<?php echo $tag_meta->get_id();?>" name="zc_tag_meta_has_browse" class="zc_tag_meta_has_browse"
                                <?php
                                    if ($tag_meta->is_true('has_browse'))
                                    {
                                        echo ' checked';
                                    }
                                ?>
                                />
                            </li>
                            <li>Has Landing Page: <input type="checkbox" value="<?php echo $tag_meta->get_id();?>" name="zc_tag_meta_has_lp" class="zc_tag_meta_has_lp"
                                <?php
                                    if ($tag_meta->is_true('has_lp'))
                                    {
                                        echo ' checked';
                                    }
                                ?>
                                />
                            </li>
                            <li>Has Sub Landing Page: <input type="checkbox" value="<?php echo $tag_meta->get_id();?>" name="zc_tag_meta_has_lp_sub_loc" class="zc_tag_meta_has_lp_sub_loc"
                                <?php
                                    if ($tag_meta->is_true('has_lp_sub_loc'))
                                    {
                                        echo ' checked';
                                    }
                                ?>
                                />
                            </li>
                            <li>Browse Link Title: <input name="zc_tag_meta_browse_link_label" class="zc_tag_meta_browse_link_label form-control" value="<?php echo $tag_meta->get('browse_link_label');?>" type="text" /></li>
                            <li>Browse Meta Title: <input name="zc_tag_meta_browse_title" class="zc_tag_meta_browse_title form-control" value="<?php echo $tag_meta->get('browse_title');?>" type="text" /></li>
                            <li>Browse Meta Desc: <textarea name="zc_tag_meta_browse_meta_desc" class="zc_tag_meta_browse_meta_desc form-control"><?php echo $tag_meta->get('browse_meta_desc');?></textarea></li>
                            <li>Browse Carousel Title: <input name="zc_tag_meta_browse_carousel_title" class="zc_tag_meta_browse_carousel_title form-control" value="<?php echo $tag_meta->get('browse_carousel_title');?>" type="text" /></li>
                            <li>Browse Header 1 Title: <input name="zc_tag_meta_browse_h1_title" class="zc_tag_meta_browse_h1_title form-control" value="<?php echo $tag_meta->get('browse_h1_title');?>" type="text" /></li>
                            <li>Browse Header 2 Title: <input name="zc_tag_meta_browse_h2_title" class="zc_tag_meta_browse_h2_title form-control" value="<?php echo $tag_meta->get('browse_h2_title');?>" type="text" /></li>
                            <li>Landing Page Link Title: <input name="zc_tag_meta_lp_link_label" class="zc_tag_meta_lp_link_label form-control" value="<?php echo $tag_meta->get('lp_link_label');?>" type="text" /></li>
                            <li>Landing Page Meta Title: <input name="zc_tag_meta_lp_title" class="zc_tag_meta_lp_title form-control" value="<?php echo $tag_meta->get('lp_title');?>" type="text" /></li>
                            <li>Landing Page Meta Desc: <textarea name="zc_tag_meta_lp_meta_desc" class="zc_tag_meta_lp_meta_desc form-control"><?php echo $tag_meta->get('lp_meta_desc');?></textarea></li>
                            <li>Landing Page Carousel Title: <input name="zc_tag_meta_lp_carousel_title" class="zc_tag_meta_lp_carousel_title form-control" value="<?php echo $tag_meta->get('lp_carousel_title');?>" type="text" /></li>
                            <li>Landing Page Header 1 Title: <input name="zc_tag_meta_lp_h1_title" class="zc_tag_meta_lp_h1_title form-control" value="<?php echo $tag_meta->get('lp_h1_title');?>" type="text" /></li>
                            <li>Landing Page Header 2 Title: <input name="zc_tag_meta_lp_h2_title" class="zc_tag_meta_lp_h2_title form-control" value="<?php echo $tag_meta->get('lp_h2_title');?>" type="text" /></li>
                            <?php
                        }
                        else
                        {
                            echo '<li>No Meta Data</li>';
                        }
                            ?>
                </ul>
                <br />
                <?php
            }
                ?>
        <ul>
            <?php
                if (!$landing_pages->is_null_object() && $landing_pages->exists_in_db())
                {
                    foreach ($landing_pages->object() as $landing_page)
                    {
                        $attr_desc = null;
                        if ($landing_page->get('attribute')->get('attr_language')->get_count() > 0)
                        {
                            $attr_desc = $landing_page->get('attribute')->get('attr_language')->get_first()->get('desc');
                        }
                        $browse_link_label = '';
                        $lp_link_label = '';
                        $browse_title = '';
                        $lp_title = '';
                        $browse_desc = '';
                        $lp_desc = '';
                        $browse_carousel_title = '';
                        $lp_carousel_title = '';
                        $browse_h1_title = '';
                        $lp_h1_title = '';
                        $browse_h2_title = '';
                        $lp_h2_title = '';
                        $slug = '';
                        if ($landing_page->get('tag')->get('labels')->get_count() > 0 && $landing_page->get('tag')->get('labels')->get_first()->get('metas')->get_count() > 0)
                        {
                            $meta = $landing_page->get('tag')->get('labels')->get_first()->get('metas')->get_first();
                            $browse_link_label = $meta->get('browse_link_label');
                            $lp_link_label = $meta->get('lp_link_label');
                            $browse_title = $meta->get('browse_title');
                            $lp_title = $meta->get('lp_title');
                            $browse_desc = $meta->get('browse_meta_desc');
                            $lp_desc = $meta->get('lp_meta_desc');
                            $browse_carousel_title = $meta->get('browse_carousel_title');
                            $lp_carousel_title = $meta->get('lp_carousel_title');
                            $browse_h1_title = $meta->get('browse_h1_title');
                            $lp_h1_title = $meta->get('lp_h1_title');
                            $browse_h2_title = $meta->get('browse_h2_title');
                            $lp_h2_title = $meta->get('lp_h2_title');
                            $slug = $meta->get('slug');
                        }
                        if ($landing_page->get('landing_page_lang')->get_count() > 0)
                        {
                            $landing_page_lang = $landing_page->get('landing_page_lang')->get_first();
                            if (isset($country_locations) && !$country_locations->is_null_object())
                            {
                                $location = $country_locations->get_object_by_id($landing_page->get('location_id'));
                            }
                            elseif (isset($chosen_location) && !$chosen_location->is_null_object())
                            {
                                $location = $chosen_location;
                            }
                            else
                            {
                                $location = $landing_page->get('location');
                            }
                            $meta_title = '';
                            if ($landing_page_lang->data_not_empty('meta_title'))
                            {
                                $meta_title = $landing_page_lang->get('meta_title');
                            }
                            elseif ($location->get('parent_id') == 0)
                            {
                                if ($attr_desc != null)
                                {
                                    $meta_title = $lang->line('home_browse_attr_meta_title', $attr_desc, $browse_link_label);
                                }
                                elseif ($browse_title != '' && $browse_title != null)
                                {
                                    $meta_title = $browse_title;
                                }
                                else
                                {
                                    $meta_title = $lang->line('home_browse_meta_title', $browse_link_label);
                                }
                            }
                            else
                            {
                                if ($attr_desc != null)
                                {
                                    $meta_title = $lang->line('home_landing_attr_meta_title', $attr_desc, $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
                                }
                                elseif ($lp_title != '' && $lp_title != null)
                                {
                                    $meta_title = $lang->bespoke_line($lp_title, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
                                }
                                else
                                {
                                    $meta_title = $lang->line('home_landing_meta_title', $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
                                }
                            }
                            $meta_desc = '';
                            if ($landing_page_lang->data_not_empty('meta_desc'))
                            {
                                $meta_desc = $landing_page_lang->get('meta_desc');
                            }
                            elseif ($location->get('parent_id') == 0)
                            {
                                if ($attr_desc != null)
                                {
                                    $meta_desc = $lang->line('home_browse_attr_meta_desc', $attr_desc, $browse_link_label);
                                }
                                elseif ($browse_desc != '' && $browse_desc != null)
                                {
                                    $meta_desc = $browse_desc;
                                }
                                else
                                {
                                    $meta_desc = $lang->line('home_browse_meta_desc', $browse_link_label);
                                }
                            }
                            else
                            {
                                if ($attr_desc != null)
                                {
                                    $meta_desc = $lang->line('home_landing_attr_meta_desc', $attr_desc, $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')), ', ' . trim($location->get('parent_desc')));
                                }
                                elseif ($lp_desc != '' && $lp_desc != null)
                                {
                                    $meta_desc = $lang->bespoke_line($lp_desc, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')), ', ' . trim($location->get('parent_desc')));
                                }
                                else
                                {
                                    $meta_desc = $lang->line('home_landing_meta_desc', $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')), ', ' . trim($location->get('parent_desc')));
                                }
                            }
                            $carousel_title = '';
                            if ($landing_page_lang->data_not_empty('carousel_title'))
                            {
                                $carousel_title = $landing_page_lang->get('carousel_title');
                            }
                            elseif ($location->get('parent_id') == 0)
                            {
                                if ($attr_desc != null)
                                {
                                    $carousel_title = $lang->line('home_browse_attr_carousel', $attr_desc, $browse_link_label);
                                }
                                elseif ($browse_carousel_title != '' && $browse_carousel_title != null)
                                {
                                    $carousel_title = $browse_carousel_title;
                                }
                                else
                                {
                                    $carousel_title = $lang->line('home_browse_carousel', $browse_link_label);
                                }
                            }
                            else
                            {
                                if ($attr_desc != null)
                                {
                                    $carousel_title = $lang->line('home_landing_attr_carousel', $attr_desc, $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
                                }
                                elseif ($lp_carousel_title != '' && $lp_carousel_title != null)
                                {
                                    $carousel_title = $lang->bespoke_line($lp_carousel_title, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
                                }
                                else
                                {
                                    $carousel_title = $lang->line('home_landing_room_title_' . $location->get('category_type'), (($location->get('child_room_count') > 0)?$location->get('child_room_count') . ' ':'') . $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
                                }
                            }
                            $h1 = '';
                            if ($landing_page_lang->data_not_empty('h1'))
                            {
                                $h1 = $landing_page_lang->get('h1');
                            }
                            elseif ($location->get('parent_id') == 0)
                            {
                                if ($attr_desc != null)
                                {
                                    $h1 = $lang->line('home_browse_attr_h1', $attr_desc, $browse_link_label);
                                }
                                elseif ($browse_h1_title != '' && $browse_h1_title != null)
                                {
                                    $h1 = $browse_h1_title;
                                }
                                else
                                {
                                    $h1 = $lang->line('home_browse_h1', $browse_link_label);
                                }
                            }
                            else
                            {
                                if ($attr_desc != null)
                                {
                                    $h1 = $lang->line('home_landing_attr_h1', $attr_desc, $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
                                }
                                elseif ($lp_h1_title != '' && $lp_h1_title != null)
                                {
                                    $h1 = $lang->bespoke_line($lp_h1_title, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
                                }
                                else
                                {
                                    $h1 = $lang->line('home_landing_h1', $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')));
                                }
                            }
                            $h2 = '';
                            if ($landing_page_lang->data_not_empty('h2'))
                            {
                                $h2 = $landing_page_lang->get('h2');
                            }
                            elseif ($location->get('parent_id') == 0)
                            {
                                if ($attr_desc != null)
                                {
                                    $h2 = $lang->line('home_browse_attr_h2', $attr_desc, $browse_link_label);
                                }
                                elseif ($browse_h2_title != '' && $browse_h2_title != null)
                                {
                                    $h2 = $browse_h2_title;
                                }
                                else
                                {
                                    $h2 = $lang->line('home_browse_h2', $browse_link_label);
                                }
                            }
                            else
                            {
                                if ($attr_desc != null)
                                {
                                    $h2 = $lang->line('home_landing_attr_h2', $attr_desc, $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')), ', ' . trim($location->get('parent_desc')));
                                }
                                elseif ($lp_h2_title != '' && $lp_h2_title != null)
                                {
                                    $h2 = $lang->bespoke_line($lp_h2_title, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')), ', ' . trim($location->get('parent_desc')));
                                }
                                else
                                {
                                    $h2 = $lang->line('home_landing_h2', $browse_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc')), ', ' . trim($location->get('parent_desc')));
                                }
                            }
                            $url = $country_lang_url . '/' . $landing_page_lang->get('landing_page_url')->get_first()->get('url');
                ?>
                            <li>
                                <?php echo $location->get('human_desc');?>
                                <ul>
                                    <li>Url: <a href="/<?php echo $url;?>" target="_blank"><?php echo $url;?></a></li>
                                    <li>Link Title:
                                        <?php
                                            if ($location->get('parent_id') == 0)
                                            {
                                                echo $browse_link_label;
                                            }
                                            else
                                            {
                                                echo $lang->line('home_landing_similar_link', $attr_desc, $lang->bespoke_line($lp_link_label, (($location->is_true('requires_determiner'))?$lang->line('common_determiner') . ' ':'') . trim($location->get('human_desc'))), null);
                                            }
                                        ?>
                                    </li>
                                    <li>Meta Title: <input name="zc_landing_meta_title" class="zc_landing_meta_title form-control" value="<?php echo $meta_title;?>" type="text" /></li>
                                    <li>Meta Desc: <textarea name="zc_landing_meta_desc" class="zc_landing_meta_desc form-control"><?php echo $meta_desc;?></textarea></li>
                                    <li>Top Desc: <textarea name="zc_landing_desc_text_top" class="zc_landing_desc_text_top form-control"><?php echo $landing_page_lang->get('desc_text_top');?></textarea></li>
                                    <li>Main Desc: <textarea name="zc_landing_desc_text" class="zc_landing_desc_text form-control"><?php echo $landing_page_lang->get('desc_text');?></textarea></li>
                                    <li>Carousel Title: <input name="zc_landing_carousel_title" class="zc_landing_carousel_title form-control" value="<?php echo $carousel_title;?>" type="text" /></li>
                                    <li>Header 1 Title: <input name="zc_landing_h1" class="zc_landing_h1 form-control" value="<?php echo $h1;?>" type="text" /></li>
                                    <li>Header 2 Title: <input name="zc_landing_h2" class="zc_landing_h2 form-control" value="<?php echo $h2;?>" type="text" /></li>
                                    <?php
                                        if (!$landing_page->is_null('redirect_id'))
                                        {
                                            $redirect_url = $country_lang_url . '/' . $landing_page->get('redirect_url');
                                    ?>
                                            <li>
                                                <b><?php echo (($landing_page->is_true('canonical'))?'Canonical':'Redirect');?> Url:</b> <a href="/<?php echo $redirect_url;?>" target="_blank"><?php echo $redirect_url;?></a>
                                            </li>
                                            <?php
                                        }
                                        if ($landing_page->is_true('search_redirect') && $slug != '' && $slug != null)
                                        {
                                            $search_url = $country_lang_url . '/s/' . $slug . '/' . $location->get('search_url');
                                            ?>
                                            <li>
                                                <b>Search Redirect Url:</b> <a href="/<?php echo $search_url;?>" target="_blank"><?php echo $search_url;?></a>
                                            </li>
                                            <?php
                                        }
                                            ?>
                                </ul>
                            </li>
                            <?php
                        }
                        else
                        {
                            echo '<li>There is a problem with this landing page as it has no language records</li>';
                        }
                    }
                }
                else
                {
                    echo '<li>No Landing Pages</li>';
                }
                        ?>
        </ul>
    </div>
</div>