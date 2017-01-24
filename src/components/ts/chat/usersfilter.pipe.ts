import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
    name: "usersFilter"
})

export class UsersFilterPipe implements PipeTransform {
    transform(value: any, args: string): any {
        let filter = args.toLowerCase();
        if (filter) {
            return value.filter((user) => {
                    const name = user.username;
                    return name.toLowerCase().indexOf(filter) !== -1;
                   });
        }
        else {
            return value;
        }
    }
}