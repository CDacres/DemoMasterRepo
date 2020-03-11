<script id="VenueCard" type="text/template">
    <div class="venue-card-outer">
        <div class="venue-card-inner">
            <div class="venue-card">
                <div class="listing panel-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <a href="<%= venue_url %>" target="_blank">
                                <div class="media-photo media-photo-block" style="background-image: url(
                                    <% if (image !== "") { %>
                                        <%= image %>
                                    <% } else { %>
                                        /css/images/addphoto.png
                                    <% } %>
                                )">
                                    <% if (approved == 1) { %>
                                        <div class="venue-status-note approved">
                                            <span class="label"><?php echo $lang->line('common_approved');?></span>
                                        </div>
                                    <% } else { %>
                                        <div class="venue-status-note not-approved">
                                            <span class="label"><?php echo $lang->line('common_not_approved');?></span>
                                        </div>
                                    <% } %>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-xs-12">
                         <div class="venue-title col-xs-12">
                                <div class="row">
                                    <div class="col-xs-8">
                                        <h4><%= name %></h4>
                                    </div>
                                    <div class="col-xs-4 text-right">
                                        <a class="edit-venue-link" href="<%= venue_url %>" target="_blank"><?php echo $lang->line('dashboard_edit_venue');?></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row room-slot-container">
                        <% if (rooms.length > 0) { %>
                            <% var counter = 0 %>
                            <% _.each(rooms, function(room, i) { %>
                                <% if (counter < 1) { %>
                                    <div class="room-slot">
                                        <div class="col-xs-12">
                                            <div class="col-xs-12">
                                                <div class="room-band col-xs-12">
                                                    <div class="row">
                                                        <div class="row">
                                                            <div class="col-sm-3 right-p-0 vcenter">
                                                                <a href="<%= room.room_url %>" target="_blank">
                                                                    <div class="media-photo media-photo-room" style="background-image: url(
                                                                    <% if (room.image !== "") { %>
                                                                        <%= room.image %>
                                                                    <% } else { %>
                                                                        /css/images/addphoto.png
                                                                    <% } %>
                                                                    )"></div>
                                                                </a>
                                                            </div>
                                                            <div class="col-sm-6 vcenter">
                                                                <h5><%= room.room_name %></h5>
                                                            </div>
                                                            <div class="col-sm-2 vcenter text-right">
                                                                <a href="<%= room.room_url %>" target="_blank"><?php echo $lang->line('dashboard_edit');?></a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                <% } else { %>
                                    <% if (counter == 2) { %>
                                        <div class="panel-heading" role="tab" id="headingOne">
                                            <div class="col-xs-12">
                                                <h4 class="panel-title">
                                                    <a class="collapse-link collapsed" role="button" data-toggle="collapse" data-parent="#accordion<%= id %>" href="#collapse<%= id %>" aria-expanded="false" aria-controls="collapse<%= id %>"><%= rooms.length - 2 %> <%= (((rooms.length - 2) > 1)?"<?php echo $lang->line('dashboard_extra_spaces');?>":"<?php echo $lang->line('dashboard_extra_space');?>") %></a>
                                                </h4>
                                            </div>
                                        </div>
                                        <div id="collapse<%= id %>" class="panel-collapse collapse" role="tabpanel" aria-labelledby="heading<%= id %>">
                                    <% } %>
                                            <div class="room-slot">
                                                <div class="col-xs-12">
                                                    <div class="col-xs-12">
                                                        <div class="room-band col-xs-12">
                                                            <div class="row">
                                                                <div class="row">
                                                                    <div class="col-sm-3 right-p-0 vcenter">
                                                                        <a href="<%= room.room_url %>" target="_blank">
                                                                            <div class="media-photo media-photo-room" style="background-image: url(
                                                                            <% if (room.image !== "") { %>
                                                                                <%= room.image %>
                                                                            <% } else { %>
                                                                                /css/images/addphoto.png
                                                                            <% } %>
                                                                            )"></div>
                                                                        </a>
                                                                    </div>
                                                                    <div class="col-sm-6 vcenter">
                                                                        <h5><%= room.room_name %></h5>
                                                                    </div>
                                                                    <div class="col-sm-2 vcenter text-right">
                                                                        <a href="<%= room.room_url %>" target="_blank"><?php echo $lang->line('dashboard_edit');?></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    <% if (counter == (rooms.length - 1)) { %>
                                        </div>
                                    <% } %>
                                <% } %>
                                    <% counter++ %>
                            <% }) %>
                        <% } %>
                        <div class="col-xs-12">
                            <div class="col-xs-12">
                                <div class="add-space">
                                    <a class="btn btn-primary btn-block" href="/<?php echo $country_lang_url;?>/list" target="_blank"><?php echo $lang->line('dashboard_add_space');?></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>

<script id="AddVenueCard" type="text/template">
    <div class="venue-card-outer">
        <div class="venue-card-inner">
            <div class="venue-card">
                <div class="listing panel-body">
                    <div class="row">
                        <div class="col-xs-12">
                            <a href="/<?php echo $country_lang_url;?>/list" target="_blank">
                                <div class="media-photo media-photo-block">
                                    <span class="glyphicon glyphicon-plus add-room" aria-hidden="true"></span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</script>

<script id="NoVenuesCard" type="text/template">
    <div class="listing panel-body">
        <div class="row">
            <div class="col-sm-6 active-panel-padding"><?php echo $lang->line('dashboard_no_venues');?></div>
        </div>
    </div>
</script>

<div class="dashboard-page-wrapper space-top-4 space-4">
    <div class="row">
        <div class="col-xs-12 space-4">
            <div id="listings-container">
                <div class="panel space-4">
                    <div class="panel-header active-panel-header">
                        <div class="row">
                            <div class="col-xs-12">
                                <div class="row">
                                    <div class="col-sm-12 active-panel-padding">
                                        <!--<button id="zc_venue_option_btn" class="btn btn-default dropdown-toggle" type="button" data-toggle="dropdown">All venues<span class="caret"></span></button>
                                        <ul class="dropdown-menu">
                                            <% if venues exist { %>
                                                <% for each venue { %>
                                                    <li>
                                                        <a href="#" class="zc_venue_list"><%= venue_name %></a>
                                                    </li>
                                                <%= } %>
                                            <% } %>
                                            <li role="separator" class="divider"></li>
                                            <li>
                                                <a href="#" class="zc_venue_list">All venues</a>
                                            </li>
                                            <li role="separator" class="divider"></li>
                                            <li>
                                                <a href="#" class="zc_venue_list">Approved</a>
                                            </li>
                                            <li>
                                                <a href="#" class="zc_venue_list">Pending</a>
                                            </li>
                                        </ul>-->
                                        <a href="/<?php echo $country_lang_url;?>/list" target="_blank">
                                            <button class="btn btn-success pull-right" type="button"><?php echo $lang->line('dashboard_add_venue');?></button>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="zc_venue_list">
                        <div class="venue-listing-container container-fluid">
                            <div class="row">
                                <div id="venueCards" class="card-row"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
