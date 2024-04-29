package com.zack.infra;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class DynamicMaxLifetimeAdjustmentService {

    @Value("${spring.datasource.hikari.max-lifetime}")
    private long maxLifetime;

    // Método para ajustar dinamicamente o maxLifetime
    private void adjustMaxLifetime() {
        // Lógica para calcular o novo valor de maxLifetime com base na carga do sistema
        // Por exemplo, você pode usar métricas de uso de CPU, memória, ou carga de requisições para calcular o novo valor

        // Aqui, apenas para fins de demonstração, vamos aumentar o maxLifetime em 1 minuto a cada ajuste
        maxLifetime += 60000;

        // Limitar o novo valor entre um valor mínimo e máximo (opcional)
        // maxLifetime = Math.min(Math.max(maxLifetime, MIN_MAX_LIFETIME), MAX_MAX_LIFETIME);

        // Atualizar a propriedade max-lifetime
        System.setProperty("spring.datasource.hikari.max-lifetime", String.valueOf(maxLifetime));
    }

    // Método agendado para executar o ajuste dinâmico periodicamente
    @Scheduled(fixedRate = 60000) // Ajustar a cada 1 minuto
    public void scheduledAdjustment() {
        adjustMaxLifetime();
    }
}
