"use client";

import { FC, useState } from "react";
import { useField } from "formik";
import { Combobox } from "@headlessui/react";
import { countries } from "@/app/data/countries";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";

interface CountrySelectProps {
  name: string;
  label?: string;
}

const CountrySelect: FC<CountrySelectProps> = ({ name, label }) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue, setTouched } = helpers;
  const [query, setQuery] = useState("");
  const showError = meta.touched && meta.error;

  const filteredCountries = !query?.trim()
    ? countries
    : countries.filter((c) =>
        c.name.toLowerCase().includes(query.toLowerCase())
      );

  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium mb-1 text-gray-700">
          {label} {<span className="text-red-500">*</span>}
        </label>
      )}
      <Combobox value={value} onChange={(val) => setQuery(val)}>
        <div className="relative">
          <Combobox.Input
            className="w-full border border-gray-300 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            displayValue={(val: string) => val}
            onChange={(event) => setQuery(event.target.value)}
            onBlur={() => setTouched(true)}
            placeholder="Select a country..."
          />
          <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </Combobox.Button>

          {filteredCountries.length > 0 && (
            <Combobox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto rounded-md bg-white border border-gray-200 shadow-lg">
              {filteredCountries.map((country) => (
                <Combobox.Option
                  key={country.code}
                  value={country.name}
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? "bg-blue-100 text-blue-900" : "text-gray-900"
                    }`
                  }
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                      >
                        {country.name}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 right-4 flex items-center text-blue-600">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          )}
        </div>
      </Combobox>
      {showError && <p className="text-sm text-red-500 mt-1">{meta.error}</p>}
    </div>
  );
};

export default CountrySelect;
