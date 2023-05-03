import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StartRecipesComponent } from './start-recipes.component';

describe('StartRecipesComponent', () => {
  let component: StartRecipesComponent;
  let fixture: ComponentFixture<StartRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StartRecipesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StartRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
