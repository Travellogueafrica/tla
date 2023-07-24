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

    $('#commentForm').bind('submit', function(e){
        e.preventDefault()
        var data = {post_id:$('#post_id').val().trim(), title:$('#title').val().trim(), name:$('#name').val().trim(), email:$('#email').val().trim(), comment:$('#comment').val().trim()}
        $.post('/api/v1/comment/add', data, function(response){
            if (response && !response.error){
                $('#commentForm').get(0).reset()
            }
            return
        })
    })
})