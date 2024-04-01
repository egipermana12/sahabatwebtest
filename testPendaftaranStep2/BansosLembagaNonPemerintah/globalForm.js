const {Builder, By, until} = require("selenium-webdriver");
const {Select} = require('selenium-webdriver');

async function globalForm(driver, dataForm)
{
    try{
        //const untuk dropdown jnsBantuan
        const dropdownJnsBantuan = await driver.findElement(By.id('fmjenis_bantuan'));
        const selectDropdownJnsBantuan = await new Select(dropdownJnsBantuan);
        await selectDropdownJnsBantuan.selectByValue(dataForm[0].jnsBantuan);
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.id('dvstatus_badan_hukum')), 5000);
        //const dropdown badan hukum
        const dropdownBadanHukum = await driver.findElement(By.id('fmstatus_badan_hukum'));
        const selectdropdownBadanHukum = await new Select(dropdownBadanHukum);
        await selectdropdownBadanHukum.selectByValue(dataForm[0].bdnHukum);
        await driver.sleep(1000);
        await driver.wait(until.elementLocated(By.id('fmjenis_penerima_bansos')), 5000);
        //const dropdown jns penerima bansos
        const dropdownJnsPenerima = await driver.findElement(By.id('fmjenis_penerima_bansos'));
        const selectdropdownJnsPenerima = await new Select(dropdownJnsPenerima);
        await selectdropdownJnsPenerima.selectByValue(dataForm[0].jnsPenerima);
        await driver.sleep(1000);

        //handle input
        await driver.findElement(By.id("fmnama")).sendKeys(dataForm[0].nama);
        await driver.findElement(By.id("fmnama_pimpinan")).sendKeys(dataForm[0].ketua);
        await driver.findElement(By.id("fmno_surat_ijin_lembaga")).sendKeys(dataForm[0].no_izin);

        //pilih provinsi
        const dropdownProv = await driver.findElement(By.id('fmkode_provinsi'));
        const selectDropdownProv = await new Select(dropdownProv);
        await selectDropdownProv.selectByValue(dataForm[0].prov);
        await driver.wait(until.elementLocated(By.xpath("//select[@id='fmkode_kota']/option[@data-select2-id]")), 5000);
        await driver.sleep(500);
        //const untuk dropdown kab
        const dropdownKab = await driver.findElement(By.id('fmkode_kota'));
        const selectdropdownKab = await new Select(dropdownKab);
        await selectdropdownKab.selectByValue(dataForm[0].kab);
        await driver.wait(until.elementLocated(By.xpath("//select[@id='fmkode_kecamatan']/option[@data-select2-id]")), 5000);
        await driver.sleep(500);
        //const untuk dropdown kec
        const dropdownKec = await driver.findElement(By.id('fmkode_kecamatan'));
        const selectdropdownKec = await new Select(dropdownKec);
        await selectdropdownKec.selectByValue(dataForm[0].kec);
        await driver.wait(until.elementLocated(By.xpath("//select[@id='fmkode_kelurahan']/option[@data-select2-id]")), 5000);
        await driver.sleep(500);
        //const untuk dropdown lel
        const dropdownKel = await driver.findElement(By.id('fmkode_kelurahan'));
        const selectdropdownKel = await new Select(dropdownKel);
        await selectdropdownKel.selectByValue(dataForm[0].kel);
        await driver.wait(until.elementLocated(By.xpath("//select[@id='fmkode_kelurahan']/option[@data-select2-id]")), 5000);
        await driver.sleep(500);
        //alamat
        await driver.findElement(By.id("fmalamat")).sendKeys(dataForm[0].alamat);
        await driver.findElement(By.id("fmrt")).sendKeys(dataForm[0].rt);
        await driver.findElement(By.id("fmrw")).sendKeys(dataForm[0].rw);

        //handle provosal form
        await driver.findElement(By.id("fmtgl_proposal")).sendKeys(dataForm[0].tgl_profosal);
        await driver.findElement(By.id("fmjudul_proposal")).sendKeys(dataForm[0].judul_profosal);
        await driver.findElement(By.id("fmlatar_belakang")).sendKeys(dataForm[0].latar_belakang);
        await driver.findElement(By.id("fmmaksud_tujuan")).sendKeys(dataForm[0].maksud_tujuan);
        await driver.sleep(500);
        //jns bantuan
        const dropdownBantuanBerupa = await driver.findElement(By.id('fmbantuan_berupa'));
        const selectdropdownBantuanBerupa = await new Select(dropdownBantuanBerupa);
        await selectdropdownBantuanBerupa.selectByValue(dataForm[0].dropdownBantuanBerupa);
        await driver.sleep(500);
        await driver.findElement(By.id("fmuraian_barang")).sendKeys(dataForm[0].uraian);

    }catch(error){
        console.error("Error occurred:", error.message);
    }
}

module.exports = {
    globalForm: globalForm
}