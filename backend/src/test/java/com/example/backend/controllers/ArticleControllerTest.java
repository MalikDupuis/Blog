package com.example.backend.controllers;

import com.example.backend.models.Article;
import com.example.backend.services.ArticleService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(ArticleController.class)
class ArticleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ArticleService articleService;

    private final ObjectMapper mapper = new ObjectMapper();

    @Test
    void shouldReturnListOfArticles() throws Exception {
        Article article = new Article(1L, "Titre 1", "Contenu", "Malik", null);
        when(articleService.findAll()).thenReturn(List.of(article));

        mockMvc.perform(get("/api/articles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].title").value("Titre 1"))
                .andExpect(jsonPath("$[0].author").value("Malik"));
    }

   

    

    @Test
    void shouldCreateArticle() throws Exception {
        Article article = new Article(null, "Nouveau titre", "Texte", "Malik", null);
        when(articleService.save(any(Article.class)))
                .thenReturn(new Article(1L, "Nouveau titre", "Texte", "Malik", null));

        mockMvc.perform(post("/api/articles")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(article)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1L))
                .andExpect(jsonPath("$.title").value("Nouveau titre"));
    }

    
}
