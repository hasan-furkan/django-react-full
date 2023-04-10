import * as React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { validationRegisterSchema } from '../../utils/auth/formValidate';
import { errorToastMessage, succesToastMessage, warningToastMessage } from '../../components/toasts';
import HtmlHead from '../../components/html-head/HtmlHead';
import registerBg from '../../assets/images/auth/registerBg.jpg';
import LanguageCountry from '../../components/languageCountry';
import SvgIcons from '../../svg-icons/SvgIcons';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationRegisterSchema),
  });
  const onSubmit = (data, e) => {
    e.preventDefault();
    if (data) {
      if (data.password === data.confirmPassword) {
        succesToastMessage('basarili');
      } else {
        warningToastMessage('password not match');
      }
    } else {
      errorToastMessage('basarisiz');
    }
  };

  const title = 'Register Page';
  const description = 'Register Page';

  return (
    <>
      <HtmlHead title={title} description={description} />
      <section className="bg-light-300 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-black-500">Register</h2>
            <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
            <div className="mt-3 flex justify-center gap-4 mb-2">
              <LanguageCountry />
            </div>
            <form action className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="p-2  rounded-xl border"
                type="text"
                name="fullName"
                placeholder="Full Name"
                {...register('fullName', { required: true })}
              />
              {errors.fullName && <span className="text-red-500 ">{errors.fullName?.message}</span>}
              <input
                className="p-2  rounded-xl border"
                type="email"
                name="email"
                placeholder="Email"
                {...register('email', { required: true })}
              />
              {errors.email && <span className="text-red-500 ">{errors.email?.message}</span>}
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
              {errors.password && <span className="text-red-500 ">{errors.password?.message}</span>}
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  {...register('confirmPassword', { required: true })}
                />
                <div
                  role="presentation"
                  className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                  onClick={handleClickShowPassword}
                >
                  <SvgIcons width={20} height={17} icon={`${showPassword ? 'lockOn' : 'lockOff'}`} />
                </div>
              </div>
              {errors.password && <span className="text-red-500 ">{errors.password?.message}</span>}
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-indigo-600"
                  name="term"
                  // checked={checked}
                  // onChange={onChange}
                  {...register('term', { required: true })}
                />
                <span className="text-gray-900">Term of success</span>
              </label>
              {errors.term && <span className="text-red-500 ">{errors.term?.message}</span>}
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="bg-purple-400 rounded-xl text-light-500 py-2 hover:scale-105 duration-300">
                Register
              </button>
            </form>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p>Go to Login</p>
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="py-2 px-5 bg-light-300 border rounded-xl hover:scale-110 duration-300">
                <Link to="/login">Login</Link>
              </button>
            </div>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={registerBg} alt="deneme" />
          </div>
        </div>
      </section>
    </>
  );
}
