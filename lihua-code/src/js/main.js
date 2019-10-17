(function () {
   /*	Bootstrap Form: validation
       'use strict';
      	window.addEventListener('load', function () {
      		// Fetch all the forms we want to apply custom Bootstrap validation styles to
      		var forms = document.getElementsByClassName('needs-validation');
      		// Loop over them and prevent submission
      		var validation = Array.prototype.filter.call(forms, function (form) {
      			form.addEventListener('submit', function (event) {
      				if (form.checkValidity() === false) {
      					event.preventDefault();
      					event.stopPropagation();
      					console.log('Invalid: form is not submitted.');
      				} else {					
      					console.log(form.serialize());
      				}
      				form.classList.add('was-validated');
      			}, false);
      		});
      	}, false);*/

   /* Validate Email using Regex */
   function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
   }

   /* Simulate ajax response */
   function ajax_response(response, success) {
      return function (params) {
         if (success) {
            params.success(response);
         } else {
            params.error(response);
         }
      };
   }

   /* jQuery ajax */

   $('form').submit(function (event) {
      event.preventDefault();
      event.stopPropagation();

      var userEmail = $('#userEmail').val();
      var userInterest = $('#userInterest').val();

      $("#result").empty();

      this.classList.add('was-validated');
      // validate the form   
      /* validation using HTMLObjectElement.checkValidity
      if (this.checkValidity() === false) { */
      if (!isEmail(userEmail)) {
         $('#userEmail').focus();
         console.log('Invalid email: form is not submitted.');
      } else {
         // log the form data
         console.log('email: ' + userEmail + '; interested in: ' + userInterest);

         if (userInterest == 0) { // if user didn't select interest       
            var formData = {
               "email": "sydney@fife"
            }
         } else {
            var formData = {
               "email": "eve.holt@reqres.in",
               "password": "pistol"
            }
         }


         // process the form with a dummy API
         // use hosted RESTful API 
         $.ajax({
               type: 'POST',
               url: 'https://reqres.in/api/register',
               data: formData,
               dataType: 'json',
               encode: true
            })
            .done(function () {
               // display success message
               $("#result").html('<p class="text-success" role="alert">Success!</div>');
               console.log('Submit successfully!');
            })
            .fail(function () {
               // display error message
               $("#result").html('<p class="text-danger" role="alert">Sorry something went wrong.</div>');
               console.log('Submit failed!');
            });
      }
   });

})();