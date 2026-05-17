import { gql } from '@apollo/client';

export const GET_MY_DONATIONS = gql`
  query GetMyDonations($status: String) {
    donations(status: $status) {
      id
      foodType
      category
      dietaryType
      preparationType
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
    donationStats {
      totalDonations
      pendingCount
      completedCount
      inProgressCount
      totalByCategory {
        category
        count
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
export const CREATE_DONATION = gql`
  mutation CreateDonation($input: CreateDonationInput!) {
    createDonation(input: $input) {
      id
      foodType
      category
      status
    }
  }
`;
