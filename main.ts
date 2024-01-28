const PG_ADDR = 0x66;
let send_id = 255;
//% color="#AA278D" icon="\uf2dc" weight=50
namespace Picogame {
    //% block
    //% blockId=sensor_read block="read sensor |%address"
    //% address.min=1 address.max=5 address.defl=1
    export function i2cRead(address: number): number {
	let i2cbuf = pins.createBuffer(1);
        i2cbuf[0] = 255;
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf);
        let readbuf = pins.i2cReadBuffer(PG_ADDR, 1);
	let receivedData = readbuf[0];
        if (receivedData !== undefined) {
           send_id = readbuf[0]
         } else {
       }    
        return receivedData;
    }
    //% blockId=sensor_write block="write value |%v"
    //% v.min=0 v.max=200
    export function i2cwrite(v: number): void {
	let i2cbuf = pins.createBuffer(1);
        i2cbuf[0] = v;
        pins.i2cWriteBuffer(PG_ADDR, i2cbuf);
    }
	
}
