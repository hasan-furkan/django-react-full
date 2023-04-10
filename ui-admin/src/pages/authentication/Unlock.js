import * as React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { validationResetPasswordSchema } from '../../utils/auth/formValidate';
import { errorToastMessage, succesToastMessage } from '../../components/toasts';
import HtmlHead from '../../components/html-head/HtmlHead';
import SvgIcons from '../../svg-icons/SvgIcons';
import LanguageCountry from '../../components/languageCountry';
import unlockaccount from '../../assets/images/auth/unlock-account.jpg';

export default function Unlock() {
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
    } else {
      errorToastMessage('basarisiz');
    }
  };

  const title = 'Unlock Account';
  const description = 'Unlock Account';

  return (
    <>
      <HtmlHead title={title} description={description} />
      <section className="bg-grey-400 dark:bg-black-300 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 dark:bg-black-300 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-6">
            <h2 className="font-bold text-2xl text-black-500">Unlock Account</h2>
            <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
            <div className="mt-3 flex justify-center gap-4 mb-2">
              <LanguageCountry />
            </div>
            <form action className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  {...register('password', { required: true })}
                />
                <div
                  role="presentation"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={handleClickShowPassword}
                >
                  <SvgIcons width={20} height={17} icon={`${showPassword ? 'lockOn' : 'lockOff'}`} />
                </div>
              </div>
              {errors.oldPassword && <span className="text-red-500 ">{errors.password?.message}</span>}

              {/* eslint-disable-next-line react/button-has-type */}
              <button className="bg-purple-400 rounded-xl text-light-500 py-2 hover:scale-105 duration-300">
                Login
              </button>
            </form>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={unlockaccount} alt="deneme" />
          </div>
        </div>
      </section>
    </>
  );
}
