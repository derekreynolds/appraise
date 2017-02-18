import { Injectable } from '@angular/core';

//import { genSaltSync, hashSync } from 'bcrypt';

@Injectable()
export class PasswordService {


 	public static hashPassword(password: string, salt: string): string {
 		return password;//hashSync(password, salt); 		
 	}

 	public static generateSalt(): string {
 		return '12345678';//genSaltSync(8);
 	}

 	public static match(password: string, salt: string, hashedPassword): boolean {
 		return this.hashPassword(password, salt) === hashedPassword;
 	}
}