export default function() {

  var toggleForm = function() {
    $(`.form-section`). slideToggle();
  };

  var submitButton = $(`.add-img-btn`);
  var cancel = $(`.cancel`);

  var showContact = function(contact) {
    $(`<img></img><p></p>`)
    .text(`${image.url} - ${image.description}`)
    .appendTo(`.images`);
  };

  $(`.fa-plus-circle`).on(`click`, toggleForm);

  $(`.form-section`).on(`submit`, function(ev) {
    ev.preventDefault();

    var image = $(`.image-url`).val();
    var text = $(`.image-caption`).val();

    $.ajax({
      url: `http://tiny-lr.herokuapp.com/collections/contacts-dc`,
      method: `POST`,
      dataType: `json`,
      data: {image, text},
    }).then((response) => {
      $(`.image-url`).val('');
      $(`.image-caption`).val('');
      toggleForm();

      showContact(response);
    });

    $.ajax({
      url: `http://tiny-lr.herokuapp.com/collections/contacts-dc`,
      method: `GET`,
      dataType: `json`,
      data: {image, text},
    }).forEach(showContact);
  });
};
