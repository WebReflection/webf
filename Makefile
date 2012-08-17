.PHONY: clean

# list of files
WEBF     =  src/intro.js                      \
            src/function/*.js                 \
            src/__init__.js


# default build task
build: $(WEBF)
	mkdir -p build
	cat $(WEBF) >build/webf
	chmod +x build/webf
	node test/webf.js

# clean/remove build folder
clean:
	rm -rf build

