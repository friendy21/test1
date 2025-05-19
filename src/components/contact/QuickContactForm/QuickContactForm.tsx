"use client";

import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import Button from '@/components/common/Button/Button';
import styles from './QuickContactForm.module.css';

type FormValues = {
  name: string;
  email: string;
  subject: string;
  message: string;
  responsePreference: 'email' | 'phone';
};

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  subject: Yup.string().required('Subject is required'),
  message: Yup.string().required('Message is required'),
  responsePreference: Yup.string().oneOf(['email', 'phone']).required('Please select a response preference'),
});

const QuickContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const initialValues: FormValues = {
    name: '',
    email: '',
    subject: '',
    message: '',
    responsePreference: 'email',
  };
  
  const handleSubmit = async (values: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
    try {
      // In a real implementation, you would send this data to your API
      console.log('Form values:', values);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      resetForm();
      setIsSubmitted(true);
      
      // Reset form state after a while
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <div className={styles.formContainer}>
      <h3 className={styles.formTitle}>Quick Question? We&apos;re Here to Help</h3>
      
      {isSubmitted ? (
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>✓</div>
          <p>Thanks for reaching out! We&apos;ll get back to you shortly.</p>
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Name *</label>
                <Field 
                  type="text" 
                  id="name" 
                  name="name" 
                  className={`${styles.input} ${errors.name && touched.name ? styles.inputError : ''}`} 
                />
                <ErrorMessage name="name" component="div" className={styles.errorMessage} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Email *</label>
                <Field 
                  type="email" 
                  id="email" 
                  name="email" 
                  className={`${styles.input} ${errors.email && touched.email ? styles.inputError : ''}`} 
                />
                <ErrorMessage name="email" component="div" className={styles.errorMessage} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="subject" className={styles.label}>Subject *</label>
                <Field 
                  type="text" 
                  id="subject" 
                  name="subject" 
                  className={`${styles.input} ${errors.subject && touched.subject ? styles.inputError : ''}`} 
                />
                <ErrorMessage name="subject" component="div" className={styles.errorMessage} />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Message *</label>
                <Field 
                  as="textarea" 
                  id="message" 
                  name="message" 
                  rows={4}
                  className={`${styles.textarea} ${errors.message && touched.message ? styles.inputError : ''}`} 
                />
                <ErrorMessage name="message" component="div" className={styles.errorMessage} />
              </div>
              
              <div className={styles.formGroup}>
                <label className={styles.label}>How would you prefer we respond? *</label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioLabel}>
                    <Field type="radio" name="responsePreference" value="email" className={styles.radioInput} />
                    <span>Email</span>
                  </label>
                  <label className={styles.radioLabel}>
                    <Field type="radio" name="responsePreference" value="phone" className={styles.radioInput} />
                    <span>Phone</span>
                  </label>
                </div>
                <ErrorMessage name="responsePreference" component="div" className={styles.errorMessage} />
              </div>
              
              <div className={styles.submitContainer}>
                <Button 
                  type="submit" 
                  variant="secondary" 
                  size="medium" 
                  disabled={isSubmitting}
                  className={styles.submitButton}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default QuickContactForm;