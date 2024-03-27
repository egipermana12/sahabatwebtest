const loadEnvConfig = require('./../global/dotenvLoader');
const {loginStep1} = require('./../global/login');
const {Builder, By, until} = require("selenium-webdriver");
const {Select} = require('selenium-webdriver');

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}pendaftaran/step-1`;

async function pekerjaanNull()
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

        //clear value
        await driver.findElement(By.id("fmnomor_telp")).clear();

        
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

        
        await selectDropdownProv.selectByValue('12');
        await driver.sleep(500);
        await selectdropdownKab.selectByValue('03');
        await driver.sleep(500);
        await selectdropdownKec.selectByValue('03');
        await driver.sleep(500);
        await selectdropdownKel.selectByValue('1098');
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

        assert.strictEqual(sweetAlertText, "Status Pekerjaan Belum dipilih");
        console.log('Test Status Pekerjaan Not Null passed...');

    }catch(error){
    	console.log('Test Status Pekerjaan Not Null failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

async function pekerjaanNotRegis()
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
        await driver.sleep(500);
        // Temukan elemen option berdasarkan XPath atau ID
        const option = await driver.findElement(By.xpath("//option[@value='1']"));
        // Ubah nilai atribut 'value' dari elemen option
        await driver.executeScript("arguments[0].setAttribute('value', 'A')", option);
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

        assert.strictEqual(sweetAlertText, "Status Pekerjaan tidak terdaftar");
        console.log('Test Status Pekerjaan Not Register passed...');

    }catch(error){
    	console.log('Test Status Pekerjaan Not Register failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}


async function runTest()
{
	await pekerjaanNull();
	await pekerjaanNotRegis();
}

runTest();