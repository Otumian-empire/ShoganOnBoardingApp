const { onboardingDB: db } = require("../db/onboardingdb.js");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const validation = require("../validation/validation.js");
const { getCode, sendEmail } = require("../utils/utils.js");

/**
 * @swagger
 *
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       firstName:
 *         type: string
 *         required: true
 *       lastName:
 *         type: string
 *         required: true
 *       email:
 *         type: string
 *         required: true
 *       password:
 *         type: string
 *         format: password
 *         required: true
 */

/**
 * @swagger
 *
 * /signup:
 *   post:
 *     tags:
 *       - User
 *     description: Create user
 *     schema:
 *       $ref: '#/definitions/User'
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: firstname
 *         description: Users first name
 *         in: body
 *         required: true
 *       - name: lastname
 *         description: Users last name
 *         in: body
 *         required: true
 *       - name: email
 *         description: Users email
 *         in: body
 *         required: true
 *       - name: password
 *         description: Users password
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         - description:
 *             status: true
 *             message: Account creation sucessfully
 *       422:
 *         - description:
 *           firstname:
 *             - Invalid value
 *             - Must be only alphabetical chars
 *             - Must be at least 2 chars long
 */
router.post(
  "/signup",
  [
    validation.validateParams(["firstname", "lastname", "email", "password"]),
    validation.validateResult,
  ],
  (req, res) => {
    console.log(req.body);

    let { firstname, lastname, email, password } = req.body;

    bcrypt.hash(password, 12, (hashErr, hash) => {
      if (hashErr) {
        console.log(hashErr);
        return res.status(500).json({
          status: false,
          message: "Error occured while signing up",
        });
      }

      db.createUser([firstname, lastname, email, hash])
        .then(() =>
          res.status(201).json({
            status: true,
            message: "Account created sucessfully",
          })
        )
        .catch((createUserErr) => {
          console.log(createUserErr);
          return res.status(500).json({
            status: false,
            message: "Account creation unsucessfully",
          });
        });
    });
  }
);

/**
 * @swagger
 * /login:
 *   post:
 *     tags:
 *       - User
 *     description: Login user
 *     produces:
 *       - application/x-www-form-urlencoded
 *     schema:
 *       $ref: '#/definitions/User'
 *     parameters:
 *       - name: email
 *         description: Users email
 *         in: body
 *         type: string
 *         required: true
 *       - name: password
 *         description: Users password
 *         in: body
 *         type: string
 *         required: true
 *     responses:
 *       200:
 *         - description:
 *             status: true
 *             message: Login sucessful
 */
router.post(
  "/login",
  [validation.validateParams(["email", "password"]), validation.validateResult],
  (req, res) => {
    console.log(req.body);

    let { email, password } = req.body;

    db.readOnePasswordUser(email)
      .then((result) => {
        if (result.rowCount > 0) {
          const hash = result.rows[0].password;

          bcrypt.compare(password, hash, (compareErr, match) => {
            if (compareErr) {
              console.log(compareErr);
              return res.status(403).json({
                status: false,
                message: "Incorrect email or password",
              });
            }

            if (match)
              return res.status(200).json({
                status: true,
                message: "Login sucessful",
              });

            return res.status(403).json({
              status: false,
              message: "Login unsucessful",
            });
          });
        } else {
          return res.status(403).json({
            status: false,
            message: "Unknow user, please register",
          });
        }
      })
      .catch((readingPasswordErr) => {
        console.log(readingPasswordErr);
        return res.status(500).json({
          status: false,
          message: "Reading password error",
        });
      });
  }
);

/**
 * @swagger
 * /forgetpassword:
 *   post:
 *     tags:
 *       - User
 *     description: Login user
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: email
 *         description: Users email
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         - description:
 *             status: true
 *             message: We have sent you an email to reset your password
 */
router.post(
  "/forgetpassword",
  [validation.validateParams(["email"]), validation.validateResult],
  (req, res) => {
    const { email } = req.body;

    db.readOneUser(email)
      .then((fpRes) => {
        if (fpRes.rowCount < 1)
          return res
            .status(403)
            .json({ status: false, message: "Incorect credentials" });

        const code = getCode();

        db.createCode([email, code])
          .then(() => {
            console.log(`RestCode: ${code}`);

            sendEmail(email, code)
              .then(() =>
                res.status(200).json({
                  status: true,
                  message: "We have sent you an email to reset your password",
                })
              )
              .catch((sendEmailErr) => {
                console.log(sendEmailErr);
                return res.status(500).json({
                  status: false,
                  message: "Reset error",
                });
              });
          })
          .catch((createCodeErr) => {
            console.log(createCodeErr);
            return res.status(200).json({
              status: true,
              message: "Please check your email, code has been sent already",
            });
          });
      })
      .catch((fpErr) => {
        console.log(fpErr);
        return res.status(500).json({ status: false, message: "Reset error" });
      });
  }
);

/**
 * @swagger
 * /resetpassword:
 *   put:
 *     tags:
 *       - User
 *     description: Reset user password
 *     produces:
 *       - application/x-www-form-urlencoded
 *     parameters:
 *       - name: email
 *         description: Users email
 *         in: body
 *         required: true
 *       - name: passwword
 *         description: Users new password
 *         in: body
 *         required: true
 *       - name: code
 *         description: Users code for password reset
 *         in: body
 *         required: true
 *     responses:
 *       200:
 *         - description:
 *             status: true
 *             message: Reset successful
 */
router.put(
  "/resetpassword",
  [
    validation.validateParams(["email", "password", "code"]),
    validation.validateResult,
  ],
  (req, res) => {
    let { email, password, code } = req.body;

    db.readCode(email)
      .then((readCodeRes) => {
        if (readCodeRes.rowCount < 1)
          return res.status(403).json({
            status: false,
            message: "Please register or login",
          });

        if (readCodeRes.rows[0].code !== code)
          return res.status(403).json({
            status: false,
            message: "Please check and enter the code again",
          });

        db.updateUser
          .password([email, password])
          .then(() => {
            db.deleteCode(email)
              .then(() =>
                res
                  .status(200)
                  .json({ status: true, message: "Reset successful" })
              )
              .catch((deleteCodeErr) => {
                console.log(`deleteCodeErr: ${deleteCodeErr}`);
                return res
                  .status(500)
                  .json({ status: false, message: "Reset error" });
              });
          })
          .catch((updateUserErr) => {
            console.log(`updateUserErr: ${updateUserErr}`);
            return res
              .status(500)
              .json({ status: false, message: "Reset error" });
          });
      })
      .catch((readCodeErr) => {
        console.log(`readCodeErr: ${readCodeErr}`);
        return res.status(500).json({ status: false, message: "Reset error" });
      });
  }
);

module.exports = { api: router };
