$(function(){

	tab_basket = $('.tablist');

	tab_basket.find('li.active > div').show();

	tab_basket.find('>ul>li>a').click(listTabMenuToggle).focus(listTabMenuToggle);

});
//window-onload



function listTabMenuToggle(event){

	var $this = $(this);

	$this.next('div').show().parent('li').addClass('active').siblings('li').removeClass('active').find('>div').hide();


	if($this.attr('href') === '#'){

		return false;

	}

}