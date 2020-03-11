(function($){
  $.fn.outside = function(ename, cb){
      return this.each(function(){
          var $this = $(this),
              self = this;

          $(document).bind(ename, function tempo(e){
              if(e.target !== self && !$.contains(self, e.target)){
                  cb.apply(self, [e]);
                  if(!self.parentNode) $(document.body).unbind(ename, tempo);
              }
          });
      });
  };
}(jQuery));

$(document).ready(function() {
    attachModal();
    if ($('#mobile').is(':visible')) {
        var mobsearchElement = 'home_search_mob';
        handlePacContainer(mobsearchElement);
    }
});

function attachModal()
{
    $('.modal-review').bind("click", function()
    {
        clearMainModal();
        $("#modal_slide_up_content").load(base_url + country_lang_url + '/common/modal_review', function()
        {
            $(".modal-dialog").addClass('modal-lg');
            $("#mainModal").modal('show');
            verticallyCenterModal();
        });
    });
}

function handlePacContainer(elementId)
{
    var $pacContainer = null;
    var input = document.getElementById(elementId);
    if (input) {
        google.maps.event.addDomListener(input, 'keydown', function(e) {
            if (e.keyCode == 13) {
                if(!$pacContainer || !$pacContainer.length) {
                    $pacContainer = $('.pac-container');
                }
                if($pacContainer.is(':visible')) {
                    e.preventDefault();
                }
            }
        });
    }
}