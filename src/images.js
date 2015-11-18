export default function() {

  var toggleForm = function() {
    $('.form-section'). slideToggle();
  };

  var submitButton = $('.add-img-btn');
  var cancel = $('.cancel');

  var showContact = function(image) {
    $('<div></div>')
      .addClass('images')
      .appendTo('.images')
      .html(`${image.image} - ${image.text}`);
  };

  $('.fa-plus-circle').on('click', toggleForm);

  $('.form-section').on('submit', function(ev) {
    ev.preventDefault();

    var image = $('.image-url').val();
    var text = $('.image-caption').val();

    $.ajax({
      url: 'http://tiny-lr.herokuapp.com/collections/contacts-dc',
      method: 'POST',
      dataType: 'json',
      data: {image, text},
    }).then((response) => {
      $('.image-url').val('');
      $('.image-caption').val('');
      toggleForm();

      showContact(response);
    });
  });

  $.ajax({
    url: 'http://tiny-lr.herokuapp.com/collections/contacts-dc',
    method: 'GET',
    dataType: 'json',
  }).then((allImages) => {
    allImages.forEach(showContact);
  });
}

// npm install -g yo generator-backbone-broccoli
