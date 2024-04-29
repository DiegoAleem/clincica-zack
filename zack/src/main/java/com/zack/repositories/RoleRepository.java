package com.zack.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.zack.domain.model.Role;

public interface RoleRepository extends JpaRepository<Role, String> {

}
