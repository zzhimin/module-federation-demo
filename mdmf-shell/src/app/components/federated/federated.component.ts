import {
  Component,
  Input,
  Injector,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ɵcreateInjector,
  ComponentRef,
  ComponentFactoryResolver,
} from '@angular/core';
import { loadRemoteModule } from '../../utils/federation-utils';
import { TbAnchorComponent } from '../tb-anchor.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'federated-component',
  templateUrl: './federated.component.html',
  styleUrls: ['./federated.component.scss'],
})
export class FederatedComponent implements OnInit {
  @ViewChild('federatedComponent', { static: true }) mfContainerAnchor: TbAnchorComponent;

  @Input() remoteEntry: string;
  @Input() remoteName: string;
  @Input() exposedModule: string;
  @Input() componentName: string;

  mfComponentRef: ComponentRef<any>;
  mfComponent: any;

  constructor(private injector: Injector,
              private componentFactoryResolver: ComponentFactoryResolver,
              private modal: NzModalService,
              private message: NzMessageService,
  ) { }
  ngOnInit(): void {
    loadRemoteModule({
      remoteEntry: this.remoteEntry,
      remoteName: this.remoteName,
      exposedModule: this.exposedModule,
    }).then(federated => {
      this.buildDynamicComponent(federated);
    });
  }

  buildDynamicComponent(federated) {
    if (this.mfComponentRef) {
      this.mfComponentRef.destroy();
      this.mfComponentRef = null;
    }

    const comp = federated[this.exposedModule].exports.find(e => e.ɵcmp?.exportAs[0] === this.componentName);


    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(comp);
    const viewContainerRef = this.mfContainerAnchor.viewContainerRef;
    viewContainerRef.clear();

    const injector: Injector = Injector.create(
      {
        providers: [
          {
            provide: 'modal',
            useValue: this.modal
          },
          {
            provide: 'message',
            useValue: this.message
          }
        ],
        parent: this.injector
      }
    );

    const mergeInjector = ɵcreateInjector(federated[this.exposedModule], injector);

    this.mfComponentRef = viewContainerRef.createComponent(componentFactory, 0, mergeInjector);
    this.mfComponent = this.mfComponentRef.instance;

    setInterval(() => {
      this.mfComponent.ctx = {
        random: Math.random(),
        
      };
    }, 1000)
  }

}
