import { useState } from 'react'
import {useDispatch} from 'react-redux'

// actions from slices
// usersSlice
import {
  setUsersFlag,
} from '../usersSlice'

// sub-users
// UsersSpinner
import UsersSpinner from './UsersSpinner'

// main
// Signup
const Signup = () => {
  // local states
  // username
  const [username,setUsername] = useState('')
  // email
  const [email,setEmail] = useState('')
  // password
  const [password,setPassword] = useState('')
  // password2
  const [password2,setPassword2] = useState('')

  // hooks
  const dispatch = useDispatch()

  // validators
  // usernmae
  const usernameValidator = () => {
    let errorUsername = document.getElementById('signup-username-error')
    const usernamePattern = /^[a-zA-Z]/
    if(!username.trim()){
      errorUsername.textContent = 'username required'
    }else if(username.includes('/') || username.includes(' ') || username.includes('?') || username.includes('.')){
      errorUsername.textContent = 'invalid character'
    }else if(!usernamePattern.test(username)){
      errorUsername.textContent = 'username must start with letter'
    }else {
      errorUsername.textContent = ''
    }
  }

  // email
  const emailValidator = () => {
    let errorEmail = document.getElementById('signup-email-error')
    const emailPattern = /^([a-z\d-\.]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/ 
    if(!email.trim()){
      errorEmail.textContent = 'email address required'
    }else if(!emailPattern.test(email)){
      errorEmail.textContent = 'invalid email address'
    }else {
      errorEmail.textContent = ''
    }
  }

  // password
  const passwordValidator = () => {
    let errorPassword = document.getElementById('signup-password-error')
    let errorPassword2 = document.getElementById('signup-password2-error')
    if(!password){
      errorPassword.textContent = 'password required'
      errorPassword2.textContent = ''
    }else if(password.length < 3){
      errorPassword.textContent = 'too short password'
      errorPassword2.textContent = ''
    }else if(password){
      errorPassword.textContent = ''
      if(password && password2){
        if(password !== password2){
          errorPassword2.textContent = 'passwords not match'
        }else{
          errorPassword2.textContent = ''
        }
      }else {
        errorPassword2.textContent = ''
      }
      errorPassword.textContent = ''
    }
  }

  // password2
  const password2Validator = () => {
    let errorPassword = document.getElementById('signup-password-error')
    let errorPassword2 = document.getElementById('signup-password2-error')
    if(!password2 && password){
      errorPassword2.textContent = 'confirm password'
      errorPassword.textContent = ''
    }else if(!password && password2){
      errorPassword.textContent = 'password required'
      errorPassword2.textContent = ''
    }else if(password && password2){
      errorPassword.textContent = ''
      if(password !== password2){
        errorPassword2.textContent = 'passwords not match'
      }else{
        errorPassword2.textContent = ''
      }
    }
  }

  // submit handler
  const submitHandler = () => {
    let errorUsername = document.getElementById('signup-username-error')
    let errorEmail = document.getElementById('signup-email-error')
    let errorPassword = document.getElementById('signup-password-error')
    let errorPassword2 = document.getElementById('signup-password2-error')
    if(!username.trim() && !email.trim() && !password && !password2){
      errorUsername.textContent = 'username required'
      errorEmail.textContent = 'email address required'
      errorPassword.textContent = 'password required'
      errorPassword2.textContent = 'confirm password'
    }else if(username.trim() && !email.trim() && !password && !password2){
      errorUsername.textContent = ''
      errorEmail.textContent = 'email address required'
      errorPassword.textContent = 'password required'
      errorPassword2.textContent = 'confirm password'
    }else if(username.trim() && email.trim() && !password && !password2){
      errorUsername.textContent = ''
      errorEmail.textContent = ''
      errorPassword.textContent = 'password required'
      errorPassword2.textContent = 'confirm password'
    }else if(username.trim() && email.trim() && password && !password2){
      errorUsername.textContent = ''
      errorEmail.textContent = ''
      errorPassword.textContent = ''
      errorPassword2.textContent = 'confirm password'
    }else if(!username.trim() && email.trim() && !password && !password2){
      errorUsername.textContent = 'username required'
      errorEmail.textContent = ''
      errorPassword.textContent = 'password required'
      errorPassword2.textContent = 'confirm password'
    }else if(!username.trim() && email.trim() && password && !password2){
      errorUsername.textContent = 'username required'
      errorEmail.textContent = ''
      errorPassword.textContent = ''
      errorPassword2.textContent = 'confirm password'
    }else if(!username.trim() && email.trim() && !password && password2){
      errorUsername.textContent = 'username required'
      errorEmail.textContent = ''
      errorPassword.textContent = 'password required'
      errorPassword2.textContent = ''
    }else if(!username.trim() && !email.trim() && password && password2){
      errorUsername.textContent = 'username required'
      errorEmail.textContent = 'email address required'
      errorPassword.textContent = ''
      errorPassword2.textContent = ''
    }else if(!username.trim() && email.trim() && password && password2){
      errorUsername.textContent = 'username required'
      errorEmail.textContent = ''
      errorPassword.textContent = ''
      errorPassword2.textContent = ''
    }else if(username.trim() && !email.trim() && password && password2){
      errorUsername.textContent = ''
      errorEmail.textContent = 'email address required'
      errorPassword.textContent = ''
      errorPassword2.textContent = ''
    }else if(!errorUsername.textContent && !errorEmail.textContent && !errorPassword.textContent && !errorPassword2.textContent){
      console.log('can')
    }else {
      console.log('cant')
    }
    }

    // spinner
    if(!true){
      return <UsersSpinner />
    }

  return (
    <div>
      {/* form */}
      <div className="bg-black bg-opacity-[.13] rounded-sm px-5 py-1 text-xs text-emerald-900 font-serif">
          {/* title */}
          <div className="my-1 flex items-center justify-center text-lg font-bold">
            <span>Signup</span>
          </div>
          {/* input-controll username */}
          <div className="mb-[.65rem]">
            <div className="bg-white rounded-sm px-2 py-[.35rem] flex items-center justify-center">
              <input type="text" name="username" placeholder="username" 
                className="flex-grow focus:outline-none w-[180px] bg-transparent" 
                value={username} 
                onChange={e=>setUsername(e.target.value)} 
                onKeyUp={usernameValidator}
              />
            </div>
            <div className="flex items-center justify-center text-red-700 text-[.75rem]" id="signup-username-error"></div>
          </div>

          {/* input-controll email */}
          <div className="mb-[.65rem]">
            <div className="bg-white rounded-sm px-2 py-[.35rem] flex items-center justify-center">
              <input type="text" name="email" placeholder="email" 
                className="flex-grow focus:outline-none w-[180px] bg-transparent" 
                value={email} 
                onChange={e=>setEmail(e.target.value)} 
                onKeyUp={emailValidator} 
              />
            </div>
            <div className="flex items-center justify-center text-red-700 text-[.75rem]" id="signup-email-error"></div>
          </div>

          {/* input-controll password */}
          <div className="mb-[.65rem]">
            <div className="bg-white rounded-sm px-2 py-[.35rem] flex items-center justify-center">
              <input type="password" name="password" placeholder="password" 
                className="flex-grow focus:outline-none w-[180px] bg-transparent" 
                value={password} 
                onChange={e=>setPassword(e.target.value)} 
                onKeyUp={passwordValidator}
              />
            </div>
            <div className="flex items-center justify-center text-red-700 text-[.75rem]" id="signup-password-error"></div>
          </div>

          {/* input-controll confirm password*/}
          <div className="mb-[.65rem]">
            <div className="bg-white rounded-sm px-2 py-[.35rem] flex items-center justify-center">
              <input type="password" name="password2" placeholder="confirm password" 
                className="flex-grow focus:outline-none w-[180px] bg-transparent" 
                value={password2} 
                onChange={e=>setPassword2(e.target.value)} 
                onKeyUp={password2Validator} 
              />
            </div>
            <div className="flex items-center justify-center text-red-700 text-[.75rem]" id="signup-password2-error"></div>
          </div>

          {/* button */}
          <div className="my-1 flex items-center justify-center bg-emerald-700 rounded-sm text-gray-300 py-[.3rem] cursor-pointer transition-all ease-in-out duration-300 hover:opacity-[.75]" 
            onClick={()=>{
              submitHandler()
            }}
          >
            <span>Signup</span>
          </div>

          {/* have account link */}
          <div className="mt-3 mb-1 flex items-center">
            <span className="hover:underline cursor-pointer opacity-[.75]" 
              onClick={()=>{
                dispatch(setUsersFlag('LOGIN'))
              }}
            >have an account?</span>
          </div>

      </div>
    </div>
  )
}

export default Signup