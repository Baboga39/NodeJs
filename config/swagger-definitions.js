const { patch } = require("../routes/userRoutes");

module.exports = {
    paths: {
      '/api/v1/auth/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string', example: 'UserDong' },
                    email: { type: 'string', example: '20110465@student.hcmute.edu.vn' },
                    name: { type: 'string', example: 'Lê Trương Ngọc Hải' },
                    password: { type: 'string', example: 'Dong123@' },
                    phone: { type: 'string', example: '0814069391' },
                    second_name: { type: 'string', example: 'baboga' },
                    gender: { type: 'string', example: 'male' },
                    roles: { type: 'string', example: 'Client' },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User registered successfully. Please check your email for verification.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      statusCode: { type: 'integer', example: 201 },
                      message: { type: 'string', example: 'User registered successfully. Please check your email for verification.' },
                      result: { type: 'object' }, // Thay thế 'object' với cấu trúc của user nếu cần
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Bad request. Username or email already taken.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 400 },
                      message: { type: 'string', example: 'Username is already taken' }, // Thay đổi nội dung tùy theo trường hợp
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 500 },
                      message: { type: 'string', example: 'Internal server error' },
                      result: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/auth/verify': {
        post: {
          summary: 'Verify a user with a token',
          tags: ['Auth'],
          parameters: [
            {
              in: 'query',
              name: 'token',
              required: true,
              schema: { type: 'string' },
              description: 'Verification token for user',
              example: '479798',
            },
          ],
          responses: {
            '200': {
              description: 'User verified successfully.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      statusCode: { type: 'integer', example: 200 },
                      message: { type: 'string', example: 'User verified successfully' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid or expired token.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 400 },
                      message: { type: 'string', example: 'Invalid token' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 500 },
                      message: { type: 'string', example: 'Internal server error' },
                      result: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/auth/login': {
        post: {
          summary: 'Login user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string', example: 'baboga12' },
                    password: { type: 'string', example: 'Ngochai0204@' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Login successful.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      statusCode: { type: 'integer', example: 200 },
                      message: { type: 'string', example: 'Login successful' },
                      result: { type: 'string', example: 'your_jwt_token_here' },
                    },
                  },
                },
              },
            },
            '401': {
              description: 'Invalid credentials or account status.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 401 },
                      message: { type: 'string', example: 'Not found user or account not verified' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 500 },
                      message: { type: 'string', example: 'Internal server error' },
                      result: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/auth/forgot-password': {
        post: {
          summary: 'Request a password reset',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'ngochai06122002@gmail.com' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Please check your email for password reset instructions.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      statusCode: { type: 'integer', example: 200 },
                      message: { type: 'string', example: 'Please check your email' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Email not found or bad request.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 400 },
                      message: { type: 'string', example: 'Not found. Please try again' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 500 },
                      message: { type: 'string', example: 'Internal server error' },
                      result: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/auth/reset-password': {
        post: {
          summary: 'Reset user password',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    email: { type: 'string', example: 'ngochai06122002@gmail.com' },
                    password: { type: 'string', example: 'Ngochai0204@' },
                    confirmPassword: { type: 'string', example: 'Ngochai0204@' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Password reset successfully.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      statusCode: { type: 'integer', example: 200 },
                      message: { type: 'string', example: 'Reset password successfully' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Passwords do not match or bad request.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 400 },
                      message: { type: 'string', example: 'Passwords do not match. Try again' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 500 },
                      message: { type: 'string', example: 'Internal server error' },
                      result: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/auth/register': {
        post: {
          summary: 'Register a new user',
          tags: ['Auth'],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string', example: 'UserDong' },
                    email: { type: 'string', example: '20110465@student.hcmute.edu.vn' },
                    name: { type: 'string', example: 'Lê Trương Ngọc Hải' },
                    password: { type: 'string', example: 'Dong123@' },
                    phone: { type: 'string', example: '0814069391' },
                    second_name: { type: 'string', example: 'baboga' },
                    gender: { type: 'string', example: 'male' },
                    roles: { type: 'string', example: 'Client' },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User registered successfully. Please check your email for verification.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      statusCode: { type: 'integer', example: 201 },
                      message: { type: 'string', example: 'User registered successfully. Please check your email for verification.' },
                      result: { type: 'object' }, // Thay thế 'object' với cấu trúc của user nếu cần
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Bad request. Username or email already taken.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 400 },
                      message: { type: 'string', example: 'Username is already taken' }, // Thay đổi nội dung tùy theo trường hợp
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error.',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 500 },
                      message: { type: 'string', example: 'Internal server error' },
                      result: { type: 'string' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/user': {
        get: {
          summary: 'Get user information',
          tags: ['Auth'],
          parameters: [
            {
              in: 'query',
              name: 'userId',
              required: true,
              schema: {
                type: 'string',
              },
              description: 'The ID of the user to retrieve information for',
              example: '12345',
            },
          ],
          responses: {
            '200': {
              description: 'User information',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      statusCode: { type: 'integer', example: 200 },
                      message: { type: 'string', example: 'User information' },
                      result: {
                        type: 'object',
                        properties: {
                          userId: { type: 'string', example: '12345' },
                          username: { type: 'string', example: 'user123' },
                          email: { type: 'string', example: 'user@example.com' },
                          name: { type: 'string', example: 'John Doe' },
                          // Add other user properties as needed.
                        },
                      },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 404 },
                      message: { type: 'string', example: 'User not found' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 500 },
                      message: { type: 'string', example: 'Internal server error' },
                      result: { type: 'string', example: 'Error details' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/user/changeInfo': {
        patch: {
          summary: 'Update user information',
          tags: ['User'],
          security: [
            {
              Bearer: [], 
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    username: { type: 'string', example: 'baboga12' },
                    name: { type: 'string', example: 'Lê Trương Ngọc Hải' },
                    phone: { type: 'string', example: '0814069391' },
                    second_name: { type: 'string', example: 'baboga' },
                    gender: { type: 'string', example: 'male' },
                    email: { type: 'string', example: 'ngochai06122002@gmail.com' },
                    Descriptions: { type: 'string', example: 'Mô tả bản thân' },
                    address: { type: 'string', example: 'Tỉnh Bà Rịa - Vũng Tàu - Huyện Châu Đức' },
                  },
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'User information updated successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      statusCode: { type: 'integer', example: 200 },
                      message: { type: 'string', example: 'User information updated successfully' },
                      result: {
                        type: 'object',
                        properties: {
                          username: { type: 'string', example: 'baboga12' },
                          name: { type: 'string', example: 'Lê Trương Ngọc Hải' },
                          phone: { type: 'string', example: '0814069391' },
                          second_name: { type: 'string', example: 'baboga' },
                          gender: { type: 'string', example: 'male' },
                          email: { type: 'string', example: 'ngochai06122002@gmail.com' },
                          Descriptions: { type: 'string', example: 'Mô tả bản thân' },
                          address: { type: 'string', example: 'Tỉnh Bà Rịa - Vũng Tàu - Huyện Châu Đức' },
                        },
                      },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid input',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 400 },
                      message: { type: 'string', example: 'Invalid input' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '404': {
              description: 'User not found',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 404 },
                      message: { type: 'string', example: 'User not found' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '500': {
              description: 'Internal server error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 500 },
                      message: { type: 'string', example: 'Internal server error' },
                      result: { type: 'string', example: 'Error details' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/v1/user/resetpassword': {
        patch: {
          summary: 'Reset user password Auth',
          tags: ['User'],
          security: [
            {
              BearerAuth: [] // Đảm bảo thêm thông tin xác thực ở đây
            }
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    password: { type: 'string', example: 'NewPassword123!' },
                    confirmPassword: { type: 'string', example: 'NewPassword123!' },
                    email: { type: 'string', example: 'ngochai06122002@gmail.com' },
                  },
                  required: ['password', 'confirmPassword', 'email'],
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Password reset successfully',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: true },
                      statusCode: { type: 'integer', example: 200 },
                      message: { type: 'string', example: 'Reset password successfully' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '400': {
              description: 'Invalid input or passwords do not match',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 400 },
                      message: { type: 'string', example: 'Please enter full information' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
            '401': {
              description: 'User not found || Authentication Error',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      success: { type: 'boolean', example: false },
                      statusCode: { type: 'integer', example: 401 },
                      message: { type: 'string', example: 'Not found. Please try again' },
                      result: { type: 'null' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  };
  