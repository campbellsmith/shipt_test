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
	await page.waitFor(5000); //make sure whole page is loaded 
	//type in email 
	await page.type('#myid > div > ion-content > div > div > div > div.contents > form > div > label:nth-child(1) > input', 'qatest@shipt.com');
	await page.waitFor(1000);
	//type in password 
	await page.type('#myid > div > ion-content > div > div > div > div.contents > form > div > label:nth-child(2) > input', 'Sh1pt123!');
	await page.waitFor(500);
	
	//log in
	await page.click('#start_shopping_login_button');
	
	await page.waitFor(5000);
	
	
	
	browser.close();
	
};

login().then((value) => {
	console.log(value); //success
	
});
	
