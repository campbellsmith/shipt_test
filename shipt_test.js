//Shipt coding test for QA Engineer position

const puppeteer = require('puppeteer');

let login = async () => {
	const browser = await puppeteer.launch({headless: false});
	const page = await browser.newPage();
	await page.goto('http://shipt.com');
	await page.waitFor(1000);
	//homepage loaded 
	
	//begin log in 
	//click log in button
	await page.click('#main > div.wrapper > header > nav > a.button-secondary.right');
	await page.waitFor(5000); //ensure whole page is loaded 
	//type in email 
	await page.type('#myid > div > ion-content > div > div > div > div.contents > form > div > label:nth-child(1) > input', 'qatest@shipt.com');
	await page.waitFor(1000);
	//type in password 
	await page.type('#myid > div > ion-content > div > div > div > div.contents > form > div > label:nth-child(2) > input', 'Sh1pt123!');
	await page.waitFor(500);
	
	//log in
	await page.click('#start_shopping_login_button');
	
	await page.waitFor(5000); //ensure whole page is loaded 
	
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
		
		return title;
	});
	
	//add item to cart
	await page.click('body > div.modal-backdrop.active > div.modal-wrapper > div > shipt-web-modal > div > div:nth-child(1) > div > div > div > div > ng-transclude > div.product-modal-top > ion-list > div > div.product-detail-info > div.text-center.cart-buttons-area > div');
	await page.waitFor(2000);
	//await page.click('body > div.modal-backdrop.active > div.modal-wrapper > div > shipt-web-modal > div > div.modal-wrapper-2.shadow-modal > div > div > div > ::before == $0');
	//go home 
	await page.goBack();
	await page.waitFor(5000);
	
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
		
		return title;
	});
	
	//place into cart
	await page.click('body > div.modal-backdrop.active > div.modal-wrapper > div > shipt-web-modal > div > div:nth-child(1) > div > div > div > div > ng-transclude > div.product-modal-top > ion-list > div > div.product-detail-info > div.text-center.cart-buttons-area > div');
	await page.waitFor(2000);
	
	//back to home page
	await page.goBack();
	await page.waitFor(3000);
	
	//go to cart
	await page.click('#homeIonContent > div > div > shipt-web-header > div > div > web-cart-button > button');

	await page.waitFor(5000);
	//Validate correct products are in cart
	
	
	//End program
	browser.close();

	return {first_item, second_item};
	
};

login().then((value) => {
	console.log(value); //success
	
});
	
