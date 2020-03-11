(function() {
    function favouriteAjaxReq(method, data) {
        var settings = {
            async: true,
            crossDomain: true,
            url: base_url + 'api/v1/rooms/favourite',
            method: method,
            headers: {
                "accept": "application/json",
                "content-type": "application/x-www-form-urlencoded",
                "cache-control": "no-cache"
            },
            data: data
        };
        return new Promise(function(resolve, reject) {
            $.ajax(settings)
            .done(function() {
                resolve();
            })
            .fail(function(error) {
                reject(error);
            });
        });
    }

    function attachListener() {
        $('.favourite_switch').change(function() {
            var method = 'PUT';
            var data = {
                room_id: $(this).data('room-id')
            };
            if ($(this).is(":checked")) {
                method = 'POST';
            }
            favouriteAjaxReq(method, data)
            .catch(console.log);
        });
    }

    attachListener();
})();
