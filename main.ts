const PG_ADDR = 0x66;
//% color="#AA278D" icon="\uf2dc" weight=50
namespace Picogame {
    //% block
    //% blockId=sensor_read block="read sensor |%address"
    //% address.min=1 address.max=5 address.defl=1
    export function i2cRead(address: number): number {
	let i2cbuf = pins.createBuffer(2);
        i2cbuf[0] = 255;
        i2cbuf[1] = 255;
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf);
        let readbuf = pins.i2cReadBuffer(PG_ADDR, 1);
        return readbuf[0];
    }
    //% blockId=sensor_write block="write value |%v"
    //% v.min=0 v.max=200
    export function i2cwrite(v: number): void {
	let i2cbuf = pins.createBuffer(1);
        i2cbuf[0] = v;
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf);
    }
	
	
	type EvtMsg = (data: number) => void;
	let datamsg: EvtMsg = null;
	
  function readmsg(): number {
    let i2cbuf = pins.createBuffer(2);
    i2cbuf[0] = 255;
    i2cbuf[1] = 255;
    pins.i2cWriteBuffer(PG_ADDR, i2cbuf);

    let readbuf = pins.i2cReadBuffer(PG_ADDR, 1);

    // 檢查讀取結果是否有效，如果無效可以進行錯誤處理
    if (readbuf.length < 1) {
        // 可以選擇拋出一個錯誤或執行其他處理方式
        // 這裡示範拋出一個錯誤
     //   control.raiseError("I2C read error");
    }

    // 返回讀取到的數字
    return readbuf[0];
}
	
    //% block="On DATA received"
    //% draggableParameters
    //% weight=20
    export function onDATAReceived(body: (receivedMessage: number) => void): void {
        datamsg = body;
    }
    //% block
    //% draggableParameters
   export function onI2CNumberReceived(handler: (rev_data: number) => void): void {
    // 從 I2C 讀取數據
    let rev_data = readmsg();

    // 在這裡可以執行其他任務，例如印出讀取到的數字
    basic.showNumber(rev_data);

    // 執行傳入的 handler 函數，並傳遞 rev_data
    handler(rev_data);
}
	
}
