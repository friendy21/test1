"use client";

import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/common/Button/Button';
import styles from './DemoRequestForm.module.css';

type FormValues = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  companyName: string;
  jobTitle: string;
  companySize: string;
  industry: string;
  otherIndustry?: string;
  interestAreas: string[];
  otherInterestArea?: string;
  challenges: string;
  timeline: string;
  source: string;
  otherSource?: string;
  agreedToPrivacy: boolean;
};

const validationSchema = Yup.object({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .test('is-business', 'Please use a business email', (value) => {
      if (!value) return false;
      const freeDomains = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com'];
      const domain = value.split('@')[1];
      return !freeDomains.includes(domain);
    }),
  companyName: Yup.string().required('Company name is required'),
  jobTitle: Yup.string().required('Job title is required'),
  companySize: Yup.string().required('Company size is required'),
  industry: Yup.string().required('Industry is required'),
  otherIndustry: Yup.string().when('industry', {
    is: 'Other',
    then: (schema) => schema.required('Please specify your industry'),
  }),
  interestAreas: Yup.array().min(1, 'Please select at least one area of interest'),
  timeline: Yup.string().required('Implementation timeline is required'),
  agreedToPrivacy: Yup.boolean().oneOf([true], 'You must agree to the privacy policy'),
});

const DemoRequestForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const initialValues: FormValues = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyName: '',
    jobTitle: '',
    companySize: '',
    industry: '',
    otherIndustry: '',
    interestAreas: [],
    otherInterestArea: '',
    challenges: '',
    timeline: '',
    source: '',
    otherSource: '',
    agreedToPrivacy: false,
  };
  
  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      // In a real implementation, you would send this data to your API
      console.log('Form values:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      resetForm();
      setIsSubmitted(true);
      
      // Scroll to top of form
      window.scrollTo({
        top: document.getElementById('demo-form')?.offsetTop,
        behavior: 'smooth',
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (isSubmitted) {
    return (
      <div className={styles.formContainer} id="demo-form">
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <h2>Thank you for your interest in Glynac!</h2>
          <p>A member of our team will contact you within one business day to schedule your personalized demo.</p>
          <Button 
            variant="primary" 
            onClick={() => setIsSubmitted(false)}
            className={styles.resetButton}
          >
            Submit another request
          </Button>
        </div>
      </div>
    );
  }
  
  return (
    <div className={styles.formContainer} id="demo-form">
      <h2 className={styles.formTitle}>Request a Personalized Demo</h2>
      <p className={styles.formIntro}>
        Our team will tailor a demonstration to your organization&apos; specific challenges and goals. Complete the form below to get started.
      </p>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, isSubmitting, errors, touched }) => (
          <Form className={styles.form}>
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Basic Information</legend>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="firstName" className={styles.label}>First Name *</label>
                  <Field 
                    type="text" 
                    id="firstName" 
                    name="firstName" 
                    className={`${styles.input} ${errors.firstName && touched.firstName ? styles.inputError : ''}`} 
                  />
                  <ErrorMessage name="firstName" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="lastName" className={styles.label}>Last Name *</label>
                  <Field 
                    type="text" 
                    id="lastName" 
                    name="lastName" 
                    className={`${styles.input} ${errors.lastName && touched.lastName ? styles.inputError : ''}`} 
                  />
                  <ErrorMessage name="lastName" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email" className={styles.label}>Business Email *</label>
                  <Field 
                    type="email" 
                    id="email" 
                    name="email" 
                    className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`} 
                  />
                  <ErrorMessage name="email" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="phone" className={styles.label}>Phone Number</label>
                  <Field 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    className={styles.input} 
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="companyName" className={styles.label}>Company Name *</label>
                  <Field 
                    type="text" 
                    id="companyName" 
                    name="companyName" 
                    className={`${styles.input} ${errors.companyName && touched.companyName ? styles.inputError : ''}`} 
                  />
                  <ErrorMessage name="companyName" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="jobTitle" className={styles.label}>Job Title *</label>
                  <Field 
                    type="text" 
                    id="jobTitle" 
                    name="jobTitle" 
                    className={`${styles.input} ${errors.jobTitle && touched.jobTitle ? styles.inputError : ''}`} 
                  />
                  <ErrorMessage name="jobTitle" component="div" className={styles.errorMessage} />
                </div>
              </div>
            </fieldset>
            
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Organization Details</legend>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label htmlFor="companySize" className={styles.label}>Company Size *</label>
                  <Field 
                    as="select" 
                    id="companySize" 
                    name="companySize" 
                    className={`${styles.select} ${errors.companySize && touched.companySize ? styles.inputError : ''}`} 
                  >
                    <option value="">Select company size</option>
                    <option value="50-200">50-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501-1000">501-1,000 employees</option>
                    <option value="1001-5000">1,001-5,000 employees</option>
                    <option value="5000+">5,000+ employees</option>
                  </Field>
                  <ErrorMessage name="companySize" component="div" className={styles.errorMessage} />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="industry" className={styles.label}>Industry *</label>
                  <Field 
                    as="select" 
                    id="industry" 
                    name="industry" 
                    className={`${styles.select} ${errors.industry && touched.industry ? styles.inputError : ''}`} 
                  >
                    <option value="">Select industry</option>
                    <option value="Technology">Technology</option>
                    <option value="Financial Services">Financial Services</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Professional Services">Professional Services</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Retail">Retail</option>
                    <option value="Education">Education</option>
                    <option value="Government">Government</option>
                    <option value="Non-profit">Non-profit</option>
                    <option value="Other">Other</option>
                  </Field>
                  <ErrorMessage name="industry" component="div" className={styles.errorMessage} />
                </div>
                
                {values.industry === 'Other' && (
                  <div className={styles.formGroup}>
                    <label htmlFor="otherIndustry" className={styles.label}>Please specify industry *</label>
                    <Field 
                      type="text" 
                      id="otherIndustry" 
                      name="otherIndustry" 
                      className={`${styles.input} ${errors.otherIndustry && touched.otherIndustry ? styles.inputError : ''}`} 
                    />
                    <ErrorMessage name="otherIndustry" component="div" className={styles.errorMessage} />
                  </div>
                )}
              </div>
            </fieldset>
            
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Interest Areas</legend>
              
              <div className={styles.checkboxGrid}>
                <div className={styles.checkboxGroup}>
                  <Field 
                    type="checkbox" 
                    id="interest-retention" 
                    name="interestAreas" 
                    value="retention" 
                    className={styles.checkbox} 
                  />
                  <label htmlFor="interest-retention" className={styles.checkboxLabel}>
                    Employee retention and turnover reduction
                  </label>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <Field 
                    type="checkbox" 
                    id="interest-burnout" 
                    name="interestAreas" 
                    value="burnout" 
                    className={styles.checkbox} 
                  />
                  <label htmlFor="interest-burnout" className={styles.checkboxLabel}>
                    Burnout prevention and wellbeing
                  </label>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <Field 
                    type="checkbox" 
                    id="interest-performance" 
                    name="interestAreas" 
                    value="performance" 
                    className={styles.checkbox} 
                  />
                  <label htmlFor="interest-performance" className={styles.checkboxLabel}>
                    Performance optimization
                  </label>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <Field 
                    type="checkbox" 
                    id="interest-risk" 
                    name="interestAreas" 
                    value="risk" 
                    className={styles.checkbox} 
                  />
                  <label htmlFor="interest-risk" className={styles.checkboxLabel}>
                    Risk detection and management
                  </label>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <Field 
                    type="checkbox" 
                    id="interest-meetings" 
                    name="interestAreas" 
                    value="meetings" 
                    className={styles.checkbox} 
                  />
                  <label htmlFor="interest-meetings" className={styles.checkboxLabel}>
                    Calendar and meeting efficiency
                  </label>
                </div>
                
                <div className={styles.checkboxGroup}>
                  <Field 
                    type="checkbox" 
                    id="interest-other" 
                    name="interestAreas" 
                    value="other" 
                    className={styles.checkbox} 
                  />
                  <label htmlFor="interest-other" className={styles.checkboxLabel}>
                    Other
                  </label>
                </div>
                
                {values.interestAreas.includes('other') && (
                  <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}>
                    <label htmlFor="otherInterestArea" className={styles.label}>Please specify other interest area</label>
                    <Field 
                      type="text" 
                      id="otherInterestArea" 
                      name="otherInterestArea" 
                      className={styles.input} 
                    />
                  </div>
                )}
                
                <ErrorMessage name="interestAreas" component="div" className={styles.errorMessage} />
              </div>
            </fieldset>
            
            <fieldset className={styles.fieldset}>
              <legend className={styles.legend}>Additional Information</legend>
              
              <div className={styles.formGroup}>
                <label htmlFor="challenges" className={styles.label}>
                  Current Challenges
                  <span className={styles.helpText}>Briefly describe the workplace challenges you&apos;re looking to address.</span>
                </label>
                <Field 
                  as="textarea" 
                  id="challenges" 
                  name="challenges" 
                  rows={4}
                  className={styles.textarea} 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="timeline" className={styles.label}>Implementation Timeline *</label>
                <Field 
                  as="select" 
                  id="timeline" 
                  name="timeline" 
                  className={`${styles.select} ${errors.timeline && touched.timeline ? styles.inputError : ''}`} 
                >
                  <option value="">Select timeline</option>
                  <option value="Immediately">Immediately</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6+ months">6+ months</option>
                  <option value="Just exploring">Just exploring options</option>
                </Field>
                <ErrorMessage name="timeline" component="div" className={styles.errorMessage} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="source" className={styles.label}>How did you hear about us?</label>
                <Field 
                  as="select" 
                  id="source" 
                  name="source" 
                  className={styles.select} 
                >
                  <option value="">Select an option</option>
                  <option value="Search Engine">Search Engine</option>
                  <option value="Social Media">Social Media</option>
                  <option value="Referral">Referral</option>
                  <option value="Industry Event">Industry Event</option>
                  <option value="Publication/Article">Publication/Article</option>
                  <option value="Other">Other</option>
                </Field>
              </div>
              
              {values.source === 'Other' && (
                <div className={styles.formGroup}>
                  <label htmlFor="otherSource" className={styles.label}>Please specify how you heard about us</label>
                  <Field 
                    type="text" 
                    id="otherSource" 
                    name="otherSource" 
                    className={styles.input} 
                  />
                </div>
              )}
            </fieldset>
            
            <div className={styles.privacyGroup}>
              <Field 
                type="checkbox" 
                id="agreedToPrivacy" 
                name="agreedToPrivacy" 
                className={`${styles.checkbox} ${errors.agreedToPrivacy && touched.agreedToPrivacy ? styles.checkboxError : ''}`} 
              />
              <label htmlFor="agreedToPrivacy" className={styles.privacyLabel}>
                By submitting this form, you agree to our <a href="/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>. We respect your privacy and will only use your information to respond to your request and provide relevant updates.
              </label>
              <ErrorMessage name="agreedToPrivacy" component="div" className={styles.errorMessage} />
            </div>
            
            <div className={styles.submitContainer}>
              <Button 
                type="submit" 
                variant="primary" 
                size="large" 
                disabled={isSubmitting}
                className={styles.submitButton}
              >
                {isSubmitting ? 'Submitting...' : 'Request Your Demo'}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default DemoRequestForm;