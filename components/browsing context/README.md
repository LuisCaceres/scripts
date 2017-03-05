More often than not, we test an application on an internet browser and expect it to behave accordingly. We know this is not always the case. Figuring out the cause of an issue can be extremely time consuming. In certain helpful situations, an internet browser will throw an exception and give us a clue. Sometimes, however, what seems an obvious error is simply 'swallowed' by the internet browser. Consider:

```
var type = 'I do not have a type',
    listener = 'Always a good listener',
    useCaputure = 'Capture who?';

document.addEventListener(type, listener, useCapture);

// Nothing interesting ever happens!
```
In the previous code snippet `addEventListener()` expects `type`, `listener` and `useCapture` to be a string, a function and a boolean respectively. Even though what is passed into `addEventListener()` results in a useless function call, the internet browser
will not throw an exception. This is a potentially hard-to-find bug. 

In order to avoid such a scenario and many others, I have laid the foundations for an approximation of a browsing context. In other words, a browsing context encompasses the window object along with each one of its properties. Needless to say that by no means it will be possible to replicate a browsing context as it is extremely complex. This is only an approximation.

As currently implemented, a browsing context is created upon the modification of a JavaScript file in the project. This file gets executed behind the scenes with the aid of Node. If an error is found then file execution stops. An error message is output to the console with information as to why execution stopped. 

Hopefully this will add another layer of 'protection' from potentially hard-to-find bugs.