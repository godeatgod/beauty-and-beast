// Auto generated from assets by grunt task. 
//
// Do not edit!

module.exports = {

images:[
<% images.forEach(function(image) {
   %>				  
   "<%= image.replace("app/", "") %>",
<%
}); %>				  

]

};	       
