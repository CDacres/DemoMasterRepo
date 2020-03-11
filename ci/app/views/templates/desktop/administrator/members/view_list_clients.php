<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="jumbotron">
                <div class="container-fluid container-fixed-lg">
                    <div class="inner">
                        <div class="row">
                            <div class="col-lg-9 col-md-9 col-sd-9">
                                <div class="panel panel-transparent">
                                    <div class="panel-body">
                                        <h4>Users: <?php echo $num_results;?></h4>
                                        <?php
                                            if (isset($keyword))
                                            {
                                                echo '<h5>Search terms: ' . $keyword . '</h5>';
                                            }
                                        ?>
                                        <a href="<?php echo site_url($country_lang_url . '/administrator/members/users');?>" class="btn btn-success admin-button">All Users</a>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
                                <form accept-charset="UTF-8" action="<?php echo site_url($country_lang_url . '/administrator/members/userkeyword');?>" method="post">
                                    <input class="bottom-m-1" id="q" name="q" placeholder="Search Users" type="text" value="" />
                                    <button type="submit" class="btn btn-default btn-sm">Find</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-heading">
                        <?php
                            if (strlen($pagination))
                            {
                                echo '<div>' . $pagination . '</div>';
                            }
                        ?>
                    </div>
                    <div class="panel-body table-responsive">
                        <table class="table table-hover text-left administrator-table">
                            <thead>
                                <tr>
                                    <?php
                                        foreach ($fields as $field_name => $field_display)
                                        {
                                            echo '<th width="';
                                            switch ($field_name)
                                            {
                                                case 'first_name':
                                                case 'email':
                                                    echo '40';
                                                break;

                                                default:
                                                    echo '5';
                                                break;
                                            }
                                            echo '%"><a href="/' . $country_lang_url . '/administrator/members/' . ((isset($keyword))?'userkeyword/' . $keyword:'users') . '/' . $field_name . '/' . (($sort_order == 'desc' && $sort_by == $field_name)?'asc':'desc') . '">' . $field_display;
                                            if ($sort_by == $field_name)
                                            {
                                                echo '<div class="order"' . (($sort_order == 'asc')?' style="transform: rotate(180deg);"':'') . '><svg viewBox="0 0 18 18" role="presentation" aria-hidden="true" focusable="false" style="display: block; height: 9px; width: 9px;"><path fillRule="evenodd" d="M16.291 4.295a1 1 0 1 1 1.414 1.415l-8 7.995a1 1 0 0 1-1.414 0l-8-7.995a1 1 0 1 1 1.414-1.415l7.293 7.29 7.293-7.29z"/></svg></div>';
                                            }
                                            echo '</a></th>';
                                        }
                                    ?>
                                    <th width="10%">Adopt</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php
                                    foreach ($users->object() as $user)
                                    {
                                ?>
                                        <tr class="text-left">
                                            <td width="5%">
                                                <a class="show_user_details" data-user-id="<?php echo $user->get_id();?>"><?php echo $user->get_id();?></a>
                                            </td>
                                            <td width="40%"><?php echo $user->wrangle('full_name')->formatted();?></td>
                                            <td width="40%">
                                                <?php
                                                    echo $user->wrangle('email')->get_email_html();
                                                    if (!$user->is_null('phone_number') && $user->data_not_empty('phone_number'))
                                                    {
                                                        echo $user->wrangle('phone_number')->get_phone_html();
                                                    }
                                                ?>
                                            </td>
                                            <td width="10%">
                                                <?php
                                                    if ($user->get('role_id') != User::ADMINUSER)
                                                    {
                                                        echo '<a target="_blank" href="/' . $country_lang_url . '/administrator/adopt_profile/' . $user->get('id') . '">Adopt</a>';
                                                    }
                                                ?>
                                            </td>
                                        </tr>
                                        <?php
                                    }
                                        ?>
                            </tbody>
                        </table>
                        <?php
                            if (strlen($pagination))
                            {
                                echo '<div>' . $pagination . '</div>';
                            }
                        ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>