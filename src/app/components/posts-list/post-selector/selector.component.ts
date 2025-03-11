import { Component,ChangeDetectionStrategy, signal, output } from '@angular/core';
import { UntypedFormControl, ReactiveFormsModule  } from '@angular/forms';
import { PrizmInputSelectModule, PrizmSelectStringify,PrizmButtonComponent } from '@prizm-ui/components';
import { UsersArray } from '../../../shared/users-names';
import { AuthorsNames } from '../../../shared/IPost';


@Component({
  selector: 'app-selector',
  imports: [ReactiveFormsModule,PrizmInputSelectModule,PrizmButtonComponent],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class SelectorComponent {
  readonly authorsIdPrizm = UsersArray;
  readonly selectAuthorIdPrizm = new UntypedFormControl();
  readonly stringifyPrizm: PrizmSelectStringify<AuthorsNames> = (item: AuthorsNames) => {
    return item?.name;
  };
  authorId = output<number>();

  constructor() {
    this.selectAuthorIdPrizm.valueChanges.subscribe(author => {
      if (author == null ) {
        this.authorId.emit(0);
      } else {
        this.authorId.emit(author.id);
      }
    });
  }

  public setDefaultId(): void {
    this.selectAuthorIdPrizm.setValue( null );
  }
}
