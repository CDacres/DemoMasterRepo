<?php
if (count($reserved_js_variables) > 0)
{
    echo '<script type="text/javascript">' . js_variables_to_script($reserved_js_variables) . '</script>';
}
?>
<div class="modal-body p-0 room-modal"><?php $this->load->view(THEME_FOLDER . "/" . $message_element);?></div>
<?php
    foreach ($reserved_js_post as $jScript)
    {
        echo '<script src="' . $jScript . '" type="text/javascript"></script>';
    }