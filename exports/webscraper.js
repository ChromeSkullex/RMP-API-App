var express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const website = 'https://www.ratemyprofessors.com/professor?tid=6427'
const pageWeb = 'https://www.ratemyprofessors.com/search/teachers?query=*&sid=1244'

var scraper = function (){
    try{
        console.log("Hello")
        axios(website).then((res)=>{
            const html = res.data;
            const $ = cheerio.load(html);

            let content = [];
            const name = $('.NameTitle__Name-dowf0z-0', html).text();
            const rate = $('.RatingValue__Numerator-qw8sqy-2', html).text();
            content.push({name, rate});

            console.log(content)

        });
    }catch (e) {
        console.log(e, e.message);
    }
}

var pageScraper = async function () {
    try {
        const buttonClass = 'PaginationButton__StyledPaginationButton-txi1dr-1'
        axios(website).then((res)=> {
            const data = res.data;
            console.log(data)
        });

        } catch (e) {
        console.log(e, e.message);
    }
};

module.exports = {
    scraper: scraper,
    pageScraper: pageScraper};