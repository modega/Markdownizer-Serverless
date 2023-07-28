const showdown = require('showdown');
const path = require('path');
const fs = require('fs');
const {Base64} = require('js-base64');

const parser = new showdown.Converter();

/*
args.name = name of file
args.body = markdown base64 encoded
args.author = author of file
*/
function main(args){

    let mdBody = Base64.decode(args.body);
    var boilerPlate = "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><meta name=\"author\" content=" + args.author + "><title>" + args.name + "</title></head><body><div>Hello There</div></body></html>";
    var data = mdBody;
    var $ = cheerio.load(boilerPlate);
    var html = parser.makeHtml(data.toString());
    $('div').empty();
    $('div').append(html);
    
    return res({
        headers:  { 'content-type': 'text/html; charset=UTF-8' },
        body: base64.encode($.html(), 'utf8');
    });
}

exports.main = main