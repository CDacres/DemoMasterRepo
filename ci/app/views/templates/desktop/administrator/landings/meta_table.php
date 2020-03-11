<div class="panel-body">
    <?php
        if (count($tags) > 0)
        {
    ?>
            <table>
                <thead>
                    <tr>
                        <th>Tag Name</th>
                        <th>Language Name</th>
                        <th>Language Url</th>
                        <th>Has Browse</th>
                        <th>Has Landing Page</th>
                        <th>Has Sub Landing Page</th>
                        <th>Browse Link Title</th>
                        <th>Browse Meta Title</th>
                        <th>Browse Meta Desc</th>
                        <th>Browse Carousel Title</th>
                        <th>Browse Header 1 Title</th>
                        <th>Browse Header 2 Title</th>
                        <th>LP Link Title</th>
                        <th>LP Meta Title</th>
                        <th>LP Meta Desc</th>
                        <th>LP Carousel Title</th>
                        <th>LP Header 1 Title</th>
                        <th>LP Header 2 Title</th>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        foreach ($tags->object() as $tag)
                        {
                    ?>
                            <tr>
                                <td><?php echo $tag->get('name');?></td>
                                <td><?php echo $tag->get('label');?></td>
                                <?php
                                    if ($tag->get('metas')->get_count() > 0)
                                    {
                                        $tag_meta = $tag->get('metas')->get_first();
                                ?>
                                        <td><?php echo $tag_meta->get('slug');?></td>
                                        <td>
                                            <input type="checkbox" value="<?php echo $tag_meta->get_id();?>" name="zc_tag_meta_has_browse" class="zc_tag_meta_has_browse"
                                            <?php
                                                if ($tag_meta->is_true('has_browse'))
                                                {
                                                    echo ' checked';
                                                }
                                            ?>
                                            />
                                        </td>
                                        <td>
                                            <input type="checkbox" value="<?php echo $tag_meta->get_id();?>" name="zc_tag_meta_has_lp" class="zc_tag_meta_has_lp"
                                            <?php
                                                if ($tag_meta->is_true('has_lp'))
                                                {
                                                    echo ' checked';
                                                }
                                            ?>
                                            />
                                        </td>
                                        <td>
                                            <input type="checkbox" value="<?php echo $tag_meta->get_id();?>" name="zc_tag_meta_has_lp_sub_loc" class="zc_tag_meta_has_lp_sub_loc"
                                            <?php
                                                if ($tag_meta->is_true('has_lp_sub_loc'))
                                                {
                                                    echo ' checked';
                                                }
                                            ?>
                                            />
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_browse_link_label" class="zc_tag_meta_browse_link_label form-control" value="<?php echo $tag_meta->get('browse_link_label');?>" type="text" />
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_browse_title" class="zc_tag_meta_browse_title form-control" value="<?php echo $tag_meta->get('browse_title');?>" type="text" />
                                        </td>
                                        <td>
                                            <textarea name="zc_tag_meta_browse_meta_desc" class="zc_tag_meta_browse_meta_desc form-control"><?php echo $tag_meta->get('browse_meta_desc');?></textarea>
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_browse_carousel_title" class="zc_tag_meta_browse_carousel_title form-control" value="<?php echo $tag_meta->get('browse_carousel_title');?>" type="text" />
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_browse_h1_title" class="zc_tag_meta_browse_h1_title form-control" value="<?php echo $tag_meta->get('browse_h1_title');?>" type="text" />
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_browse_h2_title" class="zc_tag_meta_browse_h2_title form-control" value="<?php echo $tag_meta->get('browse_h2_title');?>" type="text" />
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_lp_link_label" class="zc_tag_meta_lp_link_label form-control" value="<?php echo $tag_meta->get('lp_link_label');?>" type="text" />
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_lp_title" class="zc_tag_meta_lp_title form-control" value="<?php echo $tag_meta->get('lp_title');?>" type="text" />
                                        </td>
                                        <td>
                                            <textarea name="zc_tag_meta_lp_meta_desc" class="zc_tag_meta_lp_meta_desc form-control"><?php echo $tag_meta->get('lp_meta_desc');?></textarea>
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_lp_carousel_title" class="zc_tag_meta_lp_carousel_title form-control" value="<?php echo $tag_meta->get('lp_carousel_title');?>" type="text" />
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_lp_h1_title" class="zc_tag_meta_lp_h1_title form-control" value="<?php echo $tag_meta->get('lp_h1_title');?>" type="text" />
                                        </td>
                                        <td>
                                            <input name="zc_tag_meta_lp_h2_title" class="zc_tag_meta_lp_h2_title form-control" value="<?php echo $tag_meta->get('lp_h2_title');?>" type="text" />
                                        </td>
                                        <?php
                                    }
                                    else
                                    {
                                        echo '<td colspan="16">No Meta Data</td>';
                                    }
                                ?>
                            </tr>
                            <?php
                        }
                            ?>
                </tbody>
            </table>
            <?php
        }
        else
        {
            echo 'No Tags';
        }
            ?>
</div>