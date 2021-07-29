import { gql } from '@apollo/client';

export const QUERY_ME = gql`
    query me {
        me {
        _id
        email
        savedBooks {
            _id
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