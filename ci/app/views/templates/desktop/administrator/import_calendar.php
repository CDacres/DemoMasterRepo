<div class="page-container">
    <div class="page-content-wrapper">
        <div class="content">
            <div class="container-fluid container-fixed-lg bg-white">
                <div class="panel panel-transparent">
                    <div class="panel-body table-responsive">
                        <div class="input-group transparent">
                            <input class="form-control" id="room_choice" placeholder="Enter Room Id" type="text" value="">
                            <span class="input-group-addon">
                                <input type="button" id="choose_room">
                            </span>
                        </div>
                        <div id="room_confirmation" class="input-group transparent" style="display: none;">
                            <p>
                                Please confirm this is the correct room. If so, upload the relevant file for this room.
                            </p>
                            <p>
                                Room name: <span id="room_name"></span>
                            </p>
                            <span class="input-group-addon">
                                <input type="hidden" id="asset_id">
                                <input id="upload_file" type="file" name="upload_file">
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
