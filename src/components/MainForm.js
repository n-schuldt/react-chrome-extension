import React from "react";
import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const PromptSchema = Yup.object().shape({
  additional: Yup.string().max(200, "Too Long!"),
});

function MainForm(props) {
  const { info, generateMessage, pageElements, isGenerating } = props;
  console.log("INFO other mainform", info.other);
  return (
    <>
      <Formik
        initialValues={{
          language: "English",
          template: "main",
          additional: "",
          maxChars: false,
        }}
        validationSchema={PromptSchema}
        onSubmit={async (values) => {
          console.log("SUBMITTING");
          if (values.template === "main") {
            values.template = info.other || "connect";
          }
          generateMessage(values, info, pageElements);
        }} // MAIN ACTION
      >
        {({ errors, touched }) => (
          <Form className=" p-5 rounded-lg">
            <div class="w-full px-3 mb-6">
              <p class="text-gray-500 text-xs italic">
                Fill out all of the fields in{" "}
                <span className="font-semibold">English</span> , the message
                will be in the language you choose.
              </p>
              <label
                class="block uppercase tracking-wide text-blue-600 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Message Language
              </label>
              <div class="relative w-full">
                <Field
                  as="select"
                  name="language"
                  className=" ml-4 block w-full border-2 border-gray-300 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded py-3 px-5 mb-3 leading-tight"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </Field>
              </div>
            </div>
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-blue-600 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Message template
              </label>
              <div class="relative w-full flex items-center">
                <Field
                  as="select"
                  name="template"
                  className="ml-4 block w-full border-2 border-gray-300 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded py-3 px-5 mb-3 leading-tight"
                >
                  <option value="main">Main</option>
                  <option value="connect">Connection</option>
                </Field>
              </div>
            </div>
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-blue-600 text-xs font-bold pb-2"
                for="grid-first-name"
              >
                Anything to add?
              </label>
              <Field
                name="additional"
                as="textarea"
                placeholder="We went to the same school, we met at..."
                className="appearance-none border-none block w-full focus:border-blue-500 bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded py-3 px-4 mb-3 leading-tight"
              />
              <div className="text-blue-500 text-xs italic">
                {errors.additional}
              </div>
            </div>
            <div class="w-full flex items-center px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-blue-600 text-xs font-bold pb-2 mr-2"
                for="grid-first-name"
              >
                Max 300 characters?
              </label>
              <Field
                type="checkbox"
                name="maxChars"
                className="block bg-gray-800 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700"
              />
              <div className="text-blue-500 text-xs italic">
                {errors.additional}
              </div>
            </div>

            <div className="prompt-buttons px-4 pb-5">
              <button
                type="submit"
                className={
                  isGenerating
                    ? "generate-button appearance-none border-non loading bg-gray-300 "
                    : " appearance-none border-none generate-button"
                }
              >
                <div className="generate appearance-none border-none">
                  {isGenerating ? (
                    <span className="loader"></span>
                  ) : (
                    <p className="poppins">Generate</p>
                  )}
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default MainForm;
