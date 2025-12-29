import { useState } from 'react';
import { Button } from '../../ui/Button/';
import './FeedbackForm.css';

function FeedbackForm() {
  const [formData, setFormData] = useState({
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Simulate form submission - replace with actual API call later
    try {
      // TODO: Replace with actual backend API endpoint
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setSubmitStatus('success');
      setFormData({ email: '', message: '' });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="feedback-form">
      <div className="feedback-form__container">
        <div className="feedback-form__card">
          {/* Header */}
          <div className="feedback-form__header">
            <h2 className="feedback-form__title">FEEDBACK FORM</h2>
            <div className="feedback-form__divider"></div>
          </div>

          {/* Description */}
          <p className="feedback-form__description">
            Have any questions, clarifications, or comments? Send us a message through the form below
          </p>

          {/* Form */}
          <form className="feedback-form__form" onSubmit={handleSubmit}>
            <div className="feedback-form__field">
              <label htmlFor="email" className="feedback-form__label">
                Email Address:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`feedback-form__input ${formData.email ? 'has-value' : ''}`}
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="feedback-form__field">
              <label htmlFor="message" className="feedback-form__label">
                Message:
              </label>
              <textarea
                id="message"
                name="message"
                className={`feedback-form__textarea ${formData.message ? 'has-value' : ''}`}
                rows={6}
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            {submitStatus === 'success' && (
              <p className="feedback-form__status feedback-form__status--success">
                Thank you! Your message has been sent successfully.
              </p>
            )}

            {submitStatus === 'error' && (
              <p className="feedback-form__status feedback-form__status--error">
                Oops! Something went wrong. Please try again later.
              </p>
            )}

            <Button
              type="submit"
              disabled={!formData.email || !formData.message || isSubmitting}
              loading={isSubmitting}
              loadingText="Sending..."
              variant="primary"
              fullWidth
            >
              Submit Feedback
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default FeedbackForm;
