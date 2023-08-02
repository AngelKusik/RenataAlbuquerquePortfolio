

(function () {
  // Navbar responsiveness

  // Execute function when page first loads
  // TODO: Maybe move this inside an event listener for when the pages first loads?
  updateNavbarBrand();

  // Execute function when page resizes
  window.addEventListener('resize', function () {
    updateNavbarBrand();
  });

  function updateNavbarBrand(){
    let line1 = $("#navbar-brand-line1")
    
    if (window.innerWidth < 1430){ 
      line1.addClass("display-block");
    }else{
      line1.removeClass("display-block");
    }
  }


 
    let submitButton = $("#submitButton")
    let cancelButton = $("#resetButton")
    let messageArea = $('#messageArea')
  
    ContactMeFormValidate()
    
    submitButton.on("click", (event) => {
      //prevent the default form behaviour (so it won't submit the form)
      event.preventDefault()
  
      console.log("inside event listener")
  
      //ContactMeFormValidate()
  
      let name = $("#nameInput").val()
      let phone = $("#phoneInput").val()
      let email = $("#emailInput").val()
      let subject = $("#subjectInput").val()
      let message = $("#messageInput").val()
  
      if(name == "" || email == "" || subject == "" || message == "")
      {
        //and then add the following class to #messageArea box, and show the  specific exception
        $('#messageArea').addClass("alert alert-danger").text("You must fill out the name, email, subject and mesage fields.").show()
        
      }
      else {
        // reset the form 
        document.getElementById("contactMeForm").reset();
  
        messageArea.hide()
  
        $.ajax({
          url: "https://formspree.io/f/mzbqvvdo",
          method: "POST",
          data: {
            name: name,
            phone: phone,
            email: email,
            subject: subject,
            message: message,
          },
          dataType: "json",
          success: function () {
            messageArea.removeClass("alert alert-danger mb-3").addClass("alert alert-success mb-3").text("Your message has been sent. I will get back to you as soon as possible!").show();
            
            // Remove the message after 20 seconds
            setTimeout(function() {
              messageArea.fadeOut('slow', function() {
                messageArea.hide();
              });
            }, 20000);
          
          },
          error: function () {
            messageArea.addClass("alert alert-danger mb-3").text("There was an error sending your message.").show();
  
            // Remove the message after 20 seconds
            setTimeout(function() {
              messageArea.fadeOut('slow', function() {
                messageArea.hide();
              });
            }, 20000);
  
          },
        });
      }
    })
  
    cancelButton.on("click", function () {
  
      // reset the form 
      document.getElementById("contactMeForm").reset();
  
    })
  
    function ValidateInput(inputFieldID, regularExpression, exception) {
      messageArea.hide()
  
      $('#' + inputFieldID).on("blur", function() {
          let inputText = $(this).val()
  
          if (!regularExpression.test(inputText)) {
              // failure to match full name with regex
  
              $(this).trigger("focus").trigger("select")
  
              messageArea.addClass("alert alert-danger mb-3").text(exception).show()
  
              //disable register button
              $("#submitButton").prop('disabled', true);
          } else {
              // success in matching full name with regex
  
              messageArea.removeAttr("class").hide()
  
              // enable register button
              $("#submitButton").prop('disabled', false);
          }
      })
    }
  
  
    //Validates the information entered on the Contact Me form 
    function ContactMeFormValidate(){
      //For the name: Filed cannot be blank, must enter at least first name. Middle name
      // and last name are optional. No numbers or special characters allowed. Names must be separated
      // by a whitespace
      let namePattern = /^[A-Za-z]{2,25}(?:\s[A-Za-z]{2,25})?(?:\s[A-Za-z]{2,25})?$/g
  
      // For the phone number: This is not a required field, so the user doesn't have to fill it out.
      // But if the user decide to enter the phone number it may start with + and country code, may start with (+country code),
      // may not have country code, numbers may be separated by dash or whitespace. Only numbers allowed
      // except by country code where + and () are acceptable
      let phonePattern = /^(\()?(\+)?(\d{0,3})?(\s|-|\))?((?:\d{3,})(\s|-)?(?:\d{3,})(\s|-)?(?:\d{4,}))?$/g
      
      //Email pattern: Must enter at least two characters before @. Must have an @ and 1-24 letters, digits, hyphen or dots
      //after @. Must have a dot before the domain and domain must be at least 2 letters long.
      let emailPattern = /^([\w.-]{2,})+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/g 
      // Subject Pattern: Subject cannot be blank, must be between 1-100 characters, may not start or
      //end with a whitespace, accepts any alphanumeric or special character in between.
      let subjectPatter = /^[^\s].{0,99}[^\s]$/g
      // Message pattern: Message cannot be blank, must be between 1-300 characters, may not start or
      //end with a whitespace, accepts any alphanumeric or special character in between.
      let messagePattern = /^[^\s].{0,298}[^\s]$/g
    
      ValidateInput("nameInput", namePattern, "I want to know your name, please fill out this field.")
      ValidateInput("phoneInput", phonePattern, "Only numbers allowed here. Please enter a valid phone number.")
      ValidateInput("emailInput", emailPattern, "Ops! Please enter a valid email address, so I can get back to you.")
      ValidateInput("subjectInput", subjectPatter, "Please enter the subject of your message.")
      ValidateInput("messageInput", messagePattern, "Please enter a message below and let me know why are you contacting me.")
    }
  
  
    // FOOTER
    //Dinamically getting the value of "year" for the footer
    $('#year').text(new Date().getFullYear());
  
  })()