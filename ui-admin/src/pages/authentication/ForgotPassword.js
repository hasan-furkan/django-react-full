import * as React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { validationLoginSchema } from '../../utils/auth/formValidate';
import { errorToastMessage, succesToastMessage } from '../../components/toasts';
import HtmlHead from '../../components/html-head/HtmlHead';
import LanguageCountry from '../../components/languageCountry';
import loginBg from '../../assets/images/auth/loginBg.jpg';

export default function ForgotPassword() {
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
    } else {
      errorToastMessage('basarisiz');
    }
  };

  const title = 'Login Page';
  const description = 'Login Page';

  return (
    <>
      <HtmlHead title={title} description={description} />
      <section className="bg-grey-300 min-h-screen flex items-center justify-center">
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
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="bg-purple-400 rounded-xl text-light-500 py-2 hover:scale-105 duration-300">
                Submit
              </button>
            </form>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              <p>Have account?</p>
              {/* eslint-disable-next-line react/button-has-type */}
              <button className="py-2 px-5 bg-light-300 border rounded-xl hover:scale-110 duration-300">
                <Link to="/login">Login</Link>
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
