import { gql } from '@apollo/client';

export const CREATE_CHEKOUT_SESSION = gql`
   mutation CreateCheckoutSesstion($cartItems:[CheckoutInput!]!,$userDetailsInput:UserDetailsInput!){
    createCheckoutSesstion(cartItems: $cartItems, userDetailsInput: $userDetailsInput){
      id
      url
    }
   }
`;