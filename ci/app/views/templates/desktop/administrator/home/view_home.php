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
                                        <h4>Performance</h4>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-3 col-md-3 col-sd-3">
                                <div class="col-md-6 left-p-0">
                                    <label for="start">Date</label>
                                    <span id="calendar-icon" class="glyphicon glyphicon-calendar non-modal" aria-hidden="true"></span>
                                    <input class="datepicker" id="zc_start" placeholder="Date" name="start" autocomplete="off" type="text" />
                                </div>
                                <div class="col-md-6 left-p-0">
                                    <label for="zc_duration">Duration</label>
                                    <div class="select select-block">
                                        <select id="zc_duration" name="duration">
                                            <option value="14">14 days</option>
                                            <option value="30">1 month</option>
                                            <option value="90">3 months</option>
                                            <option value="180">6 months</option>
                                            <option value="365">1 year</option>
                                            <option value="730">2 years</option>
                                            <option value="0">All</option>
                                        </select>
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
                        <table class="table table-hover smalltable text-left">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Results</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Today Users</td>
                                    <td><?php echo $daily_users;?></td>
                                </tr>
                                <tr>
                                    <td>Today Venues</td>
                                    <td><?php echo $daily_venues;?></td>
                                </tr>
                                <tr>
                                    <td>Today Rooms</td>
                                    <td><?php echo $daily_rooms;?></td>
                                </tr>
                            </tbody>
                        </table>
                        <div id="performance">
                            <img src="/images/loading.gif" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>