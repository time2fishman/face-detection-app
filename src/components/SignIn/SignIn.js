import React, { useState } from 'react';

const SignIn = ({ onRouteChange }) => {
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')

  const onEmailChange = (event) => {
    setEmailInput(event.target.value)
  }

  const onPasswordChange = (event) => {
    setPasswordInput(event.target.value)
  }

  const onSubmitSignIn = () => {
    // console.log({ emailInput, passwordInput });
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data === 'success') {
          onRouteChange('home')
        }
      })
  }

  return (
    <article className="br3 ba b--black-20 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="b f2 fw6 ph0 mh0">Sign In</legend>
            <div className="mt3">
              <label className="b db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                onChange={onEmailChange}
                className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="b db fw6 lh-copy f6" htmlFor="password">Password</label>
              <input
                onChange={onPasswordChange}
                className="pa2 input-reset ba b--black bg-transparent hover-bg-black hover-white w-100"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </fieldset>
          <div className="">
            <input onClick={onSubmitSignIn} className="b br3 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" />
          </div>
          <div className="lh-copy mt3">
            <p onClick={onSubmitSignIn} className="fw5 f6 link dim black db pointer">Register</p>
          </div>
        </div>
      </main>
    </article>

  );
};

export default SignIn;