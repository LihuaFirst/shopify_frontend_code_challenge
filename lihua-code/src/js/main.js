(function () {
    /*	 Bootstrap Form: validation
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

    /* jQuery ajax */
    function isEmail(email) {
      var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      return regex.test(email);
    }
    $('form').submit(function (event) {
        event.preventDefault();
        event.stopPropagation();

        var userEmail = $('#userEmail').val();
        var userInterest = $('#userInterest').val();

        this.classList.add('was-validated');
        // validate the form   
        /* validation using HTMLObjectElement.checkValidity
        if (this.checkValidity() === false) { */

        if (!isEmail(userEmail))
          console.log('Invalid: form is not submitted.');
      } else {
        // get the form data
        var formData = {
          'userEmail': userEmail,
          'userInterest': userInterest
        };
        console.log(formData);

        // process the form
        $.ajax({
          type: 'POST',
          url: 'process.php',
          data: formData,
          dataType: 'json',
          encode: true
        }).done(function (data) {
          console.log('Submit successfully!');
        });
      }
    });

})();