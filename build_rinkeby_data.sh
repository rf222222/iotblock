#!/bin/sh
PATH=./node_modules/.bin:$PATH
export PATH

sh build_app.sh
python3 server/index_rinkeby.py &
python3 rinkeby/restore_hypercat.py
#python rinkeby/test_pool.py
#cp -pR build/app.js server/browser-tools/htdocs/js
#cp -pR build/contracts server/browser-tools/htdocs/js/


