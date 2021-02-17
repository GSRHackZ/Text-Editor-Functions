// ==UserScript==
// @name         Text Editor Functions
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Write functions in any text field or input in order to edit text
// @author       GSRHackZ
// @match        *://*/*
// @grant        none
// @icon         https://www.flaticon.com/svg/2736/2736608.svg
// @license                  MIT
// @compatible               chrome
// @compatible               firefox
// @compatible               opera
// @compatible               safari
// ==/UserScript==

let inps,regExp = /\(([^)]+)\)/;

let functions=[
    {
        "init":"backward",
        "func":"backward"
    },
    {
        "init":"title",
        "func":"title"
    },
    {
        "init":"cap2l",
        "func":"cap2l"
    },
    {
        "init":"l2cap",
        "func":"l2cap"
    },
    {
        "init":"paldromeCheck",
        "func":"paldromeCheck"
    },
]

setInterval(function(){
    inps=[document.getElementsByTagName("input"),document.getElementsByTagName("textarea")];
    for(let i=0;i<inps.length;i++){
        for(let t=0;t<inps[i].length;t++){
            inps[i][t].addEventListener("keydown",function(){
                setTimeout(function(){
                    if(inps[i][t].value.includes("(")&&inps[i][t].value.includes(")")){
                        let newTxt=inps[i][t].value.replace(analyze(inps[i][t].value)[0],eval(analyze(inps[i][t].value)[1]));
                        inps[i][t].value=newTxt;
                    }
                },1500)
            })
        }
    }
},700)




function analyze(str){
    let result=[];
    let val=regExp.exec(str)[1];
    for(let f=0;f<functions.length;f++){
        if(str.includes(functions[f].init+`(${val})`)&&val.trim().length>0){
            let func=functions[f].func+`("${val}")`;
            let replace=functions[f].init+`(${val})`;
            result.push(replace)
            result.push(func)
            return result;
        }
    }
}


function backward(str){
    return str.split("").reverse().join("");
}
function title(str){
    return str.split(' ').map(w => w[0].toUpperCase() + w.substr(1).toLowerCase()).join(' ');
}
function cap2l(str){
    return str.toLowerCase();
}
function l2cap(str){
    return str.toUpperCase();
}
function paldromeCheck(str){
    if(backward(str)===str){
        return `${str} - true!`;
    }
    else{
        return `${str} - false!`;
    }
}
