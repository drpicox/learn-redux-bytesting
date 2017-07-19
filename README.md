Learn Redux by testing
======================

You can learn Redux by running tests on this repository
and replacing expect(solvme) by the expect(value).


Setup
-----

1. Clone this repository

2. Install dependencies
   ```bash
   $ npm install
   ```

3. Start Project
   ```bash
   $ npm start
   ```


Firsts steps
-------------

Specs are numbered. Start with spec 0, and 
when you finish continue with 1 and so on.

It is necessary to finish the previous number to
start with the following.

Some specs have blocks encolsed by:

```javascript
xdescribe("complete later", () => {

  // more tests here

});
```

They provide useful insights about some Javascript features,
but they are designed to solve later by yourself when the 
workshop is finished.


Jest
----

Jest is the test runner used here. 
It is really simple and fast.

If you start the project you will see a large number of
tests failing. You will solve them, but so many errors
may distract you. 

To focus in a test you can:

1. Ask to filter by filename regex pattern: 
   for example, use the number of the current test that you are solving.

2. Use force test: replace `it(...)` by `fit(...)` 
  (just and f before the test) to the test that you want to solve,
  it will ignore all other tests and you will focus on that.

