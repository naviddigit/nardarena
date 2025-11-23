import Joi from 'joi';
import { Request, Response, NextFunction } from 'express';

/**
 * Schema های Validation
 */
export const validationSchemas = {
  // Register
  register: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required',
    }),
    password: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'Password is required',
    }),
  }),

  // Login
  login: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required',
    }),
    password: Joi.string().required().messages({
      'any.required': 'Password is required',
    }),
  }),

  // Refresh Token
  refreshToken: Joi.object({
    refreshToken: Joi.string().required().messages({
      'any.required': 'Refresh token is required',
    }),
  }),

  // Forgot Password
  forgotPassword: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required',
    }),
  }),

  // Reset Password
  resetPassword: Joi.object({
    email: Joi.string().email().required().messages({
      'string.email': 'Please provide a valid email',
      'any.required': 'Email is required',
    }),
    token: Joi.string().length(6).pattern(/^\d+$/).required().messages({
      'string.length': 'Token must be 6 digits',
      'string.pattern.base': 'Token must contain only numbers',
      'any.required': 'Token is required',
    }),
    newPassword: Joi.string().min(6).required().messages({
      'string.min': 'Password must be at least 6 characters',
      'any.required': 'New password is required',
    }),
  }),
};

/**
 * Middleware: Validation
 */
export const validate = (schemaName: keyof typeof validationSchemas) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const schema = validationSchemas[schemaName];
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const errors = error.details.map((detail) => detail.message);
      res.status(400).json({
        success: false,
        error: 'Validation error',
        details: errors,
      });
      return;
    }

    next();
  };
};
