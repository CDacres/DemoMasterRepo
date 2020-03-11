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
                </ul>
                <table>
                    <thead>
                        <tr>
                            <th>Tag Label</th>
                            <th>Search Volume</th>
                        </tr>
                    </thead>
                    <tbody>
                        <?php
                            if (isset($linked_tag_labels) && $linked_tag_labels->exists_in_db() && $linked_tag_labels->get_count() > 0)
                            {
                                foreach ($linked_tag_labels->object() as $linked_tag_label)
                                {
                        ?>
                                    <tr>
                                        <td><?php echo $linked_tag_label->get('tag_label');?></td>
                                        <td>
                                            <input name="zc_similar_tag_search_volume" class="zc_similar_tag_search_volume form-control" value="<?php echo $linked_tag_label->get('search_volume');?>" type="text" />
                                        </td>
                                    </tr>
                                    <?php
                                }
                            }
                                    ?>
                    </tbody>
                </table>
                <?php
            }
                ?>
    </div>
</div>