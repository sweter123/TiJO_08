/*global element,by*/
var byString = function (object, fragmentName)
{
    'use strict';
    if (!fragmentName || !fragmentName.replace) {
        return null;
    }
    fragmentName = fragmentName.replace(/\[(\w+)\]/g, '($1)');
    fragmentName = fragmentName.replace(/^\./, '');
    var a = fragmentName.split('.');
    while (a.length) {
        var n = a.shift();
        var arrayExpr = n.match(/(\w+)\(([^)]*)\)/);
        if (arrayExpr) {
            object = object[arrayExpr[1]](arrayExpr[2]);
        } else if (n in object) {
            object = object[n];
        } else {
            throw new Error('Undefined fragment "' + n + '" in "' + fragmentName + '"');
        }
    }
    return object;
};

var fragments = function (text)
{
    'use strict';
    var mapping = {
        button: element.bind(null, by.css('.btn')),
        type: element.bind(null, by.css('code.ng-binding')),
        fifa: element.bind(null, by.css('.table-responsive')),
        rank: element.bind(null, by.css('td:nth-of-type(1)')),
        team: element.bind(null, by.css('td:nth-of-type(2)')),
        totalPoints: element.bind(null, by.css('td:nth-of-type(3)'))
    };
    return byString(mapping, text);
};

module.exports = fragments;
