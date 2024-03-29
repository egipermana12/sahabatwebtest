const loadEnvConfig = require('./../global/dotenvLoader');
const {Builder, By, until} = require("selenium-webdriver");

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}register`;

/**
 * @return {[string]}
 * @function testNamaNull
 * @assert {[Nama belum diisi]}
 */
async function testNamaNull(){
    const inputData = [
        { nik: '3202080504910005', nama: '', pass: '123456', repass: '123456' },
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //remove required nik
        await driver.executeScript("document.getElementById('fmnama').removeAttribute('required');");

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

        assert.strictEqual(sweetAlertText, "Nama belum diisi");
        console.log('Test Nama Not Null passed...');
    }catch(error){
        console.log('Test Nama NULL failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * @return {string}
 * @function testNamaNonAlfhabet
 * @assert {'nama tidak boleh angka atau karakter'}
 */
async function testNamaNonAlfhabet(){
    const inputData = [
        { nik: '3102080504910005', nama: '@~@abdulsalah$%<?PHP?>', pass: 'a123456F', repass: 'a123456F' },
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

        assert.strictEqual(sweetAlertText, "Nama hanya diisi alphabet (A s/d Z) dan spasi");
        console.log('Test Nama Non Alphabet passed...');
    }catch(error){
        console.log('Test Nama Non Alphabet failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * @return {string}
 * @function testNamaTooLong
 * @assert {'nama terlalu panjang'}
 */
async function testNamaTooLong(){
    const inputData = [
        { nik: '3102080504910020', nama: 'loremimpus string loremimpus string loremimpus string lorem ipsum string lorem ipsum string', pass: 'a123456F', repass: 'a123456F' },
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

        assert.strictEqual(sweetAlertText, "Nama terlalu panjang");
        console.log('Test Nama Too Long passed...');
    }catch(error){
        console.log('Test Nama Too Long failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}


//run all test
async function runTest(){
    await testNamaNull();
    await testNamaNonAlfhabet();
    await testNamaTooLong();
}

runTest();