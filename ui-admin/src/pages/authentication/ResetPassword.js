import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { validationResetPasswordSchema } from '../../utils/auth/formValidate';
import { errorToastMessage, succesToastMessage } from '../../components/toasts';
import HtmlHead from '../../components/html-head/HtmlHead';
import SvgIcons from '../../svg-icons/SvgIcons';
import LanguageCountry from '../../components/languageCountry';
import resetpassword from '../../assets/images/auth/resetpassword.jpg';

export default function ResetPassword() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationResetPasswordSchema),
  });
  const onSubmit = (data) => {
    if (data) {
      succesToastMessage('basarili');
      navigate('/login');
    } else {
      errorToastMessage('basarisiz');
    }
  };

  const title = 'Reset Password Page';
  const description = 'Reset Password Page';

  return (
    <>
      <HtmlHead title={title} description={description} />
      <section className="bg-grey-400 dark:bg-black-300 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 dark:bg-black-300 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-6">
            <h2 className="font-bold text-2xl text-black-500">Reset Password</h2>
            <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
            <div className="mt-3 flex justify-center gap-4 mb-2">
              <LanguageCountry />
            </div>
            <form action className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? 'text' : 'password'}
                  name="oldPassword"
                  placeholder="Old Password"
                  {...register('oldPassword', { required: true })}
                />
                <div
                  role="presentation"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={handleClickShowPassword}
                >
                  <SvgIcons width={20} height={17} icon={`${showPassword ? 'lockOn' : 'lockOff'}`} />
                </div>
              </div>
              {errors.oldPassword && <span className="text-red-500 ">{errors.oldPassword?.message}</span>}
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? 'text' : 'password'}
                  name="newPassword"
                  placeholder="New Password"
                  {...register('newPassword', { required: true })}
                />
                <div
                  role="presentation"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={handleClickShowPassword}
                >
                  <SvgIcons width={20} height={17} icon={`${showPassword ? 'lockOn' : 'lockOff'}`} />
                </div>
              </div>
              {errors.password && <span className="text-red-500 ">{errors.newPassword?.message}</span>}
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? 'text' : 'password'}
                  name="newConfirmPassword"
                  placeholder="New Confirm Password Password"
                  {...register('newConfirmPassword', { required: true })}
                />
                <div
                  role="presentation"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={handleClickShowPassword}
                >
                  <SvgIcons width={20} height={17} icon={`${showPassword ? 'lockOn' : 'lockOff'}`} />
                </div>
              </div>
              {errors.password && <span className="text-red-500 ">{errors.newConfirmPassword?.message}</span>}
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="bg-purple-400 rounded-xl text-light-500 py-2 hover:scale-105 duration-300">
                Submit
              </button>
            </form>
            <div className="mt-1 text-xs py-4 text-purple-500">
              <Link to="/login">Go to login?</Link>
            </div>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={resetpassword} alt="deneme" />
          </div>
        </div>
      </section>
    </>
  );
}
