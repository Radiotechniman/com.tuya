'use strict';

const 	Homey 				= require('homey'),
		_                   = require('lodash'),
		link	 			= require('../../tuyaapi/link');

class MyDriver extends Homey.Driver {
	
	onInit() {
		this._ongoingPairProcess = false;
        this._ongoingPairCallback;
		this.log('Tibber driver driver has been initialized');
	}

	async onPairListDevices(data, callback) {
        // callback(null, [{
        //     name: 'BW',
        //     data: {
        //         id: '07200341dc4f22359628',
        //         localKey: 'cc1205ec32d89c00'
        //     }
        //     },
			// {
        //     name: 'BW2',
        //     data: {
        //         id: '04200101bcddc200681a',
        //         localKey: 'e8aad533e415ed08'
        //     }
        // }
        // ]);
        // return;

		if (false) {
			callback(new Error("Please enter your access token in the settings page."));
		}
		else
		{


		    try {
                this._ongoingPairCallback = callback;
		    	if(this._ongoingPairProcess)
                    this.log('Already in pairing process, aborting');
		    	else {
                    this._ongoingPairProcess = true;
                    this.log('Detecting devices');
                    let devices = await link({ssid: 'wlan', password: 'stottsulten63'});
                    this.log('Detecting devices complete');
                    console.dir(devices);

					if(!devices)
                        this._ongoingPairCallback(new Error("Could not find any device"));
					else
                        this._ongoingPairCallback(null, _.map(devices, d => {
                        	return {
                        		id: d.id,
								name: d.name,
								data: d
							}
						}).sort(MyDriver._compareHomeyDevice));
                }
            }
            catch(e) {
		        this.error('Error in onPairListDevices', e);
                this._ongoingPairCallback(new Error("Failed to retrieve data."));
            }
            finally {
                this._ongoingPairProcess = false;
            }
		}
	}

	static _compareHomeyDevice(a, b) {
		if (a.name < b.name)
			return -1;
		if (a.name > b.name)
			return 1;
		return 0;
	}
}

module.exports = MyDriver;