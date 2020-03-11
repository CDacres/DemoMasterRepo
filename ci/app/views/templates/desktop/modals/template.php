<div class="modal-header clearfix text-left">
    <button type="button" class="close" data-dismiss="modal">
        <span>&times;</span>
    </button>
    <a class="back_btn close" data-dismiss="modal">Back</a>
</div>
<?php
    if (count($reserved_js_variables) > 0)
    {
        echo '<script type="text/javascript">' . js_variables_to_script($reserved_js_variables) . '</script>';
    }
?>
<div class="modal-body">
    <?php
        if (isset($title))
        {
            echo "<h5>" . $title . "</h5>";
        }
        $this->load->view("modals/" . $message_element);
    ?>
</div>
<div class="modal-footer">
    <?php
        if (isset($buttons))
        {
            foreach ($buttons as $id => $data)
            {
                $label = "Button";
                $classString = 'class="btn';
                $attributeString = '';
                if (is_array($data))
                {
                    if (isset($data['class']))
                    {
                        $classString .= ' ' . $data['class'];
                    }
                    else
                    {
                        $classString .= ' btn-default';
                    }
                    if (isset($data['label']))
                    {
                        $label = $data['label'];
                    }
                    if (isset($data['attributes']) && is_array($data['attributes']))
                    {
                        foreach ($data['attributes'] as $attributeName => $attributeValue)
                        {
                            $attributeString .= $attributeName . '="' . $attributeValue . '"';
                        }
                        if ($attributeString !== '')
                        {
                            $attributeString .= ' ';
                        }
                    }
                }
                else
                {
                    $label = $data;
                }
                $classString .= '" ';
                echo '<button type="button" ' . $attributeString . $classString . 'id="' . $id . '">' . $label . '</button>';
            }
        }
    ?>
    <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
</div>
<?php
    foreach ($reserved_js_post as $jScript)
    {
        echo '<script src="' . $jScript . '" type="text/javascript"></script>';
    }