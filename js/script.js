jQuery(document).ready(function ($){

    function createBookListItem(book){
        var $li = $('<li>');
        $li.addClass('list-group-item cursor-pointer hover-invert');
        $li.html(book.title );
        $li.data('bookId', book.id);
        return $li;
    }
    

    var request = axios.get('http://csc225.mockable.io/books');
    request.then(function(response){
        //var bookListItem;
        $('.load').hide();
        $('.d-flex').remove();
        response.data.forEach(function(book){
            $('#book-list').append(createBookListItem(book));

        });
        $('.list-group-item').on('click', function(){
           $('.list-group-item').removeClass('active');
            var bookId = $(this).data('bookId');
            $(this).addClass('active');
            $('#book-info').html('<img src="../image/loading.webp" alt="loading gif">');
            
            
            axios.get('http://csc225.mockable.io/books/'+ bookId).then( function(response){   
                    
                var books = response.data;
                var booksDetail='<div class="card" style="width: 25rem;">';
                var image='<img src="' + books.cover + '" class = "card-img-top" alt="'+ books.title +' cover">';
                //booksDetail += '<img src="' + books.cover + '" class = "card-img-top" alt="'+ books.title +' cover">';
                booksDetail += image;
                booksDetail +='<div class="card-body">';
                var title ='<h5 class="class-title text-center">' + books.title +'</h5></div>';
                booksDetail += title;
                var author ='<h5 class="class-subtitle text-right mr-4">' +' By '+ books.author +'</h5>';
                booksDetail += author;
                booksDetail +='<ul class="list-group list-group-flush" >';
                booksDetail += '<li class="list-group-item">'+ 'Country: '+ books.country+'</li>';
                booksDetail += '<li class="list-group-item">'+ 'Language: '+ books.language+'</li>';   
                booksDetail += '<li class="list-group-item">'+ 'Year: '+ books.year+'</li>';
                booksDetail += '<li class="list-group-item">'+ 'Pages: '+ books.pages+'</li>';
                booksDetail += '</ul>';
                booksDetail +='<div class="card-body">';
                booksDetail +='<a href="'+books.link + '">[More Details in Wikipedia]</a></div></div>';
                

                
                $('#book-info').html(booksDetail);

            });
            
        });

    });
    

    
});