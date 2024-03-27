const loadEnvConfig = require('./../global/dotenvLoader');
const {loginStep1} = require('./../global/login');
const {Builder, By, until} = require("selenium-webdriver");
const {Select} = require('selenium-webdriver')

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}pendaftaran/step-1`;

/**
 * [noHPKosong description]
 * @return {[type]} [Nomor HP tidak valid!]
 */
async function noHPKosong()
{
	const inputData = [
        { nohp: ''},
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //cek apakah halaman memerlukan login
        const loginPageElements = await driver.findElements(By.css('input[type="text"][id="fmnik"], input[type="password"][id="password"]'));
        //jika belum login
        if(loginPageElements.length > 0) {
        	await loginStep1(driver);
        	await driver.wait(until.elementLocated(By.id('fmnomor_telp')), 5000);
        }

        //clear value
        await driver.findElement(By.id("fmnomor_telp")).clear();

        //input form
        await driver.findElement(By.id("fmnomor_telp")).sendKeys(inputData[0].nohp);

        //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Nomor HP tidak valid!");
        console.log('Test No Hp Not Null passed...');

    }catch(error){
    	console.log('Test No Hp Not NULL failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [noHPles10 description]
 * @return {[type]} [Nomor HP tidak valid!]
 */
async function noHPles10()
{
	const inputData = [
        { nohp: '081254678'},
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //cek apakah halaman memerlukan login
        const loginPageElements = await driver.findElements(By.css('input[type="text"][id="fmnik"], input[type="password"][id="password"]'));
        //jika belum login
        if(loginPageElements.length > 0) {
        	await loginStep1(driver);
        	await driver.wait(until.elementLocated(By.id('fmnomor_telp')), 5000);
        }

        //clear value
        await driver.findElement(By.id("fmnomor_telp")).clear();

        //input form
        await driver.findElement(By.id("fmnomor_telp")).sendKeys(inputData[0].nohp);

        //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Nomor HP tidak valid!");
        console.log('Test Less 10 char passed...');

    }catch(error){
    	console.log('Test Less 10 char failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [noHPnotNumeric description]
 * @return {[type]} [Nomor HP tidak valid!]
 */
async function noHPnotNumeric()
{
	const inputData = [
        { nohp: 'ADGDDGE@!#'},
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //cek apakah halaman memerlukan login
        const loginPageElements = await driver.findElements(By.css('input[type="text"][id="fmnik"], input[type="password"][id="password"]'));
        //jika belum login
        if(loginPageElements.length > 0) {
        	await loginStep1(driver);
        	await driver.wait(until.elementLocated(By.id('fmnomor_telp')), 5000);
        }

        //clear value
        await driver.findElement(By.id("fmnomor_telp")).clear();

        //input form
        await driver.findElement(By.id("fmnomor_telp")).sendKeys(inputData[0].nohp);

        //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Nomor HP tidak valid!");
        console.log('Test No HP not Numeric passed...');

    }catch(error){
    	console.log('Test No HP not Numeric failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [noHPMore15 description]
 * @return {[type]} [Nomor HP Maksimal 15 Karakter]
 */
async function noHPMore15()
{
	const inputData = [
        { nohp: '081254678912457124', tgllahir: '02/02/1993', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //cek apakah halaman memerlukan login
        const loginPageElements = await driver.findElements(By.css('input[type="text"][id="fmnik"], input[type="password"][id="password"]'));
        //jika belum login
        if(loginPageElements.length > 0) {
        	await loginStep1(driver);
        	await driver.wait(until.elementLocated(By.id('fmnomor_telp')), 5000);
        }

        //clear value
        await driver.findElement(By.id("fmnomor_telp")).clear();

        //const untuk dropdown pekerjaan
        const dropdownPekerjaan = await driver.findElement(By.id('fmrefid_status_pekerjaan'));
        const selectDropdownPekerjaan = await new Select(dropdownPekerjaan);
        //const untuk dropdown prov
        const dropdownProv = await driver.findElement(By.id('fmkode_provinsi'));
        const selectDropdownProv = await new Select(dropdownProv);
        //const untuk dropdown kab
        const dropdownKab = await driver.findElement(By.id('fmkode_kota'));
        const selectdropdownKab = await new Select(dropdownKab);
        //const untuk dropdown kec
        const dropdownKec = await driver.findElement(By.id('fmkode_kecamatan'));
        const selectdropdownKec = await new Select(dropdownKec);
        //const untuk dropdown lel
        const dropdownKel = await driver.findElement(By.id('fmkode_kelurahan'));
        const selectdropdownKel = await new Select(dropdownKel);


        //input form
        await driver.findElement(By.id("fmnomor_telp")).sendKeys(inputData[0].nohp);
        await driver.findElement(By.id("fmtgl_lahir")).sendKeys(inputData[0].tgllahir);
        await driver.findElement(By.id("gender-pria")).click();
        await selectDropdownPekerjaan.selectByValue('1');
        await selectDropdownProv.selectByValue('12');
        await driver.sleep(500);
        await selectdropdownKab.selectByValue('03');
        await driver.sleep(500);
        await selectdropdownKec.selectByValue('03');
        await driver.sleep(500);
        await selectdropdownKel.selectByValue('1098');
        await driver.sleep(500);
        await driver.findElement(By.id("fmalamat")).sendKeys(inputData[0].alamat);
        await driver.findElement(By.id("fmrt")).sendKeys(inputData[0].rt);
        await driver.findElement(By.id("fmrw")).sendKeys(inputData[0].rw);



        //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // // Handle SweetAlert 2 if it appears
        // // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Nomor HP Maksimal 15 Karakter");
        console.log('Test More 15 char passed...');

    }catch(error){
    	console.log('Test More 15 char failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [noHPnot08 description]
 * @return {[type]} [Nomor HP dimulai dengan 08]
 */
async function noHPnot08()
{
	const inputData = [
        { nohp: '21545874125', tgllahir: '02/02/1993', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
    ];

    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //cek apakah halaman memerlukan login
        const loginPageElements = await driver.findElements(By.css('input[type="text"][id="fmnik"], input[type="password"][id="password"]'));
        //jika belum login
        if(loginPageElements.length > 0) {
        	await loginStep1(driver);
        	await driver.wait(until.elementLocated(By.id('fmnomor_telp')), 5000);
        }

        //clear value
        await driver.findElement(By.id("fmnomor_telp")).clear();

        //const untuk dropdown pekerjaan
        const dropdownPekerjaan = await driver.findElement(By.id('fmrefid_status_pekerjaan'));
        const selectDropdownPekerjaan = await new Select(dropdownPekerjaan);
        //const untuk dropdown prov
        const dropdownProv = await driver.findElement(By.id('fmkode_provinsi'));
        const selectDropdownProv = await new Select(dropdownProv);
        //const untuk dropdown kab
        const dropdownKab = await driver.findElement(By.id('fmkode_kota'));
        const selectdropdownKab = await new Select(dropdownKab);
        //const untuk dropdown kec
        const dropdownKec = await driver.findElement(By.id('fmkode_kecamatan'));
        const selectdropdownKec = await new Select(dropdownKec);
        //const untuk dropdown lel
        const dropdownKel = await driver.findElement(By.id('fmkode_kelurahan'));
        const selectdropdownKel = await new Select(dropdownKel);


        //input form
        await driver.findElement(By.id("fmnomor_telp")).sendKeys(inputData[0].nohp);
        await driver.findElement(By.id("fmtgl_lahir")).sendKeys(inputData[0].tgllahir);
        await driver.findElement(By.id("gender-pria")).click();
        await selectDropdownPekerjaan.selectByValue('1');
        await selectDropdownProv.selectByValue('12');
        await driver.sleep(500);
        await selectdropdownKab.selectByValue('03');
        await driver.sleep(500);
        await selectdropdownKec.selectByValue('03');
        await driver.sleep(500);
        await selectdropdownKel.selectByValue('1098');
        await driver.sleep(500);
        await driver.findElement(By.id("fmalamat")).sendKeys(inputData[0].alamat);
        await driver.findElement(By.id("fmrt")).sendKeys(inputData[0].rt);
        await driver.findElement(By.id("fmrw")).sendKeys(inputData[0].rw);



        //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // // Handle SweetAlert 2 if it appears
        // // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Nomor HP dimulai dengan 08");
        console.log('Test No Hp not 08 passed...');

    }catch(error){
    	console.log('Test No Hp not 08 failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

async function runTest()
{
	await noHPKosong();
	await noHPles10();
	await noHPnotNumeric();
	await noHPMore15();
	await noHPnot08();
}

runTest();