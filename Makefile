setup-lib:
	npm install -g wasm-pack
	cd lib; npm i

build-lib: setup-lib
	cd lib; npm run build

setup-ui:
	cd ui; npm i

build-ui: setup-ui
	cd ui; npm run build

build: build-lib build-ui

dev: build-lib
	cd ui; npm run dev