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
    // 模拟异步 I2C 读取操作
    control.inBackground(() => {
        let i2cbuf = pins.createBuffer(2);
        i2cbuf[0] = 255;
        i2cbuf[1] = 255;
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf);
        let readbuf = pins.i2cReadBuffer(PG_ADDR, 1);

        let readData = readbuf[0];
        callback(readData); // 调用回调函数，传递读取到的数据
    });
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
    readmsg((rev_data) => {


        // 执行传入的 handler 函数，并传递 rev_data
        handler(rev_data);
    });
}
	
}
