setup-lib:
	cd lib; npm i

build-lib: setup-lib
	cd lib; npm run build

setup-ui:
	cd ui; npm i

build-ui: setup
	cd ui; npm run build

setup: setup-lib setup-ui

build: setup build-lib build-ui

dev: setup build-lib
	cd ui; npm run dev