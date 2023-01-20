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
  const [isGenerating, setIsGenerating] = useState(false);
  const [apiOutput, setApiOutput] = useState("");

  const { saveInfo, info } = props;

  const callGenerateEndpoint = async (values) => {
    setIsGenerating(true);
    console.log("UI", JSON.stringify({ values }));
    console.log("Calling OpenAI...");
    // const response = {};

    setApiOutput(`${"TEST RESPONSE"}`);
    setIsGenerating(false);
  };
  return (
    <>
      <Formik
        initialValues={{
          language: info.language || "English",
          sender: info.sender || "",
          other: info.other || "",
        }}
        validationSchema={PromptSchema}
        onSubmit={async (values) => {
          saveInfo(values);
        }}
      >
        {({ errors, touched }) => (
          <Form className="bg-white opacity-75 p-5 rounded-lg shadow-lg">
            {/* <Field
              type="checkbox"
              name="toggle"
              className="block w-full bg-gray-800 text-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-gray-700"
            /> */}
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-600 dark:text-gray-400 text-xs font-bold mb-2"
                for="grid-first-name"
              >
                Message Language
              </label>
              <div class="relative w-full">
                <Field
                  as="select"
                  name="language"
                  className="block w-full border-2 border-gray-300 bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200 rounded py-3 px-5 mb-3 leading-tight"
                >
                  <option value="English">English</option>
                  <option value="Spanish">Spanish</option>
                  <option value="French">French</option>
                </Field>
              </div>
              <p class="text-gray-400 text-xs italic">
                Fill out all of the fields in{" "}
                <span className="font-semibold">English</span> , the message
                will be in the language you choose.
              </p>
            </div>
            <div class="w-full px-3 mb-6">
              <label
                class="block uppercase tracking-wide text-gray-600 dark:text-gray-400 text-xs font-bold pb-2"
                for="grid-first-name"
              >
                I am...
              </label>
              <Field
                name="sender"
                type="textarea"
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
                class="block uppercase tracking-wide text-gray-600 dark:text-gray-400 text-xs font-bold pb-2"
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
                className={
                  isGenerating
                    ? "generate-button appearance-none border-non loading bg-blue-500 "
                    : "bg-blue-500 hover:bg-blue-400 appearance-none border-non generate-button"
                }
              >
                <div className="generate appearance-none border-none">
                  {isGenerating ? (
                    <span className="loader"></span>
                  ) : (
                    <p>Save</p>
                  )}
                </div>
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {apiOutput && (
        <div className="output pt-5 pb-20">
          <div className="output-header-container text-white font-bold uppercase text-3xl tracking-tighter underline decoration-blue-500 underline-offset-4">
            <div className="output-header pb-3">
              <h3 className="text-black dark:text-gray-200">Output</h3>
            </div>
          </div>
          <div className=" shadow-lg rounded-xl bg-gray-200 mx-3 opacity-70">
            <div className=" dark:text-gray-200 dark:bg-slate-900 px-10 pt-5 align-center opacity-90 p-3">
              <p className="whitespace-pre-wrap">{apiOutput.trim()}</p>
            </div>
            <div className="flex rounded-b-xl justify-between w-full bg-blue-700 opacity-90 p-5">
              <p class="text-gray-100 text-sm italic self-start">
                Not what you were expecting? Try again and change the wording a
                bit! <br /> The same imput can lead to very different outputs.
              </p>
              <div className="opacity-100">
                <Copy copyText={apiOutput.trim()} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PromptForm;
