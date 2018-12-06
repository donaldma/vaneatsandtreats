'use strict'

$(function () {
  function closeNav() {
    $('header').removeClass('nav-open')
  }

  $('.home-container').click(function () {
    closeNav()
  })

  $('.label').each(function (i, e) {
    $(e).click(function () {
      closeNav()
    })
  })

})