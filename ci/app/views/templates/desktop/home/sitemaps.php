<div class="container hero-text">
    <h1><?php echo $lang->line('common_footer_popular');?></h1>
    <?php
        if (isset($landings) && isset($landing_count) && $landing_count > 0)
        {
    ?>
            <div class="col-md-12 col-xs-12 p-0 top-p-1">
                <div class="col-md-4 col-xs-4 p-0">
                    <ul>
                        <?php
                            for ($fLP = 0; $fLP < $first_land_loop; ++$fLP)
                            {
                                $fUrl = landing_page_url($landings[$fLP]['tag_slug'], $landings[$fLP]['location_url'], ((isset($landings[$fLP]['attr_url']))?$landings[$fLP]['attr_url']:''));
                                if (isset($landings[$fLP]['attribute_id']))
                                {
                                    $fLink = $this->lang->line('home_landing_similar_link', $landings[$fLP]['attr_desc'], $this->lang->bespoke_line($landings[$fLP]['lp_link_label'], (($landings[$fLP]['requires_determiner'])?$lang->line('common_determiner') . ' ':'') . trim($landings[$fLP]['location_desc'])), null);
                                }
                                else
                                {
                                    $fLink = $this->lang->bespoke_line($landings[$fLP]['lp_link_label'], (($landings[$fLP]['requires_determiner'])?$lang->line('common_determiner') . ' ':'') . trim($landings[$fLP]['location_desc']));
                                }
                        ?>
                                <li>
                                    <a href="/<?php echo $country_lang_url;?>/<?php echo $fUrl;?>" title="<?php echo $fLink;?>"><?php echo $fLink;?></a>
                                </li>
                                <?php
                            }
                                ?>
                    </ul>
                </div>
                <?php
                    if ($landing_count > 1)
                    {
                ?>
                        <div class="col-md-4 col-xs-4 p-0">
                            <ul>
                                <?php
                                    for ($sLP = $first_land_loop; $sLP < $second_land_loop; ++$sLP)
                                    {
                                        $sUrl = landing_page_url($landings[$sLP]['tag_slug'], $landings[$sLP]['location_url'], ((isset($landings[$sLP]['attr_url']))?$landings[$sLP]['attr_url']:''));
                                        if (isset($landings[$sLP]['attribute_id']))
                                        {
                                            $sLink = $this->lang->line('home_landing_similar_link', $landings[$sLP]['attr_desc'], $this->lang->bespoke_line($landings[$sLP]['lp_link_label'], (($landings[$sLP]['requires_determiner'])?$lang->line('common_determiner') . ' ':'') . trim($landings[$sLP]['location_desc'])), null);
                                        }
                                        else
                                        {
                                            $sLink = $this->lang->bespoke_line($landings[$sLP]['lp_link_label'], (($landings[$sLP]['requires_determiner'])?$lang->line('common_determiner') . ' ':'') . trim($landings[$sLP]['location_desc']));
                                        }
                                ?>
                                        <li>
                                            <a href="/<?php echo $country_lang_url;?>/<?php echo $sUrl;?>" title="<?php echo $sLink;?>"><?php echo $sLink;?></a>
                                        </li>
                                        <?php
                                    }
                                        ?>
                            </ul>
                        </div>
                        <?php
                            if ($landing_count > 2)
                            {
                        ?>
                                <div class="col-md-4 col-xs-4 p-0">
                                    <ul>
                                        <?php
                                            for ($tLP = $second_land_loop; $tLP < $third_land_loop; ++$tLP)
                                            {
                                                $tUrl = landing_page_url($landings[$tLP]['tag_slug'], $landings[$tLP]['location_url'], ((isset($landings[$tLP]['attr_url']))?$landings[$tLP]['attr_url']:''));
                                                if (isset($landings[$tLP]['attribute_id']))
                                                {
                                                    $tLink = $this->lang->line('home_landing_similar_link', $landings[$tLP]['attr_desc'], $this->lang->bespoke_line($landings[$tLP]['lp_link_label'], (($landings[$tLP]['requires_determiner'])?$lang->line('common_determiner') . ' ':'') . trim($landings[$tLP]['location_desc'])), null);
                                                }
                                                else
                                                {
                                                    $tLink = $this->lang->bespoke_line($landings[$tLP]['lp_link_label'], (($landings[$tLP]['requires_determiner'])?$lang->line('common_determiner') . ' ':'') . trim($landings[$tLP]['location_desc']));
                                                }
                                        ?>
                                                <li>
                                                    <a href="/<?php echo $country_lang_url;?>/<?php echo $tUrl;?>" title="<?php echo $tLink;?>"><?php echo $tLink;?></a>
                                                </li>
                                                <?php
                                            }
                                                ?>
                                    </ul>
                                </div>
                                <?php
                            }
                    }
                                ?>
            </div>
            <?php
        }
        if (isset($locations) && isset($location_count) && $location_count > 0)
        {
            ?>
            <div class="col-md-12 col-xs-12 p-0 top-p-1">
                <div class="col-md-4 col-xs-4 p-0">
                    <ul>
                        <?php
                            for ($f = 0; $f < $first_loc_loop; ++$f)
                            {
                                echo '<li><a href="/' . $country_lang_url . '/sitemaps/' . $locations[$f]['url_desc'] . '" title="' . $locations[$f]['human_desc'] . '">' . $locations[$f]['human_desc'] . '</a></li>';
                            }
                        ?>
                    </ul>
                </div>
                <?php
                    if ($location_count > 1)
                    {
                ?>
                        <div class="col-md-4 col-xs-4 p-0">
                            <ul>
                                <?php
                                    for ($s = $first_loc_loop; $s < $second_loc_loop; ++$s)
                                    {
                                        echo '<li><a href="/' . $country_lang_url . '/sitemaps/' . $locations[$s]['url_desc'] . '" title="' . $locations[$s]['human_desc'] . '">' . $locations[$s]['human_desc'] . '</a></li>';
                                    }
                                ?>
                            </ul>
                        </div>
                        <?php
                            if ($location_count > 2)
                            {
                        ?>
                                <div class="col-md-4 col-xs-4 p-0">
                                    <ul>
                                        <?php
                                            for ($t = $second_loc_loop; $t < $third_loc_loop; ++$t)
                                            {
                                                echo '<li><a href="/' . $country_lang_url . '/sitemaps/' . $locations[$t]['url_desc'] . '" title="' . $locations[$t]['human_desc'] . '">' . $locations[$t]['human_desc'] . '</a></li>';
                                            }
                                        ?>
                                    </ul>
                                </div>
                                <?php
                            }
                    }
                                ?>
            </div>
            <?php
        }
            ?>
</div>