<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <div class="contact-heading">
        <img src="../../assets/images/letsmove.svg" alt="LET'S MOVE!" class="contact-heading-image">
      </div>

      <div class="contact-content">
        <form class="contact-form" @submit.prevent="submitForm" aria-labelledby="contact-form-title" novalidate>
          <!-- Honeypot field to catch bots - hidden from real users but visible to bots -->
          <div class="honeypot-field" aria-hidden="true" style="display: none;">
            <label for="honeypot">Leave this field empty</label>
            <input type="text" id="honeypot" name="honeypot" v-model="formData.honeypot" tabindex="-1" autocomplete="off">
          </div>

          <!-- Math challenge for bot detection - hidden but filled via JavaScript -->
          <div class="math-challenge" aria-hidden="true" style="display: none;">
            <label for="mathAnswer">What is {{ mathChallenge.num1 }} + {{ mathChallenge.num2 }}?</label>
            <input type="text" id="mathAnswer" name="mathAnswer" v-model="formData.mathAnswer" tabindex="-1" autocomplete="off">
          </div>
          <h2 id="contact-form-title" class="visually-hidden">Kontaktformular</h2>
          <div class="form-row">
            <div class="form-group" :class="{ 'has-error': formAttempted && errors.name, 'has-value': shouldShowLabel('name') }">
              <label class="address-bold floating-label" for="name">NAME<span class="required">*</span></label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="NAME*"
                v-model.trim="formData.name"
                @focus="handleFocus('name')"
                @blur="handleBlur('name')"
                :aria-invalid="formAttempted && errors.name ? 'true' : 'false'"
                :aria-describedby="formAttempted && errors.name ? 'name-error' : null"
                aria-required="true"
                tabindex="0"
              >
              <span class="error-message" v-if="formAttempted && errors.name" id="name-error" role="alert">{{ errors.name }}</span>
            </div>
            <div class="form-group" :class="{ 'has-error': formAttempted && errors.email, 'has-value': shouldShowLabel('email') }">
              <label class="address-bold floating-label" for="email">E-MAIL-ADRESSE<span class="required">*</span></label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="E-MAIL-ADRESSE*"
                v-model.trim="formData.email"
                @focus="handleFocus('email')"
                @blur="handleBlur('email')"
                :aria-invalid="formAttempted && errors.email ? 'true' : 'false'"
                :aria-describedby="formAttempted && errors.email ? 'email-error' : null"
                aria-required="true"
                tabindex="0"
              >
              <span class="error-message" v-if="formAttempted && errors.email" id="email-error" role="alert">{{ errors.email }}</span>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group" :class="{ 'has-error': formAttempted && errors.firma, 'has-value': shouldShowLabel('firma') }">
              <label class="address-bold floating-label" for="firma">FIRMA</label>
              <input
                type="text"
                id="firma"
                name="firma"
                placeholder="FIRMA"
                v-model.trim="formData.firma"
                @focus="handleFocus('firma')"
                @blur="handleBlur('firma')"
                :aria-invalid="formAttempted && errors.firma ? 'true' : 'false'"
                :aria-describedby="formAttempted && errors.firma ? 'firma-error' : null"
                tabindex="0"
              >
              <span class="error-message" v-if="formAttempted && errors.firma" id="firma-error" role="alert">{{ errors.firma }}</span>
            </div>

            <div class="form-group" :class="{ 'has-error': formAttempted && errors.anmerkungen, 'has-value': shouldShowLabel('anmerkungen') }">
              <label class="address-bold floating-label" for="anmerkungen">ANMERKUNGEN</label>
              <textarea
                id="anmerkungen"
                name="anmerkungen"
                rows="1"
                placeholder="ANMERKUNGEN"
                v-model.trim="formData.anmerkungen"
                @focus="handleFocus('anmerkungen')"
                @blur="handleBlur('anmerkungen')"
                :aria-invalid="formAttempted && errors.anmerkungen ? 'true' : 'false'"
                :aria-describedby="formAttempted && errors.anmerkungen ? 'anmerkungen-error' : null"
                tabindex="0"
              ></textarea>
              <span class="error-message" v-if="formAttempted && errors.anmerkungen" id="anmerkungen-error" role="alert">{{ errors.anmerkungen }}</span>
            </div>
          </div>
          <div class="form-row">
            <div class="form-group" :class="{ 'has-error': formAttempted && errors.betreff, 'has-value': shouldShowLabel('betreff') }">
              <label class="address-bold floating-label" for="betreff">BETREFF<span class="required">*</span></label>
              <input
                type="text"
                id="betreff"
                name="betreff"
                placeholder="BETREFF*"
                v-model.trim="formData.betreff"
                @focus="handleFocus('betreff')"
                @blur="handleBlur('betreff')"
                :aria-invalid="formAttempted && errors.betreff ? 'true' : 'false'"
                :aria-describedby="formAttempted && errors.betreff ? 'betreff-error' : null"
                aria-required="true"
                tabindex="0"
              >
              <span class="error-message" v-if="formAttempted && errors.betreff" id="betreff-error" role="alert">{{ errors.betreff }}</span>
            </div>

            <div class="form-submit">
              <button
                type="submit"
                class="submit-image-btn"
                :disabled="isSubmitting"
                :class="{ 'animate-in': isVisible }"
                aria-label="Formular absenden"
                tabindex="0"
              >
                <img src="../../assets/images/submit.svg" alt="" class="contact-button__image" aria-hidden="true" />
                <span v-if="isSubmitting" class="loading-overlay" aria-live="polite">WIRD GESENDET...</span>
              </button>
              <div v-if="formSubmitted" class="success-message" role="status" aria-live="polite">Vielen Dank für Ihre Nachricht!</div>
            </div>
          </div>
        </form>

        <div class="contact-info">
          <div class="company-info">
            <h3>TAKTZEIT GMBH</h3>
            <p class="address-bold">YOUR SALES ACTIVATION AGENCY</p>
            <p class="address-bold">BURGMÜLLERSTR. 28</p>
            <p class="address-bold">40235 DÜSSELDORF</p>
          </div>

          <div class="contact-details">
            <p class="address-bold">+49 211 36 11 78 90</p>
            <p class="address-bold">HELLO@TAKTZEIT.COM</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import emailjs from '@emailjs/browser';
import { validateField, validateForm, sanitizeForm, hasErrors, generateCSRFToken } from '../../utils/formValidation';

export default {
  name: 'ContactSection',
  data() {
    return {
      formData: {
        name: '',
        email: '',
        firma: '',
        betreff: '',
        anmerkungen: '',
        csrfToken: '',
        honeypot: '', // Honeypot field to catch bots
        formStartTime: Date.now(), // Timestamp when the form was loaded
        mathAnswer: '' // Answer to the math challenge
      },
      mathChallenge: {
        num1: 0,
        num2: 0,
        correctAnswer: 0
      },
      errors: {
        name: '',
        email: '',
        firma: '',
        betreff: '',
        anmerkungen: '',
        csrfToken: ''
      },
      requiredFields: {
        name: true,
        email: true,
        firma: false,
        betreff: true,
        anmerkungen: false
      },
      isSubmitting: false,
      formSubmitted: false,
      isVisible: false,
      observer: null,
      formAttempted: false, // Track if form submission has been attempted
      focusedFields: {
        name: false,
        email: false,
        firma: false,
        betreff: false,
        anmerkungen: false
      }
    };
  },
  mounted() {
    // Set up intersection observer to detect when the section is visible
    this.setupIntersectionObserver();

    // Emit event to hide contact and cookie buttons when this section is visible
    document.addEventListener('section-visible', this.handleSectionVisible);

    // Initialize GSAP animations
    this.initGsapAnimations();

    // Generate CSRF token
    this.formData.csrfToken = generateCSRFToken();

    // Set up math challenge
    this.setupMathChallenge();
  },
  unmounted() {
    // Clean up observer and event listeners
    if (this.observer) {
      this.observer.disconnect();
    }
    document.removeEventListener('section-visible', this.handleSectionVisible);
  },
  methods: {
    validateField(field) {
      // Reset the error for this field
      this.errors[field] = '';

      // Use the validation utility
      const isRequired = this.requiredFields[field] || false;
      const error = validateField(field, this.formData[field], isRequired);

      if (error) {
        this.errors[field] = error;
        return false;
      }

      return true;
    },
    validateForm() {
      // Use the validation utility to validate all fields
      const errors = validateForm(this.formData, this.requiredFields);

      // Update the errors object
      this.errors = { ...errors };

      // Return true if there are no errors
      return !hasErrors(errors);
    },
    setupIntersectionObserver() {
      // Create a new Intersection Observer
      this.observer = new IntersectionObserver(
        (entries) => {
          // Check if the section is intersecting (visible)
          if (entries[0].isIntersecting) {
            this.isVisible = true;

            // Dispatch a custom event to notify other components
            const event = new CustomEvent('contact-section-visible', { detail: { visible: true } });
            document.dispatchEvent(event);
          } else {
            this.isVisible = false;

            // Dispatch a custom event to notify other components
            const event = new CustomEvent('contact-section-visible', { detail: { visible: false } });
            document.dispatchEvent(event);
          }
        },
        {
          // Options for the observer
          threshold: 0.1, // Trigger when just 10% of the section is visible
          rootMargin: '0px' // No margin
        }
      );

      // Start observing the section
      const section = document.getElementById('contact');
      if (section) {
        this.observer.observe(section);
      }
    },

    handleSectionVisible() {
      // This method can be used to respond to other sections becoming visible
      // For now, we're just using our own observer
    },

    // Handle input field focus
    handleFocus(field) {
      this.focusedFields[field] = true;
    },

    // Handle input field blur
    handleBlur(field) {
      this.focusedFields[field] = false;
      // Only validate on blur if the form has been attempted to be submitted
      if (this.formAttempted) {
        this.validateField(field);
      }
    },

    // Check if a label should be visible
    shouldShowLabel(field) {
      return this.focusedFields[field] || this.formData[field];
    },

    // Set up a simple math challenge for bot detection
    setupMathChallenge() {
      // Generate two random numbers between 1 and 10
      this.mathChallenge.num1 = Math.floor(Math.random() * 10) + 1;
      this.mathChallenge.num2 = Math.floor(Math.random() * 10) + 1;

      // Calculate the correct answer
      this.mathChallenge.correctAnswer = this.mathChallenge.num1 + this.mathChallenge.num2;

      // Set the answer in the form data
      this.formData.mathAnswer = String(this.mathChallenge.correctAnswer);
    },

    initGsapAnimations() {
      // Import GSAP dynamically to avoid SSR issues
      import('gsap').then(({ gsap }) => {
        // Get the contact section elements
        const contactHeading = document.querySelector('.contact-heading');
        const contactInfo = document.querySelector('.contact-info');
        const formGroups = document.querySelectorAll('.form-group');

        // Create a ScrollTrigger for the contact section
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          gsap.registerPlugin(ScrollTrigger);

          // Create a timeline for the contact section
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: '#contact',
              start: 'top 70%',
              end: 'bottom 20%',
              toggleActions: 'play none none reverse',
              // markers: true, // Uncomment for debugging
            }
          });

          // Add animations to the timeline
          tl.from(contactHeading, {
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out'
          })
          .from(formGroups, {
            y: 30,
            opacity: 0,
            stagger: 0.1,
            duration: 0.6,
            ease: 'power2.out'
          }, '-=0.4')
          .from(contactInfo, {
            x: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
          }, '-=0.6');
        });
      });
    },

    async submitForm() {
      // Set formAttempted to true when form is submitted
      this.formAttempted = true;

      // Calculate time elapsed since form was loaded (in seconds)
      const timeElapsed = (Date.now() - this.formData.formStartTime) / 1000;

      // Check for bot activity
      let isBotSubmission = false;
      let botDetectionReason = '';

      // Check if honeypot field is filled (bot detection)
      if (this.formData.honeypot && this.formData.honeypot.trim() !== '') {
        isBotSubmission = true;
        botDetectionReason = 'Honeypot field filled';
      }

      // Check if form was submitted too quickly (less than 3 seconds)
      if (timeElapsed < 3) {
        isBotSubmission = true;
        botDetectionReason = `Form submitted too quickly (${timeElapsed.toFixed(2)} seconds)`;
      }

      // Check if math challenge answer was modified (bot detection)
      if (this.formData.mathAnswer !== String(this.mathChallenge.correctAnswer)) {
        isBotSubmission = true;
        botDetectionReason = 'Math challenge failed';
      }

      // Handle bot submission
      if (isBotSubmission) {
        // Log bot detection for monitoring
        console.warn(`Bot submission detected: ${botDetectionReason}`);

        // Log submission details for analysis
        const submissionDetails = {
          timestamp: new Date().toISOString(),
          reason: botDetectionReason,
          timeElapsed: timeElapsed.toFixed(2) + 's',
          userAgent: navigator.userAgent,
          formData: { ...this.formData, honeypot: this.formData.honeypot ? 'filled' : 'empty' }
        };
        console.log('Bot submission details:', submissionDetails);

        // Pretend the form was submitted successfully to avoid alerting bots
        this.formSubmitted = true;
        setTimeout(() => {
          this.formSubmitted = false;
        }, 5000);
        return;
      }

      // Validate the form
      if (!this.validateForm()) {
        return;
      }

      this.isSubmitting = true;

      try {
        // Sanitize the form data
        const sanitizedData = sanitizeForm(this.formData);

        // Prepare the template parameters for EmailJS
        const templateParams = {
          to_email: 'felix.seeger@taktzeit.com', // The recipient email
          from_name: sanitizedData.name,
          from_email: sanitizedData.email,
          company: sanitizedData.firma || 'Not provided',
          subject: sanitizedData.betreff,
          message: sanitizedData.anmerkungen || 'No message provided',
          reply_to: sanitizedData.email,
          csrfToken: sanitizedData.csrfToken // Include CSRF token for server-side validation
        };

        // Send the email using EmailJS
        // You need to replace these IDs with your actual EmailJS service, template, and user IDs
        const response = await emailjs.send(
          'service_xxxxxxx', // Replace with your EmailJS service ID
          'template_xxxxxxx', // Replace with your EmailJS template ID
          templateParams,
          'xxxxxxxxxxxxxxxx' // Replace with your EmailJS public key
        );

        console.log('Email sent successfully:', response);

        // Reset form after successful submission
        this.formData = {
          name: '',
          email: '',
          firma: '',
          betreff: '',
          anmerkungen: '',
          honeypot: '',
          csrfToken: generateCSRFToken(), // Generate a new CSRF token
          formStartTime: Date.now(), // Reset the timestamp
          mathAnswer: '' // Reset the math answer
        };

        // Set up a new math challenge
        this.setupMathChallenge();

        this.formSubmitted = true;
        this.formAttempted = false; // Reset formAttempted state

        // Hide success message after 5 seconds
        setTimeout(() => {
          this.formSubmitted = false;
        }, 5000);
      } catch (error) {
        console.error('Error submitting form:', error);

        // Check if the error is related to validation
        if (error.response && error.response.status === 400 && error.response.data && error.response.data.errors) {
          // Update the errors object with the server-side validation errors
          this.errors = { ...error.response.data.errors };
        } else {
          // Generic error message for other errors
          alert('Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.');
        }
      } finally {
        this.isSubmitting = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/_variables.scss';

// Honeypot field styling - ensure it's hidden from users but visible to bots
.honeypot-field,
.math-challenge {
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: -1;
  opacity: 0;
  height: 0;
  width: 0;
  overflow: hidden;
}

.form-group {
  position: relative;
  margin-bottom: 1.5rem;

  &.has-error {
    input, textarea {
      border-color: $error-color !important;
    }
  }

  .required {
    color: $error-color;
    margin-left: 0.25rem;
  }

  .error-message {
    position: absolute;
    bottom: -1.25rem;
    left: 0;
    font-size: 0.75rem;
    color: $error-color;
    text-align: left;
  }
}

.submit-image-btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 0;
  transform: translateY(100px);
  opacity: 0;
  transition:  transform 0.8s ease, opacity 0.8s ease;

  &.animate-in {
    transform: translateY(0);
    opacity: 1;
  }

  &:hover {
    transform: translateY(-5px);
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }

  .loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.7);
    color: $text-color;
    font-family: $font-headline;
    font-weight: 600;
    border-radius: 4px;
  }
}

.success-message {
  margin-top: 1rem;
  padding: 0.75rem;
  background-color: rgba(darken($primary-color, 10%), 0.2);
  color: $text-color;
  border-radius: 4px;
  text-align: left;
}
</style>
