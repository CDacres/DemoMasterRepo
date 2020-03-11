<?php
    if (count($cols) > 0)
    {
?>
        <table class="table table-hover smalltable text-left">
            <thead>
                <tr>
                    <th></th>
                    <?php
                        foreach ($cols as $head_name)
                        {
                            echo '<th>' . $head_name . '</th>';
                        }
                    ?>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($titles as $rowTitleKey => $rowTitle)
                    {
                        echo '<tr class="text-left"><td><b>' . $rowTitle . '</b></td><td colspan="' . count($cols) . '"></td></tr>';
                        foreach ($subtitles as $subrowKey => $subrowTitle)
                        {
                            echo '<tr class="text-left"><td>&nbsp;&nbsp;' . $subrowTitle . '</td>';
                            foreach ($cols as $head_name)
                            {
                                echo '<td>' . ((isset($data[$head_name][$rowTitleKey][$subrowKey]))?$data[$head_name][$rowTitleKey][$subrowKey]:'0') . '</td>';
                            }
                            echo '</tr>';
                        }
                    }
                ?>
            </tbody>
        </table>
        <?php
    }
    else
    {
        echo 'No results';
    }