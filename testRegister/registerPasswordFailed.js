const loadEnvConfig = require('./../global/dotenvLoader');
const {Builder, By, until} = require("selenium-webdriver");

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}register`;

/**
 * @return {[string]}
 * @function passwordNull
 * @assert {[Password Minimal 6 Karakter]}
 */
async function passwordNull(){
    const inputData = [
        { nik: '3202080504910003', nama: 'suhanda', pass: '', repass: '' },
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //remove required nik
        await driver.executeScript("document.getElementById('password').removeAttribute('required');");
        await driver.executeScript("document.getElementById('confirmPassword').removeAttribute('required');");

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

        assert.strictEqual(sweetAlertText, "Password Minimal 6 Karakter");
        console.log('Test Password Not Null passed...');
    }catch(error){
        console.log('Test Password NULL failed...');
        console.error("Error occurred:", error.message);
        await driver.quit();
    }finally{
         await driver.sleep(3000);
        await driver.quit();
    }
}


/**
 * @return {[sting]}
 * @function passwordLess6
 * @assert {[Password Minimal 6 Karakter]}
 */
async function passworLess6(){
    const inputData = [
        { nik: '3202080504910003', nama: 'suhanda', pass: '123', repass: '123' },
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

        assert.strictEqual(sweetAlertText, "Password Minimal 6 Karakter");
        console.log('Test Password Less 6 Null passed...');
    }catch(error){
        console.log('Test Password Less 6 failed...');
        console.error("Error occurred:", error.message);
        await driver.quit();
    }finally{
         await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * @return {string}
 * @function passwordNotalfalower
 * @assert {[Password harus ada huruf kecil]}
 */
async function passwordNotalfalower(){
    const inputData = [
        { nik: '3202080504910003', nama: 'suhanda', pass: '123', repass: '123' },
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

        assert.strictEqual(sweetAlertText, "Password harus ada huruf kecil");
        console.log('Test Password huruf kecil passed...');
    }catch(error){
        console.log('Test Password huruf kecil failed...');
        console.error("Error occurred:", error.message);
        await driver.quit();
    }finally{
         await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * @return {[string]}
 * @function passwordCOnfirmNull
 * @assert {[Confirm Password Salah!]}
 */
async function passwordConfirmNull(){
    const inputData = [
        { nik: '3202080504910003', nama: 'suhanda', pass: '123456', repass: '' },
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

         await driver.executeScript("document.getElementById('confirmPassword').removeAttribute('required');");

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

        assert.strictEqual(sweetAlertText, "Confirm Password Salah!");
        console.log('Test Password Confirm Not Same passed...');
    }catch(error){
        console.log('Test Password Confirm Not Same failed...');
        console.error("Error occurred:", error.message);
        await driver.quit();
    }finally{
         await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * @return {[string]}
 * @function passwordConfirmNotSame
 * @assert {[Confirm Password Salah!]}
 */
async function passworConfirmNotSame(){
    const inputData = [
        { nik: '3202080504910003', nama: 'suhanda', pass: '123', repass: '1234' },
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

        assert.strictEqual(sweetAlertText, "Confirm Password Salah!");
        console.log('Test Password Confirm Not Same passed...');
    }catch(error){
        console.log('Test Password Confirm Not Same failed...');
        console.error("Error occurred:", error.message);
        await driver.quit();
    }finally{
         await driver.sleep(3000);
        await driver.quit();
    }
}


//run all test
async function runTest(){
    passwordNull();
    passworLess6();
    passwordNotalfalower();
    passworConfirmNotSame();
    passwordConfirmNull();
}

runTest();