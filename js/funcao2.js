$('.nav li a').click(function (){   
  $('.navLinks').css('display', 'none');
  $(this).next().css('display', 'block');
});