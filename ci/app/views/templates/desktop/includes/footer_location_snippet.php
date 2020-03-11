<div class="col-md-6 col-xs-6 p-0">
    <ul>
        <?php
            for ($f = 0; $f < (($total_locations > 13)?($total_locations / 2):$total_locations); ++$f)
            {
        ?>
                <li>
                    <a href="/<?php echo $country_lang_url;?>/s/<?php echo ((!$footer_tag->is_null('slug'))?$footer_tag->get('slug'):$footer_tag->get('quick_slug'));?>/<?php echo $footer_locations['objects'][$f]['search_url'];?>" title="<?php echo $lang->line('common_footer_search_title', $footer_tag->get('browse_link_label'), trim($footer_locations['objects'][$f]['human_desc']));?>"><?php echo $lang->line('common_footer_search', $footer_tag->get('browse_link_label'), trim($footer_locations['objects'][$f]['human_desc']));?></a>
                </li>
                <?php
            }
                ?>
    </ul>
</div>
<?php
    if ($total_locations > 13)
    {
?>
        <div class="col-md-6 col-xs-6 p-0">
            <ul>
                <?php
                    for ($s = ($total_locations / 2) + (($total_locations % 2 == 0)?0:1); $s < $total_locations; ++$s)
                    {
                ?>
                        <li>
                            <a href="/<?php echo $country_lang_url;?>/s/<?php echo ((!$footer_tag->is_null('slug'))?$footer_tag->get('slug'):$footer_tag->get('quick_slug'));?>/<?php echo $footer_locations['objects'][$s]['search_url'];?>" title="<?php echo $lang->line('common_footer_search_title', $footer_tag->get('browse_link_label'), trim($footer_locations['objects'][$s]['human_desc']));?>"><?php echo $lang->line('common_footer_search', $footer_tag->get('browse_link_label'), trim($footer_locations['objects'][$s]['human_desc']));?></a>
                        </li>
                        <?php
                    }
                        ?>
            </ul>
        </div>
        <?php
    }