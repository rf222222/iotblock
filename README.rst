.. _install-label:

Installation
**********************************************************

******************************************************************
Github Source Code
******************************************************************

All components of this project, including The Universal IoT Blockchain Database, Hypercat API, and Hypercat Web Interface are open-source to allow community contribution and participation, to join in on our mission to Bring Governance to Technology using Blockchain.

We encourage contribution to the open-source development efforts of this project, which is available at <https://github.com/iotblock/iotblock>

Accessing the Source Code Repository:

::
    
    git clone https://github.com/iotblock/iotblock
    
    

******************************************************************
The Universal IoT Blockchain Database Smart Contracts
******************************************************************

TestRPC
------------------------------------------------------------------
Ethereum Ganache RPC

::
        
        npm install
        ganache-cli -p 9545 -i 4447

IoTBlock Ethereum Smart Contracts (/contracts)

::
        pip3 install -r requirements.txt 
        sh build_testnet.sh

Rinkeby
------------------------------------------------------------------

Ethereum Rinkeby RPC

::

        sh rpc_rinkeby.sh

IoTBlock Ethereum Smart Contracts (/contracts)

::

        sh build_rinkeby.sh
        sh build_rinkeby_data.sh


******************************************************************
The Universal IoT Blockchain Hypercat API
******************************************************************

The Universal IoT Blockchain Hypercat API to access The Universal IoT Blockchain Smart Contracts

Testnet Hypercat API (http://localhost:8888)

::
	
    python server/index_testnet.py


Rinkeby Hypercat API (http://localhost:8888)

::
	
    python server/index.py


IoTBlock's Hypercat API is accessible via <https://iotblock.io/cat>


******************************************************************
The Universal IoT Blockchain IoTPedia Web Interface
******************************************************************

Web Interface to access the The Universal IoT Blockchain Hypercat API and The Universal IoT Blockchain Smart Contracts

::
        First Edit package.json, set proxy (at the bottom of the file) to Hypercat API URL (e.g. https://iotblock.io, or http://localhost:8888)

::

	npm install
        npm run-script build
	npm start

IoTBlock's Web Interface is accessible via <https://iotblock.io/iotpedia/>



******************************************************************
The Universal IoT Blockchain Hypercat Event Listener
******************************************************************

The Universal IoT Blockchain Event Listener to access The Universal IoT Blockchain Smart Contracts

::
	
    python server/events.py
    
IoTBlock's Hypercat API is accessible via <https://iotblock.io/cat>


******************************************************************
The Universal IoT Blockchain Browser Tools Web Interface
******************************************************************

Web Browser Tools to access the The Universal IoT Blockchain Hypercat API and The Universal IoT Blockchain Smart Contracts


::

	cd browser_tools/web_app
	npm install
	npm start

IoTBlock's Web Interface is accessible via <https://iotblock.io/icatOS>

