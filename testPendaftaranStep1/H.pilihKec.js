const loadEnvConfig = require('./../global/dotenvLoader');
const {loginStep1} = require('./../global/login');
const {Builder, By, until} = require("selenium-webdriver");
const {Select} = require('selenium-webdriver');

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}pendaftaran/step-1`;

async function pilKecNull()
{
	const inputData = [
        { nohp: '08126547891', tgllahir: '29/12/1993', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
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

		//const untuk dropdown pekerjaan
        const dropdownPekerjaan = await driver.findElement(By.id('fmrefid_status_pekerjaan'));
        const selectDropdownPekerjaan = await new Select(dropdownPekerjaan);        
        //const untuk dropdown prov
        const dropdownProv = await driver.findElement(By.id('fmkode_provinsi'));
        const selectDropdownProv = await new Select(dropdownProv);
        //const untuk dropdown kab
        const dropdownKab = await driver.findElement(By.id('fmkode_kota'));
        const selectdropdownKab = await new Select(dropdownKab);

        //input form
        await driver.findElement(By.id("fmnomor_telp")).sendKeys(inputData[0].nohp);
        await driver.findElement(By.id("fmtgl_lahir")).sendKeys(inputData[0].tgllahir);
        await driver.findElement(By.id("gender-pria")).click();

        await selectDropdownPekerjaan.selectByValue('1');
        await driver.sleep(500);
        await selectDropdownProv.selectByValue('12');
        await driver.sleep(500);
        await selectdropdownKab.selectByValue('03');
        await driver.sleep(500);
        await driver.findElement(By.id("fmalamat")).sendKeys(inputData[0].alamat);
        

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

        assert.strictEqual(sweetAlertText, "Kecamatan Belum diisi");
        console.log('Test Kecamatan Not Null passed...');

    }catch(error){
    	console.log('Test Kecamatan Not Null failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

async function valKecNotRegis()
{
	const inputData = [
        { nohp: '08126547891', tgllahir: '29/12/1993', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
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
        await driver.sleep(500);
        await selectDropdownProv.selectByValue('12');
        await driver.sleep(500);
        await selectdropdownKab.selectByValue('03');
        await driver.sleep(500);
        await selectdropdownKec.selectByValue('03');
        await driver.sleep(500);
        await selectdropdownKel.selectByValue('1098');
        await driver.sleep(500);
        await driver.findElement(By.id("fmalamat")).sendKeys(inputData[0].alamat);

        //change value provinsi
        const option = await driver.findElement(By.xpath("//select[@id='fmkode_kecamatan']/option[@value='03']"));
        // Ubah nilai atribut 'value' dari elemen option
        await driver.executeScript("arguments[0].setAttribute('value', 'AB')", option);
        await driver.sleep(500);
        

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

        assert.strictEqual(sweetAlertText, "Kecamatan tidak terdaftar");
        console.log('Test Kecamatan Not Register passed...');

    }catch(error){
    	console.log('Test Kecamatan Not Register failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

async function runTest()
{
	await pilKecNull();
    await valKecNotRegis();
}

runTest();