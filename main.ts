const PG_ADDR = 0x66
//% color="#AA278D" icon="\uf2dc" weight=50
namespace Picogame {
    //% block
    //% blockId=sensor_read block="read sensor |%address"
    //% address.min=1 address.max=5 address.defl=1
    export function i2cRead(address: number): number {
	let i2cbuf = pins.createBuffer(2)
        i2cbuf[0] = 255
        i2cbuf[1] = 255
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf)
        let readbuf = pins.i2cReadBuffer(PG_ADDR, 1)
        return readbuf[0]
    }
    //% blockId=sensor_write block="write value |%v"
    //% v.min=0 v.max=200
    export function i2cwrite(v: number): void {
	let i2cbuf = pins.createBuffer(1)
        i2cbuf[0] = v
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf)
    }
	
	
	type EvtMsg = (data: number) => void;
	let datamsg: EvtMsg = null;
	
    //% block="On DATA received"
    //% draggableParameters
    //% weight=20
    export function onDATAReceived(body: (receivedMessage: number) => void): void {
        datamsg = body;
    }
    //% block
    //% blockId=onI2CNumberReceived block="onI2CNumberReceived |%rev_data"
    //% rev_data.min=1 rev_data.max=255 
    export function onI2CNumberReceived(rev_data: number, handler: () => void): void {
        // 在這裡可以執行其他任務，例如印出讀取到的數字
        // 注意：這裡的程式碼只是範例，請根據實際需求修改
        basic.showNumber(rev_data);

        // 執行其他任務
        handler();
    }

	
}
