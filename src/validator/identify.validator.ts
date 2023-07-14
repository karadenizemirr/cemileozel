import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from "class-validator";
import { createClient } from "soap";

@ValidatorConstraint({ name: "IdentifyValidator", async: true })
export class IdentifyValidator implements ValidatorConstraintInterface {
  async validate(value: any, validationArguments?: ValidationArguments) {
    const { name, surname, identifier, bornDate } = validationArguments?.constraints[0] || {};

    const URL = "";
    const args = {
      TCKimlikNo: identifier,
      Ad: name.toUpperCase(),
      Soyad: surname.toUpperCase(),
      DogumYili: bornDate.getFullYear(),
    };

    return new Promise<boolean>((resolve, reject) => {
      createClient(URL, (err, client) => {
        if (err) {
          reject(err);
          return;
        }

        client.TCKimlikNoDogrula(args, (err, result) => {
          if (err) {
            reject(err);
            return;
          }
          resolve(result);
        });
      });
    });
  }
}
