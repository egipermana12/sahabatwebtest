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

module.exports = {
    loginStep1: loginStep1
};