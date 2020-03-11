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
                                        <h4>Landing Pages</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-body table-responsive">
                        <div class="row">
                            <div class="col-lg-3 col-md-3 col-sd-3">
                                <div class="col-md-12 left-p-0">
                                    <div class="col-md-6 left-p-0">
                                        <label for="zc_country">Countries</label>
                                        <div class="select select-block">
                                            <select id="zc_country" name="countries">
                                                <option value="-1" selected disabled>Select...</option>
                                                <?php
                                                    foreach ($country_select->object() as $country)
                                                    {
                                                        if (isset(config_item('supported_locales')[$country->get('locale')]))
                                                        {
                                                            echo '<option value="' . $country->get('locale') . '">' . $country->get('country') . '</option>';
                                                        }
                                                    }
                                                ?>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <ul class="nav nav-tabs" role="tablist">
                            <li role="presentation" class="active">
                                <a href="#tab_0" aria-controls="tab_0" role="tab" data-toggle="tab">Tag Defaults</a>
                            </li>
                            <li role="presentation" class="">
                                <a href="#tab_1" aria-controls="tab_1" role="tab" data-toggle="tab">Landing Pages</a>
                            </li>
                            <li role="presentation" class="">
                                <a href="#tab_2" aria-controls="tab_2" role="tab" data-toggle="tab">Linked Tags</a>
                            </li>
                        </ul>
                        <div class="tab-content">
                            <div role="tabpanel" class="tab-pane active" id="tab_0">
                                <div class="row">
                                    <div id="metas_table"></div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="tab_1">
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sd-3">
                                        <div class="col-md-12 left-p-0">
                                            <div class="col-md-6 left-p-0">
                                                <label for="zc_tag_label">Tag Labels</label>
                                                <div class="select select-block">
                                                    <select id="zc_tag_label" name="tag_labels">
                                                        <option value="-1" selected>Select...</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-md-6 left-p-0">
                                                <label for="zc_location">Locations</label>
                                                <div class="select select-block">
                                                    <select id="zc_location" name="locations">
                                                        <option value="-1" selected>Select...</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div id="landing_page_list"></div>
                                </div>
                            </div>
                            <div role="tabpanel" class="tab-pane" id="tab_2">
                                <div class="row">
                                    <div class="col-lg-3 col-md-3 col-sd-3">
                                        <div class="col-md-12 left-p-0">
                                            <div class="col-md-6 left-p-0">
                                                <label for="zc_vertical">Verticals</label>
                                                <div class="select select-block">
                                                    <select id="zc_vertical" name="verticals">
                                                        <option value="-1" selected>Select...</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <ul class="nav nav-tabs" role="tablist">
                                    <li role="presentation" class="active">
                                        <a href="#tab_2_1" aria-controls="tab_2_1" role="tab" data-toggle="tab">Grid</a>
                                    </li>
                                    <li role="presentation" class="">
                                        <a href="#tab_2_2" aria-controls="tab_2_2" role="tab" data-toggle="tab">Filter</a>
                                    </li>
                                </ul>
                                <div class="tab-content">
                                    <div role="tabpanel" class="tab-pane active" id="tab_2_1">
                                        <div class="row">
                                            <div id="linked_tag_label_grid"></div>
                                        </div>
                                    </div>
                                    <div role="tabpanel" class="tab-pane" id="tab_2_2">
                                        <div class="row">
                                            <div class="col-lg-3 col-md-3 col-sd-3">
                                                <div class="col-md-12 left-p-0">
                                                    <div class="col-md-6 left-p-0">
                                                        <label for="zc_linked_tag_label">Tag Labels</label>
                                                        <div class="select select-block">
                                                            <select id="zc_linked_tag_label" name="linked_tag_labels">
                                                                <option value="-1" selected>Select...</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div id="linked_tag_label_list"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
