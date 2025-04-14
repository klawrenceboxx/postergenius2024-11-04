import React from "react";
import { useField, ErrorMessage } from "formik";

function ShippingInput() {
  const [field, meta] = useField("shipping");
  return (
    <div>
      shippingInput
      <input {...field} placeholder="Shipping" />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
      <ErrorMessage name="shipping" component="div" className="error" />
    </div>
  );
}

export default ShippingInput;
