import * as Yup from 'yup';
import i18n from 'i18next';

export const validationRegisterSchema = Yup.object().shape({
  fullName: Yup.string().required('Name is required'),
  email: Yup.string().email('Please enter valid email').required(i18n.t('validation.required')),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  confirmPassword: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required('Password is required'),
  term: Yup.boolean().oneOf([true]).required('Kvkk text confirm required'),
});

export const validationLoginSchema = Yup.object().shape({
  email: Yup.string().email('Please enter valid email').required(i18n.t('validation.required')).label('Email'),
  password: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required(i18n.t('validation.required')),
});

export const validationForgotPassSchema = Yup.object().shape({
  email: Yup.string().email('Please enter valid email').required(i18n.t('validation.required')).label('Email'),
});

export const validationResetPasswordSchema = Yup.object().shape({
  oldPassword: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required(i18n.t('validation.required')),
  newPassword: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required(i18n.t('validation.required')),
  newConfirmPassword: Yup.string()
    .matches(/\w*[a-z]\w*/, 'Password must have a small letter')
    .matches(/\w*[A-Z]\w*/, 'Password must have a capital letter')
    .matches(/\d/, 'Password must have a number')
    .min(8, ({ min }) => `Password must be at least ${min} characters`)
    .required(i18n.t('validation.required')),
});
