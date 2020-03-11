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
                                      <h4>Finance Summary</h4>
                                  </div>
                              </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
                                <form accept-charset="UTF-8" action="<?php echo site_url($country_lang_url . '/administrator/payments/bookingkeyword');?>" method="post">
                                    <input class="bottom-m-1" id="q" name="q" placeholder="Search Bookings" type="text" value="" />
                                    <button type="submit" class="btn btn-default btn-sm">Find</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent table-responsive">
                    <div class="panel-heading">
                        <div class="panel-title">Website Overview</div>
                    </div>
                    <div class="panel-body">
                        <div class="col-lg-3 col-md-3 col-sd-3">
                            <div class="col-md-6 left-p-0">
                                <label for="start">Date</label>
                                <span id="calendar-icon" class="glyphicon glyphicon-calendar non-modal" aria-hidden="true"></span>
                                <input class="datepicker" id="zc_start_website" placeholder="Date" name="start" autocomplete="off" type="text" />
                            </div>
                            <div class="col-md-6 left-p-0">
                                <label for="zc_duration_website">Duration</label>
                                <div class="select select-block">
                                    <select id="zc_duration_website" name="duration">
                                        <option value="6">6 months</option>
                                        <option value="12">1 year</option>
                                        <option value="24">2 years</option>
                                        <option value="60">5 years</option>
                                        <option value="0">All</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="website_overview">
                            <img src="/images/loading.gif" alt="" />
                        </div>
                    </div>
                    <div class="panel-heading">
                        <div class="panel-title">Flexible Booking</div>
                    </div>
                    <div class="panel-body">
                        <div class="col-lg-3 col-md-3 col-sd-3">
                            <div class="col-md-6 left-p-0">
                                <label for="start">Date</label>
                                <span id="calendar-icon" class="glyphicon glyphicon-calendar non-modal" aria-hidden="true"></span>
                                <input class="datepicker" id="zc_start_flexible" placeholder="Date" name="start" autocomplete="off" type="text" />
                            </div>
                            <div class="col-md-6 left-p-0">
                                <label for="zc_duration_flexible">Duration</label>
                                <div class="select select-block">
                                    <select id="zc_duration_flexible" name="duration">
                                        <option value="6">6 months</option>
                                        <option value="12">1 year</option>
                                        <option value="24">2 years</option>
                                        <option value="60">5 years</option>
                                        <option value="0">All</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="flexible_booking">
                            <img src="/images/loading.gif" alt="" />
                        </div>
                    </div>
                    <div class="panel-heading">
                        <div class="panel-title">Bookings By Type</div>
                    </div>
                    <div class="panel-body">
                        <div class="col-lg-3 col-md-3 col-sd-3">
                            <div class="col-md-6 left-p-0">
                                <label for="start">Date</label>
                                <span id="calendar-icon" class="glyphicon glyphicon-calendar non-modal" aria-hidden="true"></span>
                                <input class="datepicker" id="zc_start_bookingtype" placeholder="Date" name="start" autocomplete="off" type="text" />
                            </div>
                            <div class="col-md-6 left-p-0">
                                <label for="zc_duration_bookingtype">Duration</label>
                                <div class="select select-block">
                                    <select id="zc_duration_bookingtype" name="duration">
                                        <option value="6">6 months</option>
                                        <option value="12">1 year</option>
                                        <option value="24">2 years</option>
                                        <option value="60">5 years</option>
                                        <option value="0">All</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="booking_by_type">
                            <img src="/images/loading.gif" alt="" />
                        </div>
                    </div>
                    <div class="panel-heading">
                        <div class="panel-title">Venue Control</div>
                    </div>
                    <div class="panel-body">
                        <div class="col-lg-3 col-md-3 col-sd-3">
                            <div class="col-md-6 left-p-0">
                                <label for="start">Date</label>
                                <span id="calendar-icon" class="glyphicon glyphicon-calendar non-modal" aria-hidden="true"></span>
                                <input class="datepicker" id="zc_start_control" placeholder="Date" name="start" autocomplete="off" type="text" />
                            </div>
                        </div>
                        <div id="venue_control">
                            <img src="/images/loading.gif" alt="" />
                        </div>
                    </div>
                    <div class="panel-heading">
                        <div class="panel-title">Venues</div>
                    </div>
                    <div class="panel-body">
                        <div class="col-lg-3 col-md-3 col-sd-3">
                            <div class="col-md-6 left-p-0">
                                <label for="start">Date</label>
                                <span id="calendar-icon" class="glyphicon glyphicon-calendar non-modal" aria-hidden="true"></span>
                                <input class="datepicker" id="zc_start_venues" placeholder="Date" name="start" autocomplete="off" type="text" />
                            </div>
                            <div class="col-md-6 left-p-0">
                                <label for="zc_duration_venues">Duration</label>
                                <div class="select select-block">
                                    <select id="zc_duration_venues" name="duration">
                                        <option value="6">6 months</option>
                                        <option value="12">1 year</option>
                                        <option value="24">2 years</option>
                                        <option value="60">5 years</option>
                                        <option value="0">All</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="venues">
                            <img src="/images/loading.gif" alt="" />
                        </div>
                    </div>
                    <div class="panel-heading">
                        <div class="panel-title">Rooms</div>
                    </div>
                    <div class="panel-body">
                        <div class="col-lg-3 col-md-3 col-sd-3">
                            <div class="col-md-6 left-p-0">
                                <label for="start">Date</label>
                                <span id="calendar-icon" class="glyphicon glyphicon-calendar non-modal" aria-hidden="true"></span>
                                <input class="datepicker" id="zc_start_rooms" placeholder="Date" name="start" autocomplete="off" type="text" />
                            </div>
                            <div class="col-md-6 left-p-0">
                                <label for="zc_duration_rooms">Duration</label>
                                <div class="select select-block">
                                    <select id="zc_duration_rooms" name="duration">
                                        <option value="6">6 months</option>
                                        <option value="12">1 year</option>
                                        <option value="24">2 years</option>
                                        <option value="60">5 years</option>
                                        <option value="0">All</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div id="rooms">
                            <img src="/images/loading.gif" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>