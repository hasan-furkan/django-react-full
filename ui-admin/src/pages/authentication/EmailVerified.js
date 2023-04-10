import * as React from 'react';
import { Link } from 'react-router-dom';
import HtmlHead from '../../components/html-head/HtmlHead';
import emailverified from '../../assets/images/auth/emailverified.jpg';

export default function EmailVerified() {
  const title = 'Email Verification';
  const description = 'Email Verification';

  return (
    <>
      <HtmlHead title={title} description={description} />
      <section className="bg-grey-400 dark:bg-black-300 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 dark:bg-black-300 flex flex-col rounded-2xl shadow-lg max-w-2xl p-5 items-center">
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src={emailverified} alt="deneme" />
          </div>
          <div className="md:w-1/2 px-8 md:px-6">
            <h2 className="font-bold text-2xl text-black-500 mt-2">Email Verified</h2>
            <div className=" text-xs py-2 text-purple-500 btn">
              <Link to="/login">Go to login</Link>
            </div>
          </div>
          {/* image */}
        </div>
      </section>
    </>
  );
}
