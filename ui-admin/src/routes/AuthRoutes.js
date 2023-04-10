import Login from '../pages/authentication/Login';
import Register from '../pages/authentication/Register';
import ForgotPassword from '../pages/authentication/ForgotPassword';
import ResetPassword from '../pages/authentication/ResetPassword';
import Unlock from '../pages/authentication/Unlock';
import EmailVerification from '../pages/authentication/EmailVerification';
import EmailVerified from '../pages/authentication/EmailVerified';

const authRoutes = [
  { path: `${process.env.PUBLIC_URL}/login`, Component: <Login /> },
  { path: `${process.env.PUBLIC_URL}/register`, Component: <Register /> },
  { path: `${process.env.PUBLIC_URL}/forgot-password`, Component: <ForgotPassword /> },
  { path: `${process.env.PUBLIC_URL}/reset-password`, Component: <ResetPassword /> },
  { path: `${process.env.PUBLIC_URL}/unlock-account`, Component: <Unlock /> },
  { path: `${process.env.PUBLIC_URL}/email-verification`, Component: <EmailVerification /> },
  { path: `${process.env.PUBLIC_URL}/email-verified`, Component: <EmailVerified /> },
];

export default authRoutes;
