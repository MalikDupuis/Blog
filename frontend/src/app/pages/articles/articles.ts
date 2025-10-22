import { Component, OnInit } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { ArticleService } from '../../services/article.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-articles',
  imports: [CommonModule],
  templateUrl: './articles.html',
  styleUrl: './articles.css'
})
export class Articles implements OnInit {

  articles: Article[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private articleService: ArticleService) {}

  ngOnInit(): void {
    this.loadArticles();
  }

  loadArticles(): void {
    this.articleService.getAllArticles().subscribe({
      next: (data) => {
        this.articles = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.errorMessage = "Erreur lors du chargement des articles 😢";
        console.error(err);
        this.isLoading = false;
      }
    });
  }
}