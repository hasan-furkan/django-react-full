import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { validationLoginSchema } from '../../utils/auth/formValidate';
import { errorToastMessage, succesToastMessage } from '../../components/toasts';
import HtmlHead from '../../components/html-head/HtmlHead';
import { setUser } from '../../redux/components/auth';
import SvgIcons from '../../svg-icons/SvgIcons';
import LanguageCountry from '../../components/languageCountry';
import loginBg from '../../assets/images/auth/loginBg.jpg';

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(validationLoginSchema),
  });
  const onSubmit = (data) => {
    if (data) {
      succesToastMessage('basarili');
      dispatch(
        setUser({
          email: data.email,
        }),
      );
      localStorage.setItem('user', JSON.stringify(data.email));
      navigate('/dashboard');
    } else {
      errorToastMessage('basarisiz');
    }
  };

  const title = 'Login Page';
  const description = 'Login Page';
  const theme = useSelector((state) => state.theme.theme);
  console.log(theme);

  return (
    <>
      <HtmlHead title={title} description={description} />
      <section
        className={`${
          theme === 'dark'
            ? 'bg-black-300 min-h-screen flex items-center justify-center'
            : 'bg-grey-200 min-h-screen flex items-center justify-center'
        }`}
      >
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-6">
            <h2 className="font-bold text-2xl text-black-500">Login</h2>
            <p className="text-xs mt-4 text-[#002D74]">If you are already a member, easily log in</p>
            <div className="mt-3 flex justify-center gap-4 mb-2">
              <LanguageCountry />
            </div>
            <form action className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
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
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="bg-purple-400 rounded-xl text-light-500 py-2 hover:scale-105 duration-300">
                Login
              </button>
            </form>
            <div className="mt-1 text-xs border-b border-[#002D74] py-4 text-[#002D74]">
              <Link to="/forgot-password">Forgot your password?</Link>
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p>Don't have an account?</p>
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="py-2 px-5 bg-light-300 border rounded-xl hover:scale-110 duration-300">
                <Link to="/register">Register</Link>
              </button>
            </div>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={loginBg} alt="deneme" />
          </div>
        </div>
      </section>
    </>
  );
}
