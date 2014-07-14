#Introduction To Testing Workshop
These are the resources used for a workshop given at the Bristol CodeHub Meetup in July 2014.

Most of the examples have links to fully-working browser-based Jasmine tests run on JSFiddle
([Example](http://jsfiddle.net/wzAyL/136/)). So as long as you have an Internet connection you
should be fine.

If you want to run the example specs under `spec/` you will need to install `jasmine-node` using `npm`.
First you will need to install 'NodeJS' from [http://nodejs.org/download](http://nodejs.org/download/).
Then you can install `jasmine-node` with `npm install jasmine-node -g`.

To run the integration tests in `integration/` you will need to install the headless browser 'PhantomJS' from
[http://phantomjs.org/download.html](http://phantomjs.org/download.html). You will also need NodeJS as explained
above and the NodeJS Phantom runner; `npm install phantom`.

To run any of the specs just use `jasmine-node [path-to-spec]`
