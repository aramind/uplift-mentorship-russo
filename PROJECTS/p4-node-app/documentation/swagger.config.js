import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'SpendWise API',
      version: '1.0.0',
      description: 'Personal Budget Tracker API documented with Swagger',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { 
              type: 'string' 
            },
            name: { 
              type: 'string' 
            },
            email: { 
              type: 'string' 
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time' 
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time' 
            }
          }
        },

        Account: {
          type: 'object',
          properties: {
            _id: { 
              type: 'string' 
            },
            user: { 
              type: 'string', 
              description: 'User ObjectId' 
            },
            name: { 
              type: 'string' 
            },
            type: { 
              type: 'string', 
              enum: ['cash', 'bank', 'credit', 'ewallet']
            },
            balance: { 
              type: 'number' 
            },
            isDeleted: { 
              type: 'boolean' 
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time' 
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time' 
            }
          }
        },

        Category: {
          type: 'object',
          properties: {
            _id: { 
              type: 'string' 
            },
            user: { 
              type: 'string',
              description: 'User ObjectId',
            },
            name: { 
              type: 'string' 
            },
            type: { 
              type: 'string', 
              enum: ['income', 'expense'] 
            },
            description: { 
              type: 'string' 
            },
            color: { 
              type: 'string' 
            },
            isDeleted: { 
              type: 'boolean' 
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time' 
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time' 
            }
          }
        },

        Transaction: {
          type: 'object',
          properties: {
            _id: { 
              type: 'string' 
            },
            user: { 
              type: 'string',
              description: 'User ObjectId',
            },
            account: { 
              type: 'string',
              description: 'Account ObjectId', 
            },
            category: { 
              type: 'string',
              description: 'Category ObjectId'
            },
            type: { 
              type: 'string', 
              enum: ['income', 'expense'] 
            },
            amount: { 
              type: 'number' 
            },
            description: { 
              type: 'string' 
            },
            date: { 
              type: 'string', 
              format: 'date' 
            },
            isDeleted: { 
              type: 'boolean' 
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time' 
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time' 
            }
          }
        },

        Budget: {
          type: 'object',
          properties: {
            _id: { 
              type: 'string' 
            },
            user: { 
              type: 'string',
              description: 'User ObjectId' 
            },
            category: { 
              type: 'string', 
              description: 'Category ObjectId'
            },
            amount: { 
              type: 'number' 
            },
            period: { 
              type: 'string', 
              enum: ['weekly', 'monthly', 'yearly'] 
            },
            startDate: { 
              type: 'string', 
              format: 'date' 
            },
            isDeleted: { 
              type: 'boolean' 
            },
            createdAt: { 
              type: 'string', 
              format: 'date-time' 
            },
            updatedAt: { 
              type: 'string', 
              format: 'date-time' 
            }
          }
        }
      },
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token'
        }
      }
    },
    servers: [
      {
        url: 'https://spendwiseapi.onrender.com',
        description: 'prod'
      },
      {
        url: 'http://localhost:5555',
        description: 'dev'
      }
    ],
    tags: [
      {
        name: 'Authentication',
        description: 'Handles user registration, login, logout, and retrieving the authenticated user.'
      },
      {
        name: 'Accounts',
        description: 'Manage financial accounts (cash, bank, credit, and e-wallet).'
      },
      {
        name: 'Categories',
        description: 'Manage income and expense categories used by transactions.'
      },
      {
        name: 'Transactions',
        description: 'Create, update, archive, restore, and delete financial transactions.'
      },
      {
        name: 'Budgets',
        description: 'Manage category-based budgets (weekly, monthly, yearly) and spending limits.'
      },
      {
        name: 'Statistics',
        description: 'Provides financial analytics such as monthly income vs expenses and total balance.'
      }
    ],
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;