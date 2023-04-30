import { Directive, HostBinding, HostListener, ElementRef } from '@angular/core';


@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  isMenuOpen = false;

  constructor(private el: ElementRef) {}

  @HostListener('click') onClick() {
    this.toggleMenu();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const menu = this.el.nativeElement.nextElementSibling;
    if (this.isMenuOpen) {
      menu.classList.add('show');
      document.addEventListener('click', this.onDocumentClick);
    } else {
      menu.classList.remove('show');
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  onDocumentClick = (event: MouseEvent) => {
    if (!this.el.nativeElement.contains(event.target)) {
      this.toggleMenu();
    }
  };
}
