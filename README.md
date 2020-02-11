# redcap-autofill-bookmarklet
This is a bookmarklet that helps you complete REDCap forms quickly for testing...

### This is intended to be included via a scriptlet (e.g. a javascript bookmark) and helps auto-complete forms in REDCap for testing

To use, open your browser's boorkmarks and create one that looks like the below.  You can replace the location of the script
with your own location.  Or, if you push updates to the github repository at:
  https://github.com/123andy/redcap-autofill-bookmarklet
I will periodically update the location below with the new version

```
javascript: (function () { 
   var jsCode = document.createElement('script'); 
   jsCode.setAttribute('src', 'https://med.stanford.edu/webtools/redcap/redcap_auto_fill.js');
   document.body.appendChild(jsCode); 
}());
```

### See it in action
![Example](/redcap_autofill.gif?raw=true "AutoFill Example")

It will now ignore most fields that have existing data

Andrew Martin / Stanford University
