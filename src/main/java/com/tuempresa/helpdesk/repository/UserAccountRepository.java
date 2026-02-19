package com.tuempresa.helpdesk.repository;

import com.tuempresa.helpdesk.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.UUID;

public interface UserAccountRepository extends JpaRepository<UserAccount, UUID> {
  Optional<UserAccount> findByUsernameIgnoreCase(String username);
  boolean existsByUsernameIgnoreCase(String username);
}
