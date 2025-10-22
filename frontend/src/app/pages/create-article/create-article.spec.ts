import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';

import { CreateArticle } from './create-article';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article.interface';

describe('CreateArticle', () => {
  let component: CreateArticle;
  let fixture: ComponentFixture<CreateArticle>;
  let articleService: jest.Mocked<ArticleService>;
  let router: jest.Mocked<Router>;

  beforeEach(async () => {
    const articleServiceMock: jest.Mocked<ArticleService> = {
      createArticle: jest.fn()
    } as any;

    const routerMock: jest.Mocked<Router> = {
      navigate: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [CreateArticle, HttpClientTestingModule, FormsModule],
      providers: [
        { provide: ArticleService, useValue: articleServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateArticle);
    component = fixture.componentInstance;
    articleService = TestBed.inject(ArticleService) as jest.Mocked<ArticleService>;
    router = TestBed.inject(Router) as jest.Mocked<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show error if required fields are empty', () => {
    component.article = { title: '', content: '', author: '' };
    component.onSubmit();
    expect(component.errorMessage).toBe('Tous les champs sont obligatoires ✍️');
  });

  it('should call createArticle and show success message', () => {
    const fakeArticle: Article = { title: 'Test', content: 'Contenu test', author: 'Malik' };
    articleService.createArticle.mockReturnValue(of(fakeArticle));

    component.article = fakeArticle;
    component.onSubmit();

    expect(articleService.createArticle).toHaveBeenCalledWith(fakeArticle);
    expect(component.successMessage).toBe('✅ Article créé avec succès !');
  });

  it('should handle error when service fails', () => {
    articleService.createArticle.mockReturnValue(throwError(() => new Error('Erreur API')));

    component.article = { title: 'Erreur', content: 'Contenu', author: 'Malik' };
    component.onSubmit();

    expect(component.errorMessage).toBe('❌ Une erreur est survenue lors de la création.');
    expect(component.isSubmitting).toBe(false);
  });
});
