import { Component, NgModule } from '@angular/core';
import { Article } from '../../interfaces/article.interface';
import { ArticleService } from '../../services/article.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-article',
  imports: [FormsModule, CommonModule],
  templateUrl: './create-article.html',
  styleUrl: './create-article.css'
})
export class CreateArticle {

  article: Article = {
    title: '',
    content: '',
    author: ''
  };

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private articleService: ArticleService,
    private router: Router
  ) {}

  onSubmit(): void {
    if (!this.article.title || !this.article.content || !this.article.author) {
      this.errorMessage = 'Tous les champs sont obligatoires ✍️';
      return;
    }

    this.isSubmitting = true;
    this.articleService.createArticle(this.article).subscribe({
      next: (created) => {
        this.successMessage = '✅ Article créé avec succès !';
        this.errorMessage = '';
        this.isSubmitting = false;
        // Optionnel : redirection vers la liste
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: (err) => {
        console.error(err);
        this.errorMessage = '❌ Une erreur est survenue lors de la création.';
        this.isSubmitting = false;
      }
    });
  }
}