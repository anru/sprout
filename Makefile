export PATH := $(CURDIR)/node_modules/.bin:$(PATH)
SHELL := env PATH=$(PATH) /bin/bash

sources := $(wildcard src/*.js)
rollup_targets := sprout.cjs.js sprout.esm.js sprout.js

.PHONY: build
build: $(rollup_targets) sprout.min.js

$(rollup_targets): rollup.config.js $(sources)
	rollup -c

sprout.min.js: sprout.js
	terser -c -m -o $@ -- $<
