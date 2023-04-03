import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MycategoriesrendererComponent } from './mycategoriesrenderer.component';

describe('MycategoriesrendererComponent', () => {
  let component: MycategoriesrendererComponent;
  let fixture: ComponentFixture<MycategoriesrendererComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MycategoriesrendererComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MycategoriesrendererComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
