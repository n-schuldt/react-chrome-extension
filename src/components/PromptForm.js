import React from "react";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import Copy from "./Copy";
import * as Yup from "yup";

const PromptSchema = Yup.object().shape({
  sender: Yup.string()
    .min(2, "Too Short!")
    .max(120, "Too Long!")
    .matches("^[^.]*$", "Don't Include periods")
    .required("Required"),
  other: Yup.string().max(200, "Too Long!"),
});

function PromptForm(props) {
  const { saveInfo, info } = props;

  return (
    <>
      <div className="text-center m-4 p-3 bg-gray-200 rounded-md">
        <h1 className="text-xl font-bold text-blue-600">
          Tell us about yourself
        </h1>
        <p className="text-gray-600 text-xs italic">
          This will be used to generate the messages, you can change it later.{" "}
          <br /> All the information you enter will only be stored locally on
          your browser.
        </p>
      </div>
      <Formik
        initialValues={{
          sender: info.sender || "",
          other: info.other || "",
        }}
        validationSchema={PromptSchema}
        onSubmit={async (values) => {
          saveInfo(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-white opacity-75 p-5 rounded-lg">
            {/* <Field
              type="checkbox"
              name="toggle"
              className="block w-full bg-gray-800 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700"
            /> */}
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-blue-600 dark:text-gray-400 text-xs font-bold pb-2"
                for="grid-first-name"
              >
                I am...
              </label>
              <Field
                name="sender"
                as="textarea"
                placeholder="Nicolas, Full-Stack developer living in Paris..."
                className="appearance-none border-none block w-full focus:border-blue-500 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded py-3 px-4 mb-3 leading-tight"
              />
              {errors.sender && touched.sender ? (
                <div className="text-blue-500 text-xs italic">
                  {errors.sender}
                </div>
              ) : null}
            </div>
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-blue-600 dark:text-gray-400 text-xs font-bold pb-2"
                for="grid-first-name"
              >
                I want to...
              </label>
              <Field
                name="other"
                as="textarea"
                placeholder="Connect, ask for a call, recruit for X job..."
                className="appearance-none border-none block w-full focus:border-blue-500 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded py-3 px-4 mb-3 leading-tight"
              />
              <div className="text-blue-500 text-xs italic">{errors.other}</div>
              <p class="text-gray-400 text-xs italic">
                Give as many details as you want. The more details you give, the
                better the message will be.
              </p>
            </div>
            <div className="prompt-buttons px-4 pb-5">
              <button
                type="submit"
                className="generate-button appearance-none border-non loading "
              >
                <div className="generate appearance-none border-none">
                  <p className="poppins ">Save</p>
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default PromptForm;
