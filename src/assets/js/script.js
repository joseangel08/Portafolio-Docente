$('#btn1').click(function() {
    // reset modal if it isn't visible
    if (!($('.modal.in').length)) {
      $('.modal-dialog').css({
        top: 0,
        left: 0
      });
    }
    $('#myModal').modal({
      backdrop: false,
      show: true
    });
  
    $('.modal-dialog').draggable({
      handle: ".modal-header"
    });
  });