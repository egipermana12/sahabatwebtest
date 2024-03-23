const loadEnvConfig = require('./../global/dotenvLoader');
const {Builder, By, until} = require("selenium-webdriver");

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}login`;

/**
 * @return {[string]}
 * @funciton testPasswordNull
 * @assert {'Password Belum Diisi!'}
 */
async function testPasswordNull(){
	const inputData = [
        { nik: '3202080504910003', pass: '' },
    ];

    //launch the browser
    let driver;

    try{
        //launch

        driver = await new Builder().forBrowser("chrome").build();

        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //remove required nik
        await driver.executeScript("document.getElementById('fmnik').removeAttribute('required');");
         await driver.executeScript("document.getElementById('fmcaptcha').removeAttribute('required');");

        await driver.findElement(By.id("fmnik")).sendKeys(inputData[0].nik);
        await driver.findElement(By.id("password")).sendKeys(inputData[0].pass);
      

        // Di sini kita hanya menunggu 15 detik untuk tujuan captcha
        await driver.sleep(3000);

        //click button daftar
        const button = await driver.findElement(By.xpath('//a[@id="btLogin"]/button'));
        button.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Password Belum Diisi!");
        console.log('Test Login Password Null passed...');
    }
    catch(error){
        console.log('Test Login Password Null failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * @return {string}
 * @function testPasswordWrong
 * @assert {'Password Salah!'}
 */
async function testPasswordWrong(){
	const inputData = [
        { nik: '3202080504910003', pass: 'a123456FGG' },
    ];

    //launch the browser
    let driver;

    try{
        //launch

        driver = await new Builder().forBrowser("chrome").build();

        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //remove required nik
        await driver.executeScript("document.getElementById('fmnik').removeAttribute('required');");

        await driver.findElement(By.id("fmnik")).sendKeys(inputData[0].nik);
        await driver.findElement(By.id("password")).sendKeys(inputData[0].pass);
      

        // Di sini kita hanya menunggu 15 detik untuk tujuan captcha
        await driver.sleep(10000);

        //click button daftar
        const button = await driver.findElement(By.xpath('//a[@id="btLogin"]/button'));
        button.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Password Salah!");
        console.log('Test Login Password Wrong passed...');
    }
    catch(error){
        console.log('Test Login Password Wrong failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function runTest(){
	await testPasswordNull();
	await testPasswordWrong();
}

runTest();