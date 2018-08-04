var $;  
var URL = "https://bits-oasis.org/registration/intro/";
var name = document.getElementById("prereg-input-name").value;
var college = document.getElementById("prereg-input-college").value;    
var email = document.getElementById("prereg-input-email").value;
var phone = document.getElementById("prereg-input-phone").value;

// window.onload(function(e){
// $.ajax({
//     type: 'GET',
//     url: URL,
//     dataType: 'json',
//     success: function (data) {
//         $.each(data.aaData,function(i,obj)
//         {
//          var div_data=('<option value='+obj.num+'>'+obj.college+'</option>');
//         $(div_data).appendTo('#prereg-input-college'); 
//         });  
//         }
//   });
//   e.preventDefault();
// });

document.getElementById("prereg-form").onsubmit = function registerForm(f)
{   
	if(name!="" && phone!="" && email!="" && college!="")
	{
		$.ajax({
			type:"POST",
			contentType: "application/json",
			url: URL,
			data:JSON.stringify({
			name: name,
			mobile_no: phone,
            email_id: email,
            college: college
			}),
            dataType: "json",            
			error:function(){
            console.log("error");
			}
		}).done(function(){
            console.log("Success!");
		});
	}
	else
	{
        console.log("Fill all fields");
	}
	f.preventDefault();
};