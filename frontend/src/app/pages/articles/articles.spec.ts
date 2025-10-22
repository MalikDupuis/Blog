import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { Articles } from './articles';
import { ArticleService } from '../../services/article.service';
import { Article } from '../../interfaces/article.interface';

describe('Articles', () => {
  let component: Articles;
  let fixture: ComponentFixture<Articles>;
  let articleServiceMock: jest.Mocked<ArticleService>;

  beforeEach(async () => {
    const fakeArticles: Article[] = [
      { id: 1, title: 'Titre 1', content: 'Contenu 1', author: 'Malik', createdAt: new Date() },
      { id: 2, title: 'Titre 2', content: 'Contenu 2', author: 'Ali', createdAt: new Date() }
    ];

    // 🧠 Crée le mock AVANT la création du composant
    articleServiceMock = {
      getAllArticles: jest.fn().mockReturnValue(of(fakeArticles)),
      createArticle: jest.fn()
    } as any;

    await TestBed.configureTestingModule({
      imports: [Articles, HttpClientTestingModule],
      providers: [{ provide: ArticleService, useValue: articleServiceMock }]
    }).compileComponents();

    fixture = TestBed.createComponent(Articles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load articles successfully', () => {
    expect(articleServiceMock.getAllArticles).toHaveBeenCalled();
    expect(component.articles.length).toBe(2);
    expect(component.isLoading).toBe(false);
    expect(component.errorMessage).toBe('');
  });

  it('should handle error when API fails', () => {
    articleServiceMock.getAllArticles.mockReturnValueOnce(
      throwError(() => new Error('Erreur API'))
    );

    component.loadArticles();

    expect(component.errorMessage).toBe('Erreur lors du chargement des articles 😢');
    expect(component.isLoading).toBe(false);
  });

  // 🧪 Nouveau : test du template HTML (affichage d’articles)
  it('should render article titles in the template', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const titles = compiled.querySelectorAll('h3');
    expect(titles.length).toBe(2);
    expect(titles[0].textContent).toContain('Titre 1');
    expect(titles[1].textContent).toContain('Titre 2');
  });

  // 🧪 Nouveau : test du message "aucun article"
  it('should display a message when no articles are available', () => {
    component.articles = [];
    component.isLoading = false;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const noArticleMsg = compiled.querySelector('.no-articles');
    expect(noArticleMsg?.textContent).toContain('Aucun article disponible');
  });

  // 🧪 Nouveau : test du message d’erreur affiché dans le DOM
  it('should display an error message when API fails', () => {
    component.errorMessage = 'Erreur lors du chargement des articles 😢';
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const errorDiv = compiled.querySelector('.error');
    expect(errorDiv?.textContent).toContain('Erreur lors du chargement des articles 😢');
  });

  // 🧪 Nouveau : test du message de chargement
  it('should show loading message when isLoading is true', () => {
    component.isLoading = true;
    component.articles = [];
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const loading = compiled.querySelector('.loading');
    expect(loading?.textContent).toContain('Chargement');
  });
});
