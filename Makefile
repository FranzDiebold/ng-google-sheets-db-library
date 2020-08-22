.PHONY: help
help:  ## Show this help.
	@egrep '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-22s\033[0m %s\n", $$1, $$2}'

.PHONY: install
install:  ## Install dependencies
	npm install

.PHONY: test
test:  ## Run tests for both library and demo application
	npm run test

.PHONY: test-lib
test-lib:  ## Run tests for library
	npm run test-lib

.PHONY: test-lib-ci
test-lib-ci:  ## Run tests for library (CI)
	npm run test-lib-ci

.PHONY: test-demo
test-demo:  ## Run tests for demo application
	npm run test-demo

.PHONY: test-demo-ci
test-demo-ci:  ## Run tests for demo application (CI)
	npm run test-demo-ci

.PHONY: lint
lint:  ## Lint both library and demo application
	npm run lint

.PHONY: lint-lib
lint-lib:  ## Lint library
	npm run lint-lib

.PHONY: lint-demo
lint-demo:  ## Lint demo application
	npm run lint-demo

.PHONY: build-lib
build-lib:  ## Build library
	npm run build-lib

.PHONY: build-lib-schematics
build-lib-schematics:  ## Build library schematics
	npm run build-lib-schematics

.PHONY: build-demo
build-demo:  ## Build demo application
	npm run build-demo

.PHONY: publish-lib
publish-lib:  ## Publish library to npm
	npm run build-lib-prod
	npm run build-lib-schematics
	cd dist/ng-google-sheets-db && npm publish

.PHONY: serve-demo
serve-demo:  ## Run demo application locally
	npm run serve-demo

.PHONY: deploy-demo
deploy-demo:  ## Deploy demo application to GitHub Pages
	npm run deploy-demo
