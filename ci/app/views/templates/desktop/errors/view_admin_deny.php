<div class="Box" id="View_Deny">
    <div class="Box_Content">
        <div align="center" style="padding: 0 0 10px 0;">
            <?php
                if ($user->is_admin_in_spoofmode())
                {
                    echo 'Hi, this page requires you to un-adopt the adopted profile.';
                }
                elseif ($user->is_unspoofed_admin())
                {
                    echo 'Hi, it seems you are an admin but this page requires that you adopt a profile first.';
                }
            ?>
        </div>
    </div>
</div>