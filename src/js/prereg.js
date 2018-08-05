var axios = require("axios");
var URL = "https://bits-oasis.org/registration/intro/";
var name = document.getElementById("prereg-input-name").value;
var college = document.getElementById("prereg-input-college").value;    
var email = document.getElementById("prereg-input-email").value;
var phone = document.getElementById("prereg-input-phone").value;

// window.onload(function(e){
// // $.ajax({
// //     type: 'GET',
// //     url: URL,
// //     dataType: 'json',
// //     success: function (data) {
// //         $.each(data.aaData,function(i,obj)
// //         {
// //          var div_data=('<option value='+obj.num+'>'+obj.college+'</option>');
// //         $(div_data).appendTo('#prereg-input-college'); 
// //         });  
// //         }
// //   }); 

//     e.preventDefault();
// });

axios({
    method:'get',
    url: URL,
})
.then(function(response) {
    console.log(response);
    var i=0;
    while(response.data){
        var div_data=('<option value='+i+'>'+response.data.college+'</option>');
        document.getElementById('prereg-input-college').appendChild(div_data);
        i++;
    }
})
.catch(function (error) {
    console.log(error);
});

document.getElementById("prereg-form").onsubmit = function registerForm(f)
{   
	if(isFieldBlank(name) && isFieldBlank(phone) && isFieldBlank(email) && isFieldBlank(college))
	{
        axios.post(URL, {
            name: name,
            mobile_no: phone,
            email_id: email,
            college: college
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        // $.ajax({
		// 	type:"POST",
		// 	contentType: "application/json",
		// 	url: URL,
		// 	data:JSON.stringify({
		// 	name: name,
		// 	mobile_no: phone,
        //     email_id: email,
        //     college: college
		// 	}),
        //     dataType: "json",            
		// 	error:function(){
        //     console.log("server error");
		// 	}
		// }).done(function(){
        //     console.log("Success!");
		// });
	}
	else
	{
        console.log("Fill all fields");
    }
	f.preventDefault();
};

// function validatePhoneNumber (num) {
//     let phoneNumRegex = /^[0-9]{10}$/;
//     let match = phoneNumRegex.test(num);

//     return match;
// }

// function validateEmail(email) {
//     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(email).toLowerCase());
// }

function isFieldBlank (val) {
    var re = /^(\s)*$/;

    return re.test(val);
}
