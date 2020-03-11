<div class="panel-body">
    <?php
        if (count($gridArr) > 0)
        {
    ?>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        <?php
                            foreach ($gridArr as $gridHeadings)
                            {
                                if ($gridHeadings['col'])
                                {
                                    echo '<th>' . $gridHeadings['label'] . '</th>';
                                }
                            }
                        ?>
                    </tr>
                </thead>
                <tbody>
                    <?php
                        $rowCount = 1;
                        foreach ($gridArr as $gridRowId => $gridRows)
                        {
                            $cellCount = 1;
                            echo '<tr><td>' . $gridRows['label'] . '</td><td><input name="zc_similar_tag_search_volume" class="zc_similar_tag_search_volume form-control" value="' . ((isset($gridSearchVolume[$gridRowId]))?$gridSearchVolume[$gridRowId]:'') . '" type="text" /></td>';
                            foreach ($gridArr as $gridColId => $gridCols)
                            {
                                if ($gridCols['col'])
                                {
                                    echo '<td>';
                                    if ($cellCount == $rowCount)
                                    {
                                        echo 'x';
                                    }
                                    else
                                    {
                                        $value = '';
                                        if (isset($gridValuesArr[$gridColId]) && isset($gridValuesArr[$gridColId][$gridRowId]))
                                        {
                                            $value = $gridValuesArr[$gridColId][$gridRowId];
                                        }
                                        echo '<input type="checkbox" value="' . $value . '" name="zc_similar_tag_label" class="zc_similar_tag_label" data-label_id="' . $gridColId . '" data-linked_label_id="' . $gridRowId . '"';
                                        if ($value != '')
                                        {
                                            echo ' checked';
                                        }
                                        echo ' />';
                                    }
                                    echo '</td>';
                                }
                                ++$cellCount;
                            }
                            ++$rowCount;
                            echo '</tr>';
                        }
                    ?>
                </tbody>
            </table>
            <?php
        }
            ?>
</div>