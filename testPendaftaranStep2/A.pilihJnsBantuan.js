const loadEnvConfig = require('./../global/dotenvLoader');
const {handleLoginToStep1, handleToStep2} = require('./../global/login');
const {Builder, By, until} = require("selenium-webdriver");
const {Select} = require('selenium-webdriver');

// Panggil fungsi untuk memuat konfigurasi dotenv
loadEnvConfig();

//fungsi assert
const assert = require("assert");

const url = `${process.env.BASE_URL}pendaftaran/step-2`;

async function jnsBantuanNull()
{
    let driver;

    try{
        driver = await new Builder().forBrowser("chrome").build();
        driver.manage().window().maximize();

        //alamat web
        await driver.get(url);

        //panggil fungsi login
        await handleLoginToStep1(driver);

        //cek apakah halaman step 1 sudah muncul
        const pageStep1 = await driver.findElements(By.css('input[type="text"][id="fmnomor_telp"], input[type="text"][id="fmtgl_lahir"]'));
        if(pageStep1.length > 0){
            await handleToStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmjenis_bantuan')), 5000);
        }

        //const untuk dropdown prov tidak dipilih
        const dropdownJnsBantuan = await driver.findElement(By.id('fmjenis_bantuan'));
        const selectDropdownJnsBantuan = await new Select(dropdownJnsBantuan);


        // button next
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        btnStep1.click();

        await driver.wait(until.elementLocated(By.className('swal2-popup')), 5000);

        // Handle SweetAlert 2 if it appears
        // Get SweetAlert text
        const sweetAlertTextElement = await driver.findElement(By.className('swal2-html-container'));
        const sweetAlertText = await sweetAlertTextElement.getText();

        assert.strictEqual(sweetAlertText, "Jenis Bantuan belum dipilih");
        console.log('Test Jensi Bantuan Not Null passed...');

    }catch(error){
        console.log('Test Jensi Bantuan Not Null failed...');
        console.error("Error occurred:", error.message);
    }finally{
        await driver.sleep(3000);
        await driver.quit();
    }
}

async function runTest()
{
    await jnsBantuanNull();
}

runTest();