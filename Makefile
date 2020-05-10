
.PHONY: install
install:
	npm install

.PHONY: test
test:
	ng test

.PHONY: test-lib
test-lib:
	ng test ng-google-sheets-db

.PHONY: test-demo
test-lib:
	ng test demo

.PHONY: lint
lint:
	ng lint

.PHONY: lint-lib
lint-lib:
	ng lint ng-google-sheets-db

.PHONY: lint-demo
lint-lib:
	ng lint demo

.PHONY: build-lib
build-lib:
	ng build ng-google-sheets-db

.PHONY: build-demo
build-demo:
	ng build demo

.PHONY: publish-lib
publish-lib:
	ng build ng-google-sheets-db --prod
	cd dist/ng-google-sheets-db && npm publish

.PHONY: serve-demo
serve-demo:
	ng serve demo

.PHONY: deploy-demo
deploy-demo:
	ng deploy demo --base-href=/ng-google-sheets-db/
