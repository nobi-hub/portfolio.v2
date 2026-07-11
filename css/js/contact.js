const contactForm = document.querySelector('.contact__form');
const contactMessage = contactForm ? contactForm.querySelector('.contact__message') : null;

function showMessage(text, type) {
  if (!contactMessage) {
    alert(text);
    return;
  }

  contactMessage.textContent = text;
  contactMessage.classList.remove('contact__message--success', 'contact__message--error');
  contactMessage.classList.add(`contact__message--${type}`);
}

if (contactForm) {
  contactForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const payload = Object.fromEntries(formData.entries());

    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';

    try {
      const response = await fetch('/.netlify/functions/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      showMessage(result.message || 'Message sent successfully.', 'success');
      contactForm.reset();
    } catch (error) {
      console.error(error);
      showMessage(error.message || 'Unable to send your message.', 'error');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = originalText;
    }
  });
}
