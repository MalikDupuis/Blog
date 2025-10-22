package com.example.backend.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.backend.models.Article;
import com.example.backend.repositories.ArticleRepository;
import com.example.backend.services.ArticleService;

import java.util.List;

@CrossOrigin(origins = "*") // autorise Angular à accéder à l’API
@RestController
@RequestMapping("/api/articles")
public class ArticleController {

    @Autowired
    private ArticleService articleService;

    @GetMapping
    public List<Article> getAllArticles() {
        return articleService.findAll();
    }

    @PostMapping
    public Article createArticle(@RequestBody Article article) {
        return articleService.save(article);
    }
}
