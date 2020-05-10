
.PHONY: install
install:
	npm install

.PHONY: test
test:
	npm run test

.PHONY: test-lib
test-lib:
	npm run test-lib

.PHONY: test-lib-ci
test-lib-ci:
	npm run test-lib-ci

.PHONY: test-demo
test-demo:
	npm run test-demo

.PHONY: test-demo-ci
test-demo-ci:
	npm run test-demo-ci

.PHONY: lint
lint:
	npm run lint

.PHONY: lint-lib
lint-lib:
	npm run lint-lib

.PHONY: lint-demo
lint-demo:
	npm run lint-demo

.PHONY: build-lib
build-lib:
	npm run build-lib

.PHONY: build-demo
build-demo:
	npm run build-demo

.PHONY: publish-lib
publish-lib:
	npm run build-lib-prod
	cd dist/ng-google-sheets-db && npm publish

.PHONY: serve-demo
serve-demo:
	npm run serve-demo

.PHONY: deploy-demo
deploy-demo:
	npm run deploy-demo
