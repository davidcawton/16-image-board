export default function() {

  var toggleForm = function() {
    $('.form-section'). slideToggle();
  };

  var submitButton = $('.add-img-btn');
  var cancel = $('.cancel');

  var showContact = function(image) {
    var imageArea = $('<div></div>')
      .addClass('image-area')
      .appendTo('.images');

    $('<img></img>')
    .attr('src', `${image.image}`)
    .addClass('pic')
    .appendTo(imageArea);

    $('<p></p>')
    .html(`${image.text}`)
    .addClass('image-text')
    .appendTo(imageArea);
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
