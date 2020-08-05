import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/users.service";
import { first } from "rxjs/operators";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-userdetails",
  templateUrl: "./userdetails.component.html",
  styleUrls: ["./userdetails.component.scss"],
})
export class UserdetailsComponent implements OnInit {
  userid: any = "";
  loadershow = true;
  details: any;

  constructor(
    public US: UserService,
    public router: Router,
    public AR: ActivatedRoute
  ) {
    this.AR.params.subscribe((params) => {
      this.userid = params.id;
    });
  }

  ngOnInit(): void {
    this.getUserDetails();
  }

  async getUserDetails() {
    await (await this.US.getDetails(this.userid)).pipe(first()).subscribe(
      async (p) => {
        this.loadershow = false;
        this.details = p.result;
        console.log(p);
      },
      (error) => {}
    );
  }
}
