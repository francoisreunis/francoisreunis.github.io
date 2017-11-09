
$('#chat').css('display', 'none')
$('#thug').css('display', 'none')

function addCarre(){
    if($('div.carreNoir').length < 1500){
        $('.container').append($('<div class="carreNoir">')) 
    }
    if($('div.carreNoir').length === 1500){
        $('#chat').css('display', 'inline-block')
       $('#thug').css('display', 'inline-block')
    }    
}
$('.container').click(addCarre)
