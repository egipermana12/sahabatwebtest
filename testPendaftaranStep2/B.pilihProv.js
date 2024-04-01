const loadEnvConfig = require('./../global/dotenvLoader');
const {handleLoginToStep1, handleToStep2} = require('./../global/login');
const { globalFormStep2 } = require('./globalFormStep2');
const {Builder, By, until} = require("selenium-webdriver");
const {Select} = require('selenium-webdriver');

//fungsi assert
const assert = require("assert");

loadEnvConfig();
const url = `${process.env.BASE_URL}pendaftaran/step-2`;

async function pilProvNull()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: 'PAIN OZORA',npwp: '321234567890123', noakta: '',
            prov: '', kab: '', kec: '', kel: '',
            alamat: 'Jl. Bojong No. 6', rt: '001', rw: '002',
            tgl_profosal: '', judul_profosal: '', latar_belakang: '', maksud_tujuan: 'success',
            dropdownBantuanBerupa: '2', uraian: 'mesin simso'
        },
    ];

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        // //alamat web
        await driver.get(url);

        //panggil fungsi login
        await handleLoginToStep1(driver);

        //cek apakah halaman step 1 sudah muncul
        const pageStep1 = await driver.findElements(By.css('input[type="text"][id="fmnomor_telp"], input[type="text"][id="fmtgl_lahir"]'));
        if(pageStep1.length > 0){
            await handleToStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmjenis_bantuan')), 5000);
        }

        //handle globa form
        await globalFormStep2(driver,inputData, true);
        await driver.sleep(3000);

         //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        await btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Provinsi Belum diisi");
        console.log('Test Provinsi Not Null passed...');

    }catch(error){
        console.log('Test Provinsi Not Null failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function pilKotaNull()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: 'PAIN OZORA',npwp: '321234567890123', noakta: '',
            prov: '12', kab: '', kec: '', kel: '',
            alamat: 'Jl. Bojong No. 6', rt: '001', rw: '002',
            tgl_profosal: '', judul_profosal: '', latar_belakang: '', maksud_tujuan: 'success',
            dropdownBantuanBerupa: '2', uraian: 'mesin simso'
        },
    ];

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        // //alamat web
        await driver.get(url);

        //panggil fungsi login
        await handleLoginToStep1(driver);

        //cek apakah halaman step 1 sudah muncul
        const pageStep1 = await driver.findElements(By.css('input[type="text"][id="fmnomor_telp"], input[type="text"][id="fmtgl_lahir"]'));
        if(pageStep1.length > 0){
            await handleToStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmjenis_bantuan')), 5000);
        }

        //handle globa form
        await globalFormStep2(driver,inputData, true);
        await driver.sleep(3000);

         //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        await btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Kota Belum diisi");
        console.log('Test Kota Not Null passed...');

    }catch(error){
        console.log('Test Kota Not Null failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function pilKecNull()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: 'PAIN OZORA',npwp: '321234567890123', noakta: '',
            prov: '12', kab: '03', kec: '', kel: '',
            alamat: 'Jl. Bojong No. 6', rt: '001', rw: '002',
            tgl_profosal: '', judul_profosal: '', latar_belakang: '', maksud_tujuan: 'success',
            dropdownBantuanBerupa: '2', uraian: 'mesin simso'
        },
    ];

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        // //alamat web
        await driver.get(url);

        //panggil fungsi login
        await handleLoginToStep1(driver);

        //cek apakah halaman step 1 sudah muncul
        const pageStep1 = await driver.findElements(By.css('input[type="text"][id="fmnomor_telp"], input[type="text"][id="fmtgl_lahir"]'));
        if(pageStep1.length > 0){
            await handleToStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmjenis_bantuan')), 5000);
        }

        //handle globa form
        await globalFormStep2(driver,inputData, true);
        await driver.sleep(3000);

         //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        await btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
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

async function pilKelNull()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: 'PAIN OZORA',npwp: '321234567890123', noakta: '',
            prov: '12', kab: '03', kec: '03', kel: '',
            alamat: 'Jl. Bojong No. 6', rt: '001', rw: '002',
            tgl_profosal: '', judul_profosal: '', latar_belakang: '', maksud_tujuan: 'success',
            dropdownBantuanBerupa: '2', uraian: 'mesin simso'
        },
    ];

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        // //alamat web
        await driver.get(url);

        //panggil fungsi login
        await handleLoginToStep1(driver);

        //cek apakah halaman step 1 sudah muncul
        const pageStep1 = await driver.findElements(By.css('input[type="text"][id="fmnomor_telp"], input[type="text"][id="fmtgl_lahir"]'));
        if(pageStep1.length > 0){
            await handleToStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmjenis_bantuan')), 5000);
        }

        //handle globa form
        await globalFormStep2(driver,inputData, true);
        await driver.sleep(3000);

         //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        await btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Kelurahan Belum diisi");
        console.log('Test Kelurahan Not Null passed...');

    }catch(error){
        console.log('Test Kelurahan Not Null failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function pilDesaNull()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: 'PAIN OZORA',npwp: '321234567890123', noakta: '',
            prov: '12', kab: '03', kec: '03', kel: '', desa: '',
            alamat: 'Jl. Bojong No. 6', rt: '001', rw: '002',
            tgl_profosal: '', judul_profosal: '', latar_belakang: '', maksud_tujuan: 'success',
            dropdownBantuanBerupa: '2', uraian: 'mesin simso'
        },
    ];

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        // //alamat web
        await driver.get(url);

        //panggil fungsi login
        await handleLoginToStep1(driver);

        //cek apakah halaman step 1 sudah muncul
        const pageStep1 = await driver.findElements(By.css('input[type="text"][id="fmnomor_telp"], input[type="text"][id="fmtgl_lahir"]'));
        if(pageStep1.length > 0){
            await handleToStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmjenis_bantuan')), 5000);
        }

        //handle globa form
        await globalFormStep2(driver,inputData, true, true);
        await driver.sleep(3000);

         //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        await btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Desa Belum diisi");
        console.log('Test Desa Not Null passed...');

    }catch(error){
        console.log('Test Desa Not Null failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function pilDesaLess3()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: 'PAIN OZORA',npwp: '321234567890123', noakta: '',
            prov: '12', kab: '03', kec: '03', kel: '', desa: 'AD',
            alamat: 'Jl. Bojong No. 6', rt: '001', rw: '002',
            tgl_profosal: '', judul_profosal: '', latar_belakang: '', maksud_tujuan: 'success',
            dropdownBantuanBerupa: '2', uraian: 'mesin simso'
        },
    ];

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        // //alamat web
        await driver.get(url);

        //panggil fungsi login
        await handleLoginToStep1(driver);

        //cek apakah halaman step 1 sudah muncul
        const pageStep1 = await driver.findElements(By.css('input[type="text"][id="fmnomor_telp"], input[type="text"][id="fmtgl_lahir"]'));
        if(pageStep1.length > 0){
            await handleToStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmjenis_bantuan')), 5000);
        }

        //handle globa form
        await globalFormStep2(driver,inputData, true, true);
        await driver.sleep(3000);

         //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        await btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Desa Minimal 3 karakter");
        console.log('Test Desa Min 3 Karakter passed...');

    }catch(error){
        console.log('Test Desa Min 3 Karakter failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function pilDesaTooLong()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: 'PAIN OZORA',npwp: '321234567890123', noakta: '',
            prov: '12', kab: '03', kec: '03', kel: '', desa: 'ADADKAFDFKSFLDKFDSJFDKFDKFJDSFJSDFKSDFKSDFJKDSFKJSDFJKSDFSJFDSKFDSFJKFDSJKFSDFK',
            alamat: 'Jl. Bojong No. 6', rt: '001', rw: '002',
            tgl_profosal: '', judul_profosal: '', latar_belakang: '', maksud_tujuan: 'success',
            dropdownBantuanBerupa: '2', uraian: 'mesin simso'
        },
    ];

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        // //alamat web
        await driver.get(url);

        //panggil fungsi login
        await handleLoginToStep1(driver);

        //cek apakah halaman step 1 sudah muncul
        const pageStep1 = await driver.findElements(By.css('input[type="text"][id="fmnomor_telp"], input[type="text"][id="fmtgl_lahir"]'));
        if(pageStep1.length > 0){
            await handleToStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmjenis_bantuan')), 5000);
        }

        //handle globa form
        await globalFormStep2(driver,inputData, true, true);
        await driver.sleep(3000);

         //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        await btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Desa Maksimal 100 karakter");
        console.log('Test Desa Max 100 Karakter passed...');

    }catch(error){
        console.log('Test Desa Max 100 Karakter failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function pilDesaNonAlfabet()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: 'PAIN OZORA',npwp: '321234567890123', noakta: '',
            prov: '12', kab: '03', kec: '03', kel: '', desa: '@#$@#$',
            alamat: 'Jl. Bojong No. 6', rt: '001', rw: '002',
            tgl_profosal: '', judul_profosal: '', latar_belakang: '', maksud_tujuan: 'success',
            dropdownBantuanBerupa: '2', uraian: 'mesin simso'
        },
    ];

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        // //alamat web
        await driver.get(url);

        //panggil fungsi login
        await handleLoginToStep1(driver);

        //cek apakah halaman step 1 sudah muncul
        const pageStep1 = await driver.findElements(By.css('input[type="text"][id="fmnomor_telp"], input[type="text"][id="fmtgl_lahir"]'));
        if(pageStep1.length > 0){
            await handleToStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmjenis_bantuan')), 5000);
        }

        //handle globa form
        await globalFormStep2(driver,inputData, true, true);
        await driver.sleep(3000);

         //button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        await btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Desa Harus huruf A - Z dan spasi");
        console.log('Test Desa Non Alfabet passed...');

    }catch(error){
        console.log('Test Desa Non Alfabet failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function runTest()
{
    await pilProvNull();
    await pilKotaNull();
    await pilKecNull();
    await pilKelNull();
    await pilDesaNull();
    await pilDesaLess3();
    await pilDesaTooLong();
    await pilDesaNonAlfabet();

}

runTest();