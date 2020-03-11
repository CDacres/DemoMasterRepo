<div class="modal-header clearfix">
    <button type="button" class="close" data-dismiss="modal">
        <span>&times;</span>
    </button>
    <a class="back_btn close" data-dismiss="modal">Back</a>
</div>
<div class="modal-body clearfix standard-modal">
    <?php
        if (isset($title))
        {
            echo "<h3>" . $title . "</h3>";
        }
    ?>
    <?php $this->load->view("modals/" . $message_element);?>
</div>
<?php
    if ($reserved_false_modal_footer === false)
    {
        echo '<div class="modal-footer clearfix">';
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
        echo '</div>';
    }