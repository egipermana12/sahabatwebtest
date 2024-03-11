const loadEnvConfig = require('./../global/dotenvLoader');
const {Builder, By, until} = require("selenium-webdriver");

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}register`;

/**
 * @return {[string]}
 * @function testNIKles16
 * @assert {"NIK Harus 16 Karakter!"}
 */
async function testNIKles16(){

    const inputData = [
        { nik: '320208050491000', nama: 'suhanda', pass: '123456', repass: '123456' },
    ];

    let driver;

    try{
        //launch

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

        assert.strictEqual(sweetAlertText, "NIK Harus 16 Karakter!");
        console.log('Test NIK les 16 passed...');

    }
    catch(error){
        console.log('Test NIK les 16 failed...');
        console.error("Error occurred:", error.message);
        await driver.quit();
    }finally{
        await driver.quit();
    }
}

/**
 * @return {[string]}
 * @function testNIKmore16
 * @assert {[NIK tidak valid! (Panjang NIK Tidak Sesuai!)]}
 */

async function testNIKmore16(){

    const inputData = [
        { nik: '320208050491000342', nama: 'suhanda', pass: '123456', repass: '123456' },
    ];

    let driver;

    try{
        //launch

        driver = await new Builder().forBrowser("chrome").build();

        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //remove maxlength nik
        await driver.executeScript("document.getElementById('fmnik').removeAttribute('maxlength');");

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

        assert.strictEqual(sweetAlertText, "NIK tidak valid! (Panjang NIK Tidak Sesuai!)");
        console.log('Test NIK more 16 passed...');

    }
    catch(error){
        console.log('Test NIK more 16 failed...');
        console.error("Error occurred:", error.message);
        await driver.quit();
    }finally{
        await driver.quit();
    }
}


/**
 * @return {[string]}
 * @function testNIKNull
 * @assert {[NIK tidak boleh kosong]}
 */

async function testNIKNull(){

    const inputData = [
        { nik: '', nama: 'suhanda', pass: '123456', repass: '123456' },
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

        assert.strictEqual(sweetAlertText, "NIK tidak boleh kosong");
        console.log('Test NIK Null passed...');

    }
    catch(error){
        console.log('Test NIK Null passed...');
        console.error("Error occurred:", error.message);
        await driver.quit();
    }finally{
        await driver.quit();
    }
}

//run all test
async function runTests() {
    await testNIKles16();
    await testNIKmore16();
    await testNIKNull();
}

runTests();