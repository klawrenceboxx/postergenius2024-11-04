"use client";

import { FC } from "react";
import { Formik, Form } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import ShippingInput from "@/components/inputs/ShippingInput";
import CountrySelect from "@/components/selects/SingularSelect"; // country select component
import { IUser } from "@/models/Users";
import { ICart } from "@/models/Cart";

const shippingSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  address1: z.string().min(5, "Required"),
  address2: z.string().optional(),
  city: z.string().min(2, "Required"),
  zipCode: z.string().min(2, "Required"),
  state: z.string().min(2, "Required"),
  country: z.string().min(2, "Required"),
});

export interface ShippingValues {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  zipCode: string;
  state: string;
  country: string;
}

export interface ShippingSectionProps {
  user: IUser | null;
  cart: ICart;
}

const ShippingSection: FC<ShippingSectionProps> = ({ user }) => {
  return (
    <Formik
      initialValues={{
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        zipCode: "",
        state: "",
        country: "Canada",
      }}
      validationSchema={toFormikValidationSchema(shippingSchema)}
      onSubmit={async (values, { setSubmitting, setErrors }) => {
        try {
          const res = await fetch("/api/user/save-address", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          const data = await res.json();
          if (!res.ok) {
            setErrors({ city: data.error || "Could not save address." });
          } else {
          }
        } catch (err) {
          setErrors({ city: "Network error" });
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ values, errors, touched, handleChange, handleBlur }) => (
        <Form className="space-y-6 w-full max-w-xl">
          <ShippingInput name="firstName" label="First name" />
          <ShippingInput name="lastName" label="Last name" />
          <ShippingInput name="address1" label="Address line 1" />
          <ShippingInput name="address2" label="Address line 2" />

          <div className="grid grid-cols-2 gap-4">
            <ShippingInput name="zipCode" label="Postal code" />
            <ShippingInput name="city" label="City" />
          </div>

          <ShippingInput name="state" label="State / Province" />
          <CountrySelect name="country" label="Country" />

          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded hover:bg-blue-700 transition"
          >
            Save address & continue
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ShippingSection;
