import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { HttpException, HttpStatus } from "@nestjs/common";
export class ATStrategy extends PassportStrategy(Strategy, 'jwt-access') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.AT_SECRET,
            signOptions: {
                expiresIn: `${60 * 60}s`,
            },
        });
    }
    async validate(payload: any) {
        const user = await this.usermodel.findOne({ _id: payload._id });
        if (!user) {
            throw new HttpException("Token expired !!", HttpStatus.BAD_REQUEST);
        }
        return payload;
    }
}