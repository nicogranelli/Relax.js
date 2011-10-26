/*
* jasmine.requirejs() returns a function that will load the file(s) required
* and will wait until it's done before proceeding with running specs. 
* The function returned is intended to be passed to beforeEach() so the file(s)
* is(are) loaded before running each spec.
*
* Syntax:
*
* jasmine.requirejs(options, files)
* or
* jasmine.requirejs(files)
*
* Where:
*  - options is a configuration object like the one you
*    can bass to RequireJS require() function (i.e.: baseUrl, paths, etc...)
* and 
*  - files is an array of files to require (i.e.: ['lib/common', 'views/main'])
*
* Example:
*
*   beforeEach(jasmine.requirejs({
*       baseUrl: '/public/javascripts'
*   }, [
*       'lib/app.help-mgr'
*   ]));
*/
jasmine.requirejs = function () {
    var params   = Array.prototype.slice.call(arguments),
        isLoaded = false,
        files;

    files = arguments[0].length ? arguments[0] : arguments[1];
    files = files.join(', ');
    return function () {
        require.apply(null, params.concat(function () {
            isLoaded = true;
        }));
        waitsFor(function () {
            return isLoaded;
        }, 'file(s) to be required/loaded: ' + files);
    };
};
