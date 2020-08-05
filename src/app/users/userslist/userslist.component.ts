import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/users.service";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: "app-userslist",
  templateUrl: "./userslist.component.html",
  styleUrls: ["./userslist.component.scss"],
})
export class UserslistComponent implements OnInit {
  users: Array<object> = [];
  loadershow: boolean;
  columns: any;

  constructor(public US: UserService, public router: Router) {}

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    await (await this.US.getUsers()).pipe(first()).subscribe(
      async (p) => {
        this.loadershow = false;
        this.users = p.result;
        console.log(this.users);
      },
      (error) => {}
    );
  }

  viewUser(user) {
    this.router.navigate([`/users/details/${user.id}`]);
  }
}
