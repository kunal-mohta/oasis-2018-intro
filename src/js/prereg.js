// var axios = require("axios");
// var URL = "https://bits-oasis.org/registration/intro/";

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

// axios({
//     method:'get',
//     url: URL,
// })
// .then(function(response) {
//     console.log(response);
//     var i=0;
//     while(response.data){
//         var div_data=('<option value='+i+'>'+response.data.college+'</option>');
//         document.getElementById('prereg-input-college').appendChild(div_data);
//         i++;
//     }
// })
// .catch(function (error) {
//     console.log(error);
// });

document.getElementById("prereg-form").onsubmit = function registerForm(f)
{
    let name = document.getElementById("prereg-input-name").value;
    let college = document.getElementById("prereg-input-college").value;    
    let email = document.getElementById("prereg-input-email").value;
    let phone = document.getElementById("prereg-input-phone").value;

    let inputArray = [name, college, email, phone];
    
    if ( !areFieldBlank(trimInput(inputArray)) ) {
        // no field is empty

        if ( validateEmail(email) ) {
            // correct email format

            if ( validatePhoneNumber(phone) ) {
                // correct phone number format

            }
            else {
                // incorrect phone number format
                
            }
        }
        else {
            // incorrect email format
        }
    }
    else {
        // one or more of the fields is blank

    }

    f.preventDefault();
};

function validatePhoneNumber (num) {
    let phoneNumRegex = /^[0-9]{10}$/;
    let match = phoneNumRegex.test(num);

    return match;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function areFieldBlank (vals) {
    let re = /^(\s)*$/;
    var isAnyFieldBlank = false;
    vals.forEach(field => {
        if (re.test(field)) isAnyFieldBlank = true;
    });
    return isAnyFieldBlank;
}

function trimInput (vals) {
    vals.forEach((field, index) => {
        vals[index] = field.replace(/^\s+|\s+$/gm, "");
    })

    return vals;
}

// function preregDialogMsg (msg) {

// };
