package com.example.zack;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;

import com.zack.ZackApplication;

@SpringBootTest
@ContextConfiguration(classes = { ZackApplication.class })
public class ZackApplicationTests {

    @Test
    public void contextLoads() {
        // Teste básico para verificar o carregamento do contexto
    }

}