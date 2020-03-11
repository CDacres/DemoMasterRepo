<div class="panel space-4">
    <div class="panel-header active-panel-header">Widget</div>
	<div class="panel-body">
            <h4><?php echo $lang->line('dashboard_live_booking');?></h4>
            <p><?php echo $lang->line('dashboard_no_calls');?><br /><?php echo $lang->line('dashboard_widget_copy');?></p>
            <p>
                <b><?php echo $lang->line('dashboard_widget_maximise');?></b>
            </p>
            <ul>
                <li><?php echo $lang->line('dashboard_widget_list1');?></li>
                <li><?php echo $lang->line('dashboard_widget_list2');?></li>
                <li><?php echo $lang->line('dashboard_widget_list3');?></li>
            </ul>
            <hr />
            <h4><?php echo $lang->line('dashboard_widget_title');?></h4>
            <p><?php echo $lang->line('dashboard_widget_code_copy');?></p>
            <div class="row space-top-6 space-6">
                <div class="col-md-4">
                    <script src="<?php echo auto_version('widget/dist.js');?>"></script>
                    <div id="zc_widget"></div>
                    <script>
                        customiseWidget({
                                assetToken: '<?php echo $token;?>',
                                domain: '<?php echo $country_lang_url;?>',
                                widgetType: 'button',
                                widgetText: '<?php echo $lang->line('dashboard_button');?>',
                                textCase: 'uppercase',
                                backgroundColor: '#00c6ff',
                                backgroundColorHover: '#00a2d1',
                                textColor: '#FFF',
                                borderColor: '#33d1ff',
                                textColorHover: '#FFF',
                                borderColorHover: '#00a2d1',
                                borderBottomColor: '#00a2d1',
                                subtextColor: 'black'
                        });
                    </script>
                </div>
                <div class="col-md-8">
<pre>
<code>
&lt;script src="<?php echo site_url();?>js/widget/dist.js"&gt;&lt;/script&gt;
&lt;div id="zc_widget"&gt;&lt;/div&gt;
&lt;script&gt;
  customiseWidget({
  assetToken: '<?php echo $token;?>',
  domain: '<?php echo $country_lang_url;?>',
  widgetType: 'button',
  widgetText: '<?php echo $lang->line('dashboard_button');?>',
  textCase: 'uppercase',
  backgroundColor: '#00c6ff',
  backgroundColorHover: '#00a2d1',
  textColor: '#FFF',
  borderColor: '#33d1ff',
  textColorHover: '#FFF',
  borderColorHover: '#00a2d1',
  borderBottomColor: '#00a2d1',
  subtextColor: 'black'
});
&lt;/script&gt;
</code>
</pre>
                </div>
            </div>
            <hr />
            <h4><?php echo $lang->line('dashboard_widget_link');?></h4>
            <p><?php echo $lang->line('dashboard_widget_code_copy');?></p>
            <div class="row space-top-6 space-6">
                <div class="col-md-4 text-center">
                    <a href="<?php echo site_url() . $country_lang_url;?>/widget/?token=<?php echo $token;?>" target="_blank"><?php echo $lang->line('dashboard_button');?></a>
                </div>
            <div class="col-md-8">
<pre>
<code>
&lt;a href="<?php echo site_url() . $country_lang_url;?>/widget/?token=<?php echo $token;?>" target="_blank"&gt;<?php echo $lang->line('dashboard_button');?>&lt;/a&gt;
</code>
</pre>
            </div>
        </div>
    </div>
</div>
