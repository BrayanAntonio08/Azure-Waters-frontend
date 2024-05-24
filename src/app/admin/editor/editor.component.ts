import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBold, faChevronDown, faItalic, faUnderline } from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-editor',
  standalone: true,
  imports: [FontAwesomeModule],
  templateUrl: './editor.component.html',
  styleUrl: './editor.component.css'
})
export class EditorComponent {
  @Input() text: string = '';
  @Output() outputResult = new EventEmitter<string>();
  @ViewChild('textEditor') textEditor!: ElementRef;
  @ViewChild('formatOptions') formatOptions!: ElementRef;

  selectorClose = true;
  selectedFormat: string = 'Paragraph';
  faSelector = faChevronDown;
  faBold = faBold;
  faItalic = faItalic;
  faUnderline = faUnderline;
  savedRange: Range | null = null;


  formatText(command: string, event: MouseEvent) {
    event.preventDefault();
    if (this.savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(this.savedRange);
    }
    document.execCommand(command);
  }

  openSelector() {
    this.selectorClose = !this.selectorClose;
    console.log(this.savedRange)
  }

  formatBlock(tag: string) {
    if (this.savedRange) {
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(this.savedRange);
    }
    document.execCommand('formatBlock', false, tag);
  }

  editorClick(){
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      this.savedRange = selection.getRangeAt(0);
    }

    //obtner el tipo de texto en el cursor
    this.checkCurrentTag()
  }

  onBlur(){
    const data = this.textEditor.nativeElement.innerHTML;
    this.outputResult.emit(data);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (this.formatOptions && !this.formatOptions.nativeElement.contains(target) && !target.closest('.selector')) {
      this.selectorClose = true;
    }
  }

  checkCurrentTag() {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const anchorNode = selection.anchorNode;
      if (anchorNode) {
        let currentNode: HTMLElement | null = anchorNode.nodeType === 3 ? anchorNode.parentElement : anchorNode as HTMLElement;
        while (currentNode && currentNode !== this.textEditor.nativeElement) {
          if (currentNode.nodeName === 'P') {
            this.selectedFormat = 'Paragraph';
            break;
          }
          if (currentNode.nodeName === 'H1') {
            this.selectedFormat = 'Heading 1';
            break;
          }
          if (currentNode.nodeName === 'H2') {
            this.selectedFormat = 'Heading 2';
            break;
          }
          currentNode = currentNode.parentElement;
        }
      }
    }
  }
}
