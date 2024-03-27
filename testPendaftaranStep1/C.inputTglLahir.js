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
 * [tglLahirNotNull description]
 * @return {[type]} [Tanggal Lahir Belum diisi]
 */
async function tglLahirNotNull()
{
	const inputData = [
        { nohp: '08126547891', tgllahir: '', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
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

        assert.strictEqual(sweetAlertText, "Tanggal Lahir Belum diisi");
        console.log('Test Tanggal Lahir Null passed...');

    }catch(error){
    	console.log('Test Tanggal Lahir Null failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [tglLahirNotFormat description]
 * @return {[type]} [Tanggal Lahir salah]
 */
async function tglLahirNotFormat()
{
	const inputData = [
        { nohp: '08126547891', tgllahir: '31-12-1993', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
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

        assert.strictEqual(sweetAlertText, "Tanggal Lahir salah");
        console.log('Test Tanggal Lahir Not Formated passed...');

    }catch(error){
    	console.log('Test Tanggal Lahir Not Formated failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [tglLahirHariError description]
 * @return {[type]} [Tanggal Lahir salah]
 */
async function tglLahirHariError()
{
	const inputData = [
        { nohp: '08126547891', tgllahir: '35/12/1993', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
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

        assert.strictEqual(sweetAlertText, "Tanggal Lahir salah");
        console.log('Test Tanggal Lahir Hari Salah passed...');

    }catch(error){
    	console.log('Test Tanggal Lahir Hari Salah failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [tglLahirBulanError description]
 * @return {[type]} [Tanggal Lahir salah]
 */
async function tglLahirBulanError()
{
	const inputData = [
        { nohp: '08126547891', tgllahir: '29/00/1993', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
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

        assert.strictEqual(sweetAlertText, "Tanggal Lahir salah");
        console.log('Test Tanggal Lahir Bulan Salah passed...');

    }catch(error){
    	console.log('Test Tanggal Lahir Bulan Salah failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [tglLahirTahunError description]
 * @return {[type]} [Tanggal Lahir salah]
 */
async function tglLahirTahunError()
{
	const inputData = [
        { nohp: '08126547891', tgllahir: '29/02/199658', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
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

        assert.strictEqual(sweetAlertText, "Tanggal Lahir salah");
        console.log('Test Tanggal Lahir Tahun Salah passed...');

    }catch(error){
    	console.log('Test Tanggal Lahir Tahun Salah failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [tglLahirMin17 description]
 * @return {[type]} [Umur minimal 17 tahun]
 */
async function tglLahirMin17()
{
	const inputData = [
        { nohp: '08126547891', tgllahir: '29/12/2008', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
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

        assert.strictEqual(sweetAlertText, "Umur minimal 17 tahun");
        console.log('Test Tanggal Lahir Min 17 passed...');

    }catch(error){
    	console.log('Test Tanggal Lahir Min 17 failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

/**
 * [tglLahirMax75 description]
 * @return {[type]} [Umur maksimal 75 tahun]
 */
async function tglLahirMax75()
{
	const inputData = [
        { nohp: '08126547891', tgllahir: '29/12/1948', alamat: 'JL. KOBONG NO. 6', rt: '002', rw: '003'},
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

        assert.strictEqual(sweetAlertText, "Umur maksimal 75 tahun");
        console.log('Test Tanggal Lahir Max 75 passed...');

    }catch(error){
    	console.log('Test Tanggal Lahir max 75 failed...');
    	console.error("Error occurred:", error.message);
    }finally{
    	await driver.sleep(3000);
        await driver.quit();
    }
}

async function runTest()
{
	await tglLahirNotNull();
	await tglLahirNotFormat();
	await tglLahirHariError();
	await tglLahirBulanError();
	await tglLahirTahunError();
	await tglLahirMin17();
	await tglLahirMax75();
}

runTest();