import { Inject, Injectable, viewChild, ViewChild } from '@angular/core';
import { PrizmDialogService,} from '@prizm-ui/components';


@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  
  constructor( private readonly dialogService: PrizmDialogService) {}

  showError(message: string): void {
    this.dialogService.open(message, {
      closeable: true,
      position: 'c',
      size: 'l',
    }).subscribe();
  }
}
