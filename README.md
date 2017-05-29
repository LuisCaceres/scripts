This is a list of scripts that implement various pieces of functionality commonly
found across the World Wide Web.


About CSS
The complexity of a selector must not exceed...
The order of the rule-sets is according to two factors:
  * Specificity
  * Alphabet.
  
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
}



`
The contents of declarations blocks are irrelevant.



About HTML


About JavaScript

The maximum number of lines in a JavaScript file must not exceed 100 (excluding comments).
The maximum number of characters on a line (including indentation) is 80.


Developers are encouraged to use `const` and `let` declarations. 
`var` declarations are exclusively reserved for containers whose value varies throught the lifetime of the program.
If a constant stores a primitive value, the identifier must be written using UPPERCASE letters and under_scores. Otherwise, it must be written as camelCase.

