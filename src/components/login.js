import  Styled, { styled }  from "styled-components";
import {  connect } from "react-redux";
import { signInAPI } from "../action";
import React from 'react'
import "./login.css"
import { Redirect } from "react-router";
const Login = (props) => {
  return (
    <div className="Container">
    {props.user && <Redirect to="/home"/>}
        <div className="Nav">
            <a href="/">
                <img src="/images/login-logo.svg" alt="logo" />
            </a>
            <div className="buttons">
                <div className="Join">Join Now</div>
                <div className="SignIn">Sign In</div>
            </div>
        </div>
        <div className="Section">
            <Hero>
            <h1>Welcome to your Professional Community</h1>
            <img src="/images/login-hero.svg" alt="hero_img" />
            </Hero>
            <Form >
                <Google onClick={()=> props.signIn()}>
                    <img src="/images/google.svg" alt="" />
                    Sign in with Google
                </Google>
            </Form>
        </div>
    </div>
  )
}

const Hero=styled.div`
    width: 100%;
    h1{
        padding-bottom: 0;
        width: 55%;
        font-size: 56px;
        color: #2977c9;
        font-weight: 200;
        line-height: 70px;
        @media (max-width: 768px){
            text-align: center;
            font-size: 20px;
            width: 100%;
            line-height: 2;
        }
    }
    img{
        z-index: -1;
        width: 700px;
        height: 670px;
        position: absolute;
        bottom: -2px;
        right: -150px;
        @media (max-width:768px){
            top: 230px;
            width: initial;
            position: inherit;
            height: initial;
        }
    }
`;
const Form=styled.div`
    margin-top: 100px;
    width: 408px;
    @media (max-width: 768px){
        margin-top: 20px;
    }
`;
const Google=styled.button`
    display: flex;
    justify-content: center;
    background-color: #fff;
    align-items: center;
    height: 56px;
    width: 100%;
    border-radius: 28px;
    box-shadow: inset 0 0 0 1px rgb(0 0 0 / 60%),inset 0 0 0 2px rgb(0 0 0 /0%) inset 0 0 0 1px rgb(0 0 0 / 0%);
    vertical-align: middle;
    z-index: 0;
    transition-duration: 167ms;
    font-size: 20px;
    color: rgba(0,0,0,0.6);
    &:hover{
        background-color: rgba(207,207,207,0.25);
        color: rgba(0,0,0,0.75);

    }
`;

const mapStateToProps=(state)=>{
    return {
        user:state.userState.user,
    };
};

const mapDispatchToProps=(dispatch)=>({
    signIn:()=> dispatch(signInAPI()),
})

export default connect(mapStateToProps,mapDispatchToProps)(Login)
// export default Login