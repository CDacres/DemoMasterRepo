<div class="dashboard-page-wrapper space-top-4 space-4">
    <div class="row">
        <div class="col-md-12 space-4">
            <div id="listings-container">
                <div class="suspension-container">
                    <div class="panel space-4">
                        <?php
                            if ($num_results > 0)
                            {
                        ?>
                                <div class="panel-header active-panel-header">
                                    <div class="row">
                                        <div class="col-sm-6 active-panel-padding">
                                            <button class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">
                                                <span id="dropdown_label"><?php echo $lang->line('dashboard_inbox_all', $num_results);?></span>
                                                <span class="caret"></span>
                                            </button>
                                            <ul class="dropdown-menu">
                                                <li>
                                                    <a name="message_filter" filter_type="all"><?php echo $lang->line('dashboard_inbox_all', $num_results);?></a>
                                                </li>
                                                <?php
                                                    foreach ($message_filter->result() as $type)
                                                    {
                                                ?>
                                                        <li>
                                                            <a name="message_filter" filter_type="<?php echo $type->name;?>"><?php echo $lang->line($type->name) . ' (' . $type->message_count . ')';?></a>
                                                        </li>
                                                        <?php
                                                    }
                                                        ?>
                                                <li>
                                                    <a name="message_filter" filter_type="unread"><?php echo $lang->line('dashboard_inbox_unread', $message_unread);?></a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div id="inbox"><?php echo $this->load->view(THEME_FOLDER . '/dashboard/messages/messages', ['messages' => $messages, 'country_lang_url' => $country_lang_url, 'inbox' => true], true);?></div>
                                <?php
                            }
                            else
                            {
                                echo '<div class="panel-header active-panel-header"><div class="row"><div class="col-sm-6 active-panel-padding">' . $lang->line('dashboard_message_none') . '</div></div></div>';
                            }
                                ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
