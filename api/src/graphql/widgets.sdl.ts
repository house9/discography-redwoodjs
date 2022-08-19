export const schema = gql`
  type Widget {
    id: String!
    name: String!
    description: String
  }

  type Query {
    widgets: [Widget!]! @requireAuth
    widget(id: String!): Widget @requireAuth
  }

  input CreateWidgetInput {
    name: String!
    description: String
  }

  input UpdateWidgetInput {
    name: String
    description: String
  }

  type Mutation {
    createWidget(input: CreateWidgetInput!): Widget! @requireAuth
    updateWidget(id: String!, input: UpdateWidgetInput!): Widget! @requireAuth
    deleteWidget(id: String!): Widget! @requireAuth
  }
`
