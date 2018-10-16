let author = document.getElementById("author");
let date = document.getElementById("date");
let title = document.getElementById("title");
let retrieved = document.getElementById("retrieved");
let url = document.getElementById("url");
let output = document.getElementById("output");
let selectAll = document.getElementById("selectall");

function updateOutput() {
    let ret = author.value;
    if (!author.value.endswith(".")) ret += ".";
    ret += " (";
    ret += date.value;
    ret += "). ";
    ret += title.value;
    ret += ". Retrieved ";
    ret += retrieved.value;
    ret += ", from ";
    ret += url.value;
    ret += ".";
    output.value = ret;
}

function selectAllF() {
    output.selectionStart = 0;
    output.selectionEnd = output.value.length;
    output.focus();
}

author.addEventListener("input", updateOutput);
date.addEventListener("input", updateOutput);
title.addEventListener("input", updateOutput);
retrieved.addEventListener("input", updateOutput);
url.addEventListener("input", updateOutput);
output.addEventListener("input", updateOutput);

selectAll.addEventListener("click", selectAllF);

updateOutput();
