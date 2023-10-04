import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: '[delete-confirm]',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']
})
export class DeleteConfirmComponent implements OnInit {

  @Input()
  owner_id: number | undefined;

  @Output()
  deleteConfirmOutputMessage: EventEmitter<{message: string, owner_id?: number}> = new EventEmitter<{message: string, owner_id?: number}>();

  deleteConfirmModalTemplateNameHash: string = '#deleteConfirmModal';
  deleteConfirmModalTemplateName: string = 'deleteConfirmModal';

  ngOnInit(): void {
    this.deleteConfirmModalTemplateNameHash += '_' + this.owner_id;
    this.deleteConfirmModalTemplateName += '_' + this.owner_id;
  }

  sendCloseMessage() {
    console.log('DeleteConfirmComponent - sendCloseMessage : ', this.owner_id);
    this.deleteConfirmOutputMessage.emit({message: 'CLOSE', owner_id: this.owner_id});
  }

  sendDeleteMessage() {
    console.log('DeleteConfirmComponent - sendDeleteMessage : ', this.owner_id);
    this.deleteConfirmOutputMessage.emit({message: 'DELETE', owner_id: this.owner_id});
  }

}
