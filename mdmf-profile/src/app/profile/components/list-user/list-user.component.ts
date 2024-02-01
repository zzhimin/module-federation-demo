import { Component, Injector, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css'],
  exportAs: 'ListUserComponent',
})
export class ListUserComponent implements OnInit {

  modal: any;
  message: any;

  @Input()
  get ctx() {
    return this._ctx;
  }
  set ctx(ctx) {
    if (ctx) {
      this._ctx = ctx;
      this.subjectCtx();
    }
  }
  _ctx: any;

  constructor(private injector: Injector) { }

  ngOnInit(): void {
    console.log('this.injector >>:', this.injector);
    this.modal = this.injector.get('modal');
    this.message = this.injector.get('message');
  }

  subjectCtx() {
    console.log('this.ctx >>:', this.ctx);
  }

  createModal(): void {
    this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: 'string, will close after 1 sec',
      nzClosable: false,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }

  createMessage() {
    this.message.success('使用基座的消息提示')
  }
}
