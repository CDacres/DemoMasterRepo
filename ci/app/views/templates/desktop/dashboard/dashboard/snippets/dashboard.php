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
                                        <span id="dropdown_label"><?php echo $lang->line('dashboard_messages', $message_unread);?></span>
                                    </div>
                                </div>
                            </div>
                            <div id="inbox"><?php echo $this->load->view(THEME_FOLDER . '/dashboard/messages/messages', ['messages' => $messages, 'country_lang_url' => $country_lang_url, 'inbox' => false], true);?></div>
                            <div class="panel-footer active-panel-footer">
                                <div class="row">
                                    <div class="col-sm-6 active-panel-padding">
                                        <a href="/<?php echo $country_lang_url;?>/dashboard/inbox"><?php echo $lang->line('dashboard_message_all');?></a>
                                    </div>
                                </div>
                            </div>
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
