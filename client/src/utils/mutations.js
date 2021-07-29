import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {
            login(email: $email, password: $password) {
            token
            user {
                _id
                email
            }
        }
    }
`;

export const ADD_BOOK = gql`
    mutation saveBook($bookInput: BookInput!) {
        saveBook(bookInput: $bookInput) {
            _id
            username
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

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
          _id
          username
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