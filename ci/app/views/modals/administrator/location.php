<form>
    <div class="form-group bottom-p-1">
        <div class="row">
            <div class="col-md-12">
                <h5 id="title">Place <span class="required">*</span></h5>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-12">
                <input type="text" id="modal_autocomplete" />
                <?php echo $location->get_html_data_input('search_url', null, 'hidden', 'zc_location_search_url');?>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6"><?php echo $location->get_html_data_input('human_desc', 'form-control', 'text', 'zc_location_place', false, ['maxlength' => 45]);?></div>
            <div class="col-sm-6">This is the place name used on the site (it can be changed)</div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h5 id="title">Parent <span class="required">*</span></h5>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <div class="select select-block">
                    <select id="zc_location_parent">
                        <option value='-1' disabled selected style='display: none;'>Select...</option>
                        <?php
                            foreach ($parent_locations->object() as $parentLocation)
                            {
                                echo '<option value="' . $parentLocation->get_id() . '"' . (($location->get('parent_id') == $parentLocation->get_id())?' selected':'') . ' data-parent_url="' . $parentLocation->get('url_desc') . '">' . $parentLocation->get('human_desc') . '</option>';
                            }
                        ?>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h5 id="title">Url <span class="required">*</span></h5>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <?php echo $location->get_html_data_input('url_desc', 'form-control', 'text', 'zc_location_url', false, ['maxlength' => 45, 'placeholder' => 'hemel-hempstead']);?>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6"><b>Search Url:</b> <span id="search_url"><?php echo $location->get('search_url');?></span></div>
        </div>
        <div class="row">
            <div class="col-md-6">
                <h5 id="title">Category <span class="required">*</span></h5>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <div class="select select-block">
                    <select id="zc_location_category">
                        <option value='-1' disabled selected style='display: none;'>Select...</option>
                        <?php
                            foreach ($location_categories->object() as $category)
                            {
                                echo '<option value="' . $category->get_id() . '"' . ((($location->get('category_type') == $category->get_id()) || ($location->is_null('category_type') && $category->get_id() == Location_Category::DISTRICT))?' selected':'') . '>' . $category->get('location_category') . '</option>';
                            }
                        ?>
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h5 id="title">Position</h5>
                <p>If the lat/long fields are filled out then the bounds will be found using them rather than the place name</p>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label for="lat">Lat</label>
                <?php echo $location->get_html_data_input('lat', 'form-control', 'text', 'zc_location_lat', false, ['maxlength' => 10]);?>
            </div>
            <div class="form-group col-sm-6">
                <label for="long">Long</label>
                <?php echo $location->get_html_data_input('long', 'form-control', 'text', 'zc_location_long', false, ['maxlength' => 10]);?>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-6">
                <label for="bounds_distance">Distance (km)</label>
                <?php echo $location->get_html_data_input('bounds_distance', 'form-control', 'text', 'zc_bounds_distance', false, ['maxlength' => 5]);?>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <h5 id="title">Crawlable?</h5>
            </div>
        </div>
        <div class="row">
            <div class="form-group col-sm-2">
                <input type="checkbox" value="<?php echo $location->get_id();?>" id="zc_location_crawl_check"<?php if ($location->is_true('is_crawlable')) { echo ' checked="checked"';}?>>
            </div>
        </div>
    </div>
</form>