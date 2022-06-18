import User from "../../models/User";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { secretKey } from "../../configuration";
import { userLoginDto, createdUserDto } from "./user.dto";

class UserServices {
  async createNewUser({ email, password }: userLoginDto): Promise<any> {
    try {
      const hashedPassword: any = await bcrypt.hashSync(password, 12);
      let newUser = await User.create({
        id: uuidv4(),
        email,
        password: hashedPassword
      });

      delete newUser.dataValues.password;
      const userWithoutPass: createdUserDto = newUser.dataValues;

      return {
        message: "Account is created successfully.",
        data: userWithoutPass
      };
    } catch (e) {
      return {
        message: `${e}`
      };
    }
  }
  async loginUser({ email, password }: userLoginDto): Promise<any> {
    if (!email) {
      return { data: null, message: "Please, fill email." };
    }

    let currentUser: any = await User.findOne({ where: { email } }) ;
    const wrongAuthText: string = "Wrong password or email.";

    if (currentUser === null) {
      console.log(currentUser);
      return { data: null, message: wrongAuthText };
    }

    const validationPassword = await bcrypt.compareSync(
      password,
      currentUser.password
    );

    if (!validationPassword) {
      return { data: null, message: wrongAuthText };
    }

    const token = (id: string = currentUser.id, roles: string = "user") => {
      const payload = { id, roles };
      return jwt.sign(payload, secretKey, { expiresIn: "24h" });
    };

    delete currentUser.dataValues.password;
    const updatedUser = currentUser.dataValues;

    return {
      data: { ...updatedUser, token: token() },
      message: "Login is successfully."
    };
  }
  async getUsers() {
    return await User.findAll({
      attributes: ["id", "email", "first_name", "second_name", "role"]
    });
  }
  /**
   * Edit user by :id
   * @param session
   * @param id
   * @param body
   * @returns
   */
  async editUser(session: any, id: string | string[], body: any): Promise<any> {
    if (session.user_id !== id) return { message: "incorrect user_id" };

    const { first_name, second_name } = body;
    const updatedUser = await User.update(
      { first_name, second_name },
      {
        where: {
          id
        },
        returning: true,
        plain: true
      }
    );

    delete updatedUser[1]?.dataValues.password;

    return {
      message: "User updated is successfully.",
      data: updatedUser[1]?.dataValues
      // temp: {
      //   id,
      //   session,
      //   body
      // }
    };
  }
  /**
   * Find user by email
   * @param email
   * @returns
   */
  async findUserByEmail(email: string) {
    try {
      const user: any = await User.findOne({ where: { email } });

      if (user) {
        return { message: "User with current email exists.", data: user };
      }

      return {
        message: "User doesn't exists.",
        data: null
      };
    } catch (e) {
      return {
        message: `${e}`
      };
    }
  }
}

export default new UserServices();
