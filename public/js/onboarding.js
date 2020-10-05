jQuery(document).ready(($) => {

  function error_body(err) {
    console.log(err.responseJSON)

    $('#msg').css('display', 'block')

    let message = "Please check your credentials entered"

    if (err.responseJSON.message) {
      message = err.responseJSON.message
    }
    else if (err.responseJSON.errors) {

      const errors = err.responseJSON.errors
      const first_key = Object.keys(errors[0])[0]
      const first_value = Object.values(errors[0])[0]

      message = first_key + " " + first_value
    }

    $('#msg').text(message)
  }

  function success_body(res, redr_path) {
    if (res.status === true) {
      $('#msg').css('display', 'none')

      location.href = `${redr_path}?message=${res.message}`
    }
    else {
      console.log(res.message)
      $('#msg').css('display', 'block')
      $('#msg').text(res.message)
    }
  }


  $('#msg').css('display', 'none')

  $('#signup-form').on('submit', e => {
    e.preventDefault()

    let data_set = {
      'firstname': $('#firstname').val().trim(),
      'lastname': $('#lastname').val().trim(),
      'email': $('#email').val().trim(),
      'password': $('#password').val().trim()
    }

    const target = '/api/signup'
    const redr_path = '/web/login'

    $.ajax({
      url: target,
      method: 'POST',
      dataType: 'json',
      cache: false,
      data: data_set,
      success: res => success_body(res, redr_path),
      error: err => error_body(err)
    })
  })

  $('#signin-form').on('submit', e => {
    e.preventDefault()

    let data_set = {
      'email': $('#email').val().trim(),
      'password': $('#password').val().trim()
    }

    const target = '/api/login'
    const redr_path = '/web/forgetpassword'

    $.ajax({
      url: target,
      method: 'POST',
      dataType: 'json',
      cache: false,
      data: data_set,
      success: res => success_body(res, redr_path),
      error: err => error_body(err)
    })
  })

  $('#forgetpassword-form').on('submit', e => {
    e.preventDefault()

    let data_set = {
      'email': $('#email').val().trim(),
    }

    const target = '/api/forgetpassword'
    const redr_path = '/web/resetpassword'

    $.ajax({
      url: target,
      method: 'POST',
      dataType: 'json',
      cache: false,
      data: data_set,
      success: res => success_body(res, redr_path),
      error: err => error_body(err)
    })
  })

  $('#resetpassword-form').on('submit', e => {
    e.preventDefault()

    let data_set = {
      'email': $('#email').val().trim(),
      'password': $('#password').val().trim(),
      'code': $('#code').val().trim()
    }

    const target = '/api/resetpassword'
    const redr_path = '/'
    
    $.ajax({
      url: target,
      method: 'PUT',
      dataType: 'json',
      cache: false,
      data: data_set,
      success: res => success_body(res, redr_path),
      error: err => error_body(err)
    })
  })
})
