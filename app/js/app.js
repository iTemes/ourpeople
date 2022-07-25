import $ from 'jquery';

window.jQuery = $;
window.$ = $;

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.header');
  const navToogle = document.querySelector('.nav-toogle');
  const mainNav = document.querySelector('.main-nav');

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

  navToogle.addEventListener('click', handleNavToogle);
  navBarScroll();
});
