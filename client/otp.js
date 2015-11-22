Template.otp.events({
  'click .submit-otp-request': function(e) {
    e.preventDefault();
    if(document.getElementById('contact-box').value.length === 0) {
      return;
    }
    alert('Submitted Number');
    var user = Meteor.user();
    var param = {
      customer_id: user.services.google.accessToken,
      contact: document.getElementById('contact-box').value
    }
    console.log(param);
    var user = Meteor.user();
    Meteor.call('generateOTP', param, user, function(err, res) {
      if(error.error === true) {
        alert('There was an error in generating the OTP request');
      } else {
        alert('Please enter the OTP you have recieved on you mobile phone');
      }
    });
    document.getElementById('otp-request-form').style.display = 'none'
    document.getElementById('otp-verify-form').style.display = 'block';
  },
  'click .verify-otp-code': function(e) {
    alert('Submitted OTP Code');
    if(documeny.getElementById('verify-otp-box').value.length === 0) {
      return;
    }
  }
});
