const {Builder, By, until} = require("selenium-webdriver");

async function loginStep1(driver)
{
	const inputData = [
        { nik: '3102080504910020', pass: 'a123456F' },
        ];

	try{
		await driver.findElement(By.id("fmnik")).sendKeys(inputData[0].nik);
        await driver.findElement(By.id("password")).sendKeys(inputData[0].pass);
        //checkbox checked
        const checkbox = await driver.findElement(By.xpath("//div[@class='login_settingRememberMe']/input[@id='rememberme']"));
        // Gulir ke elemen
        await driver.executeScript('arguments[0].scrollIntoView(false)', checkbox);
        await driver.sleep(500);
        // Klik checkbox
        await checkbox.click();

        // Di sini kita hanya menunggu 15 detik untuk tujuan captcha
        await driver.sleep(8000);

        //click button daftar
        const button = await driver.findElement(By.xpath('//a[@id="btLogin"]/button'));
        button.click();

    }catch(error){
      console.error("Error occurred:", error.message);
  }
}

async function loginStep2(driver)
{
    const inputData = [
        { nik: '3102080504910021', pass: 'a123456F' },
        ];

    try{
        await driver.findElement(By.id("fmnik")).sendKeys(inputData[0].nik);
        await driver.findElement(By.id("password")).sendKeys(inputData[0].pass);
        //checkbox checked
        const checkbox = await driver.findElement(By.xpath("//div[@class='login_settingRememberMe']/input[@id='rememberme']"));
        // Gulir ke elemen
        await driver.executeScript('arguments[0].scrollIntoView(false)', checkbox);
        await driver.sleep(500);
        // Klik checkbox
        await checkbox.click();

        // Di sini kita hanya menunggu 15 detik untuk tujuan captcha
        await driver.sleep(8000);

        //click button daftar
        const button = await driver.findElement(By.xpath('//a[@id="btLogin"]/button'));
        button.click();

    }catch(error){
        console.error("Error occurred:", error.message);
    }
}

async function handleLoginToStep1(driver)
{
    try{
        //cek apakah halaman memerlukan login
        const loginPageElements = await driver.findElements(By.css('input[type="text"][id="fmnik"], input[type="password"][id="password"]'));
            //jika belum login
        if(loginPageElements.length > 0) {
            await loginStep2(driver);
            await driver.wait(until.elementLocated(By.id('fmnomor_telp')), 5000);
        }
    }catch(error){
        console.error("Error occurred:", error.message);
    }
}

async function handleToStep2(driver){
    try{
        await driver.wait(until.elementLocated(By.id('fmkode_kelurahan')), 5000);
        const btnStep1 = await driver.findElement(By.xpath('//button[contains(text(), "Selanjutnya")]'));
        await driver.executeScript('arguments[0].scrollIntoView(false)', btnStep1);
        await driver.sleep(500);
        await btnStep1.click();
    }catch(error){
        console.error("Error occurred:", error.message);
    }
}

module.exports = {
    loginStep1: loginStep1,
    loginStep2: loginStep2,
    handleLoginToStep1: handleLoginToStep1,
    handleToStep2: handleToStep2
};