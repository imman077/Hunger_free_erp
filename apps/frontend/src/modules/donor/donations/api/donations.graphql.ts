import { gql } from '@apollo/client';

export const GET_MY_DONATIONS = gql`
  query GetMyDonations {
    donations {
      id
      foodType
      quantity
      ngo
      date
      status
      pickupAddress
      deliveryAddress
      description
      volunteer {
        name
        phone
        rating
      }
      image
      timeline {
        status
        date
        time
        completed
      }
    }
  }
`;

export const VERIFY_PICKUP = gql`
  mutation VerifyPickup($id: ID!, $otp: String!) {
    verifyPickup(id: $id, otp: $otp) {
      id
      status
      timeline {
        status
        date
        time
        completed
      }
    }
  }
`;
