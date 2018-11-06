const TuyaDevice = require('tuyapi');

const link = require('./tuyaapi/link');

// (async () => {
//     try {
//         let devices = await link({ssid: 'wlan', password: 'stottsulten63'});
//         if (!devices || devices.length === 0)
//             console.log('empty');
//         console.dir(devices);
//     }
//     catch (e) {
//         console.error(e);
//     }
// })();


let tuya = new TuyaDevice(
    {
        id: '07200341dc4f22359628',
        key: 'cc1205ec32d89c00',
        // ip: '192.168.28.209'
    });
//
tuya.resolveId().then(() => {
    console.log('ready!');

    // setInterval(() => {
        tuya.get({schema: true}).then(status => {
            console.log('Status:', status);
        });


        // 1 = state
        // 2 =
        // 4 = Current (mA)
        // 5 = Power (W) / 10
        // 6 = Voltage (V) / 10

        // tuya.set({set: !status}).then(result => {
        //     console.log('Result of setting status to ' + !status + ': ' + result);
        //
        //     tuya.get().then(status => {
        //         console.log('New status:', status);
        //         return;
        //     });
        // });
    // }, 5 * 1000);
});
