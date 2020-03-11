<?php
    if (isset($monthly_overview['head']))
    {
?>
        <table class="table table-hover smalltable text-left">
            <thead>
                <tr>
                    <th></th>
                    <?php
                        foreach ($monthly_overview['head'] as $month)
                        {
                            echo '<th>' . $month . '</th>';
                        }
                    ?>
                </tr>
            </thead>
            <tbody>
                <?php
                    foreach ($monthly_overview as $rowKey => $rowData)
                    {
                        if ($rowKey != 'head')
                        {
                            echo '<tr class="text-left';
                            if (isset($rowData['row_class']))
                            {
                                echo ' ' . $rowData['row_class'];
                                unset($rowData['row_class']);
                            }
                            echo '"';
                            if (isset($rowData['row_tooltip']))
                            {
                                echo ' title="' . $rowData['row_tooltip'] . '"';
                                unset($rowData['row_tooltip']);
                            }
                            echo '>';
                            if (isset($rowData['row_title']))
                            {
                                echo '<td>' . $rowData['row_title'] . '</td>';
                                unset($rowData['row_title']);
                            }
                            foreach ($rowData as $rows)
                            {
                                echo '<td>' . $rows . '</td>';
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
        echo 'No Results';
    }