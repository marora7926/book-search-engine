import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
        _id
        email
        savedBooks {
            description
            title
            bookId
            image
            link
            authors
          }
        }
    }
`;