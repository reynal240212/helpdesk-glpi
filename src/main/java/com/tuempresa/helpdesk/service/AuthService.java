package com.tuempresa.helpdesk.service;

import com.tuempresa.helpdesk.dto.auth.AuthResponse;
import com.tuempresa.helpdesk.dto.auth.LoginRequest;
import com.tuempresa.helpdesk.model.UserAccount;
import com.tuempresa.helpdesk.repository.UserAccountRepository;
import com.tuempresa.helpdesk.security.JwtService;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
  private final UserAccountRepository userRepo;
  private final PasswordEncoder passwordEncoder;
  private final JwtService jwtService;

  @Value("${app.bootstrap.superadmin.username:superadmin}")
  private String bootstrapUsername;

  @Value("${app.bootstrap.superadmin.password:SuperAdmin123!}")
  private String bootstrapPassword;

  @Value("${app.bootstrap.superadmin.name:Super Administrador}")
  private String bootstrapName;

  public AuthService(UserAccountRepository userRepo, PasswordEncoder passwordEncoder, JwtService jwtService) {
    this.userRepo = userRepo;
    this.passwordEncoder = passwordEncoder;
    this.jwtService = jwtService;
  }

  @PostConstruct
  public void ensureSuperAdmin() {
    if (!userRepo.existsByUsernameIgnoreCase(bootstrapUsername)) {
      UserAccount user = new UserAccount();
      user.setUsername(bootstrapUsername);
      user.setFullName(bootstrapName);
      user.setPasswordHash(passwordEncoder.encode(bootstrapPassword));
      user.setRole(UserAccount.Role.SUPERADMIN);
      user.setActive(true);
      userRepo.save(user);
    }
  }

  public AuthResponse login(LoginRequest request) {
    UserAccount user = userRepo.findByUsernameIgnoreCase(request.getUsername())
        .orElseThrow(() -> new IllegalArgumentException("Usuario o contraseña inválidos"));

    if (!user.isActive() || !passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
      throw new IllegalArgumentException("Usuario o contraseña inválidos");
    }

    String token = jwtService.generateToken(user);
    return new AuthResponse(token, user.getUsername(), user.getRole().name(), user.getFullName());
  }
}
