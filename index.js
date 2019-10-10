const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let author = document.getElementById("author");
let date = document.getElementById("date");
let title = document.getElementById("title");
let publisher = document.getElementById("publisher");
let retrieved = document.getElementById("retrieved");
let url = document.getElementById("url");
let output = document.getElementById("output");

let reset = document.getElementById("reset");
let copy = document.getElementById("copy");
let copied = document.getElementById("copied");

function updateOutput() {
    let ret = author.value;
    if (!author.value.endsWith(".")) ret += ".";
    ret += " (";
    ret += date.value;
    ret += "). ";
    ret += title.value;
    ret += ". ";
    ret += publisher.value;
    ret += ". Retrieved ";
    ret += retrieved.value;
    ret += ", from ";
    ret += url.value;
    output.innerText = ret;
}

let copyTimeout;
function copyF() {
    navigator.clipboard.writeText(output.innerText).then(_ => {
        copied.innerText = "Copied!";
        if (copyTimeout) {
            clearTimeout(copyTimeout);
        }
        copyTimeout = setTimeout(_ => {
            copied.innerText = "";
        }, 2000);
    });
}

function resetRetrieved() {
    let today = new Date();
    let ret = "" + today.getDate();
    ret += " " + MONTHS[today.getMonth()];
    ret += " " + today.getFullYear();
    retrieved.value = ret;
}

function resetAll() {
    author.value = "";
    date.value = "";
    title.value = "";
    publisher.value = "";
    resetRetrieved();
    url.value = "";
    updateOutput();
}

author.addEventListener("input", updateOutput);
date.addEventListener("input", updateOutput);
title.addEventListener("input", updateOutput);
publisher.addEventListener("input", updateOutput);
retrieved.addEventListener("input", updateOutput);
url.addEventListener("input", updateOutput);

reset.addEventListener("click", resetAll);
copy.addEventListener("click", copyF);

resetRetrieved();
updateOutput();

// service worker
if ("serviceWorker" in navigator && window.location.href.indexOf("localhost") < 0) {
    navigator.serviceWorker.register("sw.js");
}
