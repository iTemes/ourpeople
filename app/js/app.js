// import $ from 'jquery';

// window.jQuery = $;
// window.$ = $;

import Modal from 'bootstrap/js/dist/modal.js';

document.addEventListener('DOMContentLoaded', () => {
  //nav
  const header = document.querySelector('.header');
  const navToogle = document.querySelector('.nav-toogle');
  const mainNav = document.querySelector('.main-nav');

  // forms
  const consultationForm = document.getElementById('consultation-form');
  const secondConsultationForm = document.getElementById('consultation-form-second');
  const requestBigForm = document.getElementById('request-big-form');

  // modals
  const modalSuccess = new Modal(document.getElementById('form-success'));
  const requestModal = new Modal(document.getElementById('request-modal'));

  $("a[href^='#']").on('click', function () {
    const _href = $(this).attr('href');
    $('html, body').animate(
      { scrollTop: $(_href).offset().top - 50 + 'px' },
      {
        duration: 700,
        easing: 'swing',
      }
    );
    handleNavToogle();
    return false;
  });

  function handleNavToogle() {
    navToogle.classList.toggle('open');
    mainNav.classList.toggle('open');
    header.classList.toggle('open');
  }

  function navBarScroll() {
    const navBarOffset = mainNav.offsetTop;
    let windowPosScroll = window.scrollY;
    if (window.screen.width > 960) {
      window.addEventListener('scroll', function (evt) {
        windowPosScroll = window.scrollY;
        windowPosScroll >= navBarOffset ? mainNav.classList.add('scrolled') : mainNav.classList.remove('scrolled');
      });
    }
  }

  function handleConsultationFromSubmit(evt) {
    evt.preventDefault();
    const formEl = evt.target;

    // const data = new FormData(evt.target);
    var data = {
      name: $(formEl).find('#req-name').val(),
      phone: $(formEl).find('#req-phone').val(),
      comment: $(formEl).find('#req-comment').val(),
    };
    console.log('data', data);
    $.ajax({
      url: './php/consultation.php',
      data: data,
      type: 'POST',
      success: function (data) {
        // For Notification
        evt.target.reset();

        requestModal.hide();
        modalSuccess.show();
        if (data.error) {
          evt.target.reset();
          requestModal.hide();
        }
      },
      error: function (data) {
        evt.target.reset();
        requestModal.hide();

        console.log('error send mail', data);
      },
    });
  }

  function handleMainConsultationFromSubmit(evt) {
    evt.preventDefault();
    const formEl = evt.target;

    // const data = new FormData(evt.target);
    var data = {
      name: $(formEl).find('#reqbig-name').val(),
      phone: $(formEl).find('#reqbig-phone').val(),
      address: $(formEl).find('#reqbig-address').val(),
      floor: $(formEl).find('#reqbig-floor').val(),
      square: $(formEl).find('#reqbig-square').val(),
      rooms: $(formEl).find('#reqbig-rooms').val(),
      sail: $(formEl).find('#reqbig-check-sail').val() ? 'Да' : 'Нет',
      rent: $(formEl).find('#reqbig-check-rent').val() ? 'Да' : 'Нет',
      repair: $(formEl).find('input[name="repair"]:checked').val() || 'Нет информации',
    };
    console.log('data', data);

    $.ajax({
      url: './php/mainConsultation.php',
      data: data,
      type: 'POST',
      success: function (data) {
        // For Notification
        evt.target.reset();

        requestModal.hide();
        modalSuccess.show();
        if (data.error) {
          evt.target.reset();
          requestModal.hide();
        }
      },
      error: function (data) {
        evt.target.reset();
        requestModal.hide();

        console.log('error send mail', data);
      },
    });
  }

  navToogle.addEventListener('click', handleNavToogle);

  consultationForm.addEventListener('submit', handleConsultationFromSubmit);
  secondConsultationForm.addEventListener('submit', handleConsultationFromSubmit);
  requestBigForm.addEventListener('submit', handleMainConsultationFromSubmit);

  // navBarScroll();
});
