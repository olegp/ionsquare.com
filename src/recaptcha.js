document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function(event) {
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
