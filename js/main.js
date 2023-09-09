

(function () {
  /** NAVBAR **/
  let navbarContainer = $("#navbar-section");
  let navbar = `
      <nav class="navbar navbar-expand-lg navbar-light bg-white navbarScroll">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html"
          ><span id="navbar-brand-line1">Renata Albuquerque</span>
          <span id="navbar-brand-line2">Architectural Technician</span></a
        >
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link" href="projects.html">WORK</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="profile.html">PROFILE</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="contact.html">CONTACT</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>  `;

  //Append navbar to page using jQuery's append function
  navbarContainer.append(navbar);

  // Navbar responsiveness

  // Execute function when page first loads
  UpdateNavbarBrand();

  /** FOOTER **/
  let footerContainer = $("#footer-section");
  let footer = `
      <footer id="footer" class="text-center p-4">
      <div class="container-fluid">
        <p class="mt-4 mb-1">Copyright &copy; <span id="year"></span></p>
        <p class="mt-0">
          Build with <i class="bi bi-heart"></i> by
          <a
            class="footer-signature"
            href="https://www.linkedin.com/in/angelica-kusik/"
          >
            Angelica Kusik</a
          >
        </p>
      </div>
    </footer>`;

  //Append footer to page using jQuery's append function
  footerContainer.append(footer);

  //Dinamically getting the value of "year" for the footer
  $('#year').text(new Date().getFullYear()); 

  /** FORM VALIDATION  **/

  //Calling form validation function when page loads to ensure fields are validated as user
  //enters information and error messages are displayed or removed accordingly
  ValidateContactForm()

  //Calling the UpdateBorders function to dynamically adjust the borders of the pages as 
  //viewport is resized.
  UpdateBorders()

  /** VARIABLE DECLARATIONS **/
  let submitButton = $('#submitButton')
  let resetButton = $('#resetButton')
  let messageArea = $('#messageArea')

  /** EVENT LISTENERS **/

  // Execute function when page resizes
  window.addEventListener('resize', function () {
    UpdateNavbarBrand();
    UpdateBorders();
  });

    
  /**
   * submitButton:
   * Validates data entered on the contact form upon clicked, triggers error messages if
   * applicable and sends valid data to email using formspree
   */
  submitButton.on("click", (event) => {
    //Prevent the default form behaviour (so it won't submit the form)
    event.preventDefault()

    // Validate the form using jQuery Validation Plugin
    if ($("#contact-form").valid()) {
      // If the form is valid, trigger its submission
      $("#contact-form").submit();
    }
    // If the form is invalid, the error messages will be displayed automatically
  })
    
  /**
   * resetButton:
   * Clears out all data in the contact form
   */
  resetButton.on("click", function () {

    // reset the form 
    document.getElementById("contact-form").reset();
  })

  /** FUNCTIONS **/

  /**
   * UpdateNavbarBrand:
   * Breaks down brand name into 2 lines on smaller screen sizes
   */
  function UpdateNavbarBrand(){
    let line1 = $("#navbar-brand-line1")
    
    if (window.innerWidth < 1430){ 
      line1.addClass("display-block");
    }else{
      line1.removeClass("display-block");
    }
  }

  //Initialize the input mask plugin (for the phone number to enforce format 999-999-9999)
  $('.input-mask').inputmask();

   /**
   * ValidateContactForm
   * Validates the contact form data
   */ 
  function ValidateContactForm(){
    $("#contact-form").validate({
      errorClass: "error fail-alert is-invalid",
      validClass: "valid success-alert",
      rules: {
        firstName : {
          required: true,
          minlength: 2,
          maxlength: 30
        },
        lastName: {
          required: true,
          minlength: 2,
          maxlength: 30
        },
        company: {
          required: false,
          maxlength: 30
        },
        email: {
          required: true,
          email: true
        },
        phone: {
          required: false,
          phoneCustomValidation: true
        },
        message: {
          required: true,
          minlength: 2,
          maxlength: 300
        }
      },
      messages : {
        firstName: {
          required: "Please enter your first name",
          minlength: "First name must have 2 characters minimum",
          maxlength: "First name must have 30 characters maximum"
        },
        lastName: {
          required: "Please enter your last name",
          minlength: "Last name must have 2 characters minimum",
          maxlength: "Last name must have 30 characters maximum"
        },
        company: {
          maxlength: "Company name must have 30 characters maximum"
        },
        email: {
          required: "Please enter your email address",
          email: "Email address should be in the format: abc@domain.tld"
        },
        phone: {
          phoneCustomValidation: "Phone number should be in the format: '999-999-9999'"
        },
        message: {
          required: "Please enter your message",
          minlength: "Message must have 2 characters minimum",
          maxlength: "Message must have 300 characters maximum"
        }
      },
      submitHandler: function (form){
        // This function will be called when the form is submitted and passes validation
        // You can access the form data using $(form).serialize() or other methods
        console.log("inside submit handler")
        //Send data to email
        $.ajax({
          url: "https://formspree.io/f/xaygjgno", //Renata's formspree link
          method: "POST",
          data: $(form).serialize(),
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

        // Optionally, you can reset the form
        form.reset();

        // Prevent the default form submission behavior
        return false;
      }
    });
  }

  $.validator.addMethod('phoneCustomValidation', function(phone) {
    phone = phone.replace(/\s+/g, ''); // Remove all spaces
  
    // Match the phone number against the regex pattern
    var isValid = phone.match(/^\d{3}-\d{3}-\d{4}$/); // Matches '999-999-9999' format
    
    if (isValid) {
      return true; // Return true to indicate phone number matches pattern
    } else {
      return false; // Return false to indicate failure
    }
  });

  /** Dynamically setting borders */
  function UpdateBorders() {
    //Declare variables for each screen breakpoint
    let sm = 576
    let md = 768
    let lg = 992
    let xl = 1200

    //Get the window width
    let windowWidth = $(window).width();

    //If viewport is xm
    if (windowWidth < md) { //If viewport is xm
      //Contact Page: 
      $("label[for='lastName']").addClass("my-2");
      $("label[for='lastName']").removeClass("mb-2");

    }else { 
      //Contact Page: 
      $("label[for='lastName']").removeClass("my-2");
      $("label[for='lastName']").addClass("mb-2");

    }

  }
    
  //TODO: Add plugin for phone format, CHECK
  //create regex pattern to validate phone number according to expected format, CHECK
  //figure it when this validation should be called (submit, key up, blur or whatever), CHECK
  // hook up part that sends info to email when valid, CHECK
  //style error messages with bootstrap CHECK
  //fix form to show fname and last name in the same line on big screen CHECK
  //fix caresshouse carousel CHECK
  //fix profile page display on medium/large CHECK
  //fix borders on smaller screens CHECK
  //remove target blank from href CHECK
  //change form to submit to renata
  //test everything CHECK
  //add renata's socials link to icons on home page CHECK
  //add linkedin icon to profile page? NOPE
  //push to cloud
  //mage renata's name on home page responsive to screen size live nav brand NOPE

  
})()