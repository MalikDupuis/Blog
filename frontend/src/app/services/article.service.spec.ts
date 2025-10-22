import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ArticleService } from './article.service';
import { Article } from '../interfaces/article.interface';

describe('ArticleService', () => {
  let service: ArticleService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8080/api/articles';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ArticleService]
    });

    service = TestBed.inject(ArticleService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('devrait récupérer tous les articles (GET)', () => {
    const mockArticles: Article[] = [
      { id: 1, title: 'Test', content: 'Contenu', author: 'Malik' }
    ];

    service.getAllArticles().subscribe((articles) => {
      expect(articles.length).toBe(1);
      expect(articles[0].title).toBe('Test');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockArticles);
  });

  it('devrait créer un article (POST)', () => {
    const newArticle: Article = { title: 'Nouveau', content: 'Texte', author: 'Malik' };

    service.createArticle(newArticle).subscribe((res) => {
      expect(res.title).toBe('Nouveau');
      expect(res.author).toBe('Malik');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newArticle);
    req.flush(newArticle);
  });
});
