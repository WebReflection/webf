.PHONY: clean test

# list of files
WEBF     =  src/intro.js                      \
            src/function/*.js                 \
            src/__init__.js

# default build task
build: $(WEBF)
	mkdir -p build
	cat $(WEBF) >build/webf
	chmod +x build/webf
	make test

# clean/remove build folder
clean:
	rm -rf build

# clean/remove build folder
test:
	node test/webf.js

