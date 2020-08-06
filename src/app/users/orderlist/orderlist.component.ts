import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/users.service";
import { first } from "rxjs/operators";
import { Router } from "@angular/router";

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.scss']
})
export class OrderlistComponent implements OnInit {

  orders: Array<object> = [];
  loadershow: boolean;
  columns: any;

  constructor(public US: UserService, public router: Router) {}

  ngOnInit(): void {
    this.getList();
  }

  async getList() {
    await (await this.US.getOrders()).pipe(first()).subscribe(
      async (p) => {
        this.loadershow = false;
        this.orders = p.result; 
      },
      (error) => {}
    );
  }

}
