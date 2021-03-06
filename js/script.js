function initialize(){

	function addEventI(i){
		achat[i].addEventListener('click',addToCart,false);
	}

	var achat = document.getElementsByClassName('buy');

	for(var i=0;i<achat.length;i++){
		addEventI(i);
	}
	//Creation d'évènements pour les boutons d'ajout au panier
	var textPanier,
		pNode = document.createElement('p');
	var divPanier = document.getElementsByClassName('panier')[0].children[0];
	var totpanier = 0;
	if (localStorage['donn'] == undefined){
		var dataExist = [];
		localStorage['donn'] = [];
	} else {
		var dataExist = JSON.parse(localStorage['donn']);
		for (var i = 0;i<dataExist.length; i++) {
		 	totpanier = totpanier + parseFloat(dataExist[i]['prix']);
		};
		textPan = document.createTextNode('Total : '+totpanier.toFixed(2)+' €');
		var ptot = document.createElement('p');
		ptot.appendChild(textPan);
	}

	if(dataExist.length == 0){
		textPanier = document.createTextNode('Pas d\'articles dans le panier');
	} else {
		textPanier = document.createTextNode(JSON.parse(localStorage['donn']).length+' article(s) dans le panier');
	}

	pNode.appendChild(textPanier);
	divPanier.appendChild(pNode);
	divPanier.appendChild(ptot);
	//creation et comptage du panier
	if(document.title == "Etudes et vie - Panier"){
		if(localStorage['donn'].length>2){
			var list = JSON.parse(localStorage['donn']);
			var total = 0;
			var container = document.createElement('ul');
			document.getElementsByTagName('section')[0].children[0].appendChild(container);
			for(var e=0;e<list.length;e++){

				var delBut = document.createElement('a');
				var price = document.createElement('span');
				price.appendChild(document.createTextNode(list[e]['prix']));
				delBut.setAttribute('href','#');
				delBut.appendChild(document.createTextNode('Retirer du panier'));
				var item = document.createElement('li');

				delBut.addEventListener('click',removeFromCart,false);

				var head = document.createElement('h3');
				head.appendChild(document.createTextNode(list[e]['title']))

				item.appendChild(head);
				item.appendChild(price);
				item.appendChild(delBut);
				container.appendChild(item);
				total = total + parseFloat(list[e]['prix']);
			}
			
			
			var tot = document.createElement('h3');
			var totspan = document.createElement('span');
			tot.appendChild(document.createTextNode('Total'));
			totspan.appendChild(document.createTextNode(total.toFixed(2)));
			var litot = document.createElement('li');
			litot.appendChild(tot);
			litot.appendChild(totspan);
			container.appendChild(litot);

		} else {
			var message = document.createElement('p');
			message.appendChild(document.createTextNode('Vous n\'avez pas d\'article dans votre panier.'));
			document.getElementsByTagName('section')[0].children[0].appendChild(message);
		}
	}

}

function addToCart(e){

	e.preventDefault();

	var oldItems = new Array();

	if(localStorage['donn']){
		oldItems = JSON.parse(localStorage['donn']);
	}
	var article = this.parentNode;
	var title = article.children[0].innerHTML;
	var prix = article.children[1].children[1].innerHTML;
	var description = article.children[1].children[2].innerHTML
	var img = article.children[1].children[0].src;

	for(var a=0;a<oldItems.length;a++){
		if(oldItems[a]['title'] == title){
			return;
		}
	}

	var donnees = {'title':title,'prix':prix,'desc':description,'img':img};

	oldItems.push(donnees);

	localStorage['donn'] = JSON.stringify(oldItems);
	location.reload();
}

function removeFromCart(e){
	e.preventDefault();
	var produits = JSON.parse(localStorage['donn']);

	var article = this.parentNode;
	var title = article.children[0].innerHTML;
	var prix = article.children[1].innerHTML;

	for(var o=0;o<produits.length;o++){
		if(produits[o]['title'] == title){
			var currentIndex = o;
		}
	}

	produits.splice(currentIndex,1);

	if(produits == ''){
		produits.length = 0;
		localStorage['donn'] = JSON.stringify(produits);
	}

	localStorage['donn'] = JSON.stringify(produits);
	location.reload();

}



window.onload = initialize();