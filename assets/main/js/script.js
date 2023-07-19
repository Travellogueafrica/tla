$(document).ready(function($){
    $('#subscribe').bind('submit', function(e){
        e.preventDefault()
        var data = {email:$('#useremail').val()}
        $.post('/api/v1/subscriber/add-subscriber', data, function(response){
            if (response){
                $('.success').text(response.message)
                $('#subscribe').get(0).reset()
            }
        })
    })
})