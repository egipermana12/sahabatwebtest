const loadUrl = require('./../urlStep2');
const {handleLoginToStep1, handleToStep2} = require('./../../global/login');
const { globalFormStep2 } = require('./../globalFormStep2');
const {Builder, By, until} = require("selenium-webdriver");
const {Select} = require('selenium-webdriver');

//fungsi assert
const assert = require("assert");

const url = loadUrl();

async function nmPemimpinNull()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: '',npwp: '3209485859', noakta: '01/akta/2022',
            prov: '12', kab: '03', kec: '03', kel: '1098',
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

        assert.strictEqual(sweetAlertText, "Nama Pimpinan belum diisi");
        console.log('Test Nama Pemimpin Not Null passed...');

    }catch(error){
        console.log('Test Nama Pemimpin failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function nmPemimpinNonAlfabet()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: '@##ASD!!',npwp: '3209485859', noakta: '01/akta/2022',
            prov: '12', kab: '03', kec: '03', kel: '1098',
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

        assert.strictEqual(sweetAlertText, "Nama Pimpinan hanya diisi alphabet (A s/d Z) dan spasi");
        console.log('Test Nama Pemimpin Non Alfabet passed...');

    }catch(error){
        console.log('Test Nama Pemimpin Non Alfabet failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function nmPemimpinTooLong()
{
    const inputData = [
        {   jnsBantuan: '2', penerimaHibah: '3',
            nminstansi: 'AKATSUKI', nmpimpinan: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout The point of using Lorem Ipsum is that it has a moreorless normal distribution of letters as opposed to using Content here content here making',npwp: '3209485859', noakta: '01/akta/2022',
            prov: '12', kab: '03', kec: '03', kel: '1098',
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

        assert.strictEqual(sweetAlertText, "Nama Pimpinan Maksimal 50 Karakter");
        console.log('Test Nama Pemimpin Too Long passed...');

    }catch(error){
        console.log('Test Nama Pemimpin Too Long failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function runTest()
{
    await nmPemimpinNull();
    await nmPemimpinNonAlfabet();
    await nmPemimpinTooLong();
}

runTest();