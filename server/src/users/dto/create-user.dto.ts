import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({
        default: 'test@test.com'
    })
    email: string;

    @ApiProperty({
        default: 'Name surname'
    })
    fullName: string;

    @ApiProperty({
        default: 'test123'
    })
    password: string;
}
