const loadEnvConfig = require('./../global/dotenvLoader');
const {Builder, By, until} = require("selenium-webdriver");

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}login`;


/**
 * @return {[string]}
 * @function testCaptchaNull
 * @assert {[kata yang kamu lihat salah]}
 */
async function testCaptchaNull(){
    const inputData = [
        { nik: '3202080504910003', pass: 'a123456F' },
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //remove required nik
        await driver.executeScript("document.getElementById('fmcaptcha').removeAttribute('required');");

        await driver.findElement(By.id("fmnik")).sendKeys(inputData[0].nik);
        await driver.findElement(By.id("password")).sendKeys(inputData[0].pass);

        // Di sini kita hanya menunggu 15 detik untuk tujuan captcha
        await driver.sleep(2000);

        //click button daftar
        const button = await driver.findElement(By.xpath('//a[@id="btLogin"]/button'));
        button.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Captcha Belum Diisi!");
        console.log('Test Captcha Not Null passed...');
    }catch(error){
        console.log('Test Captcha NULL failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * @return {[string]}
 * @function testCaptchaNotSame
 * @assert {[kata yang kamu lihat salah]}
 */
async function testCaptchNotSame(){
    const inputData = [
        { nik: '3202080504910003', pass: 'a123456F', captcha: 'VBT021' },
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);


        await driver.findElement(By.id("fmnik")).sendKeys(inputData[0].nik);
        await driver.findElement(By.id("password")).sendKeys(inputData[0].pass);
        await driver.findElement(By.id("fmcaptcha")).sendKeys(inputData[0].captcha);

        // Di sini kita hanya menunggu 15 detik untuk tujuan captcha
        await driver.sleep(2000);

        //click button daftar
        const button = await driver.findElement(By.xpath('//a[@id="btLogin"]/button'));
        button.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Kata yang kamu lihat salah!");
        console.log('Test Captcha Not Same passed...');
    }catch(error){
        console.log('Test Captcha Not Same failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function runTest(){
	await testCaptchaNull();
	await testCaptchNotSame();
}

runTest();