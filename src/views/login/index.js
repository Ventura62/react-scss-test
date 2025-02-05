import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from 'aws-amplify/auth';

import { Spinner } from "reactstrap";

import { login, forgotPassword, resetNewPassword } from "src/redux/actions";
import { ImageLogo, Eye, EyeSlash } from 'src/assets/svg';

import CustomModal from "src/components/customModal";

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.login);
  const [visible, setVisible] = useState(false);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: ""
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [createNewPassword, setCreateNewPassword] = useState(false);
  const [newPassword, setNewPassword] = useState({
    username: "",
    code: "",
    password: "",
    passwordConfirmation: ""
  })
  const [visibleCode, setVisibleCode] = useState(false);
  const [visibleNewPassword, setVisibleNewPassword] = useState(false);
  const [visiblePasswordConfirmation, setVisiblePasswordConfirmation] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const user = await getCurrentUser();
        if (user) {
          navigate("/");
        }
      } catch (error) {
        console.log("")
      }
    };
    checkUser();
  })

  const onChangeForm = (ev) => {
    setLoginForm({...loginForm,
      [ev.target.name] : ev.target.value
    })
  }

  const loginUser = async (ev) => {
    ev.preventDefault();

    const resultAction = await dispatch(login(loginForm))
    if (resultAction && resultAction.payload && resultAction.payload === true){
      navigate("/");
    }
  }

  const userForgotPassword = async () => {
    try {
      const resultAction = await dispatch(forgotPassword(email));
      if (forgotPassword.fulfilled.match(resultAction)) {
        setNewPassword({...newPassword,
          username: resultAction.meta.arg
        })
        setCreateNewPassword(true)
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

  const userResetPassword = async () => {
    try {
      const resultAction = await dispatch(resetNewPassword(newPassword));
      if (resultAction && resultAction.payload === true){
        setModalOpen(false);
        setCreateNewPassword(false);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }

  const onChangeRecoverForm = (ev) => {
    setNewPassword({...newPassword,
      [ev.target.name] : ev.target.value
    })
  }

  return(
    <>
      <div className="login--view">
        <form className="login--container" onSubmit={(ev) => {loginUser(ev)}}>
          <div>
            <ImageLogo/>
          </div>
          <div>
            <h3>Login</h3>
          </div>
          <div>
            <input
              className="input--100--width"
              type="email"
              name="username"
              placeholder="Email"
              value={loginForm.username}
              onChange={ev => onChangeForm(ev)}/>
          </div>
          <div>
            <div className="password--container">
              <input
                className="input--100--width"
                type={visible? `text`:`password`}
                name="password"
                placeholder="Password"
                value={loginForm.password}
                onChange={ev => onChangeForm(ev)}/>
              <div className="icon--container" onClick={() => {setVisible(!visible)}}>
                {visible? <Eye/> : <EyeSlash/>}
              </div>
            </div>
          </div>
          <div className="buttons--container">
            <button className="custom--button dark--button"
              type="submit">
              {loginState.loadingLoginButton && <Spinner size="sm"/>}
              Login
            </button>
            <button className="custom--button"
              type="button"
              onClick={()=>{
                setModalOpen(!modalOpen)
                setEmail(loginForm.username)
              }}>
              forgot password?
            </button>
          </div>
        </form>
      </div>
      <CustomModal
        size="medium"
        isOpen={modalOpen}
        submitModal={createNewPassword === true? () => userResetPassword() : () => userForgotPassword()}
        changeModalState={() => {
          setModalOpen(false);
          setEmail("");
          setCreateNewPassword(false);
        }}
        modalTitle={createNewPassword === true? "Submit" : "Password recover"}
        submitButtonLabel={createNewPassword === true? "Ceate new password" : "Send password reset email"}
        closeButtonLabel="Cancel"
        loading={loginState.modalLoading}
      >
        {createNewPassword === true?
          <div className="new--password--container">
            <div className="password--container">
              <input
                className="input--100--width"
                type={visibleCode? `text`:`password`}
                name="code"
                placeholder="Verification code"
                value={newPassword.code}
                onChange={ev => onChangeRecoverForm(ev)}/>
              <div className="icon--container" onClick={() => {setVisibleCode(!visibleCode)}}>
                {visibleCode? <Eye/> : <EyeSlash/>}
              </div>
            </div>
            <div className="password--container">
              <input
                className="input--100--width"
                type={visibleNewPassword? `text`:`password`}
                name="password"
                placeholder="Password"
                value={newPassword.password}
                onChange={ev => onChangeRecoverForm(ev)}/>
              <div className="icon--container" onClick={() => {setVisibleNewPassword(!visibleNewPassword)}}>
                {visibleNewPassword? <Eye/> : <EyeSlash/>}
              </div>
            </div>
            <div className="password--container">
              <input
                className="input--100--width"
                type={visiblePasswordConfirmation? `text`:`password`}
                name="passwordConfirmation"
                placeholder="Password Confirmation"
                value={newPassword.passwordConfirmation}
                onChange={ev => onChangeRecoverForm(ev)}/>
              <div className="icon--container" onClick={() => {setVisiblePasswordConfirmation(!visiblePasswordConfirmation)}}>
                {visiblePasswordConfirmation? <Eye/> : <EyeSlash/>}
              </div>
            </div>
          </div>
          :
          <div>
            <input
              className="input--100--width"
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={ev => setEmail(ev.target.value)}/>
          </div>
        }
      </CustomModal>
    </>
  )
}

export default Login;