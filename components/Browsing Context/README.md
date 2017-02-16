More often than not, content authors will test an application on an internet browser. They will expect it to behave accordingly.  We know this is not always the case. Figuring out the cause of an issue can be extremely time consuming. In certain situations, an internet browser will stop code execution and throw an exception. Such an error may indicate the origin of the issue. However, sometimes what may seem an obvious error is simply 'swallowed' by the internet browser. Consider:

`var type = 'I do not have a type.',
    listener = 'Always a good listener.',
    useCaputure = 'Capture who?'

document.addEventListener(type, listener, useCapture);

// Nothing interesting ever happens!`

In the previous code snippet `addEventListener` expects `type`, `listener` and `useCapture` to be a string, a function and a boolean respectively. Even though what is passed into `addEventListener` results in a useless function call the internet browser
will not throw an exception. This is a potential hard-to-track issue. 

In order to avoid such scenario and many others, I have created the foundations for a 

