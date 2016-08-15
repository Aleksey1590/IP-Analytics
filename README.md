# IP-Analytics
Find IP addresses that relay abnormal (above-extected) amount of Transactions

# Guide on how to use this tool

1. Unzip *node_modules.zip* . It's a collection of npm modules that were used during development. Make sure that this folder will be in the same directory as *IP-Analytics* folder
2. Open your console and make your way to *IP-Analytics* directory
3. Input ``` node app.js```
4. The script will commence. Numbers that are printed in console - shows number of retrieved and analyzed IP addresses. Every 50 TXs, TOP-5 abnormal IP addresses will be printed, showing also their country of origin


# Analytics
Abnormal activity is defined as relaying more TXs than weighted average. The app will highlight all outlying activity, based on values calculated through InterQuartile Range (aka *H-spread* https://en.wikipedia.org/wiki/Interquartile_range).

# Changing frequency of summary print
1. Open ```app.js``` 
2. In ```function start()``` find an ```if (counter%50==0)``` statement. Change ```50``` statement to whatever frequency you want to get a summary. 
