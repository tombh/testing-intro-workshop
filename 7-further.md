#Further Considerations

##Idempotency
This fancy term refers to the property of a process to do exactly the same thing every time it occurs. So in the case
of testing it means a guarantee that if your code remains unchanged then the tests will always return the same result.

This most often comes up when you're testing code that interacts with a database. Often you will need some existing
records, so in a `before` hook you might insert some fixture data the database. That's great. But you must remember to
remove it afterwards so it doesn't contaminate and confuse other tests. A good way to ensure clean databases is just to
truncate or drop them before *every* test.

Generally you need to consider idempotency whenever your code interacts with external dependencies. HTTP requests,
file systems and time are other examples.

##Continuous Integration
Theoretically, if you've written a comprehensive enough test suite, you don't even need to give it the once over yourself.
You can set up your test suite to run after every commit on your repo and if the tests pass then it can be automatically
deployed. This is called Continuous Integration, the most famous name probably being [Jenkins](http://jenkins-ci.org/) and [Travis](https://travis-ci.org/).
The latter being relevent as it's free to use for public repos and can be easily setup on Github simply by adding a `.travis.yml` file.

Here's an example of what a Travis build looks like https://travis-ci.org/tombh/peas/jobs/29692442
