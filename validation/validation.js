const { check, validationResult } = require('express-validator')


module.exports = {
    validateParams: (params) => {
        let validationRules = []

        if (params.includes('firstname')) {
            validationRules.push(check('firstname')
                .notEmpty()
                .isAlpha()
                .withMessage('Must be only alphabetical chars')
                .isLength({ min: 2 })
                .withMessage('Must be at least 5 chars long'))
        }

        if (params.includes('lastname')) {
            validationRules.push(check('lastname')
                .notEmpty()
                .isAlpha()
                .withMessage('Must be only alphabetical chars')
                .isLength({ min: 2 })
                .withMessage('Must be at least 5 chars long'))
        }

        if (params.includes('email')) {
            validationRules.push(check('email')
                .notEmpty()
                .isEmail()
                .withMessage("Provide a valid email"))
        }

        if (params.includes('password')) {
            validationRules.push(check('password')
                .notEmpty()
                .isLength({ min: 6 })
                .withMessage('Must be at least 6 chars long')
                .isAlphanumeric()
                .withMessage('Must be alphanumeric'))
        }

        if (params.includes('code')) {
            validationRules.push(check('code')
                .isLength(6)
                .withMessage('Must be at least 6 chars long')
                .isAlphanumeric()
                .withMessage('Must be alphanumeric'))
        }


        return validationRules
    },

    validateResult: (req, res, next) => {
        const errors = validationResult(req)

        if (errors.isEmpty())
            return next()

        const extractedErrors = []
        errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

        return res.status(422).json({ errors: extractedErrors, })
    }
}