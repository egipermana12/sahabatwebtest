const {Builder, By, until} = require("selenium-webdriver");

const assert = require("assert");

async function testFailedLogin(){
    //launch the browser
    let driver = await new Builder().forBrowser("chrome").build();

    try{
        //alamat web
        await driver.get("https://development47.atisisbada.id/");

        //send params username and password
        await driver.findElement(By.id("user")).sendKeys("Egi");
        await driver.findElement(By.id("password")).sendKeys("2541");

        //click login button
        await driver.findElement(By.id("bt_ok")).click();

        let element = await driver.findElement(By.xpath("//div[@class='row']/center/font"));

        // Get the text from the element
        let text = await element.getText();

        assert.strictEqual(text, "Akun dan Sandi Anda salah!!! silahkan Login Ulang Error");
    
        console.log("Text validation passed.");

    }
    catch(error){
        console.error("Error occurred:", error);
    }finally{
        await driver.quit();
    }
}

testFailedLogin();