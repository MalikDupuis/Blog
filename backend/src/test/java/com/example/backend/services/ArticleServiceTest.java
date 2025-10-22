package com.example.backend.services;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import com.example.backend.models.Article;
import com.example.backend.repositories.ArticleRepository;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class ArticleServiceTest {

    @Mock
    private ArticleRepository articleRepository;

    @InjectMocks
    private ArticleService articleService;

    private Article article;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        article = new Article(1L, "Titre test", "Contenu", "Malik", null);
    }

    @Test
    void shouldReturnAllArticles() {
        when(articleRepository.findAll()).thenReturn(Arrays.asList(article));
        List<Article> result = articleService.findAll();
        assertEquals(1, result.size());
        assertEquals("Titre test", result.get(0).getTitle());
    }

    @Test
    void shouldSaveArticle() {
        when(articleRepository.save(article)).thenReturn(article);
        Article saved = articleService.save(article);
        assertNotNull(saved);
        verify(articleRepository, times(1)).save(article);
    }

  
}
