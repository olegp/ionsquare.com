document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('contactForm').addEventListener('submit', function(event) {
    const recaptchaResponse = grecaptcha.getResponse();

    if(recaptchaResponse.length === 0) {
      document.getElementById('recaptchaError').classList.remove('d-none');
      event.preventDefault();
      return false;
    }

    document.getElementById('recaptchaError').classList.add('d-none');
    return true;
  });
})
