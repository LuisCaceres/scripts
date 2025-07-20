luis.castillo@visionaustralia.org
You cannot access this right now
Your sign-in was successful but does not meet the criteria to access this resource. For example, you might be signing in from a browser, app, or location that is restricted by your admin.
Sign out and sign in with a different account
More details


Error Code: 53003
Request Id: e967519f-4d98-4796-922e-0db042238a00
Correlation Id: 019827f4-372b-7726-8110-db46f130cd8f
Timestamp: 2025-07-20T13:20:49.231Z
App name: Microsoft Teams Web Client
App id: 5e3ce6c0-2b1f-4285-8d4b-75ee78787346
IP address: 201.108.8.42
Device identifier: ba99cc29-76ce-4b74-adaa-dbc6e693c4fd
Device platform: Windows 10
Device state: DomainJoined



This is a list of scripts that implement various pieces of functionality commonly
found across the World Wide Web.

Requirements of a project.

* No two files or folders will share the same name.
* No precompilers/preprocessors are allowed. Be smart and creative about the way you code and most of all keep things simple!

About CSS
The complexity of a selector must not exceed...
The order of the rule-sets is according to two factors:
  * Specificity
  * Alphabet.
  
No descendant selectors are allowed.
  
For example:

`
/* FOO SECTION */
.foo {
  background: red;
}

#bar .foo {
  background: yellow;
}

#baz .foo {
  background: green;
} 

/* ABC SECTION */
#abc {
  background: white;
}

/* BAR SECTION */
#bar {
  background: orange;
}`

The implementation of the above piece of code:
// Remove comments; `/\*[\W\w]*?\*/`
// Remove declaration blocks; `/{[^}]*{/` << matches the ocurrence of a { followed by any number of any characters followed by another {. This means that nesting has been detected. 

Then search for the matching }. 
If instead another { is found then that means there is further nesting. 
   Repeat the previous steps. 
Otherwise it means we got our very first declaration block. 
Extract the selector from the declaration block and add it to a list.
// 

The contents of declarations blocks are irrelevant.



About HTML


About JavaScript

::: Extensions/Plugins
Install ESLINT

The maximum number of lines in a JavaScript file must not exceed 100 (excluding comments).
The maximum number of characters on a line (including indentation) is 80.
The cyclomatic complexity of a function must not exceed 10.


Developers are encouraged to use `const` and `let` declarations. 
`var` declarations are exclusively reserved for containers whose value varies throught the lifetime of the program.
If a constant stores a primitive value, the identifier must be written using UPPERCASE letters and under_scores. Otherwise, it must be written as camelCase.

