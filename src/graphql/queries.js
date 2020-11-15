/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
    query GetPost($id: ID!) {
        getPost(id: $id) {
            id
            postOwnerId
            postOwnerUsername
            postTitle
            postBody
            createdAt
            comments {
                items {
                    id
                    commentOwnerId
                    commentOwnerUsername
                    content
                    createdAt
                    updatedAt
                }
                nextToken
            }
            likes {
                items {
                    id
                    numberLikes
                    likeOwnerId
                    likeOwnerUsername
                    createdAt
                    updatedAt
                }
                nextToken
            }
            photo
            updatedAt
        }
    }
`
export const listPosts = /* GraphQL */ `
    query ListPosts($filter: ModelPostFilterInput, $limit: Int, $nextToken: String) {
        listPosts(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                postOwnerId
                postOwnerUsername
                postTitle
                postBody
                createdAt
                comments {
                    items {
                        id
                        commentOwnerId
                        commentOwnerUsername
                        content
                        createdAt
                        updatedAt
                    }
                }
                likes {
                    items {
                        id
                        numberLikes
                        likeOwnerId
                        likeOwnerUsername
                    }
                }
                photo
                updatedAt
            }
            nextToken
        }
    }
`
export const getComment = /* GraphQL */ `
    query GetComment($id: ID!) {
        getComment(id: $id) {
            id
            commentOwnerId
            commentOwnerUsername
            post {
                id
                postOwnerId
                postOwnerUsername
                postTitle
                postBody
                createdAt
                comments {
                    nextToken
                }
                likes {
                    nextToken
                }
                photo
                updatedAt
            }
            content
            createdAt
            likes {
                items {
                    id
                    numberLikes
                    likeOwnerId
                    likeOwnerUsername
                    createdAt
                    updatedAt
                }
                nextToken
            }
            updatedAt
        }
    }
`
export const listComments = /* GraphQL */ `
    query ListComments($filter: ModelCommentFilterInput, $limit: Int, $nextToken: String) {
        listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                commentOwnerId
                commentOwnerUsername
                post {
                    id
                    postOwnerId
                    postOwnerUsername
                    postTitle
                    postBody
                    createdAt
                    photo
                    updatedAt
                }
                content
                createdAt
                likes {
                    nextToken
                }
                updatedAt
            }
            nextToken
        }
    }
`
export const getLike = /* GraphQL */ `
    query GetLike($id: ID!) {
        getLike(id: $id) {
            id
            numberLikes
            likeOwnerId
            likeOwnerUsername
            post {
                id
                postOwnerId
                postOwnerUsername
                postTitle
                postBody
                createdAt
                comments {
                    nextToken
                }
                likes {
                    nextToken
                }
                photo
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`
export const listLikes = /* GraphQL */ `
    query ListLikes($filter: ModelLikeFilterInput, $limit: Int, $nextToken: String) {
        listLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                numberLikes
                likeOwnerId
                likeOwnerUsername
                post {
                    id
                    postOwnerId
                    postOwnerUsername
                    postTitle
                    postBody
                    createdAt
                    photo
                    updatedAt
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`
export const getCommentLike = /* GraphQL */ `
    query GetCommentLike($id: ID!) {
        getCommentLike(id: $id) {
            id
            numberLikes
            likeOwnerId
            likeOwnerUsername
            post {
                id
                commentOwnerId
                commentOwnerUsername
                post {
                    id
                    postOwnerId
                    postOwnerUsername
                    postTitle
                    postBody
                    createdAt
                    photo
                    updatedAt
                }
                content
                createdAt
                likes {
                    nextToken
                }
                updatedAt
            }
            createdAt
            updatedAt
        }
    }
`
export const listCommentLikes = /* GraphQL */ `
    query ListCommentLikes($filter: ModelCommentLikeFilterInput, $limit: Int, $nextToken: String) {
        listCommentLikes(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                numberLikes
                likeOwnerId
                likeOwnerUsername
                post {
                    id
                    commentOwnerId
                    commentOwnerUsername
                    content
                    createdAt
                    updatedAt
                }
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`
export const getUser = /* GraphQL */ `
    query GetUser($id: ID!) {
        getUser(id: $id) {
            id
            name
            bio
            picture
            email
            phoneNumber
            createdAt
            updatedAt
        }
    }
`
export const listUsers = /* GraphQL */ `
    query ListUsers($filter: ModelUserFilterInput, $limit: Int, $nextToken: String) {
        listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                name
                bio
                picture
                email
                phoneNumber
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`
