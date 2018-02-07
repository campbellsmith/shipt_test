//Shipt coding test for QA Engineer position

const puppeteer = require('puppeteer');

let shipt_test = async () => {
	let put_into_cart = [];
	const browser = await puppeteer.launch({headless: false});//change to just launch(); to run headless chrome
	const page = await browser.newPage();
	await page.setViewport({width:1000, height:800});
	await page.goto('http://shipt.com');
	await page.waitFor(2000);
	//homepage loaded 
	console.log('homepage loaded');

	//type in login credentials
	await page.click('#main > div.wrapper > header > nav > a.button-secondary.right');
	await page.waitFor(5000); //ensure whole page is loaded 
	//type in email 
	await page.type('#myid > div > ion-content > div > div > div > div.contents > form > div > label:nth-child(1) > input', 'qatest@shipt.com');
	await page.waitFor(500);
	//type in password 
	await page.type('#myid > div > ion-content > div > div > div > div.contents > form > div > label:nth-child(2) > input', 'Sh1pt123!');
	await page.waitFor(500);
	
	//log in
	await page.click('#start_shopping_login_button');
	
	await page.waitFor(5000); //ensure whole page is loaded 
	console.log('logged in successfully');
	
	//Search for product and add it to cart
	await page.type('#search', 'Paper Towels');
	await page.waitFor(500);
	
	await page.click('#homeIonContent > div > div > shipt-web-header > div > div > div.web-header-search-bar.bar.bar-light.bar-has-sub-header.item-input-inset > form > button');
	await page.waitFor(3000);
	
	//click first item in search
	await page.click('#homeIonContent > div > div > div > div.row.responsive-md.max-width-web > div.col.col-80 > div > div:nth-child(1)');
	await page.waitFor(1000);
	
	//pull item title in order to compare to cart later on
	const first_item = await page.evaluate(() => {
		let title = document.querySelector('h1.ng-binding').innerText;
		let out_title = title.trim();
		return out_title;
	});
	put_into_cart.push(first_item);

	//add item to cart
	await page.click('body > div.modal-backdrop.active > div.modal-wrapper > div > shipt-web-modal > div > div:nth-child(1) > div > div > div > div > ng-transclude > div.product-modal-top > ion-list > div > div.product-detail-info > div.text-center.cart-buttons-area > div');
	await page.waitFor(2000);
	console.log('first item in cart');
	
	//go home 
	//***the X button to close the pop up item menu does not have a selector, or I cant seem to find it. Only way to close this is to go back or refresh the page***
	await page.goBack();
	await page.waitFor(5000); //ensure page is done loading
	
	//Use category menu to find product and add to cart
	//click shop by category
	await page.click('#homeIonContent > div > div > shipt-web-subheader > div > div > button:nth-child(1)');
	await page.waitFor(2000);
	//click deli
	await page.click('body > div.popover-backdrop.active > div > div > ion-popover-view > ion-content > div > div:nth-child(2) > ion-list > div > ion-item:nth-child(8)');
	await page.waitFor(2000);
	//select first deli item and open pop up menu
	await page.click('#productsIonContent > div > div > div:nth-child(2) > div > div > div:nth-child(1) > ion-item > div:nth-child(1)');
	await page.waitFor(2000);
	//pull title of item 
	const second_item = await page.evaluate(() => {
		let title = document.querySelector('h1.ng-binding').innerText;
		const out_title = title.trim(); //remove newlines
		return out_title;
	});
	//put item title into array for comparing later
	put_into_cart.push(second_item);
	
	//place into cart
	await page.click('body > div.modal-backdrop.active > div.modal-wrapper > div > shipt-web-modal > div > div:nth-child(1) > div > div > div > div > ng-transclude > div.product-modal-top > ion-list > div > div.product-detail-info > div.text-center.cart-buttons-area > div');
	await page.waitFor(2000);
	console.log('second item in cart');
	
	//back to home page
	await page.reload();
	await page.waitFor(5000);
	
	//go to cart
	console.log("go to cart");
	page.goto('https://shop.shipt.com/#/app/shoppingCart');
	console.log("in cart");
	await page.waitFor(4000);
	//I could not seem to get the cart button to click using the selector, which is why i went with going to the direct link
	//await page.click('#homeIonContent > div > div > shipt-web-header > div > div > web-cart-button > button');
	//await page.waitFor(3000);

	
	
	//Read cart item titles
	console.log("read cart");
	//Currently assuming only two products, was having troubles iterating through all items correctly but this works in its current state
	const cart_items = await page.evaluate(() => {
		let data = [];
		let elements = document.querySelectorAll('.cart-items-area'); //load whole cart area into variable elements
		
		for(var element of elements){
			for(i = 1; i < 3; i++){ //assuming only 2 cart items here 
				let title = element.childNodes[0].children[i].children[3].innerText; //this gets the product name from in the cart
			const out_title = title.trim();
			data.push(out_title);
			}		
		}

		return data;
	});
	console.log("cart items polled");
	
	//validate cart items. Luckily cart items are sorted by the order of which you place them in, so no extra steps here are neccessary
	let item_check = [];
	for(i = 0; i < cart_items.length; i++){
		if(put_into_cart[i] == cart_items[i]){
			item_check.push(true);
			
		}
		else{
			item_check.push(false);
		}
		
	}
	console.log(item_check);
	if(item_check[0]){
		if(item_check[1]){
		console.log('Success! Cart matches selected items');
		}
	}
	else{
		console.log('Items do not match. End program');
	}
	
	
	browser.close();
	
	let out = [];
	out.push({put_into_cart, cart_items});
	return out;
	//End program
};
shipt_test().then((value) => {
	console.log(value);
	process.exit(-1);
});
	
