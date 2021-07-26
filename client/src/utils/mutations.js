import { gql } from '@apollo/client';

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            token
            profile {
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
            profile {
                _id
                username
            }
        }
    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($description: String!, $title: String!, $bookId: String!, $image: String!, $link: String!, $authors: [String]!) {
        saveBook(description: $description, title: $title, bookId: $bookId, image: $image, link: $link, authors: $authors) {
            _id
            username
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

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: String!) {
        removeBook(bookId: $bookId) {
          _id
          username
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