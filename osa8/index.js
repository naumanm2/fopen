const { ApolloServer, gql } = require('apollo-server')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

let MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB', error.message)
  })



const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [ Book! ]!
    allAuthors: [ Author! ]!
  }
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [ String! ]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: () => Author.find({}),
    allBooks: () => Book.find({}).populate('author', {name: 1})

  },
  Author: {
    bookCount: async (parent) => {
      const books = await Book.find({}).populate('author', {name: 1})
      return books.filter(x => x.author.name === parent.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({name: args.author})
      if (!author) {
        const newAuthor = new Author({name: args.author})
        author = await newAuthor.save()

      }
        const newBook = new Book({...args, author})
        try {
          newBook.save()
        } catch (error) {
          throw new UserInputError(error.message, {
          invalidArgs: args,
          })
        }



      return newBook
  },
  editAuthor: async (root, args) => {
    const author = await Author.findOne({name: args.name})
    author.born = args.setBornTo
    try {
      await author.save()
    } catch (error) {
      throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return author.save()
    }
  }

}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
