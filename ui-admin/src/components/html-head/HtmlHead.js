import { Helmet } from 'react-helmet-async';
import React from 'react';

// eslint-disable-next-line react/prop-types
function HtmlHead({ title, description, children }) {
  return (
    <Helmet>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {children && children}
    </Helmet>
  );
}
export default HtmlHead;
