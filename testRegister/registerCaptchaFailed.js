const loadEnvConfig = require('./../global/dotenvLoader');
const {Builder, By, until} = require("selenium-webdriver");

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}register`;

/**
 * @return {[string]}
 * @function testCaptchaNull
 * @assert {[kata yang kamu lihat salah]}
 */
async function testCaptchaNull(){
    const inputData = [
        { nik: '3202080504910003', nama: 'suhanda', pass: 'a12345F', repass: 'a12345F' },
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
        await driver.findElement(By.id("fmnama")).sendKeys(inputData[0].nama);
        await driver.findElement(By.id("password")).sendKeys(inputData[0].pass);
        await driver.findElement(By.id("confirmPassword")).sendKeys(inputData[0].repass);

        //checkbox checked
        const checkbox = await driver.findElement(By.xpath("//div[@class='login_settingRememberMe']/input[@id='rememberme']"));
        // Gulir ke elemen
        await driver.executeScript('arguments[0].scrollIntoView(false)', checkbox);
        await driver.sleep(500);
        // Klik checkbox
        await checkbox.click();

        // Di sini kita hanya menunggu 15 detik untuk tujuan captcha
        await driver.sleep(10000);

        //click button daftar
        const button = await driver.findElement(By.xpath('//button[@name="btRegister"]'));
        button.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Kata yang kamu lihat salah!");
        console.log('Test Captcha Not Null passed...');
    }catch(error){
        console.log('Test Captcha NULL failed...');
        console.error("Error occurred:", error.message);
        await driver.quit();
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
        { nik: '3202080504910003', nama: 'suhanda', pass: 'a12345F', repass: 'a12345F', captcha: '890VWB' },
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);


        await driver.findElement(By.id("fmnik")).sendKeys(inputData[0].nik);
        await driver.findElement(By.id("fmnama")).sendKeys(inputData[0].nama);
        await driver.findElement(By.id("password")).sendKeys(inputData[0].pass);
        await driver.findElement(By.id("confirmPassword")).sendKeys(inputData[0].repass);
        await driver.findElement(By.id("fmcaptcha")).sendKeys(inputData[0].captcha);

        //checkbox checked
        const checkbox = await driver.findElement(By.xpath("//div[@class='login_settingRememberMe']/input[@id='rememberme']"));
        // Gulir ke elemen
        await driver.executeScript('arguments[0].scrollIntoView(false)', checkbox);
        await driver.sleep(500);
        // Klik checkbox
        await checkbox.click();

        // Di sini kita hanya menunggu 15 detik untuk tujuan captcha
        await driver.sleep(10000);

        //click button daftar
        const button = await driver.findElement(By.xpath('//button[@name="btRegister"]'));
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
        await driver.quit();
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