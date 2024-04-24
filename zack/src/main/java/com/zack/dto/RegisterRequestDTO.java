package com.zack.dto;

public record RegisterRequestDTO (String nome, String email, String telefone, String crp,byte[] curriculo) {

    @Override
    public boolean equals(Object obj) {
        return false;
    }

    @Override
    public int hashCode() {
        return 0;
    }

    @Override
    public String toString() {
        return "";
    }
    
}