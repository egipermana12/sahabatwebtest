const {Builder, By, until} = require("selenium-webdriver");

const assert = require("assert");

async function testSuccesLogin(){
    //launch the browser
    let driver = await new Builder().forBrowser("chrome").build();

    try{
        //alamat web
        await driver.get("https://development47.atisisbada.id/");

        //send params username and password
        await driver.findElement(By.id("user")).sendKeys("Egi");
        await driver.findElement(By.id("password")).sendKeys("12345");

        //click login button
        await driver.findElement(By.id("bt_ok")).click();

        // let imgElement = await driver.findElement(By.xpath("//span[@id='btnAdministrasi']/a/img"));
        // let srcValue = await imgElement.getAttribute("src");
        // console.log("Image source:", srcValue);
        // console.log("Text validation passed.");

        await driver.wait(until.elementLocated(By.className("selector open")), 5000);

        // Check the PHP session to verify login status
        let sessionCookie = await driver.manage().getCookie('PHPSESSID');
        assert.ok(sessionCookie, "PHP session cookie not found. Login might have failed.");
    
        console.log("Login successful. User is logged in.");
    }
    catch(error){
        console.error("Error occurred:", error);
    }finally{
        await driver.quit();
    }
}

testSuccesLogin();