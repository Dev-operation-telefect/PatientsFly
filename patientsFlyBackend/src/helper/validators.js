// employee.validators.js
import { body, validationResult } from 'express-validator';

export const employeeValidationRules = [
  body('employeeId').notEmpty().withMessage('Employee ID is required'),
  body('photo').optional().isString().withMessage('Photo must be a URL'),
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Valid email is required'),
  body('phone').matches(/^[+]?\d{10,15}$/).withMessage('Valid phone number required'),
  body('gender').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
  body('dob').optional().isISO8601().toDate(),
  body('nationalId').optional().isString(),
  body('bloodGroup').optional().isIn(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
  body('address.permanent').notEmpty().withMessage('Permanent address is required'),
  body('address.present').notEmpty().withMessage('Present address is required'),
  body('emergencyContact').matches(/^[+]?\d{10,15}$/).withMessage('Valid emergency contact number required'),
  body('department').isIn(['CEO', 'Managing Director', 'Manager', 'Assistant Manager', 'executive', 'Human Resources', 'Finance & Accounts', 'Operations', 'Marketing & Sales', 'Customer Service', 'Legal & Compliance', 'IT / Engineering']).withMessage('Invalid department'),
  body('role').isIn(['Admin', 'Manager', 'Staff', 'Intern']).withMessage('Invalid role'),
  body('employmentType').isIn(['Full-Time', 'Part-Time', 'Intern', 'Contract']).withMessage('Invalid employment type'),
  body('joinDate').notEmpty().isISO8601().toDate().withMessage('Valid join date is required'),
  body('resignDate').optional().isISO8601().toDate(),
  body('probationEnd').optional().isISO8601().toDate(),
  body('workDaysPerWeek').optional().isInt({ min: 1, max: 7 }),
  body('workMode').optional().isIn(['Onsite', 'Remote', 'Hybrid']),
  body('manager').optional().isString(),
  body('officeLocation').optional().isString(),
  body('status').optional().isIn(['Active', 'Inactive', 'Resigned', 'Terminated']),
  body('documents.cv').optional().isString(),
  body('documents.idCardFront').optional().isString(),
  body('documents.idCardBack').optional().isString(),
  body('documents.certificates').isArray().withMessage('Certificates must be an array'),
  body('nominees').isArray().withMessage('Nominees must be an array'),
  body('nominees.*.name').notEmpty().withMessage('Nominee name is required'),
  body('nominees.*.relation').notEmpty().withMessage('Nominee relation is required'),
  body('nominees.*.idCardFront').optional().isString(),
  body('nominees.*.idCardBack').optional().isString()
];

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};