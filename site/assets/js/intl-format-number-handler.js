document.addEventListener('DOMContentLoaded', function() {
  locale = navigator.language
  formatter = new Intl.NumberFormat(locale)

  document.querySelectorAll('.international-number').forEach(element => {
    element.textContent = formatter.format(element.textContent)
  })
})
