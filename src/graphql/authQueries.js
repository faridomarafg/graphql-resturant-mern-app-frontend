import { gql } from '@apollo/client';

const LOGIN_USER = gql`
  mutation LoginUser($email: String!, $password: String!) {
    loginUser(email: $email, password: $password) {
      id
      name
      email
      token
      role
    }
  }
`;

export default LOGIN_USER;


export const REGISTER_USER = gql`
  mutation RegisterUser($name: String!, $email: String!, $password: String!) {
    registerUser(name: $name, email: $email, password: $password) {
      message
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($token: String!) {
    verifyUser(token: $token,) {
      message
    }
  }
`;

export const FORGOT_PASSWORD = gql`
  mutation ForgotPassword($email: String!) {
    forgotPassword(email: $email,) {
      message
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($resetToken: String!, $newPassword:String!) {
    resetPassword(resetToken: $resetToken, newPassword:$newPassword) {
      message
    }
  }
`;
