jQuery(document).ready(($) => {

  $('#msg').addClass('d-none')

  $('#signup-form').on('submit', e => {
    e.preventDefault()

    let data_set = {
      'firstname': $('#firstname').val().trim(),
      'lastname': $('#lastname').val().trim(),
      'email': $('#email').val().trim(),
      'password': $('#password').val().trim()
    }

    $.ajax({
      url: '/api/signup',
      method: 'POST',
      dataType: 'json',
      cache: false,
      data: data_set,
      success: res => {
        if (res.status === true) {
          location.href = `/web/login?message=${res.message}`
        } else {
          $('#msg').toggleClass('d-none')
          $('#msg').text(res.message)
        }
      },
      error: err => {
        // let message = ''
        $('#msg').toggleClass('d-none')
        $('#msg').text("An error occured while processing credentials")

        // if (typeof err.responseJSON.message) {
        //   message = err.responseJSON.message
        //   $('#msg').text(message)
        // } else if (err.responseJSON.errors) {
        //   let firstError = err.responseJSON.errors[0]
        //   let key = Object.keys(firstError)[0]
        //   let value = firstError[key]
        //   message = key + " " + value + ""
        //   $('#msg').text(message)
        // } else {
        //   message = "Please check your credentials entered"
        //   $('#msg').text(message)
        // }

      }
    })
  })

  $('#signin-form').on('submit', e => {
    e.preventDefault()

    let data_set = {
      'email': $('#email').val().trim(),
      'password': $('#password').val().trim()
    }

    $.ajax({
      url: '/api/login',
      method: 'POST',
      dataType: 'json',
      cache: false,
      data: data_set,
      success: res => {
        if (res.status === true) {
          location.href = `/web/forgetpassword?message=${res.message}`
        } else {
          $('#msg').toggleClass('d-none')
          $('#msg').text(res.message)
        }
      },
      error: err => {
        $('#msg').toggleClass('d-none')
        $('#msg').text("An error occured while processing credentials")
      }
    })
  })

  $('#forgetpassword-form').on('submit', e => {
    e.preventDefault()

    let data_set = {
      'email': $('#email').val().trim(),
    }

    $.ajax({
      url: '/api/forgetpassword',
      method: 'POST',
      dataType: 'json',
      cache: false,
      data: data_set,
      success: res => {
        if (res.status === true) {
          location.href = `/web/resetpassword?message=${res.message}`
        } else {
          $('#msg').toggleClass('d-none')
          $('#msg').text(res.message)
        }
      },
      error: err => {
        $('#msg').toggleClass('d-none')
        $('#msg').text("An error occured while processing credentials")
      }
    })


  })
})
