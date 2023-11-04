import { useRef, useState } from "react";

import "./App.css";
import Greetings from "./components/Greetings";
import { Form } from "./components/Form";
import Input from "./components/Input";
export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [messages, setMessages] = useState({
    form: false,
    email: false,
    password: false,
    confirmPassword: false,
  });
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const formRef = useRef(null);

  const validateEmail = (email) => {
    // Regular expression for a valid email address
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  // create a function to validate the input
  const validateInput = (input) => {
    // set a validation statement to each input, returning true or false
    // if statements could be replaced by a switch case
    if (input.value.length < 3) {
      return false;
    }
    if (
      (input.type === "checkbox" || input.type === "radio") &&
      !input.checked
    ) {
      return false;
    }
    if (input.name === "password") {
      const isValidPassword = input.value.length >= 6;
      setMessages((prevStates) => ({
        ...prevStates,
        password: !isValidPassword,
      }));
      return isValidPassword;
    }
    // by default, return true
    return true;
  };

  // then create a function that will apply the validade input function to all inputs inside the form
  // this function will return true or false
  const checkAllInputsValuesOnChange = () => {
    const form = formRef.current;
    const inputs = form.querySelectorAll("input");
    // for-of loop could be replaced by a forEach()
    for (const input of inputs) {
      if (!validateInput(input)) {
        return false;
      }
    }
    return true;
  };

  // when the form changes, call the function to check all inputs
  const handleFormOnChange = () => {
    const areInputsValid = checkAllInputsValuesOnChange();
    // pass the result of the function as param to enable the button
    setIsButtonEnabled(areInputsValid);
  };

  // when submit, run the last validations and set errors
  const handleFormOnSubmit = (e) => {
    e.preventDefault();

    const form = formRef.current;
    const inputs = form.querySelectorAll("input");
    let areAllInputsValid = true;
    // iterate all input again
    for (const input of inputs) {
      // set the validations for this stage
      if (input.value.length === 0) {
        setMessages((prevStates) => ({
          ...prevStates,
          form: true,
        }));
        areAllInputsValid = false;
      }

      if (input.name === "email") {
        const isValidEmail = validateEmail(input.value);
        if (!isValidEmail) {
          setMessages((prevStates) => ({
            ...prevStates,
            email: !isValidEmail,
          }));
          areAllInputsValid = false;
        }
      }

      if (input.name === "confirmPassword") {
        const inputPassword = document.querySelector("#password");
        const passwordValue = inputPassword.value;
        if (input.value !== passwordValue) {
          setMessages((prevStates) => ({
            ...prevStates,
            confirmPassword: true,
          }));
          areAllInputsValid = false;
        }
      }
    }
    // is everything is ok, then...
    if (areAllInputsValid) {
      console.log(formData);
      setIsFormSubmitted(true);
      // reset button
      setIsButtonEnabled(false);
      // reset messages
      setMessages({
        form: false,
        email: false,
        password: false,
        confirmPassword: false,
      });
      // reset formData
      setFormData({
        name: "",
        surname: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };

  // reset input messages by input's name
  const handleInputMessages = (e) => {
    const { name } = e.target;
    if (!messages[name]) return;

    setMessages((prevStates) => ({
      ...prevStates,
      [name]: false,
    }));
  };

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="App">
      <h1>
        {isFormSubmitted ? "Thanks for joining us!" : "Register new user"}
      </h1>
      {isFormSubmitted ? (
        <Greetings />
      ) : (
        <Form
          isButtonEnabled={isButtonEnabled}
          onChange={handleFormOnChange}
          onSubmit={(e) => handleFormOnSubmit(e)}
          ref={formRef}
        >
          {messages.form && (
            <span className="error--big">All fields must be filled in</span>
          )}
          <div className="container--row">
            <Input
              label="Name"
              type="text"
              id="name"
              value={formData.name}
              placeholder="Ex.: Andre"
              onChange={(e) => handleFormData(e)}
            />
            <Input
              label="Surname"
              type="text"
              id="surname"
              value={formData.surname}
              placeholder="Ex.: Maia"
              onChange={(e) => handleFormData(e)}
            />
          </div>

          <Input
            label="Email"
            type="text"
            id="email"
            value={formData.email}
            placeholder="Ex.: your@email.com"
            onChange={(e) => handleFormData(e)}
            onInput={(e) => handleInputMessages(e)}
          />
          {messages.email && <span className="error">Add a valid email</span>}

          <Input
            label="Password"
            type="password"
            id="password"
            value={formData.password}
            placeholder="Password"
            onChange={(e) => handleFormData(e)}
            onInput={(e) => handleInputMessages(e)}
          />
          {messages.password && (
            <span className="hint">
              Password must be at least 06 characters long
            </span>
          )}

          <Input
            label="Confirm password"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => handleFormData(e)}
            onInput={(e) => handleInputMessages(e)}
          />
          {messages.confirmPassword && (
            <span className="error">Password does not match</span>
          )}
        </Form>
      )}

      <footer>Developed by Jennifer Magpantay</footer>
    </div>
  );
}
