$(document).ready(function($){
    'use strict';
    //var base_url = 'http://localhost:5300/api/v1'
    var base_url = '/api/v1'
    //var upload_url = 'http://localhost:5406/uploader/api/1.0'
    var upload_url = 'https://file-uploader-1rqu.onrender.com/uploader/api/1.0'

    //userform handler
    $('#userForm').bind('submit', function(event){
        event.preventDefault()
        var data = {
            identity:$('#identity').val(),
            firstname: $('#firstname').val(), 
            lastname:$('#lastname').val(), 
            email:$('#email').val(),
            profile:$('#profile').val(),
            image:$('#image').val()
        }
        let route = (data.identity == '' ? '/user/create' : '/user/modify')
        $.post(base_url+route, data, function(response){
            if (response && !response.error){
                $('#liveToast').addClass('fade show')
                $('#userForm').trigger('reset')
                location.reload()
            } else 
                return
        })         
    })

    //destination form handler
    $('#destinationForm').bind('submit', function(event){
        event.preventDefault()
        var data = {
            identity:$('#identity').val(),
            name:$('#name').val(),
            region:$('#region').val(),
            country:$('#country').val(),
            profile:$('#profile').val(),
            image:$('#image').val()
        }
        let route = (data.identity == '' ? '/destination/create' : '/destination/modify')
        $.post(base_url+route, data, function(response){
            if (response && !response.error){
                $('#liveToast').addClass('toast fade show')
                $('#destinationForm').trigger('reset')
                location.reload()
            } else 
                return
        })
    })

    //category form handler
    $('#categoryForm').bind('submit', function(event){
        event.preventDefault()
        var data = {
            identity:$('#identity').val(),
            label:$('#label').val(),
            slug:$('#slug').val(),
            parent:$('#parent').val(),
            description:$('#desc').val()
        }
        let route = (data.identity == '' ? '/category/create' : '/category/modify')
        $.post(base_url+route, data, function(response){
            if (response && !response.error){
                $('#liveToast').addClass('toast fade show')
                $('#categoryForm').trigger('reset')
                location.reload()
            } else 
                return
        })
    })

    //tag form handler
    $('#tagForm').bind('submit', function(event){
        event.preventDefault()
        var data = {
            identity:$('#identity').val(),
            name:$('#name').val()
        }
        let route = (data.identity == '' ? '/category/tag/create' : '/category/tag/modify')
        $.post(base_url+route, data, function(response){
            if (response && !response.error){
                $('#liveToast').addClass('toast fade show')
                $('#tagForm').trigger('reset')
                location.reload()
            } else 
                return
        })
    })

    //article form handler
    $('#articleForm').bind('submit', function(event){
        event.preventDefault()
        var data = {
            identity:$('#identity').val(),
            title:$('#title').val(),
            category:$('#category').val(),
            type:$('#type').val(),
            short_content:$('#short-content').val(),
            content: $('#summernote').summernote('code'),
            media:$('#media').val(),
            keywords:$('#keywords').val(),
            author:$('#author').val(),
            destination:$('#destination').val(),
            meta_title:$('#meta-title').val(),
            meta_keyword:$('#meta-keyword').val(),
            meta_description:$('#meta-desc').val(),
            editorial:$('#switch3').is(':checked'),
            image:$('#image').val(),
            featured:$('#switch1').is(':checked'),
            status:$('#switch2').is(':checked')
        }
        let route = (data.identity == '' ? '/content/create' : '/content/modify')
        $.post(base_url+route, data, function(response){
            if (response && !response.error){
                $('#liveToast').addClass('toast fade show')
                $('#articleForm').trigger('reset')
                location.href = '/admin/articles'
            } else 
                return
        })
    })

    //get user data for update
    $('.update-user').on('click', function(){
        var id = $(this).attr('data-id')
        $.get(base_url+'/user/by-identity?identity='+id, function(data){
            $('#identity').val(data.response._id)
            $('#firstname').val(data.response.firstname)
            $('#lastname').val(data.response.lastname)
            $('#email').val(data.response.email)
            $('#profile').val(data.response.profile)
            $('#image').val(data.response.image)
        })
    })

    //get category data for update
    $('.update-category').on('click', function(){
        var id = $(this).attr('data-id')
        $.get(base_url+'/category/by-identity?identity='+id, function(data){
            $('#identity').val(data.response._id)
            $('#label').val(data.response.label)
            $('#slug').val(data.response.slug)
            $('#desc').val(data.response.description)
        })
    })

    //get tag data for update
    $('.delete-tag').on('click', function(){
        $.get(base_url+'/category/tag/delete?identity='+$(this).attr('data-id'), function(response){
            if (response && !response.error){
                location.reload()
            }
        })
    })

    //get destination data for update
    $('.update-dest').on('click', function(){
        var id = $(this).attr('data-id')
        $.get(base_url+'/destination/by-identity?identity='+id, function(data){
            $('#identity').val(data.response._id)
            $('#name').val(data.response.name)
            $('#region').val(data.response.region)
            $('#country').val(data.response.country)
            $('#profile').val(data.response.profile)
            $('#image').val(data.response.image)
        })
    })

    //delete user after confirmation
    $('.delete-id').on('click', function(){
        $('#del-id').val($(this).attr('data-id'))
        $('#delForm').bind('submit', function(e){
            e.preventDefault()
            $.get(base_url+'/user/delete?identity='+$('#del-id').val(), function(response){
                if (response && !response.error) {
                    location.reload()
                }
            })
        })
    })

    //delete category after confirmation
    $('.delete-id').on('click', function(){
        $('#del-id').val($(this).attr('data-id'))
        $('#delForm').bind('submit', function(e){
            e.preventDefault()
            $.get(base_url+'/category/delete?identity='+$('#del-id').val(), function(response){
                if (response && !response.error) {
                    location.reload()
                }
            })
        })
    })

    //delete tag after confirmation
    $('.delete-id').on('click', function(){
        $('#del-id').val($(this).attr('data-id'))
        $('#delForm').bind('submit', function(e){
            e.preventDefault()
            $.get(base_url+'/user/category/tag?identity='+$('#del-id').val(), function(response){
                if (response && !response.error) {
                    location.reload()
                }
            })
        })
    })

    //delete destination after confirmation
    $('.delete-id').on('click', function(){
        $('#del-id').val($(this).attr('data-id'))
        $('#delForm').bind('submit', function(e){
            e.preventDefault()
            $.get(base_url+'/destination/delete?identity='+$('#del-id').val(), function(response){
                if (response && !response.error) {
                    location.reload()
                }
            })
        })
    })

    //delete article after confirmation
    $('.delete-id').on('click', function(){
        $('#del-id').val($(this).attr('data-id'))
        $('#delForm').bind('submit', function(e){
            e.preventDefault()
            $.get(base_url+'/content/delete?identity='+$('#del-id').val(), function(response){
                if (response && !response.error) {
                    location.reload()
                }
            })
        })
    })

    //manage post image upload
    $('.upload-file').bind('click', function(){
       var file = $('#imagefile').get(0).files[0]
       var formData = new FormData()
       formData.append('file', file)
       $.ajax({
        url:upload_url+'/travellogue/upload-multiple?bucket=tla-bucket-dev',
        type:'POST',
        processData:false,
        contentType:false,
        data:formData,
        success:function(response){
            if (response && !response.error) {
                const images = response.resp.thumb.Location+','+response.resp.original.Location
                $('#image').val(images)
                $('.preview').attr('src', response.resp.original.Location)
            }
        }
       })
    })

    $('#loginForm').bind('submit', function(e){
        e.preventDefault()
        var data = {email:$('#useremail').val(), password:$('#pass').val()}
        $.post(base_url+'/user/sign-in', data, function(response){
            if (response && !response.error) {
                location.href = '/admin/articles'
            } else {
                $('.error-msg').text(response.message)
            }
        })
    })

    $('#activateForm').bind('submit', function(e){
        e.preventDefault()
        const params = new URLSearchParams(window.location.search)
        const identity = params.get('userid')
        var data = {identity, password:$('#pass1').val()}
        $.post(base_url+'/user/activate-user', data, function(response){
            if (response && !response.error){
                //re-model this part much later....okay
                location.href = '/auth/sign-in'
            } else {
                $('.error-msg').text(response.message)
            }
        })
    })

    $('#resetForm').bind('submit', function(e) {
        e.preventDefault()
        var data = {email:$('#useremail').val()}
        $.post(base_url+'/user/reset-password', data, function(response){
            if (response && !response.error){
                $('.msg').html(`
                <div class="alert alert-success text-center mb-4" role="alert">
                    Check your inbox for reset instruction.
                </div>
                `)
            } else {
                $('.msg').html(`
                <div class="alert alert-danger text-center mb-4" role="alert">
                    Something is wrong. Are you sure about your email?
                </div>
                `)
            }
        })
    })
})
