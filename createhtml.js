//CORE MODULES
const readline = require('readline');
const fs = require('fs');
const http = require('http');
const url = require('url');
const events = require('events');


const html = fs.readFileSync('./Template/index.html', 'utf-8')
let products = JSON.parse(fs.readFileSync('./Data/blogs.json', 'utf-8'))
let productListHtml = fs.readFileSync('./Template/product-list.html', 'utf-8');
let productDetailHtml = fs.readFileSync('./Template/product-details.html', 'utf-8');
let blogDetailHtml = fs.readFileSync('./Template/blogTemplate.html', 'utf-8');
let blogListHtml = fs.readFileSync('./Template/bloglist.html', 'utf-8');

//Product Details
/**
 * Attributes:
 *  id,title_name,htmlpage_name,mini_description,title_image,createdDate,img1,img2,img3,
 * desc1,desc2,desc3,youtube_link
 * 
 * ID,TITLE_NAME,HTMLPAGE_NAME,MINI_DESCRIPTION,TITLE_IMAGE,CREATEDDATE,IMG1,IMG2,IMG3,
 * DESC1,DESC2,DESC3,YOUTUBE_LINK
*/
function replaceHtml(template, product) {
    let output = template.replace('{{%TITLE_NAME%}}', product.title_name);
    output = output.replace('{{%mini_description%}}', product.MINI_DESCRIPTION);
    output = output.replace('{{%TITLE_IMAGE%}}', product.title_image);
    output = output.replace('{{%CREATEDDATE%}}', product.createdDate);
    output = output.replace('{{%IMG1%}}', product.img1);
    output = output.replace('{{%IMG2%}}', product.img2);
    output = output.replace('{{%IMG3%}}', product.img3);
    output = output.replace('{{%DESC1%}}', product.desc1);
    output = output.replace('{{%DESC2%}}', product.desc3);
    output = output.replace('{{%DESC3%}}', product.desc3);
    output = output.replace('{{%YOUTUBE_LINK%}}', product.youtube_link);

    return output;
}

function replaceBlogPageHtml(template, blog) {
    let output = template.replace('{{%TITLE_NAME%}}', blog.title_name);
    output = output.replace('{{%mini_description%}}', blog.MINI_DESCRIPTION);
    output = output.replace('{{%TITLE_IMAGE%}}', blog.title_image);
    output = output.replace('{{%CREATEDDATE%}}', blog.createdDate);
    output = output.replace('{{%IMG1%}}', blog.img1);
    output = output.replace('{{%IMG2%}}', blog.img2);
    output = output.replace('{{%IMG3%}}', blog.img3);
    output = output.replace('{{%DESC1%}}', blog.desc1);
    output = output.replace('{{%DESC2%}}', blog.desc3);
    output = output.replace('{{%DESC3%}}', blog.desc3);
    output = output.replace('{{%YOUTUBE_LINK%}}', blog.youtube_link);


    fs.appendFile(blog.htmlpage_name, output, err => {
        if (err) {
            console.error(err);
        }
        // file written successfully
    });
    //create indivisual page : Blog page with name
    let htmlobj = replaceHtml(blogListHtml, blog);

    htmlobj = htmlobj.replace('{{%BLOGURL%}}', "\\Template\\" + blog.HTMLPAGE_NAME);

    return htmlobj;
}
let productHtmlArray = products.map((blog) => {
    return replaceBlogPageHtml(blogDetailHtml, blog);
})
let productResponseHtml = html.replace('{{%CONTENT%}}', productHtmlArray.join(','));

fs.appendFile("myBlogList.html", productResponseHtml, err => {
    if (err) {
        console.error(err);
    }
    // file written successfully
});

// response.writeHead(200, { 'Content-Type': 'text/html' });
// response.end(productResponseHtml);