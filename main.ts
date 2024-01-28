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
	
function readmsg(callback: (data: number) => void): void {
    let readData: number;

    control.runInParallel(() => {
        // 模擬 I2C 非同步讀取操作
        let i2cbuf = pins.createBuffer(2);
        i2cbuf[0] = 255;
        i2cbuf[1] = 255;
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf);
        
        basic.pause(10); // 等待 I2C 寫入完成，實際需視硬體操作而定
        
        let readbuf = pins.i2cReadBuffer(PG_ADDR, 1);
        readData = readbuf[0];
    });

    // 等待非同步操作完成
    control.waitForEvent(
        DAL.DEVICE_ID_NOTIFY_ONE,
        DAL.MICROBIT_EVT_ANY
    );

    // 在這裡，非同步操作已完成，可以調用回調函數
    callback(readData);
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

}
	
}
