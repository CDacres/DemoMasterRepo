<div class="hidden-xs jumbotron bg-white bottom-m-0">
    <div class="container">
        <div class="row">
            <div class="col-sm-6">
                <h1><?php echo $lang->line('pages_contact_heading');?></h1>
                <p><?php echo $lang->line('pages_contact_subheading');?></p>
                <p>
                    <a class="btn btn-primary" href="javascript:void($zopim.livechat.window.openPopout())" role="button"><?php echo $lang->line('pages_contact_start_a_chat');?></a>
                    &nbsp;&nbsp;
                    <a class="btn btn-success" href="/<?php echo $country_lang_url;?>/s/<?php echo $default_tag_slug;?>" role="button"><?php echo $lang->line('pages_contact_find_a_space');?></a>
                </p>
            </div>
            <?php
                if (config_item('language_code') == 'en' || config_item('language_code') == 'en_US')
                {
                    ?>
                    <div class="col-sm-6 supportimgs">
                        <script src="https://widget.reviews.co.uk/badge/dist.js"></script>
                        <div id="badge-250" style="max-width:250px;"></div>
                        <script src="https://widget.reviews.co.uk/carousel-inline/dist.js"></script>
                        <div id="carousel-inline-widget-360" style="width:100%;max-width:360px;margin:0 auto;"></div>
                        <script>
                            carouselInlineWidget('carousel-inline-widget-360',{
                              store: 'zipcube',
                              primaryClr: '#11CD6B',
                              neutralClr: '#f4f4f4',
                              layout:'fullWidth',
                              numReviews: 21
                            });
                        </script>
                    </div>
                    <?php
                }
                    ?>
        </div>
    </div>
</div>
<div class="container top-m-1 hidden-xs">
    <ol class="breadcrumb">
        <li>
            <a href="/<?php echo $country_lang_url;?>"><?php echo $lang->line('pages_contact_breadcrumbs_home');?></a>
        </li>
        <li class="active"><?php echo $lang->line('common_contact');?></li>
    </ol>
</div>
<div class="container top-m-1 bottom-m-3">
    <div class="row">
        <div class="col-md-12">
            <h2 class="bottom-m-1"><?php echo $lang->line('pages_contact_section_heading');?></h2>
            <div class="panel panel-white row p-1">
                <div class="col-sm-12 bottom-m-2">
                    <p>
                        <b><?php echo $lang->line('pages_contact_section_telephone');?></b> <span id="contact_us_phone_number"><?php echo $contact_info->get('phone');?></span> (9:00 <?php echo $lang->line('common_to');?> 18:00)
                    </p>
                    <?php
                        if ($contact_info->data_not_empty('street'))
                        {
                            ?>
                            <p>
                                <b><?php echo $lang->line('pages_contact_section_address');?></b> <?php echo $contact_info->get_address();?>
                            </p>
                            <?php
                        }
                            ?>
                </div>
                <form id="submit_message_form">
                    <div class="form-group col-sm-6">
                        <label for="name"><?php echo $lang->line('pages_contact_section_name');?><span class="required">*</span></label>
                        <input id="name" class="form-control" name="name" placeholder="<?php echo $lang->line('pages_contact_section_name');?>" type="text" value="<?php echo set_value('name');?>" required />
                    </div>
                    <div class="form-group col-sm-6">
                        <label for="email"><?php echo $lang->line('pages_contact_section_email');?><span class="required">*</span></label>
                        <input id="email" class="form-control" name="email" placeholder="<?php echo $lang->line('pages_contact_section_email');?>" type="text" value="<?php echo set_value('email');?>" required />
                    </div>
                    <div class="form-group col-sm-12">
                        <label for="message"><?php echo $lang->line('pages_contact_section_message');?><span class="required">*</span></label>
                        <textarea id="message" class="form-control" name="message" placeholder="<?php echo $lang->line('pages_contact_section_message');?>" rows="4" required><?php echo set_value('message');?></textarea>
                    </div>
                    <div class="col-sm-12 top-m-2">
                        <button id="message_submit" name="commit" class="btn btn-primary btn-lg" type="submit"><?php echo $lang->line('pages_contact_section_send_button');?></button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>
