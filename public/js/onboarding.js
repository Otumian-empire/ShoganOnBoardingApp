jQuery(document).ready(($) => {

    $('#signup-form').on('submit', function (e) {
        e.preventDefault()

        let data_set = {
            firstname: $('#firstname').val().trim(),
            lastname: $('#lastname').val().trim(),
            email: $('#email').val().trim(),
            password: $('#password').val().trim()
        }

        $.ajax({
            url: '/signup',
            method: 'POST',
            dataType: 'json',
            cache: false,
            data: JSON.stringify(data_set),
            success: function (res) {
                if (res.status) {
                    window.location.href = '/'
                    console.log('form submitted successfully')
                }
            },
            error: function (err) {
                console.log(`error: ${err}`)
                $('#msg').text(err.stack)
            }
        })


    })
})

