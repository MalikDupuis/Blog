package com.example.backend.repositories;
import org.springframework.data.jpa.repository.JpaRepository;

import com.example.backend.models.Article;

public interface ArticleRepository extends JpaRepository<Article, Long> {
}
