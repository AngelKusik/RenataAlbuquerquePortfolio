

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
  
      console.log("inside submit button event listener")
   
      let name = $("#nameInput").val()
      let company = $("#companyInput").val()
      let email = $("#emailInput").val()
      let phone = $("#phoneInput").val()
      let subject = $("#subjectInput").val()
      let message = $("#messageInput").val()
      
      //Validate if required fields were filled out
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
            company: company,
            phone: phone,
            email: email,
            subject: subject,
            message: message,
          },
          dataType: "json",
          success: function () {
            messageArea.removeClass("alert alert-danger mb-3").addClass("alert alert-success mb-3").text("Your message has been sent. I will get back to you soon").show();
            
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
  
  
    //Validates the information entered in the Contact form 
    function ContactMeFormValidate(){
      //Name: May not be blank, first name: min 2 characters - max 25 characters, no numbers, no special characters, 
      //may be followed by a single space, second & third names: min 1 character - max 25 characters, optional, 
      //second name may be followed by single space, no <>'""() allowed (protection agains code injection)
      let namePattern = /^(?!.*[<>'"();,])[A-Za-z]{2,25}((?:\s)|(?:\s[A-Za-z]{1,25}))?((?:\s)|(?:\s[A-Za-z]{1,25}))?$/g
      // before: /^[A-Za-z]{2,25}(?:\s[A-Za-z]{2,25})?(?:\s[A-Za-z]{2,25})?$/gm
    
      //Company Name: Not required. May have max 30 characters. No <>'""() allowed (protection agains code injection)
      let companyPattern = /^(?!.*[<>'"();,]).{0,30}$/g

      //Email: May not be blank, min 2 characters before @ symbol, max 30 (including words characters, dots, hyphens, underscore), 
      //must have @ symbol, min 2 max 30 characters after @. Must have a . before domain, domain must have min 2 max 30 characters. 
      // No <>'""() allowed (protection agains code injection)
      let emailPattern = /^(?!.*[<>'"();,])[\w.-]{2,30}@[a-zA-Z0-9.-]{2,30}\.[a-zA-Z]{2,30}$/g      

      //Phone number: Not required. Country code and + symbol optional. Phone number must have 10 numbers all together
      //or separated by a hiphen or space in the format xxx-xxx-xxxx or xxx xxx xxxxx
      //TODO: Format 4168359851 witout spaces not working!!!!!!!!!!
      let phonePattern = /^(?:\+\d{1,2}\s?)?(?:\(\d{3}\)\s?|\d{3}[\s-]?)?\d{3}[\s-]?\d{4}$/gm
     
      //Subject: Required field. Subject cannot be blank, must be between 2-55 characters, does
      //not accept <>='' to avoid code injection
      let subjectPatter = /^(?!.*[<>='])[^\s].{0,55}[^\s]$/gm

      // Message: Required field, must be between 2-300 characters, does not accept the <>'' characters to
      //avoid code injection.
      let messagePattern = /^(?!.*[<>']).{2,300}$/gm
      
    
      ValidateInput("nameInput", namePattern, "Ops! Don't forget to enter your name :)")
      ValidateInput("companyInput", companyPattern, "Invalid company name, please try again")
      ValidateInput("phoneInput", phonePattern, "There is something wrong with your phone number. Try typing it in the format '111-111-1111'")
      ValidateInput("emailInput", emailPattern, "Ops, invalid email address! Please enter a valid email address, so I can get back to you")
      ValidateInput("subjectInput", subjectPatter, "Please don't forget to enter the subject of your message")
      ValidateInput("messageInput", messagePattern, "Please don't forget to leave me a message, I want to know how I can help you")
    }
  
  
    // FOOTER
    //Dinamically getting the value of "year" for the footer
    $('#year').text(new Date().getFullYear());
  
  })()